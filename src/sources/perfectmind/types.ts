export type PerfectmindSource = {
  subdomain: string;
  calendarId: string;
  widgetId: string;
  clientId: string;
};

export type PerfectmindEventItem = {
  EventId: string;
  CourseId: string;
  CourseIdTrimmed: string;
  EventName: string;
  Details: string;
  Spots: string;
  OccurrenceDate: string;
  BookButtonText: string;
  BookButtonDescription: string;
  ClosedButtonName: string;
  Instructor: string | null;
  Facility: string;
  DisplaySettings: {
    DisplayInstructorsName: boolean;
    DisplayPrices: boolean;
    DisplaySpotsLeft: boolean;
    DisplayRegistrationDate: boolean;
    DisplayNumberOfSessions: boolean;
    DisplayCourseId: boolean;
    DisplayAgeRestrictions: boolean;
    DisplayRankRestrictions: boolean;
    DisplayGenderRestrictions: boolean;
    ButtonName: string;
    UseBookMe5UiWidgetVersion: boolean;
    WidgetUIVersion: number;
  };
  PriceRange: string;
  AllDayEvent: boolean;
  AnyTimeBrokenOccurrences: boolean;
  FormattedStartDate: string;
  FormattedStartTime: string;
  FormattedEndDate: string;
  FormattedEndTime: string;
  FirstOccurrenceFormattedEndTime: string | null;
  EventTimeDescription: string;
  AlternativeLocation: string | null;
  HasAlternativeLocation: boolean;
  OccurrenceDescription: string;
  Occurrences: any[]; // Pode ser ajustado se soubermos a estrutura
  NumberOfSessions: number;
  PrerequisiteEvents: boolean;
  DisplayablePrerequisiteEventsRestrictionsForCourses: string;
  DisplayableRestrictionsForCourses: string;
  MinAge: number | null;
  MinAgeMonths: number | null;
  MaxAge: number | null;
  MaxAgeMonths: number | null;
  NoAgeRestriction: boolean;
  AgeRestrictions: string;
  GenderRestrictions: string;
  RankRestrictions: string;
  FromRank: number | null;
  ToRank: number | null;
  StartingRankId: string | null;
  EndingRankId: string | null;
  DurationInMinutes: number;
  FeeFrequency: string | null;
  OrgLogo: string;
  OrgIsSingleLocation: boolean;
  OrgLegalName: string;
  OrgName: string;
  Address: {
    AddressTag: string;
    Street: string;
    City: string;
    PostalCode: string;
    CountryId: number;
    Country: string;
    StateProvinceId: number;
    AnyFieldMissing: boolean;
    Latitude: number;
    Longitude: number;
    Id: string;
  };
  Location: string;
  BookingType: number;
};

type PerfectmindPrice = {
  Id: string;
  ObjectId: string;
  ItemId: string;
  Amount: number;
  PriceTypeId: string;
  Name: string;
  IsSelected: boolean;
  IsOriginalPrice: boolean;
  CanSelect: boolean;
  ShowOnline: boolean | null;
  DisplayAmount: string;
  DisplayProratedAmount: string;
  DisplayAmountOrAsFree: string;
  WasProrated: boolean;
  ProratedAmount: number;
  AdjustedStartDate: string | null;
  TaxableStateDesc: string;
  AnyTaxesAssigned: boolean;
  IncludeTaxFlagEnabled: boolean;
  WasCalculatedUsingMultipleSlotsLogic: boolean;
  ItemOccurrences: any | null;
  MakeUpClass: boolean;
  DropinFee: boolean;
};

export type PerfectmindEventDetails = {
  BackAction: {
    Url: string;
    Name: string;
  };
  ParentEventId: string;
  LotterySettings: any | null;
  IsLotterySettingsEnabled: boolean;
  IsLotteryRegistrationEnabled: boolean;
  IsAdminSession: boolean;
  FakeEventId: string | null;
  LotteryInfo: string;
  RecordName: string;
  CalendarId: string;
  CalendarOvernightReservations: boolean;
  ServiceDurationId: string | null;
  WidgetId: string;
  RegFormId: string | null;
  ImageUrl: string;
  ProgramId: string;
  ProgramDescription: string;
  ProgramName: string;
  ProgramImageUrl: string;
  ProgramUseCheckInOut: boolean;
  EventTimeWordDescription: string;
  SessionName: string;
  StartDate: string;
  StartDateWithOffset: string;
  PublicRegistrationStartDate: string | null;
  FormattedPublicRegistrationStartDate: string | null;
  PublicRegistrationStartDateValue: string;
  PublicRegistrationStartDateWithOffset: string | null;
  ResidentsRegistrationDate: string;
  FormattedResidentsRegistrationDate: string | null;
  ResidentsRegistrationDateWithOffset: string | null;
  ResidentsRegistrationDateValue: string;
  MembersRegistrationDate: string;
  FormattedMembersRegistrationDate: string | null;
  MembersRegistrationDateWithOffset: string | null;
  MembersRegistrationDateValue: string;
  AllowLateBooking: boolean;
  FormattedFullStartDate: string;
  StartTime: string;
  StartDay: string;
  EndDate: string;
  EndDateWithOffset: string;
  FormattedFullEndDate: string;
  EndTime: string;
  AppointmentStartDateTimeTicks: number;
  ActualLocation: string;
  Latitude: number | null;
  Longitude: number | null;
  LocationId: string;
  AgeRule: number;
  AgeRuleSpecificDate: string;
  Restrictions: string;
  DisplayableRestrictions: string;
  SpotsLeft: number;
  RegistrationInfo: string;
  FormattedRegistrationInfo: string;
  IsRegistrationClosed: boolean;
  IsFutureRegistration: boolean;
  AnyRegistrationDateInFuture: boolean;
  RegistrationEndDateInEventTimeZone: string;
  RegistrationEndDateUtc: string;
  FormattedRegistrationEndDate: string;
  IsWaitListAvailable: boolean;
  IsWaitListFull: boolean;
  IsWaitListHasSpots: boolean;
  RestrictWaitlist: boolean;
  IsFull: boolean;
  Token: string | null;
  Color: number;
  FacilityId: string;
  FacilityContractId: string | null;
  FacilityOnlineOption: number;
  FacilitySupervisorEmails: string;
  Assistants: any[];
  MaximumCapacity: number;
  WaitListCapacity: number;
  WaitListSpotsLeft: number;
  CanNotBook: boolean;
  Prices: PerfectmindPrice[];
  Extras: any[];
  PaymentPlan: any | null;
  HasExtras: boolean;
  HasRequiredExtras: boolean;
  HasRestrictions: boolean;
  OwnerId: string;
  SupervisorId?: string;
};
