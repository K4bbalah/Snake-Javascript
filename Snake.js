const canvas = document.getElementById("snake"); 
const context = canvas.getContext("2d");
var size = 30;
var score=0;
var fim=false;
var jogo=0;
var direc = 'direita';
var snake = []; // cria a cabeça da cobrinha
snake[0] = {

    x: Math.floor(Math.random() * 750) ,
    y: Math.floor(Math.random() * 550)
};
// cria a maçã.
var food = {
    fx: Math.floor(Math.random() * 750) ,
    fy: Math.floor(Math.random() * 550)
}

function LimparTela() {
    context.clearRect(0,0,canvas.width,canvas.height); //limpa  a tela
}
// a estrutura da cobrinha
class cobra{
    constructor(){
    for (let tail = 0; tail < snake.length; ++tail) {
        context.fillStyle = "green";
        context.fillRect(snake[tail].x, snake[tail].y, size, size);
        context.strokeStyle='cyan';
        context.strokeRect(snake[tail].x, snake[tail].y, size, size);
        context.lineWidth=4;
        
    }}
}
//comida
class apple {
    constructor(){
    context.fillStyle = "red";
    context.fillRect(food.fx, food.fy, size, size);
    context.strokeStyle='#e200ff';
    context.strokeRect(food.fx, food.fy, size, size);
    context.lineWidth=4;
    }
}



// o placar do jogo

function placar(){
    context.font='25px serif';
    context.fillStyle='yellow';
    context.fillText('score: '+score,680,30);
    
}
// mensagem do fim de jogo

function fim_jogo(){
    if(fim==true){
    context.font='80px serif';
    context.fillStyle='white';
    context.fillText('Fim de Jogo :(',180,300);
    context.fill();}
}


function checkhitwall(){
    // checa o hit da parede
    if (snake[0].x > canvas.width){
        snake[0].x = 0;}
    if (snake[0].x < -size){
        snake[0].x = canvas.width;}
    if (snake[0].y > canvas.height){
         snake[0].y = 0;}
    if (snake[0].y < -size){
         snake[0].y = canvas.height;}

}
function checkhitcauda(){
    //checa o hit da cauda
    for (let i = 1; i < snake.length; ++i) {
        if (snake[0].x+size > snake[i].x &&
            snake[0].y+size > snake[i].y&&
            snake[i].y+size>snake[0].y&&
            snake[i].x+size>snake[0].x) {
                let colisao=new Audio('resource/Explosion.mp3');
                colisao.play();
                fim=true;
                clearInterval(jogo);
                snake.shift();
    
            }
            
        }

}

function Inicio() {
   
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direc == 'cima') {
        snakeY -= size;}
    if (direc == 'baixo') {
        snakeY += size;}
    if( direc == 'direita'){ 
        snakeX += size;}
    if (direc == 'esquerda'){ 
        snakeX -= size;}

        // colisão com a comida 
    if (snakeX+size>food.fx&&
         food.fy+size>snakeY&&
         snakeY+size>food.fy&&
         food.fx+size>snakeX) {
            let ifood=new Audio('resource/food.mp3');
            ifood.play();
            score++;
            food.fx = Math.floor(Math.random() *750);
            food.fy = Math.floor(Math.random() *550);}
    else {
        snake.pop();//remove a cauda da tela,caso coma uma maçã adiciona uma cauda
    }
   
    let newHead = {
         x: snakeX,
         y: snakeY,
        };
    snake.unshift(newHead); // adiciona o primeiro quadrado da cobrinha
}
//atualização da pagina
function update(){
    Inicio();
    LimparTela();
    checkhitwall();
    checkhitcauda();
    let cobra1=new cobra();
    var apple1=new apple();

    placar();
    fim_jogo();
    



}

function loop(){
     jogo=setInterval(update, 1000/10); // fps do jogo 
    }

window.onload  = ()=>{
    loop();
}

// eventos de teclado
