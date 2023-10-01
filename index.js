class Player {
    x;
    y;
    velocityY = 1;
    isGoingDown = false;
    levelIndex = 1;
    weaponDomElement;
    weaponX;
    weaponY;
    jumped = false;
    jumpTimer = 0;
    health = 100;
    launchedBasicAttack = false;
    primaryAttackReady = false;
    // En secondes
    primaryAttackTimer = 8;
    playerDomElement;
}

class CollisionBlock {
    x;
    y;
    width;
    height;
    number;
    constructor(
        x,
        y,
        width,
        height,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

const game = document.getElementById('game');

const canvas = document.getElementById("canvas");
canvas.width = game.offsetWidth;
canvas.height = game.offsetHeight;
const ctx = canvas.getContext("2d");


// const blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 363, 364, 364, 364, 364, 560, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 363, 364, 364, 364, 364, 560, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    
const blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 363, 364, 364, 364, 364, 560, 0, 0, 0, 0, 0, 0, 0, 0, 363, 364, 364, 364, 364, 560, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 363, 364, 364, 364, 560, 0, 0, 0, 0, 363, 364, 560, 0, 0, 0, 0, 363, 364, 560, 0, 0, 0, 0, 363, 364, 364, 364, 560, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 363, 364, 364, 364, 364, 560, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 363, 364, 364, 364, 364, 560, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
blocks.reverse()
const blocksRows = [];
let collisionBlocks = [];
const numberTileHeight = 20;
const numberTileWidth = 30;

const blockWidth = (game.offsetWidth/numberTileWidth);
const blockHeight = (game.offsetHeight/numberTileHeight);

for (let i = 0; i<numberTileHeight; i++) {
    blocksRows.push(blocks.slice(i*30, i*30 + 30))
}

console.log(blocksRows)
var ctr = 1
for (let i = 0; i<numberTileHeight; i++) {
    const row = []
    
    for (let j = 0; j<numberTileWidth; j++) {
        if (blocksRows[i][j] > 0) {
            collisionBlock = new CollisionBlock(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
            collisionBlock.number = ctr;
            row.push(collisionBlock);
            ctx.fillStyle = "green";
            // ctx.fillRect(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
            // ctx.fillText(ctr.toString(),j*blockWidth, i*blockHeight);
            ctr++;
        }
    }

    if (row.length) collisionBlocks.push(row);
}


// collisionBlocks = collisionBlocks.reverse();

console.log(collisionBlocks)

const numberOfGameLevel = collisionBlocks.length;

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

player1.style.width = blockWidth * 2 + 'px';
player2.style.width = blockWidth * 2 + 'px';
player1.style.height = blockHeight * 2.5 + 'px';
player2.style.height = blockHeight * 2.5 + 'px';

const weaponPlayer1 = document.getElementById('weapon-p1');
const weaponPlayer2 = document.getElementById('weapon-p2');

const reactWeapon1 = weaponPlayer1.getBoundingClientRect();
const reactWeapon2 = weaponPlayer2.getBoundingClientRect();

const weapon1X = reactWeapon1.left + window.scrollX;
const weapon1Y = reactWeapon1.top + window.scrollY;

const healthPLayer1 = document.getElementById('health-p1');
const healthPLayer2 = document.getElementById('health-p2');

const healthPercentageP1 = document.getElementById('hide-health-p1');
const healthPercentageP2 = document.getElementById('hide-health-p2');


/** Création player 1 */
let p1 = new Player();
p1.x = 0;
p1.y = 0;
p1.weaponDomElement = weaponPlayer1;
p1.weaponX = weaponPlayer1.getBoundingClientRect().left + window.scrollX;
p1.weaponY = weaponPlayer1.getBoundingClientRect().top + window.scrollY;
p1.playerDomElement = player1;

/** Création player 2 */
let p2 = new Player();
p2.x = game.offsetWidth - player2.offsetWidth;
p2.y = 0;
p2.weaponDomElement = weaponPlayer2;
p2.weaponX = weaponPlayer2.getBoundingClientRect().left + window.scrollX;
p2.weaponY = weaponPlayer2.getBoundingClientRect().top + window.scrollY;
p2.playerDomElement = player2;



const players = [p1,p2];

let keysPressed = [];
let playersAreMoving = false;

let baseHealth = 100;
/** En px */
const stepX = blockWidth/3;
/** En vh */
const stepY = 20;
const targetJump = 6*blockHeight;
const jumpTimeMs = 300;
const timerStepMs = 20;

p1.velocityY = (targetJump / (jumpTimeMs / 20));
p2.velocityY = (targetJump / (jumpTimeMs / 20));

window.addEventListener('keydown', (e) => {
    if (['q', 'd', 'ArrowLeft', 'ArrowRight', ' ', '1', 'ArrowUp', 'z', '2', 'a','ArrowDown'].includes(e.key) && !keysPressed.includes(e.key)) {
        keysPressed.push(e.key);
    }
});

window.addEventListener('keyup', (e) => {
    if (['q', 'd', 'ArrowLeft', 'ArrowRight', ' ', '1', 'ArrowUp', 'z', '2', 'a','ArrowDown'].includes(e.key) && keysPressed.includes(e.key)) {
        keysPressed = keysPressed.filter(key => key != e.key);
    }

    if (e.key == ' ') {
        players[0].weaponDomElement.style.display = 'none';
        players[0].launchedBasicAttack = false;
    }

    if (e.key == '1') {
        players[1].weaponDomElement.style.display = 'none';
        players[1].launchedBasicAttack = false;
    }
});

const gameIsPlayed = setInterval(() => {
    act();

    for(let i = 0; i<players.length; i++) {
        const player = players[i];

        player.primaryAttackTimer += 1;

        // ctx.fillStyle= "green";
        // ctx.fillRect(canvas.offsetWidth - player.x, canvas.offsetHeight - player.y, 10, 10);

        if (player.primaryAttackTimer % 100 == 0 && !player.primaryAttackReady) {
            player.primaryAttackReady = true;
            console.log('player ' + (i + 1) + ' ability ready');
        }

        if (player.jumped && !player.isGoingDown) {
            player.jumpTimer += 1;

            if (player.y < player.levelIndex*targetJump) {
                player.y += player.velocityY;
                // console.log("+1")
            } else {
                player.isGoingDown = true;
            }

            player.playerDomElement.style.bottom = player.y + 'px';

        } else {

            player.levelIndex = Math.ceil(((player.y) / (5*blockHeight))) + 1;
            // console.log(player.y, blockHeight);
            
            if (player.y > 0) {
                if (playerOnPlatform(player)) {
                    // player.y = (player.levelIndex)*(5*blockHeight);
                    // console.log(player.y)
                    console.log("player landeed")
                    player.isGoingDown = false;
                    player.jumped = false;
                } else {
                    player.y -= player.velocityY;
                    player.isGoingDown = true;
                }
            } else {
                player.isGoingDown = false;
                player.jumped = false;
            }

            player.playerDomElement.style.bottom = player.y + 'px';
        }
        // if (player.y > (player.levelIndex - 1)*targetJump) {
        //     player.isGoingDown = true;
        //     player.y -= player.velocityY;
        // }

        if (player.health == 0) {
            clearInterval(gameIsPlayed)
            if(!alert('Player' + (i + 1) + ' won!')) window.location.reload();
        } 

        players[i] = player;
    }

}, timerStepMs);

function act() {
    p1 = players[0];
    p2 = players[1];
    keysPressed.forEach(key => {
        switch(key) {

            /** Player 1 actions */
            case 'q':

                if (p1.x - 10 >= 0) {
                    p1.x -= stepX;
                    p1.playerDomElement.style.left = p1.x + 'px';
                }
    
                break;
            case 'd':
    
                if (p1.x + stepX + p1.playerDomElement.offsetWidth < game.offsetWidth) {
                    p1.x += stepX;
                    p1.playerDomElement.style.left = p1.x + 'px';
                }
    
                break;
            
            case ' ':
                p1.weaponDomElement.style.display = 'block';

                if(p1.x + p1.weaponDomElement.offsetWidth < p2.x + p2.playerDomElement.offsetWidth && p1.x + p1.weaponDomElement.offsetWidth > p2.x) {
                    if(p1.y < p2.y + p2.playerDomElement.offsetHeight && p1.y + p1.weaponDomElement.offsetHeight > p2.y) {
                        if (!p1.launchedBasicAttack) {
                            p1.launchedBasicAttack = true;
                            p2.health -= 5;
                            healthPercentageP2.style.width = ((1 - (p2.health/baseHealth))* 100) + '%';
                            healthPercentageP2.style.display = 'block';
                        }
                    }
                }
                break;
            case 'z':
                if (!p1.jumped) {
                    p1.jumped = true;
                }
                break;
            case 'a' :
                if (p1.primaryAttackReady) {
                    p1.primaryAttackReady = false;
                    p1.primaryAttackTimer = 0;
                    console.log("attack1 launched")
                }
                break;

            /** Player 2 actions */
            case 'ArrowUp':
                if (!p2.jumped) {
                    p2.jumped = true;
                }
                break;
            
            case 'ArrowLeft':
                
                if (p2.x - 10 >= 0) {
                    p2.x -= stepX;
                    p2.playerDomElement.style.left = p2.x + 'px';
                }
    
                break;
            
            case 'ArrowDown':
            
                if (p2.y - blockHeight -1 >= 0) {
                    p2.y -= blockHeight+1;
                    p2.playerDomElement.style.bottom = p2.y + 'px';
                }

                break;

            case 'ArrowRight':
    
                if (p2.x + stepX + player2.offsetWidth < game.offsetWidth) {
                    p2.x += stepX;
                    p2.playerDomElement.style.left = p2.x + 'px';
                }
    
                break;

            case '1':
                    p2.weaponDomElement.style.display = 'block';
    
                    if(p2.x - p2.weaponDomElement.offsetWidth + p2.playerDomElement.offsetWidth > p1.x && p2.x - p1.playerDomElement.offsetWidth + p2.playerDomElement.offsetWidth < p1.x + p1.playerDomElement.offsetWidth) {
                        if(p2.y < p1.y + p1.playerDomElement.offsetHeight && p2.y + p2.weaponDomElement.offsetHeight > p1.y) {
                            if (!p2.launchedBasicAttack) {
                                p2.launchedBasicAttack = true;
                                p1.health -= 5;
                                healthPercentageP1.style.width = ((1 - (p1.health/baseHealth))* 100) + '%'
                                healthPercentageP1.style.display = 'block'
                            }
                        }
                    }
                    break;

            case '2' :
                if (p2.primaryAttackReady) {
                    p2.primaryAttackReady = false;
                    p2.primaryAttackReady = 0;
                    console.log("attack2 launched")
                }
                break;
        }
    })
    players[0] = p1;
    players[1] = p2;
}


function playerOnPlatform(player) {
    for (let i = 0; i<collisionBlocks.length; i++) {
        if (player.y > collisionBlocks[i][0].y  && player.y < collisionBlocks[i][0].y + blockHeight) {
            for (let j = 0; j<collisionBlocks[i].length; j++) {
                console.log(player.x, collisionBlocks[i][j].x, collisionBlocks[i][j].x + collisionBlocks[i][j].width, player.x > collisionBlocks[i][j].x && player.x < collisionBlocks[i][j].x + collisionBlocks[i][j].width)
                if (player.x + blockWidth >= collisionBlocks[i][j].x && player.x + blockWidth <= collisionBlocks[i][j].x + blockWidth) {
                    console.log("Collision with: " + collisionBlocks[i][j].number.toString());
                    return true;
                }
            }
        }
    }

    return false;
}