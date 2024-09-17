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

    constructor(difficulty: number) {
        const difficultyCalculator = new DifficultyFactory().createDifficultyStrategy(difficulty);

        this.size = difficultyCalculator.calculateSize()
        this.bombsTotal = difficultyCalculator.calculateBombs()

        this.field = FieldCreator.createField(this.size);

        BombPlacer.placeBombsInField(this.field, this.bombsTotal)
    }

    selectPoint(x: number, y: number) {
        if (!this.isValidCoordinate(x, y)) {
            return;
        }

        const adjacentBombsChecker = new AdjacentBombsChecker(this.field)

        const pointSelected = this.field[y][x]

        pointSelected.revealCell()

        adjacentBombsChecker.checkAdjacentArea(x, y)
    }

    positionFlag(x: number, y: number) {
        const pointSelected = this.field[y][x]

        pointSelected.setFlag()
    }

    checkGameStatus() {
        let gameStatus = 'ongoing'

        let unrevealedSpaces = 0

        this.field.forEach((row) => {
            row.forEach((cell) => {
                if(cell.checkRevealedBomb()) gameStatus = 'defeat'
                if(cell.checkUnrevealedBomb() || cell.checkUnrevealedEmptySpace()) unrevealedSpaces++
            })
        })

        if(gameStatus === 'defeat') return gameStatus

        if(unrevealedSpaces === this.bombsTotal){
            return 'victory'
        } 
        
        return 'ongoing'
    }

    private isValidCoordinate(x: number, y: number): boolean {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }
}