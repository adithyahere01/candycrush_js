const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const width = 8;
const squares = [];
let score = 0;

const candyColors= [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)',
    'url(images/orange-candy.png)',
]

//create board
function createBoard(){
    for(let i=0; i < width*width; i++){
        const square = document.createElement('div')
        let random = Math.floor(Math.random() * candyColors.length)
        square.style.background = candyColors[random];
        grid.appendChild(square)
        squares.push(square)

        //make box draggable
        square.setAttribute('draggable', true)
        //setting index as id
        square.setAttribute('id', i)
    }
}
createBoard();



//Drag Events
squares.forEach( square => square.addEventListener('dragstart', dragStart))
squares.forEach( square => square.addEventListener('dragend', dragEnd))
squares.forEach( square => square.addEventListener('dragover', dragOver))
squares.forEach( square => square.addEventListener('dragenter', dragEnter))
squares.forEach( square => square.addEventListener('drop', dragDrop))
squares.forEach( square => square.addEventListener('dragleave', dragLeave))

let colorDragged
let colorReplaced
let squareIdDragged
let squareIdReplaced

function dragStart(){
    colorDragged = this.style.background
    squareIdDragged = parseInt(this.id) //covert dataset string to integer  
}

function dragOver(e){
    e.preventDefault()//*******************important
}

function dragEnter(e){
    e.preventDefault()
}

function dragDrop(){
    colorReplaced = this.style.background
    squareIdReplaced = parseInt(this.id)

    squares[squareIdDragged].style.background = colorReplaced
    this.style.background = colorDragged
}

function dragLeave(){}

function dragEnd(){
    let validMoves = [
        squareIdDragged - 1, //moving left
        squareIdDragged - width, //moving up
        squareIdDragged + 1, //moving right
        squareIdDragged + width //moving down
    ]

    let validMove = validMoves.includes(squareIdReplaced)

    if(squareIdReplaced && validMove){
        squareIdReplaced = null
    }else if(squareIdReplaced && !validMove){
        squares[squareIdReplaced].style.background = colorReplaced
        squares[squareIdDragged].style.background = colorDragged
    }else{
        squares[squareIdDragged].style.background = colorDragged
    }
}


//finding matches

function checkRowForThree(){
    for (let i = 0; i < 61; i++){
        let row = [i, i+1, i+2]
        let decidedColor = squares[i].style.background

        //if bg is empty
        const isBlank = squares[i].style.background === ""

        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if(notValid.includes(i)) continue

        if(row.every(index => squares[index].style.background === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = score
            row.forEach(index => {
               squares[index].style.background = ""
            })
        }
    }
}
checkRowForThree();

function checkColumnForThree(){
    for (let i = 0; i < 47; i++){
        let column = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.background

        //if bg is empty
        const isBlank = squares[i].style.background === ""


        if(column.every(index => squares[index].style.background === decidedColor && !isBlank)){
            score += 3
            scoreDisplay.innerHTML = score
            column.forEach(index => {
               squares[index].style.background = ""
            })
        }
    }
}
checkColumnForThree();

function checkRowForFour(){
    for (let i = 0; i < 60; i++){
        let row = [i, i+1, i+2, i+3]
        let decidedColor = squares[i].style.background

        //if bg is empty
        const isBlank = squares[i].style.background === ""

        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if(notValid.includes(i)) continue

        if(row.every(index => squares[index].style.background === decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML = score
            row.forEach(index => {
               squares[index].style.background = ""
            })
        }
    }
}
checkRowForFour();

function checkColumnForFour(){
    for (let i = 0; i < 47; i++){
        let columnOfFour = [i, i+width, i+width*2, i+width*3]
        let decidedColor = squares[i].style.background

        //if bg is empty
        const isBlank = squares[i].style.background === ""


        if(columnOfFour.every(index => squares[index].style.background === decidedColor && !isBlank)){
            score += 4
            scoreDisplay.innerHTML = score
            columnOfFour.forEach(index => {
               squares[index].style.background = ""
            })
        }
    }
}
checkColumnForFour();

//drop new candies
function moveDown(){
    for(i=0; i<55; i++){
        if(squares[i + width].style.background === ""){
            squares[i + width].style.background = squares[i].style.background
            squares[i].style.background = ""

            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)

            if(isFirstRow && squares[i].style.background === ""){
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.background = candyColors[randomColor]
            }
        }
    }
}

window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
}, 100)
