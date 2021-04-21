import IDateProvider from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default class DayJsProvider implements IDateProvider {
   dateNow(): Date {
      return dayjs().toDate();
   }

   compareInHours(start_date: Date, end_date: Date): number {
      const start_date_utc = this.convertToUtc(start_date);
      const end_date_utc = this.convertToUtc(end_date);
      return dayjs(end_date_utc).diff(start_date_utc, "hours");
   }

   convertToUtc(date: Date): string {
      return dayjs(date).utc().local().format();
   }
}
