

/** ------------------------- GET DOM ELEMENTS  -------------------------*/


/** Div contenant tout le jeu */
const game = document.getElementById('game');

/** Canvas couvrant tout le jeu pour afficher diverses informations si nécessaires */
const canvas = document.getElementById("canvas");
canvas.width = game.offsetWidth;
canvas.height = game.offsetHeight;
const ctx = canvas.getContext("2d");

/** Div contenant les images des joueurs */
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

/** Div contenant l'image de l'arme primaire */
const weaponPlayer1 = document.getElementById('weapon-p1');
const weaponPlayer2 = document.getElementById('weapon-p2');

/** Div pour afficher la santé totale */
const healthPLayer1 = document.getElementById('health-p1');
const healthPLayer2 = document.getElementById('health-p2');

/** Div pour masquer la santé perdue */
const healthPercentageP1 = document.getElementById('hide-health-p1');
const healthPercentageP2 = document.getElementById('hide-health-p2');

/** Div pour afficher l'utlimate quand il est lancé */
const ultimateP1 = document.getElementById('ultimate-p1');
const ultimateP2 = document.getElementById('ultimate-p2');

/** Icon chargement ultimate */
const ultimateIconP1 = document.getElementById('ultimate-icon-p1');
const ultimateIconP2 = document.getElementById('ultimate-icon-p2');

/** Icon chargement primary */
const primaryIconP1 = document.getElementById('primary-icon-p1');
const primaryIconP2 = document.getElementById('primary-icon-p2');


/** ------------------------- MAP CONSTRUCTION -------------------------*/

/** Hauteur de la carte en block */
numberTileHeight = 20;

/** Largeur de la carte en block */
numberTileWidth = 30;

/** Taille des blocks */
blockWidth = (game.offsetWidth/this.numberTileWidth);
blockHeight = (game.offsetHeight/this.numberTileHeight);

const mapsUtils = new MapsUtils(numberTileHeight, numberTileWidth, blockHeight, blockWidth);
const map = mapsUtils.getMapByName('Default');

const collisionBlocks = mapsUtils.buildMap(map);
mapsUtils.setMapPng(map);
    

/** ------------------------- GAME SETTINGS -------------------------*/


/** Santé de base des joueurs. Utile pour l'affichage */
const baseHealth = 100;

/** Hauteur du saut des joueurs */
const targetJump = 6*blockHeight;

/** Temps de saut total des joueurs */
const jumpTimeMs = 300;

/** Intervalle pour process les actions de la partie (en ms) */
const timerStepMs = 20;

/** Boolean pour savoir si la musique est lancée ou non */
let musicPlaying = false;

/** Tableau contenant les touches pressées par les joueurs */
let keysPressed = [];

/** Taille des personnages en fonction de la taille des blocks qui composent la carte */
player1.style.width = blockWidth * 2 + 'px';
player2.style.width = blockWidth * 2 + 'px';
player1.style.height = blockHeight * 2.5 + 'px';
player2.style.height = blockHeight * 2.5 + 'px';

/** Création player 1 */
let p1 = new Player();
p1.x = 0;
p1.y = 0;
p1.velocityX = blockWidth/3;
p1.velocityY = (targetJump / (jumpTimeMs / 20));
p1.weaponDomElement = weaponPlayer1;
p1.weaponX = weaponPlayer1.getBoundingClientRect().left + window.scrollX;
p1.weaponY = weaponPlayer1.getBoundingClientRect().top + window.scrollY;
p1.playerDomElement = player1;
p1.healthPercentageDom = healthPercentageP1;
p1.keys = ['q', 'd', ' ', 'z', 'a'];
p1.attacks.ultimate.attackDomElement = ultimateP1;
p1.attacks.ultimate.iconDomElement = ultimateIconP1;
p1.attacks.ultimate.trajectory.equationX = function move(x0, t) { return Math.cos(45)*90*t + x0 };
p1.attacks.ultimate.trajectory.equationY = function move(y0, t) { return -0.5*9.81*(t**2) + Math.sin(45)*90*t + y0 };
p1.attacks.primary.iconDomElement = primaryIconP1;


/** Création player 2 */
let p2 = new Player();
p2.x = game.offsetWidth - player2.offsetWidth;
p2.y = 0;
p2.velocityX = blockWidth/3;
p2.velocityY = (targetJump / (jumpTimeMs / 20));
p2.weaponDomElement = weaponPlayer2;
p2.weaponX = weaponPlayer2.getBoundingClientRect().left + window.scrollX;
p2.weaponY = weaponPlayer2.getBoundingClientRect().top + window.scrollY;
p2.playerDomElement = player2;
p2.healthPercentageDom = healthPercentageP2;
p2.keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', '1', '2']
p2.attacks.ultimate.attackDomElement = ultimateP2;
p2.attacks.ultimate.iconDomElement = ultimateIconP2;
p2.attacks.ultimate.trajectory.equationX = function move(x0, t) { return -Math.cos(45)*90*t + x0};
p2.attacks.ultimate.trajectory.equationY = function move(y0, t) { return -0.5*9.81*(t**2) + Math.sin(45)*90*t + y0 };
p2.attacks.primary.iconDomElement = primaryIconP2;

const players = [p1,p2];


/** ------------------------- GAME ENGINE  -------------------------*/


window.addEventListener('keydown', (e) => {
    if (['q', 'd', 'ArrowLeft', 'ArrowRight', ' ', '1', 'ArrowUp', 'z', '2', 'a','ArrowDown'].includes(e.key) && !keysPressed.includes(e.key)) {
        keysPressed.push(e.key);
    }
});

