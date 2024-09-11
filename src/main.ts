import { FilePersistense } from "./application/persistence/filePersistence/FilePersistence"
import { IPersistence } from "./application/persistence/interfaces/IPersistence"
import { UserInputs } from "./application/UserInputs/UserInputs"
import { ConsoleInterface } from "./application/UserInterface/Console/ConsoleInterface"
import { IUserInterface } from "./application/UserInterface/IUserInterface"
import { GameController } from "./controllers/gameController/GameController"
import { LeaderboardController } from "./controllers/leaderboardController/LeaderboardController"
import { PersonalRecordRepository } from "./data/personalRecord/repository/PersonalRecordRepository"

class Main {
    execute() {
        const userInterface: IUserInterface = new ConsoleInterface()
        const repository: IPersistence = new FilePersistense()
        const userInputs = new UserInputs()
        const personalRecordRepository = new PersonalRecordRepository(repository)
        
        const leaderboardController = new LeaderboardController(userInterface, personalRecordRepository)

        const gameController = new GameController(userInterface, userInputs, leaderboardController)

        gameController.startGame()
    }
}

new Main().execute()