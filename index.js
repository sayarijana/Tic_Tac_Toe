let currPlayerCon=document.querySelector(".curr_player");
let boxes=document.querySelectorAll(".box");
let btn=document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winPosition=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
startGame();
function startGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];

    //update in ui
    boxes.forEach((box,index)=>{
        box.innerHTML="";
        boxes[index].style.pointerEvents="all";
        //again initialize
        box.classList=`box line${index+1}`;
    });

    btn.classList.remove("active");
    currPlayerCon.innerHTML = `Current Player - ${currPlayer}`;
}

boxes.forEach((box, index)=>{
    box.addEventListener('click',()=>{
        haldleClick(index);
    })
});

function haldleClick(i){
    if(gameGrid[i]===""){
        boxes[i].innerHTML=currPlayer; //reflect in ui
        gameGrid[i]=currPlayer; //track access
        boxes[i].style.pointerEvents = "none"; //remove
        swapTurn();
        checkGameOver();
    }

}

function swapTurn(){
    if(currPlayer==="X"){
        currPlayer="0";
    }
    else{
        currPlayer="X";
    }
    currPlayerCon.innerHTML=`Current Player - ${currPlayer}`;
}

function checkGameOver(){
    let ans="";
    winPosition.forEach((position)=>{
        if((gameGrid[position[0]] !=="" && gameGrid[position[1]]!=="" &&
            gameGrid[position[2]]!=="") &&(gameGrid[position[0]]===gameGrid[position[1]])&&
            (gameGrid[position[1]]===gameGrid[position[2]])){

                if(gameGrid[position[0]]==="X"){
                    ans="X";
                }
                else{
                    ans="0";
                }

                //stop if winner found

                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                });

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    //visible winner class and return

    if(ans !==""){
        currPlayerCon.innerHTML=`Winner Player - ${ans}`;
        btn.classList.add("active");
        return;
    }

    //check game tie or not

    let fill=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fill++;
        }
    });
    if(fill === 9){
        btn.classList.add("active");
        currPlayerCon.innerHTML="Game Tied !"
    }
}

btn.addEventListener("click", startGame);