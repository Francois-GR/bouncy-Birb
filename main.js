let lastRenderTime = 0;
let playerPos = 60;
const SCREEN_TOP = window.screenTop;//in px
let newPos;
let player = document.getElementById('character');
let pressed = false;
let frameCounter = 0


function main(currentTime){
   // const delta = (currentTime - lastRenderTime)/1000;
    window.requestAnimationFrame(main);
    frameCounter++
   // if(delta < 1 ) return
    lastRenderTime = currentTime;
    update()
}

window.addEventListener("keydown",() => {
        newPos = playerPos + 16             
        pressed = true;   
})

window.requestAnimationFrame(main)

function update(){    
    if(playerPos > 0) {
        if(pressed == false){
            if(frameCounter%3 == 0 )
            playerPos -= 1.5 
        }
    }

    if(pressed == true && newPos != playerPos){
        playerPos += 2        
    }
    else{
        pressed = false
    }    
    player.style = `bottom: ${playerPos}vmin`;   

}


