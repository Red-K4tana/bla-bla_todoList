
export const sum = (state: number, num: number) => {
    return state + num
}

export const sub = (state: number, num: number) => {
    return state - num
}

export const mult = (state: number, num: number) => {
    return state * num
}
//-----------------------------------------------------------------------------------------------------
//1. Что на старте // 570
//2. Тип действия // 'sum'
//3. Доп. значения // 330

export type ActionType = {
    type: 'sum' | 'sub' | 'mult'
    payload: number
}

export const salaryReducer = (state: number, action: ActionType): number => {
    switch (action.type){
        case "sum":
            return state + action.payload
        case "mult":
            return state * action.payload
        case 'sub':
            return state - action.payload
        default:
            return state
    }
}
//=======================================================================================================
export const fact = (num: number) => {
    let result = 1;
    for (let i=1; i<=num; i++) {
        result*=i
    }
    return result
}
export const sqrt = (num: number) => {
    return Math.sqrt(num)
}

export type MathActionType = {
    type: 'sqrt' | 'fact'
}
export const mathOperReducer = (state: number, action: MathActionType)=> {
    switch (action.type) {
        case 'sqrt':
            return Math.sqrt(state)
        case 'fact':
            return fact(state)
        default:
            return state
    }
}