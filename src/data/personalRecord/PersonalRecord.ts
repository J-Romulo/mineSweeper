export class PersonalRecord {
    player: string
    rounds: number
    difficulty: 1 | 2 | 3

    constructor(player: string, rounds: number, difficulty: 1 | 2 | 3) {
        this.player = player
        this.rounds = rounds
        this.difficulty = difficulty
    }
}