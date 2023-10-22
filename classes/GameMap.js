class GameMap {
    constructor(id, name, src, blocks) {
        this.id = id;

        /** Nom de la carte */
        this.name = name;

        /** Chemin vers le png de la map */
        this.src = src;

        /** Tableaux contenant l'ensemble des blocs de la map (30*20) */
        this.blocks = blocks;
    }
}