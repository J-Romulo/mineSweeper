import { Cell } from "../../modules/cell/Cell";

export interface IUserInterface {
    mainMenu: () => void;
    difficultyLevel: () => void;
    field: (field: Cell[][]) => void
    finalField: (field: Cell[][]) => void
}