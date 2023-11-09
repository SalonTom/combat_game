class Character {
    constructor(id, name, pngSrc, primarySrc, primaryDesc, ultimateSrc, ultimateDesc, ultEqua) {
        this.id = id;

        /** Nom du personnage */
        this.name = name;

        /** Chemin vers le png du personnage */
        this.pngSrc = pngSrc;

        /** Chemin vers le png de l'attaque primaire */
        this.primarySrc = primarySrc;

        /** Description de l'attaque primaire */
        this.primaryDesc = primaryDesc;

        /** Chemin vers le png de l'attaque ultimate */
        this.ultimateSrc = ultimateSrc;

        /** Description de l'attaque primaire */
        this.ultimateDesc = ultimateDesc;

        /** Ultimate equation */
        this.ultimateEqua = ultEqua;
    }

    attacks = {
        primary : {
            timer : 0,
            launched : false,
            ready : false,
            damages : 5,
            iconDomElement : '',
            attackDomElement : ''
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
}