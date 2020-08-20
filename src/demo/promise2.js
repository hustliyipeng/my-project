var p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve(1)
    }, 1000);
}).then((data) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log(data)
            resolve(2)
        }, 2000);
    })
}).then((data) => {
    console.log('data', data + 1);
})