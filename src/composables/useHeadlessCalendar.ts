import { Calendar } from "../util/Calendar";

export function useHeadlessCalendar(startOfWeek: number, dayFormat: string) {
    const calendar = new Calendar(new Date(), dayFormat, startOfWeek);
}