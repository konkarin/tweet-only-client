import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const convertToRealtiveTime = (str: string) => {
  const date = dayjs(str);
  const oneWeekAgo = dayjs().subtract(7, "day");

  if (date.isBefore(oneWeekAgo)) {
    return date.format("MM/DD");
  } else {
    return dayjs().to(date);
  }
};
