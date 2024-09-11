import { CellContent } from "./cellContent/CellContent"

export class Cell {
    private hidden: boolean;
    private content: CellContent;

    constructor() {
        this.hidden = true;
        this.content = new CellContent();
    }

    placeBomb(): boolean {
        if (this.content.hasBomb()) return false;

        this.content.activateBomb();
        return true;
    }

    revealCell() {
        this.hidden = false;
    }

    checkRevealedEmptySpace(): boolean {
        return !this.hidden && !this.content.hasBomb() && !this.getAdjacentBombs();
    }

    checkUnrevealedEmptySpace(): boolean {
        return this.hidden && !this.content.hasBomb() && !this.getAdjacentBombs();
    }

    checkRevealedBomb(): boolean {
        return !this.hidden && this.content.hasBomb();
    }

    checkUnrevealedBomb(): boolean {
        return this.hidden && this.content.hasBomb();
    }

    setFlag() {
        return this.hidden && this.content.addFlag();
    }

    checkFlag(): boolean {
        return this.hidden && this.content.hasFlag();
    }

    getAdjacentBombs(): number {
        return this.content.getAdjacentBombs();
    }

    setAdjacentBombs(bombsAdjacent: number) {
        this.content.setAdjacentBombs(bombsAdjacent)
    }
}