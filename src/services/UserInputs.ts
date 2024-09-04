import promptSync from "prompt-sync"

export class UserInputs {
    prompt: any

    constructor() {
        this.prompt = promptSync()
    }

    mainMenu() {
        const optionSelected = this.prompt(`>> `)

        return Number(optionSelected)
    }

    difficultyLevel() {
        const optionSelected = this.prompt(`>> `)

        return Number(optionSelected) as 1 | 2 | 3
    }

    fieldCoordinates(): {x: number, y: number} {
        const rowSelected = this.prompt(`Coordenada da linha >> `)
        const columnSelected = this.prompt(`Coordenada da coluna >> `)

        return {
            x: Number(columnSelected),
            y: Number(rowSelected)
        }
    }
}