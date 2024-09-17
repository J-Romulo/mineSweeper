import { OnGoingState } from "./OnGoingState";
import { State } from "./State";

export class VictoryState extends State {
    process(roundsPlayed: number, difficultyBeingPlayed: 1 | 2 | 3 | null) {
        this.userInterface.getPlayerNickname()
        const playerNickname = this.userOperations.promptUser('text')

        this.leaderboardsController.saveRecord(String(playerNickname), roundsPlayed, difficultyBeingPlayed!)
    }

    changeStatus() {
        return new OnGoingState(this.userInterface, this.userOperations, this.leaderboardsController)
    }
}