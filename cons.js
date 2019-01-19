const L = {
    // Empty List
    EL: { h: () => null, t: () => null },

    // Is it Empty List?
    isEL: x => x === L.EL,

    // List constructor function,
    // also the underline representation of list
    // h(): head, t(): tail
    // Example:
    //   cons(1, () => EL) -> [1]
    //   cons(1, () => cons(2, () => EL)) -> [1, 2]
    cons: (v, f) => ({ h: () => v, t: f }),
    // Example:
    //   cons(1, EL) -> [1]
    //   cons(1, cons(2 ,EL)) -> [1, 2]
    //   -- make sure the second arg `tail` is existed allready, the E for existed
    consE: (v, tail) => ({ h: () => v, t: () => tail }),
    // uncons
    uncons: lst => [lst.h(), lst.t()],

    fromArray: arr => {
        let l = L.EL
        for (let i = arr.length - 1; i >= 0; i -= 1) {
            l = L.consE(arr[i], l)
        }
        return l
    },

    //  for Finite List, transfrom to array, the `takeNum` is optional
    //  for Infinite List, take first `takeNum` elements and transfrom to array
    //                     if `takeNum` is not a valid postive num or not 0,
    //                     the function will don't work
    toArray: (lst, takeNum) => {
        const arr = []
        let l = lst
        if (takeNum || takeNum === 0) {
            let c = takeNum
            while (!L.isEL(l) && c) {
                arr.push(l.h())
                l = l.t()
                c -= 1
            }
        } else {
            while (!L.isEL(l)) {
                arr.push(l.h())
                l = l.t()
            }
        }
        return arr
    },

    // numFrom: n => L.cons(n, () => L.numFrom(n + 1))
    numFrom: n => {
        return {
            h: () => n,
            t: () => L.numFrom(n + 1)
        }
    },

    len: lst => {
        let length = 0
        let l = lst
        while (!L.isEL(l)) {
            length += 1
            l = l.t()
        }
        return length
    },

    // take
    take: (n, lst) => {
        if (L.isEL(lst) || !n) {
            return L.EL
        }
        return {
            h: () => lst.h(),
            t: () => L.take(n - 1, lst.t())
        }
    },

    // drop
    drop: (n, lst) => {
        let l = lst
        let c = n
        while (!L.isEL(l) && c) {
            l = l.t()
            c -= 1
        }
        return l
    },

    map: (f, lst) => {
        if (L.isEL(lst)) {
            return L.EL
        }

        return {
            h: () => f(lst.h()),
            t: () => L.map(f, lst.t())
        }
    },

    filter: (p, lst) => {
        if (L.isEL(lst)) {
            return L.EL
        }

        const h = lst.h()
        if (p(h)) {
            return {
                h: () => h,
                t: () => L.filter(p, lst.t())
            }
        } else {
            return L.filter(p, lst.t())
        }
    },

    zip: (l1, l2) => {
        if (L.isEL(l1) || L.isEL(l2)) {
            return L.EL
        }

        return {
            h: () => [l1.h(), l2.h()],
            t: () => L.zip(l1.t(), l2.t())
        }
    },

    // const zipOp = op => l1 => l2 => {
    //     return {
    //         head: () => op(l1.head())(l2.head()),
    //         tail: () => zipOp(op)(l1.tail())(l2.tail())
    //     }
    // }
    zipOp: (op, l1, l2) => L.map(([x, y]) => op(x, y), L.zip(l1, l2)),
}

exports.L = L
