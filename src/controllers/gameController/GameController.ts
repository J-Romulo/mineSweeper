import { IUserInterface } from "../../application/UserInterface/IUserInterface"
import { Field } from "../../data/field/Field"
import { IUserInputs } from "../../application/UserInputs/IUserInputs"
import { ILeaderboardController } from "../leaderboardController/ILeaderboardController"
import { State } from "./gameStates/State"
import { OnGoingState } from "./gameStates/OnGoingState"

export class GameController {
    private userInterface: IUserInterface
    private userOperations: IUserInputs
    private leaderboardsController: ILeaderboardController
    
    difficultyBeingPlayed: 1 | 2 | 3 | null = null
    fieldBeingPlayed: Field | null = null
    roundsPlayed = 0;
    gameStatus: State

    constructor(userInterface: IUserInterface, userInputs: IUserInputs, leaderboardController: ILeaderboardController) {
        this.leaderboardsController = leaderboardController
        this.userInterface = userInterface
        this.userOperations = userInputs

        this.gameStatus = new OnGoingState(userInterface, userInputs, leaderboardController)
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
        while(this.gameStatus instanceof OnGoingState){
            this.playRound()
            let newGameStatus = this.fieldBeingPlayed!.checkGameStatus()
            if(newGameStatus !== 'ongoing') this.gameStatus = this.gameStatus.changeStatus(newGameStatus as 'victory' | 'defeat')
            this.roundsPlayed++
        }

        this.manageEndgame()
    }

    manageEndgame(){
        this.userInterface.finalField(this.fieldBeingPlayed!.field)

        this.gameStatus.process(this.roundsPlayed, this.difficultyBeingPlayed)
        this.gameStatus = this.gameStatus.changeStatus()

        this.startGame()
    }

    playRound(){
        this.userInterface.field(this.fieldBeingPlayed!.field)
            
        this.userInterface.playOptions()
        const optionsSelected = this.userOperations.promptUser('numeric', [1,2])

        const {x, y} = this.userOperations.fieldCoordinates()

        if(optionsSelected === 1){
            this.fieldBeingPlayed!.selectPoint(x, y)
        }else{
            this.fieldBeingPlayed!.positionFlag(x, y)
        }
    }
}