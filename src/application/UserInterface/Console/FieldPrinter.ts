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
                if (field[i][j] === -1) { // Bomba não revelada
                    rowToPrint += ' \x1b[34m?\x1b[0m '; 
                }else if (field[i][j] === -10) { // Bomba revelada
                    rowToPrint += ' \x1b[31mX\x1b[0m '; 
                } else if (field[i][j] === 0) { // Espaço não revelado
                    rowToPrint += ' \x1b[34m?\x1b[0m '; 
                } else if (field[i][j] === -2) {
                    rowToPrint += '   '; // Espaço revelado
                } else {
                    rowToPrint += ` ${field[i][j]} `
                }
                rowToPrint += ' ';
            }
            rowToPrint += '│';
            console.log(rowToPrint);
        }
    }
}