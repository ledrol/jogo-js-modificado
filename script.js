let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //Cria uma renderização para desenho em 2D
let box = 32; //Quadrados de 32 pixels de tamanho
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={  //Tamanho inicial da cobrinha, nas coordenadas x e y
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
//Define valores aleatórios em x e y para o aparecimento da comida
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Função que cria o background
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas
}

//Função que cria a cobrinha
function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); //Array de coordenadas
    }
}

//Função que cria a comida
function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

//função recebe como argumento as teclas pressionadas
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    //Permite que a cobrinha atravesse as paredes e apareça do lado oposto
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    //Quando a cabeça encosta no corpo, acaba o jogo
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo); //para a função jogo
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //Inicia a posição x e y com 0
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Direção que a cobrinha vai seguir
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Se a cobrinha encontra a comida, aumenta o tamanho e a comida aparece em outro lugar
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    //Cria a cabeça da cobrinha
    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha

    var cont = snake.length; //Pega o tamanho do vetor
    document.getElementById('foodVal').innerHTML = cont-1; //Subtrai 1 para gerar o número de pontos
}


function mostraVeloc(){
    let x = document.getElementById('velo').value; //Obtém o valor de 'velo' do id html e armazena na variável x
    document.getElementById('valor').innerHTML = x; //Coloca o valor de x na id 'valor'
    return parseInt(x); //Transforma a string x em número inteiro e retorna
}

//Para funcionar, teve de recarregar a página com "onmouseup="window.location.reload()""
var jogo = setInterval(iniciarJogo, mostraVeloc()); //Faz a renovação do jogo, chamando a função iniciarJogo e um parâmetro em segundos(aqui feito por mostraVeloc()) 