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
    playerDomElement;
    healthPercentageDom;

    attacks = {
        primary : {
            timer : 0,
            launched : false,
            ready : false,
            damages : 5
        },
        ultimate : {
            timer : 15,
            launched : false,
            ready : false
        }
    };

    keys = []
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

    
const blocks = [
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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

for (let i = 0; i<numberTileHeight; i++) {
    const row = []
    
    for (let j = 0; j<numberTileWidth; j++) {
        if (blocksRows[i][j] > 0) {
            collisionBlock = new CollisionBlock(j*blockWidth, i*blockHeight, blockWidth, blockHeight);
            row.push(collisionBlock);
        }
    }

    if (row.length) collisionBlocks.push(row);
}


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
p1.healthPercentageDom = healthPercentageP1;
p1.keys = ['q', 'd', ' ', 'z', 'a'];

/** Création player 2 */
let p2 = new Player();
p2.x = game.offsetWidth - player2.offsetWidth;
p2.y = 0;
p2.weaponDomElement = weaponPlayer2;
p2.weaponX = weaponPlayer2.getBoundingClientRect().left + window.scrollX;
p2.weaponY = weaponPlayer2.getBoundingClientRect().top + window.scrollY;
p2.playerDomElement = player2;
p2.healthPercentageDom = healthPercentageP2;
p2.keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', '1', '2']


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

let musicPlaying = false;

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
        players[0].attacks.primary.launched = false;
    }

    if (e.key == '1') {
        players[1].weaponDomElement.style.display = 'none';
        players[1].attacks.primary.launched = false;
    }

    if (e.key == 'm') {
        if (musicPlaying) {
            musicPlaying = false;
            document.querySelector("audio").pause();
        } else {
            musicPlaying = true;
            document.querySelector("audio").play();
        }
    }
});

const gameIsPlayed = setInterval(() => {
    act();

    players.forEach(player => {
        player.attacks.ultimate.timer += 1;

        if (player.attacks.ultimate.timer % 100 == 0 && !player.attacks.ultimate.ready) {
            player.attacks.ultimate.ready = true;
            console.log(`player ${players.indexOf(player) + 1} ability ready`);
        }

        if (player.jumped && !player.isGoingDown) {
            player.jumpTimer += 1;

            if (player.y < player.levelIndex*targetJump) {
                player.y += player.velocityY;
            } else {
                player.isGoingDown = true;
            }

            player.playerDomElement.style.bottom = player.y + 'px';

        } else {

            player.levelIndex = Math.ceil(((player.y) / (5*blockHeight))) + 1;
            
            if (player.y > 0) {
                if (playerOnPlatform(player)) {
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

        if (player.health == 0) {
            clearInterval(gameIsPlayed)
            if(!alert('Player' + (i + 1) + ' won!')) window.location.reload();
        }
    });

}, timerStepMs);

function act() {
    keysPressed.forEach(key => {

        players.forEach(player => {

            if (player.keys.includes(key)) {

                switch(key) {
    
                    case 'ArrowLeft':
                    case 'q':

                        movePlayer(player, 'left');
                        break;

                    case 'ArrowRight':
                    case 'd':
            
                        movePlayer(player, 'right');
                        break;

                    case 'ArrowUp':
                    case 'z':

                        movePlayer(player, 'up');
                        break;
                    
                    case ' ':
                        attack(player, 'primary');
        
                        break;

                    case 'a' :
                    case '2' :

                        attack(player, 'ultimate');
                        break;
        
                    case '1':
                        p2.weaponDomElement.style.display = 'block';
        
                        if(p2.x - p2.weaponDomElement.offsetWidth + p2.playerDomElement.offsetWidth > p1.x && p2.x - p1.playerDomElement.offsetWidth + p2.playerDomElement.offsetWidth < p1.x + p1.playerDomElement.offsetWidth) {
                            if(p2.y < p1.y + p1.playerDomElement.offsetHeight && p2.y + p2.weaponDomElement.offsetHeight > p1.y) {
                                if (!p2.attacks.primary.launched) {
                                    p2.attacks.primary.launched = true;
                                    p1.health -= p2.attacks.primary.damages;
                                    healthPercentageP1.style.width = ((1 - (p1.health/baseHealth))* 100) + '%'
                                    healthPercentageP1.style.display = 'block'
                                }
                            }
                        }
                        break;
                }
            }
        })
    });
}


function playerOnPlatform(player) {
    for (let i = 0; i<collisionBlocks.length; i++) {
        // On ne s'intéresse qu'aux blocks situés à la même hauteur que le joueur
        if (player.y > collisionBlocks[i][0].y  && player.y < collisionBlocks[i][0].y + blockHeight) {
            for (let j = 0; j<collisionBlocks[i].length; j++) {
                if (player.x + blockWidth >= collisionBlocks[i][j].x && player.x + blockWidth <= collisionBlocks[i][j].x + blockWidth) {
                    return true;
                }
            }
        }
    }

    return false;
}

/** 
 * Retourne true si object1 est dans la zone d'object2.
 * Possibilité de préciser une offsetHeight et un offsetwidth pour l'object2
*/
function objectsCollide(object1x, object1y, object2x, object2y, offsetHeight2, offsetWidth2) {
    if (object1y > object2y && object1y < object2y + offsetHeight2) {
        if (object1x >= object2x && object1x <= object2x + offsetWidth2) {
            return true;
        }
    }

    return false;
}

function movePlayer(player, direction) {

    switch(direction) {
        case 'left':
            if (player.x - stepX >= 0) {
                player.x -= stepX;
                player.playerDomElement.style.left = player.x + 'px';
            }
        break;

        case 'right':
            if (player.x + stepX + player.playerDomElement.offsetWidth < game.offsetWidth) {
                player.x += stepX;
                player.playerDomElement.style.left = player.x + 'px';
            }
        break;

        case 'up':
            if (!player.jumped) {
                player.jumped = true;
            }
        break;
    }

}

function attack(player, type) {
    switch(type) {
        case 'ultimate':
            if (player.attacks.ultimate.ready) {
                player.attacks.ultimate.ready = false;
                player.attacks.ultimate.timer = 0;
                player.attacks.ultimate.launched = true;
                console.log(`Player : ${players.indexOf(player) + 1} ultimate launched`);
            }
        
            break;

        case 'primary':
            const ennemyPlayer = players.filter(p => p != player)[0];
            const ennemyPlayerIndex = players.indexOf(ennemyPlayer);
            player.weaponDomElement.style.display = 'block';

            console.log(player.x + player.weaponDomElement.offsetWidth, ennemyPlayer.x + ennemyPlayer.playerDomElement.offsetWidth,player.x + player.weaponDomElement.offsetWidth, ennemyPlayer.x );
            if(player.x + player.weaponDomElement.offsetWidth < ennemyPlayer.x + ennemyPlayer.playerDomElement.offsetWidth && player.x + player.weaponDomElement.offsetWidth > ennemyPlayer.x) {
                if(player.y < ennemyPlayer.y + ennemyPlayer.playerDomElement.offsetHeight && player.y + player.weaponDomElement.offsetHeight > ennemyPlayer.y) {
                    if (!player.attacks.primary.launched) {
                        player.attacks.primary.launched = true;
                        ennemyPlayer.health -= player.attacks.primary.damages;
                        ennemyPlayer.healthPercentageDom.style.width = ((1 - (ennemyPlayer.health/baseHealth))* 100) + '%';
                        ennemyPlayer.healthPercentageDom.style.display = 'block';
                    }
                }
            }

            players[ennemyPlayerIndex] = ennemyPlayer;

            break;
    }
}