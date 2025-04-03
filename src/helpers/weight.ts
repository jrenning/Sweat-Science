export function roundtoNearestFive(weight: number) {
    let div = weight / 5

    return Math.ceil(div)*5
}

export function avg(weight: number[]) {
        let avg = 0;
        let length = weight.length;
    
        for (let i = 0; i < weight.length; i++) {
            if (weight[i]) {
                avg += weight[i]
            } else {
                // adjust for when i skip a set
                length -= 1;
            }
        }
    
        return avg / length;
}