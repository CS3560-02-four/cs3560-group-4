export function formatDatetime(datetimeString: string) {
    interface Util {
        [key: number]: string;
    }

    //utils for formatting
    const days: Util = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };
    const months: Util = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    }

    const date = new Date(datetimeString);
    const dayNumber: number = date.getDay();
    const dayName: string = days[dayNumber];
    const monthNumber: number = date.getMonth();
    const monthName: string = months[monthNumber];

    return `${dayName}, ${monthName} ${date.getDate()} ${date.getFullYear()}`;
}