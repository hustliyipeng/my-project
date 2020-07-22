class Parent {
    constructor(name) {
        this.name = name
    }
    print() {
        console.log(this.name);
    }
}
var a = new Parent('a')
// console.log('a', Array);
var b = new Object()

var generator = function* () {

    yield console.log('111');
    yield console.log('222');
    yield console.log('333');
    yield console.log('444');
}
console.log(generator())
generator().next()
generator().next()
generator().next()