//remote = flappy
import {update as updateObs, gameOver} from './obstacles.js'


export let playerPos = 60;
let newPos;
export let player = document.getElementById('character');
export let offsetRight = window.innerWidth - player.offsetLeft - player.offsetWidth
let topBorder = document.getElementById('topBorder');
let pressed = false;
export let frameCounter = 0
let gameStart = 0;
export let obsPerLevel = 5
const JUMP_HEIGHT = 12 ;
export let movingObs = []

const Gravity = 2;


document.getElementById('incObs').addEventListener('click',(e)=>{
    obsPerLevel++
  
  
})
    

function main(){

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

    document.getElementById('incObs').blur()

    if(pressed == true && newPos != playerPos){
        playerPos ++    
    }
    else{
        pressed = false
    }    
    player.style = `bottom: ${playerPos}vmin`;   

}


