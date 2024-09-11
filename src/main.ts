import { FilePersistense } from "./application/Repository/FilePersistence/FilePersistence"
import { IRepository } from "./application/Repository/IRepository"
import { UserInputs } from "./application/UserInputs/UserInputs"
import { ConsoleInterface } from "./application/UserInterface/Console/ConsoleInterface"
import { IUserInterface } from "./application/UserInterface/IUserInterface"
import { GameController } from "./controllers/gameController/GameController"
import { LeaderboardController } from "./controllers/leaderboardController/LeaderboardController"

class Main {
    execute() {
        const userInterface: IUserInterface = new ConsoleInterface()
        const repository: IRepository = new FilePersistense()
        const userInputs = new UserInputs()
        const leaderboardController = new LeaderboardController(repository, userInterface)

        const gameController = new GameController(userInterface, userInputs, leaderboardController)

        gameController.startGame()
    }
}

new Main().execute()