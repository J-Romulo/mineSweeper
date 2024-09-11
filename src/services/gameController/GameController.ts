import { IRepository } from "../../application/Repository/IRepository"
import { IUserInterface } from "../../application/UserInterface/IUserInterface"
import { Field } from "../../modules/field/Field"
import { UserInputs } from "../UserInputs"
import { LeaderboardsController } from "./LeaderboardsController"

export class GameController {
    private userInterface: IUserInterface
    private userOperations: UserInputs
    private leaderboardsController: LeaderboardsController
    private difficultyBeingPlayed: 1 | 2 | 3 | null = null
    private fieldBeingPlayed: Field | null = null

    constructor(userInterface: IUserInterface, repository: IRepository) {
        this.leaderboardsController = new LeaderboardsController(repository, userInterface)
        this.userInterface = userInterface
        this.userOperations = new UserInputs()
    }

    startGame() {
        this.mainMenu()
    }

    mainMenu() {
        let mainMenuSelection = 0
        
        while(mainMenuSelection !== 3){
            this.userInterface.mainMenu()
            mainMenuSelection = this.userOperations.mainMenu()

            if(mainMenuSelection === 1){
                console.clear()
    
                this.userInterface.difficultyLevel()
                const difficultyLevel = this.userOperations.difficultyLevel()
        
                this.difficultyBeingPlayed = difficultyLevel
                this.fieldBeingPlayed = new Field(difficultyLevel)
    
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
            const optionsSelected = this.userOperations.playOptions()

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
            this.userInterface.getPlayerNickname()
            const playerNickname = this.userOperations.getPlayerNickname()

            this.leaderboardsController.saveRecord(playerNickname, roundsPlayed, this.difficultyBeingPlayed as 1 | 2 | 3)
        }

        this.startGame()
    }
}