Function.prototype.bind2 = function (ctx) {
    var self = this
    var arg = Array.prototype.slice.call(arguments, 1)
    console.log('arg', arg);
    return function () {
        self.apply(ctx, arg)
    }
}
var o = { a: 2 }
const log = (arc) => {
    console.log('arc', arc);
}
log.bind2(o, o.a)()