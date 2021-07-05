let obstacleTracker = 0;
let rail = document.getElementById('topBorder');
const MAX_OBSTACLES = 6
let obstacleCounter = 0;
let obstacleCollector = []
const SPEED = 0.5
export async function update(){
    let obstacle = create();  
    if(obstacleCounter<MAX_OBSTACLES){
        draw(obstacle)
        obstacleCollector.push(obstacle)
        obstacleCounter++ 
       
        
    }
    
    for(let i = 0; i<obstacleCounter; i++){
        obstacleTracker = i
        slideElement(obstacleCollector)
        await sleep(1000)
    }
  

    

}
 
function create(){
    let obstacle = document.createElement('div');
    obstacle.classList.add('Obstacle');
    obstacle.style.right = '0vmin'
    return obstacle
}

function draw(el){
    rail.appendChild(el)
}

function slideElement(el){

    let pos = el[obstacleTracker].style.right.replace('vmin','');
    let right = parseFloat(pos);  
    el[obstacleTracker].style.right = `${right+SPEED}vmin`  
   
   

   
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
