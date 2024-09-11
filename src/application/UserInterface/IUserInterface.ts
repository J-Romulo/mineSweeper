import { Cell } from "../../data/cell/Cell";

export interface IUserInterface {
    mainMenu: () => void;
    difficultyLevel: () => void;
    field: (field: Cell[][]) => void
    finalField: (field: Cell[][]) => void
    playOptions: () => void
    getPlayerNickname: () => void
    displayLeaderboard: (records: any[]) => void
}