function getJson() {
    return new Promise((reslove, reject) => {
        setTimeout(function () {
            console.log(2)
            reslove(2)
        }, 2000)
    })
}
// async function testAsync() {
//     await getJson()
//     console.log(3)
// }
function testAsync() {
    // await getJson()
    // console.log(3)
    getJson().then(() => {
        console.log(3)
    })
}

testAsync()
