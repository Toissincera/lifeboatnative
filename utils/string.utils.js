export const toStringLine = (data = [], joiner = ", ") => {
  return data
    .filter((d) => {
      return d ? true : false;
    })
    .join(joiner);
};

export function isoDateToDDMMYYYY(isoDateString) {
  let isoDate = new Date(isoDateString);
  let year = isoDate.getFullYear();
  let month = isoDate.getMonth() + 1;
  let daate = isoDate.getDate();
  if (daate < 10) {
    daate = "0" + daate;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${daate}-${month}-${year}`;
}

export function isoDateToHHMM(isoDateString) {
  let isoDate = new Date(isoDateString);
  let hours = isoDate.getHours();
  let minutes = isoDate.getMinutes();
  let amPM = hours >= 12 ? "PM" : "AM";

  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes} ${amPM}`;
}

export function isoDateToFullFormat(isoDateString, useUTC = false) {
  const isoDate = new Date(isoDateString);

  const day = useUTC ? isoDate.getUTCDate() : isoDate.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = useUTC
    ? monthNames[isoDate.getUTCMonth()]
    : monthNames[isoDate.getMonth()];
  const year = useUTC ? isoDate.getUTCFullYear() : isoDate.getFullYear();

  let hours = useUTC ? isoDate.getUTCHours() : isoDate.getHours();
  const minutes = useUTC ? isoDate.getUTCMinutes() : isoDate.getMinutes();
  const amPM = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert to 12-hour format
  const paddedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${day} ${month}, ${year} ${hours}:${paddedMinutes} ${amPM}`;
}
