const { L } = require('./cons.js')

// ======================================================================
// TEST Helpers
const printTest = (f, label) => {
    console.log("✪ " + label + ': ')
    console.log(f.toString().replace('() => ', ''))
    console.log('=>  ', f())
}

const printTestList = (f, label) => {
    console.log("✪ " + label + ': ')
    console.log(f.toString().replace('() => ', ''))
    console.log('toArray =>', L.toArray(f()))
}

String.prototype.PadLeft = function (len, charStr) {
    var s = this + ''
    return new Array(len - s.length + 1).join(charStr,  '') + s
}
String.prototype.PadRight = function (len, charStr) {
    var s = this + ''
    return s + new Array(len - s.length + 1).join(charStr,  '')
}

const printList = (lst, takeNum, rowWidth, numWidth, label) => {
    const pad = num => num.toString().PadLeft(numWidth, ' ')
    const arr = L.toArray(L.take(takeNum, lst))
    let rowStr = ""
    console.log("✪ " + label + ': ')
    for (let i = 1; i <= arr.length; ++i) {
        rowStr += pad(arr[i - 1])
        if (i % rowWidth === 0) {
            console.log(rowStr)
            rowStr = ""
        }
    }
    console.log(rowStr)
}

// printTest(() => [1,2,3])
// printTest(() => L.toArray(L.take(10, L.filter(n => n % 2 === 1, lstFromOne))), 'NotTowsTakeTen')

// ======================================================================
// TEST
const numAdd = (x, y) => x + y


printTest(() => L.isEL(L.EL), 'isEL True')
printTest(() => L.isEL('Not Empty List'), 'isEL False')

const lst1To10Arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
printTest(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'lst1To10Arr')

const lst1To10Fn = () => L.fromArray(lst1To10Arr)
const lst1To10 = lst1To10Fn()
printTestList(lst1To10Fn, 'lst1To10')

printTest(() => L.toArray(L.fromArray(lst1To10Arr)), 'list10To10ArrRecur')

printTestList(() => L.take(5, lst1To10), 'lst1To10Take5')
printTestList(() => L.drop(5, lst1To10), 'lst1To10Drop5')

const lstFromOne = L.numFrom(1)
printTestList(() => L.take(10, L.numFrom(1)), 'lstFromOneTakeTen')
// const lstZipTakeTen = L.toArray(L.take(10, L.zip(lstFromOne, L.drop(2, lstFromOne))))
printTestList(() => L.take(5, L.zip(lstFromOne, L.drop(2, lstFromOne))), 'lstZipTakeFive')


printTestList(() => {
    // const fabonacci = L.cons(0, {
    //     h: () => 1,
    //     t: () => L.zipOp(numAdd, fabonacci, L.drop(1, fabonacci))
    // })
    const fabonacci = L.consE(
        0,
        L.cons(
            1,
            () => L.zipOp(numAdd, fabonacci, L.drop(1, fabonacci))))
    return L.take(10, fabonacci)
}, 'fabonacciTakeTen')

printTestList(() => L.take(10, L.filter(n => n % 2 === 1, lstFromOne)), 'notTowsTakeTen')


printTestList(() => {
    // 质数
    // 从 N2 过滤掉所有 N2 的多倍数
    // const N = lstFromOne // 正整数
    // const N2 = (drop 1 N) // 大于2的正整数
    //
    const primes = (N => {
        const n = num => nn => num === nn || nn % num !== 0 // not MULTIPLE times of `num`
        let N2 = L.drop(1, N)

        const ps = init => ({
            h: () => init.h(),
            t: () => L.filter(n(init.h()), ps(init.t()))
        })

        return ps(N2)
    })(lstFromOne)
    return L.take(10, primes)
}, 'primesTakeTen')

// 质数
// 从 N2 过滤掉所有 N2 的多倍数
// const N = lstFromOne // 正整数
// const N2 = (drop 1 N) 大于2的正整数
//
const primes = (N => {
    const n = num => nn => num === nn || nn % num !== 0 // not MULTIPLE times of `num`
    let N2 = L.drop(1, N)

    const ps = init => ({
        h: () => init.h(),
        t: () => L.filter(n(init.h()), ps(init.t()))
    })

    // return L.filter(n(3), L.filter(n(2), N2))
    return ps(N2)
})(lstFromOne)
printList(primes, 168, 8, 5, "PrimesTake168, or less than 1000")

console.log('END')
