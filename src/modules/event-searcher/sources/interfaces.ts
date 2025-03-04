export interface IEventResponse {
  eventName: string;
  details?: string;
  spotsLeft: number;
  isRegistrationOpened: boolean;
  isFull?: boolean;
  registerLink?: string;
  occurrenceDate: Date;
  startTime: Date;
  endTime: Date;
  priceRange?: string;
  registerDates?: {
    publicRegistrationStartDateValue?: Date;
    residentsRegistrationDate?: Date;
    MembersRegistrationDate?: Date;
  };
  address: {
    addressTag: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
}
