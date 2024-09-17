import { DefeatState } from "./DefeatState";
import { State } from "./State";
import { VictoryState } from "./VictoryState";

export class OnGoingState extends State {
    process() {
       return
    }

    changeStatus(status?: 'ongoing' | 'victory' | 'defeat') {
        if(status === 'victory'){
            return new VictoryState(this.userInterface, this.userOperations, this.leaderboardsController)
        }else {
            return new DefeatState(this.userInterface, this.userOperations, this.leaderboardsController)
        }
    }
}