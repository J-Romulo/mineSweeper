import { ConsoleInterface } from "./infra/UserInterface/ConsoleInterface"
import { Field } from "./modules/field/Field"

class Main {
    execute() {
        const userInterface: IUserInterface = new ConsoleInterface()

        let mainMenuSelection = userInterface.mainMenu()

        if(mainMenuSelection === 2)         process.exit(1)

        console.clear()

        const difficultyLevel = userInterface.getDifficultyLevel()

        const gameField = new Field(difficultyLevel)

        console.log(gameField.field)
    }
}

new Main().execute()