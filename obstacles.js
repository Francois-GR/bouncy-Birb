import { frameCounter, movingObs, player, playerPos} from "./main.js";



const MAX_HEIGHT = 40;
const MIN_HEIGHT = 10;
export let SPEED = 0.6

let rail = document.getElementById('topBorder');
let leftBorder = document.getElementById('leftBorder');
let obstacleCounter = 0;
let obstacleCollector = []
let score = 0;
let continueCreation;
let borderColor = ['green', 'red', 'yellow', 'purple', 'yellowgreen', 'aqua', 'beige','bisque', 'violet', 'blueviolet'];
let currentColor = 0;

export let gameOver = false;


export  function update(){   
    
    leftBorder.innerText = `Level: ${score} speed: ${SPEED+0.4}`
   

   
    //creation
    if(obstacleCounter<30){
        let obstacle = create(); 
        
        draw(obstacle)
        obstacleCollector.push(obstacle)
        obstacleCounter++         
    }
    continueCreation = !rail.hasChildNodes()

   

    
    
       //movement
       
       

        
        if(movingObs.length<1){
            movingObs.push(obstacleCollector[0])
        }
        
        let i=0;
        while(i<movingObs.length) {
            if(i>29){
                break;
            }
          slideElement(movingObs[i].top, movingObs[i].bottom)  
          i++;
        

        }

  
        let obsPos = Number(movingObs[i-1].top.style.right.replace('vmin',''));
      

        if(obsPos>=100){
           
            movingObs.push(obstacleCollector[i])

        }


    //reset
  
        
    if(continueCreation){
        
        obstacleCollector.length = 0;
        obstacleCounter = 0
        i=0
        movingObs.length=0
        score++
        
        SPEED = (SPEED>5)?5:SPEED+1;
        
       
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

async function draw(el){
    
    rail.appendChild(el.top)
    rail.appendChild(el.bottom);
    
}

function slideElement(topElement, bottomElement){

    checkDeath()

    if(topElement.offsetLeft < leftBorder.offsetLeft){
        topElement.remove();
        bottomElement.remove();
        continueCreation = !rail.hasChildNodes()
        return
         
         
        
    }
    let backgroundColor = 'blue'
  
   
    topElement.style.backgroundColor = backgroundColor
    let pos = topElement.style.right.replace('vmin',''); //top obstacle
    let right = parseFloat(pos);  
    topElement.style.right = `${right+SPEED}vmin`  
   
    
    bottomElement.style.backgroundColor = backgroundColor
    pos = bottomElement.style.right.replace('vmin','');
    right = parseFloat(pos);  
    bottomElement.style.right = `${right+SPEED}vmin`;  //bottom obstacle

}


function checkDeath(){

  
    let PlayeroffsetRight = Number(getComputedStyle(player).left.replace('px',''))+Number(getComputedStyle(player).width.replace('px',''))
    for(let i=0; i<movingObs.length; i++){
      if(movingObs[i]){

            let bottomObstacle = movingObs[i].bottom;
            let topObstacle = movingObs[i].top;

            let bottomHeight = bottomObstacle.style.height.replace('vmin','');
            let bottom = parseFloat(bottomHeight);

    


            if(!topObstacle){
                alert('nope')
            }
                
            if(!bottomObstacle){
                alert('nope')
            }
            
            if(playerPos<=bottom){
            
                let ObsleftBorderPos = Number(getComputedStyle(bottomObstacle).left.replace('px',''))
                if(!(ObsleftBorderPos<PlayeroffsetRight-Number(getComputedStyle(player).width.replace('px',''))) )          
                    if(ObsleftBorderPos<=PlayeroffsetRight ){
                        gameOver=true
                    }
            }
    }
       
}

    if(playerPos <= 0){
        gameOver = true
       
    }





}



