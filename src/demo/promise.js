const { validRange } = require("semver")

const PENDING = 'pending'
const RESOLVE = 'resolve'
const REJECTED = 'rejected'
class promise2 {
    constructor(exec) {
        this.status = PENDING
        this.value = undefined
        this.resolveQueue = []
        this.rejectQueue = []
        const resolve = (data) => {
            console.log('resolve', data);
            this.changeStatus(data, RESOLVE, this.resolveQueue)
        }
        const reject = (data) => {
            this.changeStatus(data, REJECTED, this.rejectQueue)

        }
        exec(resolve, reject)
    }
    changeStatus(data, status, queue) {
        if (this.status !== PENDING) return
        this.status = status
        this.value = data
        queue.forEach(element => element(data));
    }
    then(resolveCb, rejectCb) {
        return new promise2((resoleve, reject) => {
            const fullfill = () => {
                var res = resolveCb(this.value)
                console.log('res', res);
                resoleve(res)
            }
            this.resolveQueue.push(fullfill)
        })
    }
    // [linkPromise](thenable, catchable) {
    //     /**
    //      * 返回一个新的Promise的状态处理,如果父级已经变为已决状态, 那么新的Promise也是已决状态
    //      * @param {*} data 
    //      * @param {*} handler 
    //      * @param {*} resolve 
    //      * @param {*} reject 
    //      */
    //     function exec(data, handler, resolve, reject) {
    //         try {
    //             //获取返回值
    //             const res = handler(data)
    //             //如果返回的是一个Promise,此时我们直接处理一下就可以
    //             if (res instanceof MyPromise) {
    //                 res.then(data => resolve(data), err => reject(err))
    //             } else {
    //                 //改变状态,和修改值
    //                 resolve(res)
    //             }
    //         } catch (error) {
    //             reject(error)
    //         }
    //     }
    //     //返回新的Promise
    //     return new MyPromise((resolve, reject) => {
    //         //处理then的
    //         this[settledHandler](data => {
    //             //如果传过来的thenable不是函数,那么直接resolve下并结束
    //             if (typeof thenable !== "function") {
    //                 resolve(data)
    //                 return
    //             }
    //             //我们把操作相同的提取封装一下
    //             exec(data, thenable, resolve, reject)
    //         }, RESOLVED, this[thenables])
    //         //处理catch的
    //         this[settledHandler](data => {
    //             //如果传过来的thenable不是函数,那么直接reject下并结束
    //             if (typeof catchable !== "function") {
    //                 reject(data)
    //                 return
    //             }
    //             //我们把操作相同的提取封装一下
    //             exec(data, catchable, resolve, reject)
    //         }, REJECTED, this[catchables])
    //     })
    // }


    // // 添加then方法
    // then(onFulfilled, onRejected) {
    //     const { _value, _status } = this
    //     // 返回一个新的Promise对象
    //     return new MyPromise((onFulfilledNext, onRejectedNext) => {
    //         // 封装一个成功时执行的函数
    //         let fulfilled = value => {
    //             try {
    //                 if (!isFunction(onFulfilled)) {
    //                     onFulfilledNext(value)
    //                 } else {
    //                     let res = onFulfilled(value);
    //                     if (res instanceof MyPromise) {
    //                         // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
    //                         res.then(onFulfilledNext, onRejectedNext)
    //                     } else {
    //                         //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
    //                         onFulfilledNext(res)
    //                     }
    //                 }
    //             } catch (err) {
    //                 // 如果函数执行出错，新的Promise对象的状态为失败
    //                 onRejectedNext(err)
    //             }
    //         }
    //         // 封装一个失败时执行的函数
    //         let rejected = error => {
    //             try {
    //                 if (!isFunction(onRejected)) {
    //                     onRejectedNext(error)
    //                 } else {
    //                     let res = onRejected(error);
    //                     if (res instanceof MyPromise) {
    //                         // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
    //                         res.then(onFulfilledNext, onRejectedNext)
    //                     } else {
    //                         //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
    //                         onFulfilledNext(res)
    //                     }
    //                 }
    //             } catch (err) {
    //                 // 如果函数执行出错，新的Promise对象的状态为失败
    //                 onRejectedNext(err)
    //             }
    //         }
    //         switch (_status) {
    //             // 当状态为pending时，将then方法回调函数加入执行队列等待执行
    //             case PENDING:
    //                 this._fulfilledQueues.push(fulfilled)
    //                 this._rejectedQueues.push(rejected)
    //                 break
    //             // 当状态已经改变时，立即执行对应的回调函数
    //             case FULFILLED:
    //                 fulfilled(_value)
    //                 break
    //             case REJECTED:
    //                 rejected(_value)
    //                 break
    //         }
    //     })
    // }

}
const exec = (resolve, reject) => {
    setTimeout(() => {
        resolve(22)
    }, 100);
}
const p = new promise2(exec)
p.then((data) => {
    setTimeout(() => {
        console.log('then1', data);
        return data
    }, 3000);
}).then((data) => {
    console.log('then2', data);
    return data
}).then((data) => {
    console.log('then3', data);
})
