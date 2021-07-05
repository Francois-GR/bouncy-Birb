let obstacleTracker = 0;
let rail = document.getElementById('topBorder');
const MAX_HEIGHT = 40;
const MIN_HEIGHT = 20;
const MAX_OBSTACLES = 6
let obstacleCounter = 0;
let obstacleCollector = []
const SPEED = 1
const SPACE_BETWEEEN_OBSTACLE = 500;

export async function update(){
   
    if(obstacleCounter<MAX_OBSTACLES){
        let obstacle = create(); 
        draw(obstacle)
        obstacleCollector.push(obstacle)
        obstacleCounter++    
        
    }
    
    for(let i = 0; i<obstacleCounter; i++){
        obstacleTracker = i
        slideElement(obstacleCollector)
        await sleep(SPACE_BETWEEEN_OBSTACLE)
        
    }
  

    

}
 
function create(){
    let height = Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT);
    let topObstacle = document.createElement('div');
    topObstacle.classList.add('Obstacle');
    topObstacle.style.right = '0vmin';
    topObstacle.style.height = `${height}vmin`;
     
    let bottomObstacle = document.createElement('div');
    bottomObstacle.classList.add('bottom');
    bottomObstacle.style.right = '0vmin';
    bottomObstacle.style.height =`${height}vmin`
    
    let Obstacles = [topObstacle, bottomObstacle]
    return Obstacles
}

function draw(el){
    rail.appendChild(el[0])
    rail.appendChild(el[1]);
}

function slideElement(el){

    let pos = el[obstacleTracker][0].style.right.replace('vmin','');
    let right = parseFloat(pos);  
    el[obstacleTracker][0].style.right = `${right+SPEED}vmin`  
   
    pos = el[obstacleTracker][1].style.right.replace('vmin','');
    right = parseFloat(pos);  
    el[obstacleTracker][1].style.right = `${right+SPEED}vmin`  
   

   
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
