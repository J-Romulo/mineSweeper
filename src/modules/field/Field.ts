import { AdjacentBombsChecker } from "./AdjacentBombsChecker";
import { BombPlacer } from "./BombPlacer";
import { FieldCreator } from "./FieldCreator"
import { DifficultyFactory } from "./difficultyCalculators/DifficultyFactory";
import { IField } from "./interfaces/IField";
import { SpaceValues } from "./utilities/SpaceValues";

export class Field implements IField {
    private size: number
    private bombsTotal: number
    field: number[][]

    //Implement dependency injection
    constructor(difficulty: number) {
        const fieldCreator = new FieldCreator();
        const bombPlacer = new BombPlacer();
        const difficultyCalculator = new DifficultyFactory().createDifficultyStrategy(difficulty);

        this.size = difficultyCalculator.calculateSize()
        this.bombsTotal = difficultyCalculator.calculateBombs()

        this.field = fieldCreator.createField(this.size);

        bombPlacer.placeBombsInField(this.field, this.bombsTotal)
    }

    selectPoint(x: number, y: number) {
        if (!this.isValidCoordinate(x, y)) {
            return true;
        }

        const adjacentBombsChecker = new AdjacentBombsChecker(this.field)

        const pointSelected = this.field[y][x]

        if(pointSelected === SpaceValues.Unrevealed_bomb) {
            this.field[y][x] = SpaceValues.Revealed_bomb
            return false
        }

        adjacentBombsChecker.checkAdjacentArea(x, y)

        return true
    }

    private isValidCoordinate(x: number, y: number): boolean {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }
}