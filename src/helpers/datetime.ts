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

export function convertToUTC(date: Date | undefined) {
	if (date) {
		return new Date(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			date.getUTCHours(),
			date.getUTCMinutes(),
			date.getUTCSeconds(),
			date.getUTCMilliseconds()
		);
	}
	return undefined;
}

export function prettifyDate(date: Date) {
	const month_names = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	return `${month_names[date.getMonth()]} ${getLeadingZeroFormat(
		date.getDate()
	)} ${date.getFullYear()}`;
}

// https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
export function firstDayOfWeek(dateObject: Date, firstDayOfWeekIndex: number) {
	const dayOfWeek = dateObject.getDay(),
		firstDayOfWeek = new Date(dateObject),
		diff = dayOfWeek >= firstDayOfWeekIndex ? dayOfWeek - firstDayOfWeekIndex : 6 - dayOfWeek;

	firstDayOfWeek.setDate(dateObject.getDate() - diff);
	firstDayOfWeek.setHours(0, 0, 0, 0);

	return firstDayOfWeek;
}

export const formatTime = (time: number) => {
	let minutes = Math.floor(time / 60);
	let seconds = Math.floor(time - minutes * 60);

	let minute_str = '';
	let second_str = '';
	if (minutes < 10) {
		minute_str = `0${minutes}`;
	} else {
		minute_str = `${minutes}`;
	}

	if (seconds < 10) {
		second_str = `0${seconds}`;
	} else {
		second_str = `${seconds}`;
	}

	return `${minute_str}:${second_str}`;
};
