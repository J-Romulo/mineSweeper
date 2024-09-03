import { IDifficultyCalculator } from "../interfaces/IDifficultyCalculator";

export class HardDifficultyCalculator implements IDifficultyCalculator {
    calculateSize(): number {
      return 30;
    }
  
    calculateBombs(): number {
      return 100;
    }
}
  