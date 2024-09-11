import { FilePersistense } from "./application/Repository/FilePersistence/FilePersistence"
import { IRepository } from "./application/Repository/IRepository"
import { ConsoleInterface } from "./application/UserInterface/Console/ConsoleInterface"
import { IUserInterface } from "./application/UserInterface/IUserInterface"
import { GameController } from "./services/gameController/GameController"

class Main {
    execute() {
        const userInterface: IUserInterface = new ConsoleInterface()
        const repository: IRepository = new FilePersistense()

        const gameController = new GameController(userInterface, repository)

        gameController.startGame()
    }
}

new Main().execute()