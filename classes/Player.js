/** Class Player. Contient toutes les informations relatives aux joueurs */
class Player extends Character{
    /** Player id : 1 start on the left, 2 start on the right */
    id;

    /** Position x */
    x;

    /** Position x */
    y;

    /** Vitesse horizontale */
    velocityX = 1;

    /** Vitesse verticale */
    velocityY = 1;

    /** Le joueur est il en train de tomber ? */
    isGoingDown = false;

    /** Permet de savoir à quel niveau se situe le joueur par rapport aux plateformes */
    levelIndex = 1;

    /** Le joueur a-t+il sauté ? */
    jumped = false;

    /** Depuis combien de temps le joueur a-t-il sauté ? */
    jumpTimer = 0;

    /** Vie du joueur */
    health = 100;

    /** Element du DOM pour afficher le joueur */
    playerDomElement;

    /** Element du DOM pour masquer la vie perdue du joueur */
    healthPercentageDom;

    /** Touches associés au joueur */
    keys = []

    /** get Position x de l'arme */
    get weaponX() {
        return this.id === 1 ? this.x + this.playerDomElement.offsetWidth : this.x
    };

    /** Get Position y de l'arme */
    get weaponY() {
        return this.y + this.attacks.primary.attackDomElement.offsetHeight*4/5
    };
}