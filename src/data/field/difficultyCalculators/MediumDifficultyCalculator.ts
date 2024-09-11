import { IDifficultyCalculator } from "../interfaces/IDifficultyCalculator";

export class MediumDifficultyCalculator implements IDifficultyCalculator {
    calculateSize(): number {
      return 20;
    }
  
    calculateBombs(): number {
      return 40;
    }
}