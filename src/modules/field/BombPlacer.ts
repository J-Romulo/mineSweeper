import { SpaceValues } from "./utilities/SpaceValues"

export class BombPlacer {
    placeBombsInField(field: number[][], bombs: number){
        for(let i = 0; i < bombs; i++) {
            let { xPosition, yPosition } = this.getRandomCoordinates(field[0].length)

            while(field[yPosition][xPosition] === SpaceValues.Unrevealed_bomb){
                ({ xPosition, yPosition } = this.getRandomCoordinates(field[0].length))
            }

            field[yPosition][xPosition] = SpaceValues.Unrevealed_bomb
        }
    }

    getRandomCoordinates(range: number){
        let xPosition = Math.floor(Math.random() * range)
        let yPosition = Math.floor(Math.random() * range)

        return {
            xPosition,
            yPosition
        }
    }
}