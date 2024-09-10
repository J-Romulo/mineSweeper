import { Cell } from "../../../modules/cell/Cell";

export class FieldPrinter {
    field(field: Cell[][], reveal = false) {
        this.columnsCoordinatesRow(field[0])

        console.log('   ┌' + '─'.repeat(field[0].length * 4) + '┐');

        this.fieldRows(field, reveal)

        console.log('   └' + '─'.repeat(field[0].length * 4) + '┘');
    }

    columnsCoordinatesRow(columns: Cell[]) {
        const columnsIndexes = columns.map((value, index) => {
            return index < 10 ? ` ${index} ` : ` ${index}`
        })

        console.log('   ', ...columnsIndexes);
    }

    fieldRows(field: Cell[][], reveal = false){
        for (let i = 0; i < field.length; i++) {
            let rowToPrint = i < 10 ? ` ${i} │` : `${i} │`;
            for (let j = 0; j < field[0].length; j++) {
                rowToPrint += this.getValueToPrint(field[i][j], reveal)
                rowToPrint += ' ';
            }
            rowToPrint += '│';
            console.log(rowToPrint);
        }
    }

    getValueToPrint(value: Cell, reveal = false){
        if (value.checkFlag()) {
            return ` \x1b[32mF\x1b[0m `;
        } else if (value.checkUnrevealedEmptySpace()) {
            return ' \x1b[34m?\x1b[0m ';
        } else if (value.checkRevealedEmptySpace()) {
            return '   ';
        } else if (value.checkUnrevealedBomb()) {
            return reveal ?  ' \x1b[31mX\x1b[0m ' : ' \x1b[34m?\x1b[0m ';
        } else if (value.checkRevealedBomb()) {
            return ' \x1b[31mX\x1b[0m ';
        } else {
            return ` ${value.getAdjacentBombs()} `
        }
    }
}