window.addEventListener('keyup', (e) => {
    if (['q', 'd', 'ArrowLeft', 'ArrowRight', ' ', '1', 'ArrowUp', 'z', '2', 'a','ArrowDown'].includes(e.key) && keysPressed.includes(e.key)) {
        keysPressed = keysPressed.filter(key => key != e.key);
    }

    /** 
     * On affiche l'arme primaire en continu si le joueur appuie longuement sur la touche
     * Les dégats seront appliqués qu'une seule fois.
     * Le joueur devra relacher puis appuyer de nouveau sur la touche s'il veut inlfiger de nouveaux dégats.
     */
    if (e.key == ' ') {
        players[0].weaponDomElement.style.display = 'none';
        players[0].attacks.primary.launched = false;
        players[0].attacks.primary.iconDomElement.style.border = 'none';
    }

    if (e.key == '1') {
        players[1].weaponDomElement.style.display = 'none';
        players[1].attacks.primary.launched = false;
        players[1].attacks.primary.iconDomElement.style.border = 'none';
    }

    /** Permet de gérer la musique */
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

    /** Pour chaque player on effectue des actions en fonction des touches jouées */
    act();

    /** Pour chaque player, on gère ensuite les effets qui durent dans le temps */
    players.forEach((player, index) => {

        /** ------------------------- ULTIMATE -------------------------*/

        player.attacks.ultimate.timer += 1;

        if (player.attacks.ultimate.timer % 100 == 0 && !player.attacks.ultimate.ready) {
            player.attacks.ultimate.ready = true;
            player.attacks.ultimate.iconDomElement.style.border = 'inset 2px orange';
            console.log(`player ${players.indexOf(player) + 1} ability ready`);
        } else {
            player.attacks.ultimate.iconDomElement.style.opacity = player.attacks.ultimate.timer / 100
        }

        if (player.attacks.ultimate.launched) {

            player.attacks.ultimate.trajectory.timer += 1; 

            player.attacks.ultimate.attackDomElement.style.display = 'block';
            player.attacks.ultimate.iconDomElement.style.border = 'none';

            player.attacks.ultimate.postionX = player.attacks.ultimate.trajectory.equationX(player.attacks.ultimate.x0, player.attacks.ultimate.trajectory.timer);
            player.attacks.ultimate.postionY = player.attacks.ultimate.trajectory.equationY(player.attacks.ultimate.y0, player.attacks.ultimate.trajectory.timer);
            
            player.attacks.ultimate.attackDomElement.style.left = player.attacks.ultimate.postionX  + 'px';
            player.attacks.ultimate.attackDomElement.style.bottom = player.attacks.ultimate.postionY + 'px';


            if (player.attacks.ultimate.postionX < - 100 || player.attacks.ultimate.postionX > game.offsetWidth + 100 || player.attacks.ultimate.postionY < -100) {
                player.attacks.ultimate.launched = false;
                player.attacks.ultimate.attackDomElement.style.display = 'none';
                player.attacks.ultimate.trajectory.timer = 0;
            }

        } else {
            player.attacks.ultimate.x0 = player.x;
            player.attacks.ultimate.y0 = player.y;       

            player.attacks.ultimate.attackDomElement.style.bottom = player.attacks.ultimate.postionY;
            player.attacks.ultimate.attackDomElement.style.left = player.attacks.ultimate.postionX;
        }


        /** ------------------------- PLAYER JUMP -------------------------*/


        if (player.jumped && !player.isGoingDown) {
            player.jumpTimer += 1;

            /** 
             * Si le joueur n'a pas atteint la hauteur de saut max, il continue d'aller vers le haut.
             * Sinon, il commence à retomber.
             */
            if (player.y < player.levelIndex*targetJump) {
                player.y += player.velocityY;
            } else {
                player.isGoingDown = true;
            }

            player.playerDomElement.style.bottom = player.y + 'px';

        } else {

            /** Calcul du niveau de plateforme sur lequel le joueur se trouve */
            player.levelIndex = Math.ceil(((player.y) / (5*blockHeight))) + 1;
            
            if (player.y > 0) {
                /** Si le joueur arrive sur une plateforme, il s'arrête */
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


        /** ------------------------- END OF GAME -------------------------*/


        if (player.health == 0) {
            clearInterval(gameIsPlayed)
            if(!alert('Player ' + (2 - index) + ' won!')) window.location.reload();
        }
    });

}, timerStepMs);


/**
 * Fonction pour gérer les actions des personnages (mouvements, attaques ...)
 */
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
                        p2.attacks.primary.iconDomElement.style.border = 'inset 2px orange';
        
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


/**
 * Permet de savoir si un joueur est sur un plateforme ou non.
 * @param player Joueur en mouvement
 * @returns true si le player est sur une plateforme, false sinon.
 */
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

/**
 * Permet de gérer les déplacements des joueurs.
 * @param player Joueur en mouvement
 * @param direction Sens de direction (left, right, up)
 */
function movePlayer(player, direction) {

    switch(direction) {
        case 'left':
            if (player.x - player.velocityX >= 0) {
                player.x -= player.velocityX;
                player.playerDomElement.style.left = player.x + 'px';
            }
        break;

        case 'right':
            if (player.x + player.velocityX + player.playerDomElement.offsetWidth < game.offsetWidth) {
                player.x += player.velocityX;
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


/**
 * Permet de gérer les attaques des joueurs.
 * @param player Joueur attaquant
 * @param type Type de l'attaque (primary, ultimate)
 */
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
            /** On récupère le joueur adverse */
            const ennemyPlayer = players.filter(p => p != player)[0];
            const ennemyPlayerIndex = players.indexOf(ennemyPlayer);

            /** On affiche l'arme et on anime l'icone */
            player.weaponDomElement.style.display = 'block';
            player.attacks.primary.iconDomElement.style.border = 'inset 2px orange';

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