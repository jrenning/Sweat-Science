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

export function prettifyDate(date: Date) {

	const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]



	return `${month_names[date.getMonth()]} ${getLeadingZeroFormat(date.getDate())} ${date.getFullYear()}`
}
