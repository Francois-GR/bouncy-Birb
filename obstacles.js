import { player} from "./main.js";



const MAX_HEIGHT = 40;
const MIN_HEIGHT = 20;
let SPEED = 0.6

let rail = document.getElementById('topBorder');
let leftBorder = document.getElementById('leftBorder');
let obstacleCounter = 0;
let obstacleCollector = []
let score = 0;
let continueCreation;


export function update(){   
    
    leftBorder.innerText = `Score: ${score} speed: ${SPEED}`

    
    if(obstacleCounter<10 ){
        let obstacle = create(); 
        draw(obstacle)
        obstacleCollector.push(obstacle)
        obstacleCounter++         
    }

    
    for (let i = 0; i < obstacleCollector.length; i++) {
        slideElement(obstacleCollector[i].top, obstacleCollector[i].bottom);
         checkDeath(obstacleCollector[i])
    }
    


    continueCreation = !rail.hasChildNodes();
    if(continueCreation){
        obstacleCollector.length = 0;
        obstacleCounter = 0
        score++
        if(score%6 == 0 && SPEED<10){
            SPEED = (SPEED>10)?10:SPEED+1;
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
        obstacleCollector.shift();
    }

    topElement.style.backgroundColor = 'blue'
    let pos = topElement.style.right.replace('vmin',''); //top obstacle
    let right = parseFloat(pos);  
    topElement.style.right = `${right+SPEED}vmin`  
   
    bottomElement.style.backgroundColor = 'blue'
    pos = bottomElement.style.right.replace('vmin','');
    right = parseFloat(pos);  
    bottomElement.style.right = `${right+SPEED}vmin`;  //bottom obstacle

}


function checkDeath(element){


    if(element.bottom.offsetTop <= player.offsetTop - player.offsetHeight){

    
    if(element.top.offsetLeft == player.offsetLeft+ player.offsetWidth || element.bottom.offsetLeft == player.offsetLeft+ player.offsetWidth){
        alert('game over')
    }
}




}



