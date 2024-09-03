import promptSync from 'prompt-sync';

export class ConsoleInterface implements IUserInterface {
    prompt: any

    constructor() {
        this.prompt = promptSync()
    }

    mainMenu() {
        console.log(`=== Menu Principal ===
1. Jogar 
2. Sair`)
        const optionSelected = this.prompt(`>> `)

        return Number(optionSelected)
    }

    getDifficultyLevel(): 1 | 2 | 3 {
        console.log(`=== Nível de dificuldade ===
1. Fácil 
2. Médio
3. Difícil`)

        const optionSelected = this.prompt(`>> `)

        return Number(optionSelected) as 1 | 2 | 3
    }
}