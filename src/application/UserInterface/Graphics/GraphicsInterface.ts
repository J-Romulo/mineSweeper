import { QMainWindow } from "@nodegui/nodegui";
import { Cell } from "../../../modules/cell/Cell";
import { IUserInterface } from "../IUserInterface";

export class GraphicsInterface implements IUserInterface {
    mainMenu() {

        const win = new QMainWindow();

        win.show();
        (global as any).win = win;
    }

    difficultyLevel() {
    }

    field(field: Cell[][]) {
    }

    finalField(field: Cell[][]) {
    }

    playOptions() {
    }
}