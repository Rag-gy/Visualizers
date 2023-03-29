
var board = document.getElementById("board")
var cont = document.getElementsByClassName('container')[0]

var eles = []
var arr = []
var sim;

for(let i = 0; i<15; i++){
    let temp = []
    for(let j = 0; j < 20; j++){
        temp.push(-1)
    }
    arr.push(temp)
}

function reset(){
    Stop()
    eles = []
    arr = []
    var body = document.getElementsByTagName("BODY")[0]
    body.style.backgroundColor = '#ce4e4e';
    cont.style.backgroundColor = '#ce4e4ee2';
    board.innerHTML = ''
    for(let i = 0; i<15; i++){
        let temp = []
        let elem = []
        for(let j = 0; j < 20; j++){
            temp.push(-1)
            let ele = document.createElement("div")
            ele.classList.add('box')
            ele.style.width = '75px'
            ele.style.height = '70px'
            ele.onclick = setCells
            ele.row = i
            ele.col = j
            board.appendChild(ele)
            elem.push(ele)
        }
        arr.push(temp)
        eles.push(elem)
    }
}

function simulate(){
    var body = document.getElementsByTagName("BODY")[0]
    body.style.backgroundColor = '#63eb82';
    cont.style.backgroundColor = '#63eb82';
    sim = setInterval(Conways, 500)
}

function Stop(){
    var body = document.getElementsByTagName("BODY")[0]
    body.style.backgroundColor = '#f7f441';
    cont.style.backgroundColor = '#f7f441';
    clearInterval(sim)
}

for(let r = 0; r<15; r++){
    let temp = []
    let elem = []
    for(let c= 0; c<20; c++){
        let ele = document.createElement("div")
        ele.classList.add('box')
        ele.style.width = '75px'
        ele.style.height = '70px'
        ele.row = r
        ele.col = c
        ele.onclick = setCells
        elem.push(ele)
        temp.push(-1)
        board.appendChild(ele)
    }
    eles.push(elem)
    arr.push(temp)
}

// ele = arr[ind//15][ind%20]

function setCells(){
    console.log("hello")
    let i = this.row
    let j = this.col
    eles[i][j].classList.toggle('alive')
    arr[i][j] *= -1
}

function next(){
    var body = document.getElementsByTagName("BODY")[0]
    body.style.backgroundColor = '#6ca0d5e2';
    cont.style.backgroundColor = '#6ca0d5e2';
    cont
    Conways()
}

function CheckAlive(i, j){
    let temp = [i, j]
    let neighs = 0
        if(i-1 >= 0 && arr[i-1][j] == 1){
            neighs += 1
        }
        if(j-1 >= 0 && arr[i][j-1] == 1){
            neighs += 1
        }
        if(i+1<15 && arr[i+1][j] == 1){
            neighs += 1
        }
        if(j+1<20 && arr[i][j+1] == 1){
            neighs += 1
        }
        if(i+1<15 && j+1<20 && arr[i+1][j+1] == 1){
            neighs+=1
        }
        if(i-1>=0 && j+1<20 && arr[i-1][j+1] == 1){
            neighs+=1
        }
        if(i-1>=0 && j-1>=0 && arr[i-1][j-1] == 1){
            neighs+=1
        }
        if(i+1<15 && j-1>=0 && arr[i+1][j-1] == 1){
            neighs+=1
        }

    if(arr[i][j] == 1){
        if(neighs < 2){
            temp.push(-1)
        }
        else if(neighs > 3){
            temp.push(-1)
        }
    }
    else{
        if(neighs == 3){
            temp.push(1)
        }
    }
    return temp
}


function Conways(){
    let changes = []
    for(let i = 0; i<arr.length; i++){
        for(let j = 0; j<arr[i].length; j++){
            let x = CheckAlive(i, j)
            if(x.length == 3){
                changes.push(x)
            }
        }
    }
    while(changes.length > 0){
        let x = changes.pop()
        arr[x[0]][x[1]] = x[2];
    }

    // console.log(arr)

    board.innerHTML = ""
    eles = []

    for(let i = 0; i<15; i++){
        let temp = []
        for(let j = 0; j<20; j++){
            let ele = document.createElement('div')
            ele.classList.add('box')
            ele.style.width = '75px';
            ele.style.height = '70px'
            ele.onclick = setCells
            if(arr[i][j] == 1){
                ele.classList.add('alive')
            }
            temp.push(ele)
            // console.log(ele)
            board.appendChild(ele)
        }
        eles.push(temp)
    }
}