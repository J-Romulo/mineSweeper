import { Cell } from "../../cell/Cell";

export class FieldCreator {
    static createField(size: number): Cell[][] {
        const field: Cell[][] = [];
    
        for (let i = 0; i < size; i++) {
          field[i] = [];
          for (let j = 0; j < size; j++) {
              field[i][j] = new Cell();
          }
        }
    
        return field;
    }
}