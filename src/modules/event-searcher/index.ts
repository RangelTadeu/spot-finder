import { listEvents } from "./sources/perfectmind";
import newWestminster from "./sources/perfectmind/cities/new-westminster.json";
import mapleRidge from "./sources/perfectmind/cities/maple-ridge.json";
import coquitlam from "./sources/perfectmind/cities/coquitlam.json";
import delta from "./sources/perfectmind/cities/delta.json";

export const fetchUpcomingEvents = async (keyword?: string) => {
  const [newWestminsterEvents, mapleRidgeEvents, coquitlamEvents, deltaEvents] =
    await Promise.all([
      listEvents(newWestminster, keyword),
      listEvents(mapleRidge, keyword),
      listEvents(coquitlam, keyword),
      listEvents(delta, keyword),
    ]);

  return newWestminsterEvents.concat(
    mapleRidgeEvents,
    coquitlamEvents,
    deltaEvents
  );
};
