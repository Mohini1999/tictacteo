const x_cls ='x';
const o_cls = 'o';
let osTurn;
const winnerCombinationArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageFinal = document.getElementById('winning');
const winningMessage =  document.querySelector('#winner');
const reset = document.getElementById('restart');

startGame();

function startGame(){
    osTurn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(x_cls);
        cell.classList.remove(o_cls);
        cell.removeEventListener('click',handleClick,{once:false});
        cell.addEventListener('click',handleClick,{once:true})
    })
    winningMessageFinal.classList.remove('show');
}

reset.addEventListener('click',startGame);

function handleClick(e){
    const cell = e.target
    const currentclass = osTurn ? o_cls : x_cls ;
    placeMark(cell , currentclass); 
    if(checkWinner(currentclass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapMark();
    } 
}

//placemark
function placeMark(cell , currentclass){
    cell.classList.add(currentclass); 
}

//switch tures
function swapMark(){
    osTurn=!osTurn;
}

//check for win
function checkWinner(currentclass){
     return winnerCombinationArray.some(combinationArray => {
         return combinationArray.every(index =>{
             return cellElements[index].classList.contains(currentclass)
         })
     })
}

//winning message
function endGame(draw){
     if(draw){
        winningMessage.innerHTML = `Tie between Player...!`;
     }else{
        winningMessage.innerHTML = `${osTurn ? "O's" : "X's"}Wins..!`;
     }
     winningMessageFinal.classList.add('show');
}

//game draw message
function isDraw(){
    // console.log(cellElements)
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_cls) || cell.classList.contains(o_cls);
    })
}