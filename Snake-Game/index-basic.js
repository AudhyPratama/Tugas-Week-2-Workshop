// Tidak pakai nomer 5

const CELL_SIZE = 20;
const CANVAS_SIZE = 600; // Nomer 1
// kecepatan render
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
// kode arah
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 100; // Nomer 2

// inisialiasi posisi
function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

// inisialiasi arah dengan acak
function initDirection() {
    return Math.floor(Math.random() * 4);
}

// ular 1 (player 1)
let snake1 = {
    color: "purple",
    position: initPosition(),
    direction: initDirection(),
    score: 0,
}
// ular 2 (player 2)
let snake2 = {
    color: "blue",
    position: initPosition(),
    direction: initDirection(),
    score: 0,
}
// Nomer 6
let snake3 = {
    color: "green",
    position: initPosition(),
    direction: initDirection(),
    score: 0,
}

// apel 1
let apple1 = {
    color: "red",
    position: initPosition(),
}

// Nomer 4
let apple2 = {
    color: "yellow",
    position: initPosition(),
}

// menggambar posisi apel
function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// membuat kotak score
function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } else if (snake.color == snake2.color) {
        scoreCanvas = document.getElementById("score2Board");
    } else {
        scoreCanvas = document.getElementById("score3Board"); // Nomer 6
    }
    let scoreCtx = scoreCanvas.getContext("2d");
    
    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

// fugsi gambar
function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");
        let appleImg = document.getElementById('apple_img'); // Nomer 3

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        // menggambar ular (player) 1-3
        drawCell(ctx, snake1.position.x, snake1.position.y, snake1.color);
        drawCell(ctx, snake2.position.x, snake2.position.y, snake2.color);
        drawCell(ctx, snake3.position.x, snake3.position.y, snake3.color); // Nomer 6

        // menggambar apel
        ctx.drawImage(appleImg, apple1.position.x * CELL_SIZE, apple1.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // Nomer 3
        ctx.drawImage(appleImg, apple2.position.x * CELL_SIZE, apple2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // Nomer 4

        // menggambar skor player 1-3
        drawScore(snake1);
        drawScore(snake2);
        drawScore(snake3); // Nomer 6
    }, REDRAW_INTERVAL);
}

// fungsi teleport jika ular (player) menyentuh dinding
function teleport(snake) {
    if (snake.position.x < 0) {
        snake.position.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.x >= WIDTH) {
        snake.position.x = 0;
    }
    if (snake.position.y < 0) {
        snake.position.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.y >= HEIGHT) {
        snake.position.y = 0;
    }
}

// fungsi memakan apel
function eat(snake, apple1, apple2) {
    if (snake.position.x == apple1.position.x && snake.position.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
    }
    if (snake.position.x == apple2.position.x && snake.position.y == apple2.position.y) { // Nomer 4
        apple2.position = initPosition();
        snake.score++;
    }
}

// fungsi jalan kekiri
function moveLeft(snake) {
    snake.position.x--;
    teleport(snake);
    eat(snake, apple1, apple2); // Nomer 4
}
// fungis jalan kekanan
function moveRight(snake) {
    snake.position.x++;
    teleport(snake);
    eat(snake, apple1, apple2); // Nomer 4
}
// fungsi jalan kebawah
function moveDown(snake) {
    snake.position.y++;
    teleport(snake);
    eat(snake, apple1, apple2); // Nomer 4
}
//fungsi jalan keatas
function moveUp(snake) {
    snake.position.y--;
    teleport(snake);
    eat(snake, apple1, apple2); // Nomer 4
}
// fungsi jalan sesuai kecepatan
function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    setTimeout(function() {
        move(snake);
    }, MOVE_INTERVAL);
}

// untuk membaca input keyboard tiap ular (player)
document.addEventListener("keydown", function (event) { // input kiri, kanan, atas, bawah (player 1)
    if (event.key === "ArrowLeft") {
        snake1.direction = DIRECTION.LEFT;
    } else if (event.key === "ArrowRight") {
        snake1.direction = DIRECTION.RIGHT;
    } else if (event.key === "ArrowUp") {
        snake1.direction = DIRECTION.UP;
    } else if (event.key === "ArrowDown") {
        snake1.direction = DIRECTION.DOWN;
    }

    // input a,d,w,s (player 2)
    if (event.key === "a") {
        snake2.direction = DIRECTION.LEFT;
    } else if (event.key === "d") {
        snake2.direction = DIRECTION.RIGHT;
    } else if (event.key === "w") {
        snake2.direction = DIRECTION.UP;
    } else if (event.key === "s") {
        snake2.direction = DIRECTION.DOWN;
    }

    // input j,l,i,k (player 3)
    if (event.key === "j") {
        snake3.direction = DIRECTION.LEFT;
    } else if (event.key === "l") {
        snake3.direction = DIRECTION.RIGHT;
    } else if (event.key === "i") {
        snake3.direction = DIRECTION.UP;
    } else if (event.key === "k") {
        snake3.direction = DIRECTION.DOWN;
    }
})

// fungsi jalan tiap2 ular (player)
move(snake1);
move(snake2);
move(snake3);
