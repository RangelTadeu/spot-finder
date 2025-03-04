import axios from "axios";
import * as cheerio from "cheerio";
import {
  PerfectmindEventDetails,
  PerfectmindEventItem,
  PerfectmindSource,
} from "./types";
import { format, addDays, isAfter, parse } from "date-fns";
import puppeteer from "puppeteer";
import { IEventResponse } from "../interfaces";

const getToken = async (url: string) => {
  const response = await axios.get(url);
  const html = response.data;

  const $ = cheerio.load(html);

  const token = $("input[name='__RequestVerificationToken']").val();

  return String(token);
};

const getHeaders = (source: PerfectmindSource) => {
  const { subdomain, clientId } = source;
  return {
    accept: "*/*",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    origin: `https://${subdomain}.perfectmind.com`,
    referer: `https://${subdomain}.perfectmind.com/${clientId}/Clients/BookMe4BookingPages/Classes`,
    "user-agent": "Mozilla/5.0",
  };
};

const getEventDetailUrl = (
  source: PerfectmindSource,
  eventId: string,
  occurrenceDate: string
) => {
  return `https://${source.subdomain}.perfectmind.com/${source.clientId}/Clients/BookMe4LandingPages/Class?widgetId=${source.widgetId}&redirectedFromEmbededMode=False&classId=${eventId}&occurrenceDate=${occurrenceDate}`;
};

const getEventDetails = async (
  url: string
): Promise<PerfectmindEventDetails | null> => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const eventInfo: PerfectmindEventDetails | null = await page.evaluate(() => {
    // @ts-ignore
    return typeof eventInfo !== "undefined" ? eventInfo : null;
  });

  await browser.close();

  return eventInfo;
};

const shouldFetchDetails = (event: PerfectmindEventItem): boolean => {
  const { Spots: spots, FormattedStartDate, FormattedStartTime } = event;

  const startDate = convertToDate(FormattedStartDate, FormattedStartTime);
  const sevenDaysInAdvance = addDays(new Date(), 7);

  if (spots) return false;

  if (isAfter(startDate, sevenDaysInAdvance)) return false;

  return true;
};

// "formattedDate": "Mon, Mar 3rd, 2025",
// "formattedTime": "5:45 PM",
const convertToDate = (formattedDate: string, formattedTime: string) => {
  const cleanDate = formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1");

  const dateTimeString = `${cleanDate} ${formattedTime}`;

  const dateObj = parse(dateTimeString, "EEE, MMM d, yyyy h:mm a", new Date());

  return dateObj;
};

export const listEvents = async (
  source: PerfectmindSource,
  Keyword = "Pickleball"
): Promise<IEventResponse[]> => {
  const { clientId, calendarId, widgetId, subdomain } = source;

  const getUrl = `https://${subdomain}.perfectmind.com/${clientId}/Clients/BookMe4BookingPages/Classes?calendarId=${calendarId}&widgetId=${widgetId}&embed=False`;
  const token = await getToken(getUrl);

  const after = format(addDays(new Date(), -1), "yyyy-MM-dd");
  const startDate = format(new Date(), "yyyy-MM-dd");
  const endDate = format(addDays(new Date(), 30), "yyyy-MM-dd");

  const data = new URLSearchParams({
    __RequestVerificationToken: token,
    calendarId,
    widgetId,
    page: "0",
    dateString: startDate,
    after: after,
    "values[0][Name]": "Keyword",
    "values[0][Value]": Keyword,
    "values[0][ValueKind]": "9",
    "values[1][Name]": "Date Range",
    "values[1][Value]": `${startDate}T00:00:00.000Z`,
    "values[1][Value2]": `${endDate}T00:00:00.000Z`,
    "values[1][ValueKind]": "6",
    "values[2][Name]": "Time Range",
    "values[2][Value]": "",
    "values[2][Value2]": "",
    "values[2][ValueKind]": "7",
    "values[3][Name]": "Age",
    "values[3][Value]": "0",
    "values[3][Value2]": "588", // remove 50+ classes
    "values[3][ValueKind]": "0",
  });

  const postUrl = `https://${subdomain}.perfectmind.com/${clientId}/Clients/BookMe4BookingPagesV2/ClassesV2`;

  const response = await axios.post<{
    classes: PerfectmindEventItem[];
    classesMaxEndDateString: string;
    nextKey: string;
  }>(postUrl, data, {
    headers: getHeaders(source),
  });

  const res: IEventResponse[] = [];

  for (const event of response.data?.classes || []) {
    const detailUrl = getEventDetailUrl(
      source,
      event.EventId,
      event.OccurrenceDate
    );

    const spotsLeft = event.Spots.match(/\d+/)?.[0];

    const eventDetails = shouldFetchDetails(event)
      ? await getEventDetails(detailUrl)
      : undefined;

    res.push({
      eventName: event.EventName,
      details: event.Details,
      spotsLeft: spotsLeft !== undefined ? Number(spotsLeft) : 0,
      registerLink: detailUrl,
      isRegistrationOpened: event.Spots !== "Full" && event.Spots !== "",
      isFull: event.Spots === "Full",
      occurrenceDate: parse(event.OccurrenceDate, "yyyyMMdd", new Date()),
      startTime: convertToDate(
        event.FormattedStartDate,
        event.FormattedStartTime
      ),
      endTime: convertToDate(event.FormattedStartDate, event.FormattedEndTime),
      priceRange: event.PriceRange,
      address: {
        addressTag: event.Address.AddressTag,
        street: event.Address.Street,
        city: event.Address.City,
        postalCode: event.Address.PostalCode,
        country: event.Address.Country,
        latitude: event.Address.Latitude,
        longitude: event.Address.Longitude,
      },
      registerDates: eventDetails
        ? {
            publicRegistrationStartDateValue: new Date(
              eventDetails.PublicRegistrationStartDateValue
            ),
            residentsRegistrationDate: new Date(
              eventDetails.ResidentsRegistrationDateValue
            ),
            MembersRegistrationDate: new Date(
              eventDetails.MembersRegistrationDateValue
            ),
          }
        : undefined,
    });
  }

  return res;
};
