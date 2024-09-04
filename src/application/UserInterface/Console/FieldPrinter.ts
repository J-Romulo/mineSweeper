export class FieldPrinter {
    field(field: number[][]) {
        this.columnsCoordinatesRow(field[0])

        console.log('   ┌' + '─'.repeat(field[0].length * 4) + '┐');

        this.fieldRows(field)

        console.log('   └' + '─'.repeat(field[0].length * 4) + '┘');
    }

    columnsCoordinatesRow(columns: number[]) {
        const columnsIndexes = columns.map((value, index) => {
            return index < 10 ? ` ${index} ` : ` ${index}`
        })

        console.log('   ', ...columnsIndexes);
    }

    fieldRows(field: number[][]){
        for (let i = 0; i < field.length; i++) {
            let rowToPrint = i < 10 ? ` ${i} │` : `${i} │`;
            for (let j = 0; j < field[0].length; j++) {
                rowToPrint += this.getValueToPrint(field[i][j])
                rowToPrint += ' ';
            }
            rowToPrint += '│';
            console.log(rowToPrint);
        }
    }

    getValueToPrint(value: number){
        switch (value) {
            case -1: // Unrevealed bomb
                return ' \x1b[34m?\x1b[0m ';
            case -10: // Revealed bomb
                return ' \x1b[31mX\x1b[0m ';
            case 0: // Unrevealed space
                return ' \x1b[34m?\x1b[0m ';
            case -2: // Revealed space
                return '   ';
            default:
                return ` ${value} `;
        }
    }
}