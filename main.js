//remote = flappy
import {update as updateObs, gameOver, SPEED} from './obstacles.js'


export let playerPos = 60;
let newPos;
export let player = document.getElementById('character');
export let offsetRight = window.innerWidth - player.offsetLeft - player.offsetWidth
let topBorder = document.getElementById('topBorder');
let pressed = false;
export let frameCounter = 0
let gameStart = 0;
const JUMP_HEIGHT = 7 ;
export let movingObs = []
const Gravity = 1.5
let lastRenderTime= 0




 function main(currentTime){

   if(!gameOver){
        window.requestAnimationFrame(main);
        frameCounter++
        update()
   }

}

window.addEventListener("keydown",() => {
        if(!gameStart && !gameOver){
            window.requestAnimationFrame(main)
            gameStart++
        }

        if(player.offsetTop > topBorder.offsetTop){
        newPos = playerPos + JUMP_HEIGHT ;            
        pressed = true;  
        }
        
       
})



 function update(){    
     updateObs();
    
    if(playerPos > 0) {
        if(pressed == false){
            if(frameCounter%3 == 0 )
            playerPos -= Gravity  
        }
    }

    if(pressed == true && newPos != playerPos){
        playerPos ++        
    }
    else{
        pressed = false
    }    
    player.style = `bottom: ${playerPos}vmin`;   

}


