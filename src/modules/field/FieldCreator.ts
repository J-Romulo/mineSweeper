import { SpaceValues } from "./utilities/SpaceValues";

export class FieldCreator {
    createField(size: number): number[][] {
        const field: number[][] = [];
    
        for (let i = 0; i < size; i++) {
          field[i] = new Array(size).fill(SpaceValues.Unrevealed_space);
        }
    
        return field;
    }
}