

/** ------------------------- GET DOM ELEMENTS  -------------------------*/


/** Div contenant tout le jeu */
const game = document.getElementById('game');

/** Div pour affichage de fin de partie */
const gameOver = document.getElementById('game-over');
/** Div pour affichage du joueur vainqueur */
const winner = document.getElementById('winner');

/** Canvas couvrant tout le jeu pour afficher diverses informations si nécessaires */
const canvas = document.getElementById("canvas");
canvas.width = game.offsetWidth;
canvas.height = game.offsetHeight;
const ctx = canvas.getContext("2d");

/** Div contenant les images des joueurs */
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const playersDom = [player1, player2];

/** Div contenant l'image de l'arme primaire */
const weaponPlayer1 = document.getElementById('weapon-p1');
const weaponPlayer2 = document.getElementById('weapon-p2');

const weaponsDom = [weaponPlayer1, weaponPlayer2];

/** Div pour afficher la santé totale */
const healthPLayer1 = document.getElementById('health-p1');
const healthPLayer2 = document.getElementById('health-p2');

/** Div pour masquer la santé perdue */
const healthPercentageP1 = document.getElementById('hide-health-p1');
const healthPercentageP2 = document.getElementById('hide-health-p2');

/** Div pour afficher l'utlimate quand il est lancé */
const ultimateP1 = document.getElementById('ultimate-p1');
const ultimateP2 = document.getElementById('ultimate-p2');

const ultimatesDom = [ultimateP1, ultimateP2];

/** Icon chargement ultimate */
const ultimateIconP1 = document.getElementById('ultimate-icon-p1');
const ultimateIconP2 = document.getElementById('ultimate-icon-p2');

const ultimateIconsDom = [ultimateIconP1, ultimateIconP2];

/** Icon chargement primary */
const primaryIconP1 = document.getElementById('primary-icon-p1');
const primaryIconP2 = document.getElementById('primary-icon-p2');

const primaryIconsDom = [primaryIconP1, ultimateIconP2];


/** ------------------------- MAP CONSTRUCTION -------------------------*/

/** Hauteur de la carte en block */
numberTileHeight = 20;

/** Largeur de la carte en block */
numberTileWidth = 30;

/** Taille des blocks */
blockWidth = (game.offsetWidth/this.numberTileWidth);
blockHeight = (game.offsetHeight/this.numberTileHeight);

const mapsUtils = new MapsUtils(numberTileHeight, numberTileWidth, blockHeight, blockWidth);
const map = mapsUtils.getRandomMap();

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

ultimateP1.style.width = 3*blockWidth + 'px';
ultimateP1.style.height = 4*blockHeight + 'px';
ultimateP2.style.width = 3*blockWidth + 'px';
ultimateP2.style.height = 4*blockHeight + 'px';


/** ------------------------- PLAYERS CHOICE AND CREATION -------------------------*/

/** Création player 1 */
let p1 = new Player();

/** Création player 2 */
let p2 = new Player();

let chars = [CharUtils.chars[0],  CharUtils.chars[0]];
let remainingCharToSelect = 2;

CharUtils.showChar(chars[0], 1);
CharUtils.showChar(chars[1], 2);

const players = [p1,p2];

