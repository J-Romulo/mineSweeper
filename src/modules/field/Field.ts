import { BombPlacer } from "./BombPlacer";
import { FieldCreator } from "./FieldCreator"
import { DifficultyFactory } from "./difficultyCalculators/DifficultyFactory";

export class Field {
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
}