const p =new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve(1)
    }, 1000);
})
const p2=p.then(value=>{
    console.log('p2',value)
})
console.log(p2)
const p3=p2.then(v=>{
    console.log('v',v)
})

const p4=p3.then()