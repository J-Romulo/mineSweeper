export class FieldCreator {
    createField(size: number): number[][] {
        const field: number[][] = [];
    
        for (let i = 0; i < size; i++) {
          field[i] = new Array(size).fill(0);
        }
    
        return field;
    }
}