export class AdjacentBombsChecker {
    private fieldToCheck: number[][]

    constructor(field: number[][]){
        this.fieldToCheck = field
    }

    checkAdjacentArea(x: number, y: number) {
        let totalBombsAdjacent = this.countAdjacentBombs(x, y)

        if(totalBombsAdjacent === 0){
            this.expandEmptyArea(x, y)
        }
    }

    countAdjacentBombs(x: number, y: number){
        let totalBombsAdjacent = 0
        let originalX = x
        let originalY = y

        for(let y = originalY - 1; y < originalY + 2; y++){
            for(let x = originalX - 1; x < originalX + 2; x++){
                if (this.isWithinBounds(x, y) && this.fieldToCheck[y][x] === -1) totalBombsAdjacent++
            }
        }

        this.fieldToCheck[originalY][originalX] = totalBombsAdjacent === 0 ? -2 : totalBombsAdjacent

        return totalBombsAdjacent
    }

    expandEmptyArea(x: number, y: number) {
        let originalX = x
        let originalY = y

        for(y = originalY - 1; y < originalY + 2; y++){
            for(x = originalX - 1; x < originalX + 2; x++){
                if(this.isWithinBounds(x, y) && (x !== originalX || y !== originalY) && this.fieldToCheck[y][x] === 0){
                    this.checkAdjacentArea(x, y)
                }
            }
        }
    }

    isWithinBounds(x: number, y: number): boolean {
        return x >= 0 && x < this.fieldToCheck.length && y >= 0 && y < this.fieldToCheck.length;
    }
}