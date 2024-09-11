import { Bombs } from "./Bombs"

export class CellContent {
    private flag: boolean;
    private bombs: Bombs;

    constructor() {
        this.flag = false;
        this.bombs = new Bombs();
    }

    activateBomb() {
        this.bombs.activateBomb();
    }

    hasBomb(): boolean {
        return this.bombs.hasBomb();
    }

    addFlag() {
        this.flag = true;
    }

    hasFlag(): boolean {
        return this.flag;
    }

    setAdjacentBombs(bombsAdjacent: number) {
        this.bombs.adjacentBombs = bombsAdjacent;
    }

    getAdjacentBombs(): number {
        return this.bombs.adjacentBombs;
    }
}