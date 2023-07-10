// import { boolean, mixed, number, object, string } from "yup";

// const ALL_ROLES = [
//   "dev" as const,
//   "admin" as const,
//   "coordinator" as const,
//   "foreman" as const,
// ];

// const ALL_RATES = [
//   "residential" as const,
//   "commercial" as const,
//   "davisBacon" as const,
//   "driveTime" as const,
// ];

// const ALL_OVERTIMES = ["daily" as const, "weekly" as const];

// const ALL_ENTRY_TYPES = ["roofing" as const, "carpentry" as const];

// export type Role = typeof ALL_ROLES[number];
// export type Rate = typeof ALL_RATES[number];
// export type Overtime = typeof ALL_OVERTIMES[number];
// export type EntryType = typeof ALL_ENTRY_TYPES[number];

// export const CreateOrUpdateEmployeeRequest = object({
//   active: boolean().required(),
//   displayId: string().required(),
//   name: string().required(),
//   phoneNumber: string().required(),
//   rateResidential: number().required().min(0, "can't be less than 0"),
//   rateCommercial: number().required().min(0, "can't be less than 0"),
//   rateDavisBacon: number().required().min(0, "can't be less than 0"),
//   rateDavisBaconOt: number().required().min(0, "can't be less than 0"),
//   rateDriveTime: number().required().min(0, "can't be less than 0"),
// });

// export const CreateOrUpdateJobRequest = object({
//   active: boolean().required(),
//   name: string().required(),
//   budgetOriginal: number().required().min(0, "can't be less than 0"),
//   budgetCurrent: number().required().min(0, "can't be less than 0"),
//   rateType: mixed<Rate>().oneOf(ALL_RATES.slice()).required(),
//   overtimeType: mixed<Overtime>().oneOf(ALL_OVERTIMES.slice()).required(),
// });

// export const UpdateDayRequest = object({
//   description: string().required(),
// });

// export const CreateEntryRequest = object({
//   employeeId: string().required(),
// });

// export const UpdateEntryRequest = object({
//   timeIn: number().required().min(0, "can't be less than 0"),
//   timeOut: number().required().min(0, "can't be less than 0"),
//   lunchHours: number().required().min(0, "can't be less than 0"),
//   entryType: string().required(),
// });
