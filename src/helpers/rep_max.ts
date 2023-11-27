type OneRepFormulas = "Brzycki" | "Epley"| "Lander" | "Lombardi" | "Mayhew" | "O_Conner" | "Wathan"


export function calcOneRepMax(weight: number, reps: number, formula: OneRepFormulas = "Brzycki") {
    
    if (formula == "Brzycki")
        return Math.round(weight / (1.0278 - 0.0278*reps))
    if (formula == "Epley")
        return Math.round(weight * (1+0.0333 * reps))
    if (formula == "Lander")
        return Math.round((100 * weight) / (101.3 - 2.67123 * reps))
    if (formula == "Lombardi")
        return Math.round(weight * reps**0.1)
    if (formula == "Mayhew")
        return Math.round((100 * weight ) / (52.2 + (41.9 * Math.E**-0.055 * reps)))
    if (formula == "O_Conner")
        return Math.round(weight * (1 + 0.025 * reps))
    if (formula == "Wathan")
        return Math.round((100 * weight ) / (48.8 + (53.8 * Math.E**(-0.075*reps))))

}

export function calculateOneRepFromArray(weight: number[], reps: number[]) {
    let i = weight.indexOf(Math.max(...weight));

    return calcOneRepMax(weight[i], reps[i])
}