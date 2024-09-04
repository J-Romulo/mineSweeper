import { ConsoleInterface } from "./application/UserInterface/Console/ConsoleInterface"
import { Field } from "./modules/field/Field"
import { GameController } from "./services/GameController"
import { UserInputs } from "./services/UserInputs"

class Main {
    execute() {
        const userInterface: IUserInterface = new ConsoleInterface()
        const gameController = new GameController(userInterface)

        const gameField = gameController.startGame()

        gameController.mainLoop(gameField)
    }
}

new Main().execute()