function componentToHex(c: number) {
	var hex = c.toString(16);
	return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



export function rgbStringToHex(rgb: string) {
	let arr = rgb.split(" ")

	return rgbToHex(Number(arr[0]), Number(arr[1]), Number(arr[2]))
}

export function hexToRgb(hex: string) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
		  }
		: null;
}
