import {
    getMonth,
    getYear,
    getISODay,
    format,
    setDate,
    lastDayOfMonth,
    eachDayOfInterval,
    subDays,
    addDays,
    isSameMonth
  } from "date-fns";
  import { Day } from "./Day";
  
  class Calendar {
    private currentMonth: number = -1;
    private currentYear: number = -1;
    private dayFormat: string = 'dd';
    private startOfWeek: number = 0;

    constructor(currentDate: Date, dayFormat: string, startOfWeek: number) {
      this.currentMonth = getMonth(currentDate);
      this.currentYear = getYear(currentDate);
      this.dayFormat = dayFormat;
      this.startOfWeek = startOfWeek;
    }
  
    get currentMonthFormatted() {
      return format(this.dateForCurrentMonth, "MMMM");
    }
  
    get currentYearFormatted() {
      return format(this.dateForCurrentMonth, "yyyy");
    }
  
    get dateForCurrentMonth() {
      let currentDate = new Date();
  
      currentDate.setMonth(this.currentMonth);
  
      return currentDate;
    }
  
    nextMonth() {
      this.currentMonth += 1;
  
      return this;
    }
  
    prevMonth() {
      this.currentMonth -= 1;
  
      return this;
    }
  
    getPaddedDays(dayNumber: number): Array<null> {
      return Array(dayNumber - this.startOfWeek).fill(null);
    }
  
    get dates(): Day[] {
      let currentDate = this.dateForCurrentMonth;
  
      const firstOfMonth = setDate(currentDate, 1);

      const firstDayInCalendar = subDays(
        firstOfMonth,
        getISODay(firstOfMonth) - this.startOfWeek
      );

      const lastOfMonth = lastDayOfMonth(currentDate);

      const lastDayInCalendar = addDays(lastOfMonth, 7 - lastOfMonth.getDay());
  
      return eachDayOfInterval({
        start: firstDayInCalendar,
        end: lastDayInCalendar
      }).map((day) => {
            let dayObj = new Day(day, this.dayFormat);
            
            dayObj.setIsInCurrentMonth(isSameMonth(this.dateForCurrentMonth, day));

            return dayObj;
        });
    }
  }
  
  export { Calendar };
  