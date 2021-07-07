import { player, playerPos} from "./main.js";



const MAX_HEIGHT = 40;
const MIN_HEIGHT = 20;
let SPEED = 0.6

let rail = document.getElementById('topBorder');
let leftBorder = document.getElementById('leftBorder');
let obstacleCounter = 0;
let obstacleCollector = []
let score = 0;
let continueCreation;
let borderColor = ['green', 'red', 'yellow', 'purple', 'black', 'yellowgreen', 'aqua', 'beige','bisque', 'violet', 'blueviolet'];
let currentColor = 0;
export let gameOver = false;


export function update(){   
    
    leftBorder.innerText = `Score: ${score} speed: ${SPEED}`

    
    if(obstacleCounter<30 ){
        let obstacle = create(); 
        draw(obstacle)
        obstacleCollector.push(obstacle)
        obstacleCounter++         
    }

    
    for (let i = 0; i < obstacleCollector.length; i++) {
        checkDeath(obstacleCollector[i].top, obstacleCollector[i].bottom)
        slideElement(obstacleCollector[i].top, obstacleCollector[i].bottom);
       
    }
    


    continueCreation = !rail.hasChildNodes();
    if(continueCreation){
        obstacleCollector.length = 0;
        obstacleCounter = 0
        score++
        if(score%6 == 0){
            SPEED = (SPEED>5)?5:SPEED+1;
        }
        if(currentColor == borderColor.length-1){
            currentColor = 0;
        }
        else{
            currentColor++
        }
    }      
    
}
 
 function create(){
      
    let topHeight = Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT);
    let topObstacle = document.createElement('div');
    topObstacle.classList.add('Obstacle');
    topObstacle.style.right = '0vmin';
    topObstacle.style.height = `${topHeight}vmin`;
     
    let bottomHeight = Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT);
    let bottomObstacle = document.createElement('div');
    bottomObstacle.classList.add('bottom');
    bottomObstacle.style.right = '0vmin';
    bottomObstacle.style.height =`${bottomHeight}vmin`
    
    let Obstacles = {'top':topObstacle, 'bottom' : bottomObstacle}
    

  
    return Obstacles
}

function draw(el){
    rail.appendChild(el.top)
    rail.appendChild(el.bottom);
}

function slideElement(topElement, bottomElement){

    if(topElement.offsetLeft < leftBorder.offsetLeft){
        topElement.remove();
        bottomElement.remove();
      //  obstacleCollector.shift();
    }
    let backgroundColor = 'black'
    let color = borderColor[currentColor]
    topElement.style.borderLeftColor = color
   
    topElement.style.backgroundColor = backgroundColor
    let pos = topElement.style.right.replace('vmin',''); //top obstacle
    let right = parseFloat(pos);  
    topElement.style.right = `${right+SPEED}vmin`  
   
    bottomElement.style.borderLeftColor = color
    //bottomElement.style.borderTopColor =  color
    bottomElement.style.backgroundColor = backgroundColor
    pos = bottomElement.style.right.replace('vmin','');
    right = parseFloat(pos);  
    bottomElement.style.right = `${right+SPEED}vmin`;  //bottom obstacle

}


function checkDeath(topObstacle, bottomObstacle){

  
    let offsetRight = player.offsetLeft + player.offsetWidth; //get right side border of player

    let bottomHeight = bottomObstacle.style.height.replace('vmin','');
    let bottom = parseFloat(bottomHeight);

   let topHeight = topObstacle.getBoundingClientRect().bottom; // determine obstacle position reletive to player postion
   let playerTopBox =  player.getBoundingClientRect().top       // in y axis


  
    if(playerPos <= bottom  || playerTopBox >= topHeight){ 

        if(topObstacle.offsetLeft ==  offsetRight || bottomObstacle.offsetLeft == offsetRight){
            gameOver = true
        }
    }   

    if(playerPos <= 0){
        gameOver = true
       
    }




}