let gameIsOn = false;


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
        players[0].attacks.primary.attackDomElement.style.display = 'none';
        players[0].attacks.primary.launched = false;
        players[0].attacks.primary.iconDomElement.style.border = 'none';
    }

    if (e.key == '1') {
        players[1].attacks.primary.attackDomElement.style.display = 'none';
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

    if (gameIsOn) {
        /** Pour chaque player on effectue des actions en fonction des touches jouées */
        act();

        /** Pour chaque player, on gère ensuite les effets qui durent dans le temps */
        players.forEach((player, index) => {
    
            /** ------------------------- ULTIMATE -------------------------*/
    
            player.attacks.ultimate.timer += 1;
    
            /** 
             * Si l'utlitmate est chargé et qu'il n'est pas déjà prêt, on le passe ready et on anime l'icone de l'attaque.
             * Sinon, on incrémente le timer de l'attaque et modifie l'opacité de l'icone de l'attaque (de plus en plus clair).
             */
            if (player.attacks.ultimate.timer % 100 == 0 && !player.attacks.ultimate.ready) {
                player.attacks.ultimate.ready = true;
                player.attacks.ultimate.iconDomElement.style.border = 'inset 2px orange';
                console.log(`player ${player.id} ability ready`);
            } else {
                player.attacks.ultimate.iconDomElement.style.opacity = player.attacks.ultimate.timer / 100
            }
    
            /** Si l'attaque est lancée, on calcule sa trajectoire et applique les damages, effets ... */
            if (player.attacks.ultimate.launched) {
    
                /** On affiche l'attaque dans le DOM */
                player.attacks.ultimate.attackDomElement.style.display = 'block';
                player.attacks.ultimate.iconDomElement.style.border = 'none';
    
    
                /** Calcul des nouvelles coordonnées de l'attaque et mise à jour du DOM */
                player.attacks.ultimate.trajectory.timer += 1; 
    
                player.attacks.ultimate.postionX = player.attacks.ultimate.trajectory.equationX(player.attacks.ultimate.x0, player.attacks.ultimate.trajectory.timer);
                player.attacks.ultimate.postionY = player.attacks.ultimate.trajectory.equationY(player.attacks.ultimate.y0, player.attacks.ultimate.trajectory.timer);
                
                player.attacks.ultimate.attackDomElement.style.left = player.attacks.ultimate.postionX  + 'px';
                player.attacks.ultimate.attackDomElement.style.bottom = player.attacks.ultimate.postionY + 'px';
    
                /** Application des damages */
                const ennemy = players[2 - player.id];
    
                const ultimateCenterX = player.attacks.ultimate.postionX + (player.attacks.ultimate.attackDomElement.offsetWidth)/2;
                const ultimateCenterY = player.attacks.ultimate.postionY + (player.attacks.ultimate.attackDomElement.offsetHeight)/2;
    
                if (objectsCollide(ultimateCenterX, ultimateCenterY, ennemy.x, ennemy.y, ennemy.playerDomElement.offsetWidth, ennemy.playerDomElement.offsetHeight)) {
                    console.log(`Player ${player.id} hit player ${ennemy.id}`)
    
                    updatePlayerHealth(ennemy, player.attacks.ultimate.damages)
    
                    players[2 - player.id] = ennemy;
    
                    player.attacks.ultimate.launched = false;
                    player.attacks.ultimate.attackDomElement.style.display = 'none';
                    player.attacks.ultimate.trajectory.timer = 0;
                }
    
    
                /** Si l'attaque n'est plus dans le cadre du jeu, on considére l'attaque comme terminée. */
                if (player.attacks.ultimate.postionX < - 100 || player.attacks.ultimate.postionX > game.offsetWidth + 100 || player.attacks.ultimate.postionY < -100) {
                    player.attacks.ultimate.launched = false;
                    player.attacks.ultimate.attackDomElement.style.display = 'none';
                    player.attacks.ultimate.trajectory.timer = 0;
                }
    
            } else {
    
                /** MAJ de la position de départ de l'attaque en fonction du joueur */
                player.attacks.ultimate.x0 = player.x;
                player.attacks.ultimate.y0 = player.y;       
    
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
    
    
            if (player.health <= 0) {
                clearInterval(gameIsPlayed);
                gameOver.style.display = 'block';
    
                winner.innerText = `Player ${2 - index} won the game !`;
            }
    
        });
    }


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
                    case '1':

                        attack(player, 'primary');
                        break;

                    case 'a' :
                    case '2' :

                        attack(player, 'ultimate');
                        break;
                }
            }
        })
    });
}

