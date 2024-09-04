import { BombPlacer } from "./BombPlacer";
import { FieldCreator } from "./FieldCreator"
import { DifficultyFactory } from "./difficultyCalculators/DifficultyFactory";
import { IField } from "./interfaces/IField";

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
        const pointSelected = this.field[y][x]

        if(pointSelected === -1) {
            this.field[y][x] = -10
            return false
        }

        this.checkAdjacentBombs(x, y)

        return true
    }

    checkAdjacentBombs(x: number, y: number){
        let totalBombsAdjacent = 0
        let originalX = x
        let originalY = y
        for(y = originalY - 1; y < originalY + 2; y++){
            for(x = originalX - 1; x < originalX + 2; x++){
                if((y >= 0 && y < this.size) && (x >= 0 && x < this.size)){
                    if(this.field[y][x] === -1) totalBombsAdjacent++
                }
            }
        }

        this.field[originalY][originalX] = totalBombsAdjacent === 0 ? -2 : totalBombsAdjacent

        if(totalBombsAdjacent === 0){
            for(y = originalY - 1; y < originalY + 2; y++){
                for(x = originalX - 1; x < originalX + 2; x++){
                    if((y >= 0 && y < this.size) && (x >= 0 && x < this.size)){
                        if((x !== originalX || y !== originalY) && this.field[y][x] === 0){
                            this.checkAdjacentBombs(x, y)
                        }
                    }
                }
            }
        }

        return totalBombsAdjacent
    }
}