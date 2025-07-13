let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;
let count=0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    } 
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box was clicked");
        if(turnO){         //player O
            box.innerText="O";
            box.style="color:#ff0fff";
            turnO=false;
        }else{              //player X
            box.innerText="X";
            box.style="color:red";
            turnO=true;
        }
        box.disabled=true;
        count++;


        let iswinner=checkWinner();
        if(count==9 && !iswinner){
            display();
        }
    })
})
const display=()=>{
    msg.innerText="It was a draw";
    msgContainer.classList.remove("hide");
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations,winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

}

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        
        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false
   
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);