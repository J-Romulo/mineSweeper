import { OnGoingState } from "./OnGoingState";
import { State } from "./State";

export class DefeatState extends State {
    process() {
       return
    }

    changeStatus() {
        return new OnGoingState(this.userInterface, this.userOperations, this.leaderboardsController)
    }
}