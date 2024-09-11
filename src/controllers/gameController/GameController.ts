import { IUserInterface } from "../../application/UserInterface/IUserInterface"
import { Field } from "../../data/field/Field"
import { IUserInputs } from "../../application/UserInputs/IUserInputs"
import { ILeaderboardController } from "../leaderboardController/ILeaderboardController"

export class GameController {
    private userInterface: IUserInterface
    private userOperations: IUserInputs
    private leaderboardsController: ILeaderboardController
    
    private difficultyBeingPlayed: 1 | 2 | 3 | null = null
    private fieldBeingPlayed: Field | null = null

    constructor(userInterface: IUserInterface, userInputs: IUserInputs, leaderboardController: ILeaderboardController) {
        this.leaderboardsController = leaderboardController
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
        let gameStatus: 'ongoing' | 'victory' | 'defeat' = 'ongoing'
        let roundsPlayed = 0

        while(gameStatus === 'ongoing'){
            this.userInterface.field(this.fieldBeingPlayed!.field)
            
            this.userInterface.playOptions()
            const optionsSelected = this.userOperations.promptUser('numeric', [1,2])

            const {x, y} = this.userOperations.fieldCoordinates()

            if(optionsSelected === 1){
                this.fieldBeingPlayed!.selectPoint(x, y)
            }else{
                this.fieldBeingPlayed!.positionFlag(x, y)
            }

            gameStatus = this.fieldBeingPlayed!.checkGameStatus()
            roundsPlayed++
        }

        this.userInterface.finalField(this.fieldBeingPlayed!.field)

        this.manageEndgame(gameStatus, roundsPlayed)

        this.startGame()
    }

    manageEndgame(endGame: 'ongoing' | 'victory' | 'defeat', roundsPlayed: number){
        if(endGame === 'victory'){
            this.userInterface.getPlayerNickname()
            const playerNickname = this.userOperations.promptUser('text')
    
            this.leaderboardsController.saveRecord(String(playerNickname), roundsPlayed, this.difficultyBeingPlayed as 1 | 2 | 3)
        }
    }
}