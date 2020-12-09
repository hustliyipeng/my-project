const copy = (src) => {
    const objType = ['object', 'function']
    if (objType.includes(typeof src)) {
        let dst = {}
        if (src === null || typeof src === 'function') {
            return src
        }
        for (var k in src) {

            console.log(src[k])
            dst[k] = copy(src[k])

        }
        console.log(dst)
        return dst
    } else {
        return src
    }
}

const src = {
    a: 1,
    b: undefined,
    c: [1,2,[3,4]],
    d: {
        e:4
    }
}
let dst=copy(src)
src.d.e=5
console.log('dst',dst)
