import promptSync from "prompt-sync"
import { IUserInputs } from "./IUserInputs"

export class UserInputs implements IUserInputs {
    prompt: promptSync.Prompt

    constructor() {
        this.prompt = promptSync()
    }

    promptUser(typeInput: 'numeric' | 'text', options?: number[], text = ''): string | number {
        const usersInput = this.prompt(`${text}>> `)

        const validInput = this.validateInput(usersInput, typeInput, options)

        if(!validInput) {
            return this.promptUser(typeInput, options, text)
        }else{
            return this.convertInputType(usersInput, typeInput)
        }
    }

    validateInput(input: string, typeInput: 'numeric' | 'text', options?: number[]) {
        let validInput = false

        if(typeInput === 'numeric'){
            validInput = this.validateNumericInput(input, options!)

            if(!validInput) console.log('Entrada inválida! Escolha um número entre as opções disponibilizadas.')
        }

        if(typeInput === 'text'){
            validInput = this.validateTextInput(input)

            if(!validInput) console.log('Entrada inválida! O texto deve ser menor que 255 caracteres.')
        }

        return validInput
    }

    validateNumericInput(input: string, options: number[]){
        return  options?.includes(Number(input))
    }

    validateTextInput(input: string){
        return input.length < 255
    }

    convertInputType(input: string, typeInput: 'numeric' | 'text') {
        if(typeInput === 'numeric') return Number(input)
        
        return String(input)
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