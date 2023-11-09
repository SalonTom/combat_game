class GameMap {
    constructor(id, name, src, bgSrc, blocks) {
        this.id = id;

        /** Nom de la carte */
        this.name = name;

        /** Chemin vers le png de la map */
        this.src = src;

        /** Chemin vers le png du background map */
        this.bgSrc = bgSrc;

        /** Tableaux contenant l'ensemble des blocs de la map (30*20) */
        this.blocks = blocks;
    }
}