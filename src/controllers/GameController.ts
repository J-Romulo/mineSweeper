import { IRepository } from "../application/Repository/IRepository"
import { IUserInterface } from "../application/UserInterface/IUserInterface"
import { Field } from "../data/field/Field"
import { UserInputs } from "../application/UserInputs/UserInputs"
import { LeaderboardsController } from "./LeaderboardsController"
import { IUserInputs } from "../application/UserInputs/IUserInputs"

export class GameController {
    private userInterface: IUserInterface
    private userOperations: IUserInputs
    private leaderboardsController: LeaderboardsController
    private difficultyBeingPlayed: 1 | 2 | 3 | null = null
    private fieldBeingPlayed: Field | null = null

    constructor(userInterface: IUserInterface, repository: IRepository, userInputs: IUserInputs) {
        this.leaderboardsController = new LeaderboardsController(repository, userInterface)
        this.userInterface = userInterface
        this.userOperations = userInputs
    }

    startGame() {
        this.mainMenu()
    }

    mainMenu() {
        let mainMenuSelection: string | number = 0
        
        while(mainMenuSelection !== 3){
            this.userInterface.mainMenu()
            mainMenuSelection = this.userOperations.promptUser("numeric", [1,2,3])

            if(mainMenuSelection === 1){
                console.clear()
    
                this.userInterface.difficultyLevel()
                const difficultyLevel = this.userOperations.promptUser('numeric', [1,2,3])
        
                this.difficultyBeingPlayed = difficultyLevel as 1 | 2 | 3
                this.fieldBeingPlayed = new Field(this.difficultyBeingPlayed)
    
                this.mainLoop()
            }
            else if(mainMenuSelection === 2){
                this.leaderboardsController.showLeaderboards()
            }else {
                process.exit(1)
            }
        }
    }

    mainLoop() {
        let endGame = false
        let selectionResult = true
        let roundsPlayed = 0

        while(selectionResult && !endGame){
            this.userInterface.field(this.fieldBeingPlayed!.field)
            
            this.userInterface.playOptions()
            const optionsSelected = this.userOperations.promptUser('numeric', [1,2])

            const {x, y} = this.userOperations.fieldCoordinates()

            if(optionsSelected === 1){
                selectionResult = this.fieldBeingPlayed!.selectPoint(x, y)
            }else{
                this.fieldBeingPlayed!.positionFlag(x, y)
            }

            endGame = this.fieldBeingPlayed!.checkEndGame()
            roundsPlayed++
        }

        this.userInterface.finalField(this.fieldBeingPlayed!.field)

        if(endGame){
            this.manageEndgame(roundsPlayed)
        }

        this.startGame()
    }

    manageEndgame(roundsPlayed: number){
        this.userInterface.getPlayerNickname()
        const playerNickname = this.userOperations.promptUser('text')

        this.leaderboardsController.saveRecord(String(playerNickname), roundsPlayed, this.difficultyBeingPlayed as 1 | 2 | 3)
    }
}