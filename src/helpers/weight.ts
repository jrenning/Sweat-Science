export function roundtoNearestFive(weight: number) {
    let div = weight / 5

    return Math.ceil(div)*5
}