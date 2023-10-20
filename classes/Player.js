/** Class Player. Contient toutes les informations relatives aux joueurs */
class Player {
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

    /** Element du DOM pour l'arme primaire */
    weaponDomElement;

    /** Position x de l'arme */
    weaponX;

    /** Position y de l'arme */
    weaponY;

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

    /** Attaques du joueur */
    attacks = {
        primary : {
            timer : 0,
            launched : false,
            ready : false,
            damages : 5,
            iconDomElement : ''
        },
        ultimate : {
            timer : 15,
            launched : false,
            ready : false,
            damages: 15,
            trajectory : {
                type: "unique",
                x0: 0,
                y0: 0,
                postionX: 0,
                postionY: 0,
                timer: 0,
                equationX : () => {},
                equationY : () => {},
            },
            attackDomElement : '',
            iconDomElement : ''
        }
    };

    /** Touches associés au joueur */
    keys = []
}