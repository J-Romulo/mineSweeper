
import { IUserInputs } from "../../../application/UserInputs/IUserInputs";
import { IUserInterface } from "../../../application/UserInterface/IUserInterface";
import { ILeaderboardController } from "../../leaderboardController/ILeaderboardController";
import { DefeatState } from "./DefeatState";
import { OnGoingState } from "./OnGoingState";
import { VictoryState } from "./VictoryState";

export abstract class State {
    protected userInterface: IUserInterface
    protected userOperations: IUserInputs
    protected leaderboardsController: ILeaderboardController
    

    constructor(userInterface: IUserInterface, userInputs: IUserInputs, leaderboardController: ILeaderboardController) {
        this.userInterface = userInterface
        this.userOperations = userInputs
        this.leaderboardsController = leaderboardController
    }

    abstract changeStatus(status?: 'ongoing' | 'victory' | 'defeat'): State
    abstract process(roundsPlayed?: number, difficultyBeingPlayed?: 1 | 2 | 3 | null): void;
}