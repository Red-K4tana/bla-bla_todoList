import {fact, mathOperReducer, mult, salaryReducer, sub, sum} from "./tasks";

test('sum', ()=>{
    //1. Тестовые данные
    const a: number = 570
    const b: number = 330
    //2. Выполнение тестируемого кода
    const result = sum(a,b)
    //3. Проверка ожидаемого результата
    expect(result).toBe(900)
})
test('sub', ()=>{
    const a: number = 450
    const b: number = 122

    const result = sub(a,b)

    expect(result).toBe(328)
})

test('mult', ()=>{
    const a: number = 570
    const b: number = 12

    const result = mult(a,b)

    expect(result).toBe(6840)
})

test('salaryReducerSum', ()=>{
    expect(salaryReducer(570, {type: 'sum', payload: 330})).toBe(900)
})
test('salaryReducerSub', ()=>{
    expect(salaryReducer(450, {type: 'sub', payload: 122})).toBe(328)
})
test('salaryReducerMult', ()=> {
    expect(salaryReducer(570, {type: 'mult', payload: 12})).toBe(6840)
})

test('mathOperReducer', ()=>{
    expect(mathOperReducer(121, {type: 'sqrt'})).toBe(11)
})
test('mathOperReducer', ()=>{
    expect(mathOperReducer(5, {type: 'fact'})).toBe(120)
})
