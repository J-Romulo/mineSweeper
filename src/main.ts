import { ConsoleInterface } from "./application/UserInterface/Console/ConsoleInterface"
import { GraphicsInterface } from "./application/UserInterface/Graphics/GraphicsInterface"
import { IUserInterface } from "./application/UserInterface/IUserInterface"
import { GameController } from "./services/GameController"

class Main {
    execute() {
        const userInterface: IUserInterface = new ConsoleInterface()
        const gameController = new GameController(userInterface)

        const gameField = gameController.startGame()

        gameController.mainLoop(gameField)
    }
}

new Main().execute()