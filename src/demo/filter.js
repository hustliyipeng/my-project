var arr=['12','32','89','12','12','78','12','32'];
const f1=arr=>{
    return Array.from(new Set(arr))
}
console.log(f1(arr))
const f2=arr=>{
    const tmp=[]
    arr.map(item=>{
        if(!tmp.includes(item)){
            tmp.push(item)
        }
    })
    return tmp
}
console.log(f2(arr))
const f3=arr=>{
    return arr.filter((item,index,array)=>{
        console.log(array.indexOf(item),array.lastIndexOf(item))
      return array.indexOf(item)===array.lastIndexOf(item)
    })
}
console.log(f3(arr))