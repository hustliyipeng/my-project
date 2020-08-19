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
        if (status !== PENDING) return
        this.value = data
        queue.forEach(element => element());
    }
    then(resolveCb, rejectCb) {
        this.resolveQueue.push(resolveCb)
        this.rejectQueue.push(rejectCb)
    }
}
const exec = (resolve, reject) => {
    setTimeout(() => {
        resolve(22)
    }, 2000);
}
const p = new promise2(exec)
p.then((data) => {
    console.log('data', data);
})