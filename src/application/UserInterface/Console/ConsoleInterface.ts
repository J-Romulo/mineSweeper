import { Cell } from '../../../modules/cell/Cell';
import { IUserInterface } from '../IUserInterface';
import { FieldPrinter } from './FieldPrinter';

export class ConsoleInterface implements IUserInterface {
    mainMenu() {
        console.log(`
=== Menu Principal ===
1. Jogar 
2. Sair`)
    }

    difficultyLevel() {
        console.log(`=== Nível de dificuldade ===
1. Fácil 
2. Médio
3. Difícil`)
    }

    field(field: Cell[][]) {
        const fieldPrinter = new FieldPrinter()

        fieldPrinter.field(field)
    }

    finalField(field: Cell[][]) {
        const fieldPrinter = new FieldPrinter()

        fieldPrinter.field(field, true)
    }
}