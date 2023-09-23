export function getLeadingZeroFormat(month_or_day: number) {
	if (month_or_day < 10) {
		return `0${month_or_day}`;
	} else {
		return month_or_day;
	}
}

export function getDateInputFormatString(date: Date) {
	return `${date.getFullYear()}-${getLeadingZeroFormat(date.getMonth() + 1)}-${getLeadingZeroFormat(
		date.getDate()
	)}`;
}
