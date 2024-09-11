import { Cell } from "../../cell/Cell"

export class BombPlacer {
    static placeBombsInField(field: Cell[][], bombs: number){
        for(let i = 0; i < bombs; i++) {
            let { xPosition, yPosition } = this.getRandomCoordinates(field[0].length)

            while(!field[yPosition][xPosition].placeBomb()){
                ({ xPosition, yPosition } = this.getRandomCoordinates(field[0].length))
            }
        }
    }

    static getRandomCoordinates(range: number){
        let xPosition = Math.floor(Math.random() * range)
        let yPosition = Math.floor(Math.random() * range)

        return {
            xPosition,
            yPosition
        }
    }
}