import { DateTime } from "luxon"

const formatDate = (dateString, format = "") => {
  const date = DateTime.fromISO(dateString)
  if (format) {
    return date.toFormat(format)
  }
}

export default formatDate