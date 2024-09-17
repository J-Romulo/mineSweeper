import { Cell } from "../../../data/cell/Cell";
import { IUserInterface } from "../IUserInterface";

export class GraphicsInterface implements IUserInterface {
    mainMenu() {

/*         const win = new QMainWindow();

        win.show();
        (global as any).win = win; */
    }

    difficultyLevel() {
    // TODO: Implement difficulty level logic
    }
    
    field(field: Cell[][]) {
    // TODO: Implement field rendering logic
    }
    
    finalField(field: Cell[][]) {
    // TODO: Implement final field rendering logic
    }
    
    playOptions() {
    // TODO: Implement play options logic
    }
    
    getPlayerNickname() {
    // TODO: Implement player nickname input logic
    }
    
    displayLeaderboard(records: any[]) {
    // TODO: Implement leaderboard display logic
    }
}