type Scale = 'Year' | 'Quarter' | 'Month' | 'Last Performed';
export function getPercentChangeOverTime(
	data: number[],
	dates: Date[],
	time: Scale,
	target_date?: Date
) {
	let target = target_date ? new Date(target_date) : new Date();

	if (time == 'Year') {
		target.setFullYear(target.getFullYear() - 1);
	}
	if (time == 'Quarter') {
		target.setMonth(target.getMonth() - 3);
	}
	if (time == 'Month') {
		target.setMonth(target.getMonth() - 1);
	}

	// get date the closest to a year ago without going over
	let distances = dates.map((date) => {
		//@ts-ignore
		return target - date;
	});
	// remove dates that are too old
	let filtered_distances = distances.filter((d) => d < 0);
	// find closest
	let idx = distances.indexOf(Math.max(...filtered_distances));

	if (time == 'Last Performed') {
		idx = data.length - 2;
		if (target_date) {
			idx = dates.findIndex((d)=> d.getTime() == target_date.getTime())-1;
		}
	}

	let current = data.at(data.length - 1);
	let old = data.at(idx);
	if (current && old) {
		return Math.round(((current - old) / old) * 10000) / 100;
	} else {
		return 0;
	}
}

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

export function getDaysDiff(date1: Date, date2: Date) {
	const oneDayMs = 1000 * 60 * 60 * 24;

	let res = (date1.getTime() - date2.getTime()) / oneDayMs;
	return res < 0 ? -Math.ceil(-res) : Math.ceil(res);
}
