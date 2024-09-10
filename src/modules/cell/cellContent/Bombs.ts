export class Bombs {
    private bombInCell: boolean;
    adjacentBombs: number;

    constructor() {
        this.bombInCell = false;
        this.adjacentBombs = 0;
    }

    activateBomb() {
        this.bombInCell = true;
    }

    hasBomb(): boolean {
        return this.bombInCell;
    }

    setAdjacentBombs(bombsAdjacent: number) {
        this.adjacentBombs = bombsAdjacent;
    }

    getAdjacentBombs(): number {
        return this.adjacentBombs;
    }
}