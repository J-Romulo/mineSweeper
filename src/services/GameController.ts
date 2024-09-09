import { Field } from "../modules/field/Field"
import { UserInputs } from "./UserInputs"

export class GameController {
    private userInterface: IUserInterface
    private userOperations: UserInputs

    constructor(userInterface: IUserInterface) {
        this.userInterface = userInterface
        this.userOperations = new UserInputs()
    }

    startGame() {
        this.userInterface.mainMenu()
        let mainMenuSelection = this.userOperations.mainMenu()

        if(mainMenuSelection === 2) process.exit(1)

        console.clear()

        this.userInterface.difficultyLevel()
        const difficultyLevel = this.userOperations.difficultyLevel()

        return new Field(difficultyLevel)
    }

    mainLoop(field: Field) {
        let selectionResult = true

        while(selectionResult){
            this.userInterface.field(field.field)
            
            const {x, y} = this.userOperations.fieldCoordinates()
    
            selectionResult = field.selectPoint(x, y)
        }

        this.userInterface.finalField(field.field)

        const gameField = this.startGame()

        this.mainLoop(gameField)
    }
}