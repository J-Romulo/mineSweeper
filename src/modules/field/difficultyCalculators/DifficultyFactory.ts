import { IDifficultyCalculator } from "../interfaces/IDifficultyCalculator";
import { EasyDifficultyCalculator } from "./EasyDifficultyCalculator";
import { HardDifficultyCalculator } from "./HardDifficultyCalculator";
import { MediumDifficultyCalculator } from "./MediumDifficultyCalculator";

export class DifficultyFactory {
    private difficultyStrategies: Map<number, IDifficultyCalculator>;
  
    constructor() {
      this.difficultyStrategies = new Map();
      this.difficultyStrategies.set(1, new EasyDifficultyCalculator());
      this.difficultyStrategies.set(2, new MediumDifficultyCalculator());
      this.difficultyStrategies.set(3, new HardDifficultyCalculator());
    }
  
    createDifficultyStrategy(difficulty: number): IDifficultyCalculator {
      return this.difficultyStrategies.get(difficulty)!;
    }
}