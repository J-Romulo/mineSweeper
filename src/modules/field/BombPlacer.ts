export class BombPlacer {
    placeBombsInField(field: number[][], bombs: number){
        for(let i = 0; i < bombs; i++) {
            let xPosition = Math.floor(Math.random() * field[0].length)
            let yPosition = Math.floor(Math.random() * field[0].length)

            while(field[yPosition][xPosition] === -1){
                xPosition = Math.floor(Math.random() * field[0].length)
                yPosition = Math.floor(Math.random() * field[0].length)
            }

            field[yPosition][xPosition] = -1
        }
    }
}