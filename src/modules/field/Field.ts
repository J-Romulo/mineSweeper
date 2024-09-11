import { Cell } from "../cell/Cell";
import { AdjacentBombsChecker } from "./AdjacentBombsChecker";
import { BombPlacer } from "./helpers/BombPlacer";
import { FieldCreator } from "./helpers/FieldCreator"
import { DifficultyFactory } from "./difficultyCalculators/DifficultyFactory";
import { IField } from "./interfaces/IField";

export class Field implements IField {
    private size: number
    private bombsTotal: number
    field: Cell[][]

    //Implement dependency injection
    constructor(difficulty: number) {
        const difficultyCalculator = new DifficultyFactory().createDifficultyStrategy(difficulty);

        this.size = difficultyCalculator.calculateSize()
        this.bombsTotal = difficultyCalculator.calculateBombs()

        this.field = FieldCreator.createField(this.size);

        BombPlacer.placeBombsInField(this.field, this.bombsTotal)
    }

    selectPoint(x: number, y: number) {
        if (!this.isValidCoordinate(x, y)) {
            return true;
        }

        const adjacentBombsChecker = new AdjacentBombsChecker(this.field)

        const pointSelected = this.field[y][x]

        const emptyCellRevealed = pointSelected.revealCell()
        if(!emptyCellRevealed) return false

        adjacentBombsChecker.checkAdjacentArea(x, y)

        return true
    }

    positionFlag(x: number, y: number) {
        const pointSelected = this.field[y][x]

        pointSelected.setFlag()

        return true
    }

    checkEndGame() {
        let unrevealedSpaces = 0

        this.field.forEach((row) => {
            row.forEach((cell) => {
                if(cell.checkRevealedBomb()) return true
                if(cell.checkUnrevealedBomb() || cell.checkUnrevealedEmptySpace()) unrevealedSpaces++
            })
        })

        if(unrevealedSpaces === this.bombsTotal){
            return true
        } 
        
        return false
    }

    private isValidCoordinate(x: number, y: number): boolean {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }
}