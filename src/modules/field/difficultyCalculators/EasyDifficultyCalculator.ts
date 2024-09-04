import { IDifficultyCalculator } from "../interfaces/IDifficultyCalculator";

export class EasyDifficultyCalculator implements IDifficultyCalculator {
    calculateSize(): number {
      return 10;
    }
  
    calculateBombs(): number {
      return 15;
    }
}
  