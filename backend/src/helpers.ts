// import { Request, Response, NextFunction } from "express";
// import moment from "moment";
// import { ValidationError } from "yup";
// import { Account, Day, PrismaClient, Timesheet } from "@prisma/client";

// const prisma = new PrismaClient();

// export enum ResponseStatus {
//   SUCCESS = "success",
//   ERROR = "error",
// }

// export type JSONValue =
//   | string
//   | number
//   | boolean
//   | { [x: string]: JSONValue }
//   | Array<JSONValue>;

// export const getAccount = async (req: Request) => {
//   if (!req.auth || !req.auth["https://example.com/email"]) {
//     throw new Error("Unexpected Auth0 error");
//   }

//   const email = req.auth["https://example.com/email"];

//   const account = await prisma.account.findUniqueOrThrow({
//     where: {
//       accountId: email,
//     },
//   });

//   if (account === null) {
//     throw new Error("Not a valid account");
//   }

//   if (!account.active) {
//     throw new Error("Account is not active");
//   }

//   return account;
// };

// const assertTimesheet = async () => {
//   const previousSunday = moment().startOf("week").format("YYYY-MM-DD");
//   const nextSunday = moment()
//     .startOf("week")
//     .add(7, "days")
//     .format("YYYY-MM-DD");

//   const timesheet = await prisma.timesheet.findUnique({
//     where: {
//       timesheetId: nextSunday,
//     },
//   });

//   if (timesheet === null) {
//     const previousTimesheet = await prisma.timesheet.findUnique({
//       where: {
//         timesheetId: previousSunday,
//       },
//       include: {
//         employees: true,
//         jobs: true,
//       },
//     });

//     if (previousTimesheet === null) {
//       await prisma.timesheet.create({
//         data: {
//           timesheetId: nextSunday,
//         },
//       });
//     } else {
//       const newTimesheet = await prisma.timesheet.create({
//         data: {
//           timesheetId: nextSunday,
//         },
//       });

//       // TODO: Use createMany
//       // Copy employees over from previous week
//       await Promise.all(
//         previousTimesheet.employees
//           .map(({ employeeId, ...rest }) => ({
//             ...rest,
//             timesheetId: newTimesheet.timesheetId,
//           }))
//           .map((employee) => prisma.employee.create({ data: employee }))
//       );

//       // Copy jobs over from previous week
//       await Promise.all(
//         previousTimesheet.jobs
//           .map(({ jobId, ...rest }) => ({
//             ...rest,
//             timesheetId: newTimesheet.timesheetId,
//           }))
//           .map((job) => prisma.job.create({ data: job }))
//       );

//       // Add days to new jobs
//       const jobs = await prisma.job.findMany({
//         where: {
//           timesheetId: newTimesheet.timesheetId,
//         },
//       });

//       const promises: Promise<Day>[] = [];

//       await Promise.all(
//         jobs.reduce(
//           (acc, job) =>
//             acc.concat(
//               ...Array.from(Array(7).keys()).map((dayIdInt) =>
//                 prisma.day.create({
//                   data: {
//                     timesheetId: newTimesheet.timesheetId,
//                     jobId: job.jobId,
//                     dayId: dayIdInt.toString(),
//                     editor: "",
//                     description: "",
//                   },
//                 })
//               )
//             ),
//           promises
//         )
//       );
//     }
//   }
// };

// export const successResponse = (data: JSONValue) => {
//   return {
//     status: ResponseStatus.SUCCESS,
//     data,
//   };
// };

// export const errorResponse = (title: string, message: string) => {
//   return {
//     status: ResponseStatus.ERROR,
//     data: {
//       title,
//       message,
//     },
//   };
// };

// export const apiWrapper = async (
//   req: Request<{
//     timesheetId: string;
//   }>,
//   res: Response,
//   next: NextFunction,
//   body: (args: { account: Account; timesheet: Timesheet }) => Promise<JSONValue>
// ) => {
//   try {
//     const account = await getAccount(req);

//     await assertTimesheet();

//     const { timesheetId } = req.params;

//     const timesheet = await prisma.timesheet.findUniqueOrThrow({
//       where: {
//         timesheetId,
//       },
//     });

//     const response = await body({ account, timesheet });

//     res.status(200).json(successResponse(response));
//   } catch (err) {
//     console.log(err);

//     if (err instanceof ValidationError) {
//       res.status(400).json(errorResponse("Validation Error", err.message));
//     } else {
//       res
//         .status(500)
//         .json(errorResponse("Server Error", "An unknown error has occured"));
//     }
//   }
// };