/** ------------------------- FUNCTIONS -------------------------*/


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
function objectsCollide(object1x, object1y, object2x, object2y, offsetWidth2, offsetHeight2) {
    if (object1y >= object2y && object1y <= object2y + offsetHeight2) {
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
            if (player.x - (timerStepMs * player.velocityX/1000) >= 0) {
                player.x -= timerStepMs * player.velocityX/1000;
                player.playerDomElement.style.left = player.x + 'px';
            }
        break;

        case 'right':
            if (player.x + (timerStepMs * player.velocityX/1000) + player.playerDomElement.offsetWidth < game.offsetWidth) {
                player.x += timerStepMs * player.velocityX/1000;
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
            player.attacks.primary.attackDomElement.style.display = 'block';
            player.attacks.primary.iconDomElement.style.border = 'inset 2px orange';

            if (objectsCollide(player.weaponX, player.weaponY, ennemyPlayer.x, ennemyPlayer.y, ennemyPlayer.playerDomElement.offsetWidth, ennemyPlayer.playerDomElement.offsetHeight)) {
                if (!player.attacks.primary.launched) {
                    player.attacks.primary.launched = true;

                    updatePlayerHealth(ennemyPlayer, player.attacks.primary.damages);
                }
            }

            players[ennemyPlayerIndex] = ennemyPlayer;

            break;
    }
}

function updatePlayerHealth(player, damages) {
    player.health -= damages;
    player.healthPercentageDom.style.width = ((1 - (player.health/baseHealth))* 100) + '%';
    player.healthPercentageDom.style.display = 'block';
}

function nextChar(playerId, previous = false) {
    const currentChar = chars[playerId - 1];
    const newChar = CharUtils.nextPlayer(CharUtils.chars.indexOf(currentChar), previous);
    CharUtils.showChar(newChar, playerId);
    chars[playerId - 1] = newChar;
}

function validateChar(playerId) {
    document.getElementById('p' + playerId + '-prev').style.display = 'none';
    document.getElementById('p' + playerId + '-next').style.display = 'none';
    document.getElementById('p' + playerId + '-validate').innerHTML = 'Ready to fight !';

    remainingCharToSelect -= 1;

    if (remainingCharToSelect == 0) {

        p1.id = 1
        p1.x = 0;
        p1.y = 0;
        p1.velocityX = 20*blockWidth;
        p1.velocityY = (targetJump / (jumpTimeMs / 20));
        p1.attacks.primary.attackDomElement = weaponPlayer1;
        p1.playerDomElement = player1;
        p1.healthPercentageDom = healthPercentageP1;
        p1.keys = ['q', 'd', ' ', 'z', 'a'];
        p1.attacks.ultimate.attackDomElement = ultimateP1;
        p1.attacks.ultimate.iconDomElement = ultimateIconP1;
        p1.attacks.ultimate.trajectory.equationX = chars[0].ultimateEqua[0].ultEquaX;
        p1.attacks.ultimate.trajectory.equationY = chars[0].ultimateEqua[0].ultEquaY;
        p1.attacks.primary.iconDomElement = primaryIconP1;

        p2.id = 2
        p2.x = game.offsetWidth - player2.offsetWidth;
        p2.y = 0;
        p2.velocityX = 20*blockWidth;
        p2.velocityY = (targetJump / (jumpTimeMs / timerStepMs));
        p2.attacks.primary.attackDomElement = weaponPlayer2;
        p2.playerDomElement = player2;
        p2.healthPercentageDom = healthPercentageP2;
        p2.keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', '1', '2']
        p2.attacks.ultimate.attackDomElement = ultimateP2;
        p2.attacks.ultimate.iconDomElement = ultimateIconP2;
        p2.attacks.ultimate.trajectory.equationX = chars[1].ultimateEqua[1].ultEquaX;
        p2.attacks.ultimate.trajectory.equationY = chars[1].ultimateEqua[1].ultEquaY;
        p2.attacks.primary.iconDomElement = primaryIconP2;

        document.getElementById('home-screen').style.display = 'none';

        gameIsOn = true;
    }
}