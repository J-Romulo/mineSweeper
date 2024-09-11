import { Cell } from '../../../data/cell/Cell';
import { IUserInterface } from '../IUserInterface';
import { FieldPrinter } from './FieldPrinter';
import { LeaderboardsPrinter } from './LeaderboardsPrinter';

export class ConsoleInterface implements IUserInterface {
    private fieldPrinter: FieldPrinter
    private leaderboardsPrinter: LeaderboardsPrinter

    constructor(){
        this.fieldPrinter = new FieldPrinter()
        this.leaderboardsPrinter = new LeaderboardsPrinter()
    }

    mainMenu() {
        console.log(`
=== Menu Principal ===
1. Jogar 
2. Pontuações
3. Sair`)
    }

    difficultyLevel() {
        console.log(`=== Nível de dificuldade ===
1. Fácil 
2. Médio
3. Difícil`)
    }

    field(field: Cell[][]) {
        this.fieldPrinter.field(field)
    }

    finalField(field: Cell[][]) {
        this.fieldPrinter.field(field, true)
    }

    playOptions() {
        console.log(`
=== Próxima jogada ===
1. Jogada padrão 
2. Posicionar bandeira`)
    }

    getPlayerNickname() {
        console.log(`
=== Parabéns você venceu!! ===

+++ Escreva seu nome para salvar no leaderboard +++`)
    }

    displayLeaderboard(records: any[]){
        this.leaderboardsPrinter.printLeaderboard(records)
    }
}