//remote = flappy
import {update as updateObs} from './obstacles.js'

let lastRenderTime = 0;

let playerPos = 60;
let newPos;
export let player = document.getElementById('character');
export let offsetRight = window.innerWidth - player.offsetLeft - player.offsetWidth
let topBorder = document.getElementById('topBorder');
let pressed = false;
let frameCounter = 0
let gameStart = 0;
const JUMP_HEIGHT = 10 ;
const Gravity = 1.5




function main(currentTime){
   // const delta = (currentTime - lastRenderTime)/1000;
    window.requestAnimationFrame(main);
    frameCounter++
   // if(delta < 1 ) return
    lastRenderTime = currentTime;
    update()
   

}

window.addEventListener("keydown",() => {
        if(!gameStart){
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


