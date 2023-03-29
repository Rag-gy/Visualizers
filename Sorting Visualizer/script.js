let container = document.getElementsByClassName('container')[0];
let title = document.getElementById('title');


function scramble(){
    let iters = 0
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const interval = setInterval(()=>{
        title.innerText = title.innerText.split("").map((letter, index) => {
            if(index < iters){
                return title.dataset.value[index]
            }
            return letters[Math.floor(Math.random()*52)]
        }
    ).join("")

    if(iters >= 18){
        clearInterval(interval)
    }

    iters+=1
    }, 30)
}

scramble()

var flag = false

var eles = []

let TIMEOUT = 75

let val = document.getElementById('val')

var arr = []

for(let i = 0; i<30; i++){
    let temp = (Math.random()*100)+20
    let ele = document.createElement('div')
    ele.classList.add('bar')
    ele.style.height = `${temp}mm`
    container.appendChild(ele)
    eles.push(ele)
    arr.push(temp)
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function change(ele1, ele2){
    ele1.classList.toggle('selected')
    ele2.classList.toggle('selected')
}

async function show(){
    flag = true
    await sleep(100)
    eles=[]
    arr = []
    container.innerHTML = ''
    let count = document.getElementById('input').value
    val.innerText = count
    for(let i = 0; i<count; i++){
        let temp = (Math.random()*100)+20
        let ele = document.createElement('div')
        ele.classList.add('bar')
        ele.style.height = `${temp}mm`
        container.appendChild(ele)
        eles.push(ele)
        arr.push(temp)
    }
}

async function bubbleSort(arr){
    var n = arr.length
    for(let i = 0; i<n; i++){
        if(flag == true){
            flag = false
            return
        }
        for(let j = 0; j<n-i-1; j++){
            if(flag == true){
                flag = false
                return
            }
            change(eles[j], eles[j+1])
            await sleep(TIMEOUT)
            if(arr[j] > arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
                temp = eles[j]
                eles[j] = eles[j+1]
                eles[j+1] = temp
                container.innerHTML = ''
                for(let k = 0; k<eles.length; k++){
                    container.appendChild(eles[k])
                }
            }
            change(eles[j], eles[j+1])
        }
        eles[n-i-1].classList.add('sorted')
    }
}


async function partition(arr, low, high){
    let pivotInd = low
    let pivot = arr[high]
    let pivotEle = eles[high]
    pivotEle.classList.add("pivot")
    for(let j=low; j<high; j++){
        let flag = 0
        change(eles[j], eles[pivotInd])
        if(arr[j]<=pivot){
            let temp = arr[j]
            arr[j] = arr[pivotInd]
            arr[pivotInd] = temp
            temp = eles[j]
            eles[j] = eles[pivotInd]
            eles[pivotInd] = temp
            pivotInd++
            flag = 1
        }
        await sleep(TIMEOUT)
        change(eles[j], eles[pivotInd-flag])
        container.innerHTML = ''
        for(let k = 0; k < eles.length; k++){
            container.appendChild(eles[k])
        }
    }
    let temp = arr[pivotInd]
    arr[pivotInd] = arr[high]
    arr[high] = temp
    temp = eles[high]
    eles[high] = eles[pivotInd]
    eles[pivotInd] = temp
    await sleep(TIMEOUT)
    pivotEle.classList.remove("pivot")
    container.innerHTML = ''
    for(let i = 0; i<eles.length; i++){
        container.appendChild(eles[i])
    }
    return pivotInd
}

async function quickSort(arr, low, high){
    if(low >= high) return
    let pi = await partition(arr, low, high)
    await quickSort(arr, low, pi-1)
    await quickSort(arr, pi+1, high)
}

async function selectionSort(){
    for(let i = 0; i<arr.length; i++){
        let currInd = i;
        eles[i].classList.add('pivot')
        for(let j = i+1; j < arr.length; j++){
            eles[j].classList.add('selected')
            await sleep(TIMEOUT)
            if(arr[currInd]>arr[j]){
                currInd = j
            }
            await sleep(TIMEOUT)
            container.innerHTML = ''
            for(let k = 0; k<eles.length; k++){
                container.appendChild(eles[k])
            }
            await sleep(TIMEOUT)
            eles[j].classList.remove('selected')
            await sleep(TIMEOUT)
        }
        let temp = arr[currInd]
        arr[currInd] = arr[i]
        arr[i] = temp
        eles[i].classList.remove('pivot')
        eles[currInd].classList.remove('selected')
        temp = eles[currInd]
        eles[currInd] = eles[i]
        eles[i] = temp
        eles[i].classList.add('sorted')
        await sleep(TIMEOUT)
        container.innerHTML = ''
        for(let k = 0; k<eles.length; k++){
            container.appendChild(eles[k])
        }
        await sleep(TIMEOUT)
    }
}

async function sort(){
    scramble()
    let choice = document.getElementById('method').value
    if(choice == "bubble"){
        await bubbleSort(arr)
    }
    else if(choice == "quick"){
        let count = document.getElementById('input').value
        await quickSort(arr, 0, count-1)
    }
    else if(choice == 'selection'){
        await selectionSort()
        console.log(arr)
    }
}