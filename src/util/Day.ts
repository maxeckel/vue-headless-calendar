import { format, isSameMonth, isToday } from "date-fns";

class Day {
    private date: Date|null = null;
    private isToday: boolean = false;
    private isSelected: boolean = false;
    private inCurrentMonth: boolean = false;
    private format: string;

  constructor(date: Date|null, format: string) {
    this.date = date;
    this.isSelected = false;
    this.isToday = date ? isToday(date) : false;
    this.format = format;
  }

  setSelected(isSelected: boolean) {
    this.isSelected = isSelected;

    return this;
  }

  setIsToday(isToday: boolean) {
    this.isToday = isToday;

    return this;
  }

  setIsInCurrentMonth(isInCurrentMonth: boolean) {
      this.inCurrentMonth = isInCurrentMonth;

      return this;
  }

  getFormatted() {
    if (this.date === null) {
      return "";
    }

    return format(this.date, this.format);
  }

  setFormat(format: string) {
    this.format = format;

    return this;
  }
}

export { Day }
