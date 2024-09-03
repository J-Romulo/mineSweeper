export class Field {
    private size: number
    private bombsTotal: number
    field: number[][]

    constructor(difficulty: 1 | 2 | 3) {
        const boardSize = this.calculateFieldSizeBasedOnDifficulty(difficulty)
        const bombsTotal = this.calculateBombsTotalBasedOnDifficulty(difficulty)

        this.size = boardSize
        this.bombsTotal = bombsTotal

        this.field = this.initiateField(boardSize, bombsTotal)
    }

    private initiateField(size: number, bombs: number): number[][] {
        let newField: number[][] = this.initiateFieldMatrix(size)

        this.placeBombsInField(newField, bombs)

        return newField
    }

    private initiateFieldMatrix(size: number){
        let matrix: number[][] = []

        for(let i = 0; i < size; i++) {
            matrix[i] = []

            for(let j = 0; j < size; j++) {
                matrix[i][j] = 0
            }
        }

        return matrix
    }

    private placeBombsInField(field: number[][], bombs: number){
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

    private calculateFieldSizeBasedOnDifficulty(difficulty: 1 | 2 | 3) {
        switch(difficulty) {
            case 1: {
                return 10
            }

            case 2: {
                return 20
            }

            case 3: {
                return 30
            }
        }
    }

    private calculateBombsTotalBasedOnDifficulty(difficulty: 1 | 2 | 3) {
        switch(difficulty) {
            case 1: {
                return 20
            }

            case 2: {
                return 60
            }

            case 3: {
                return 100
            }
        }
    }
}