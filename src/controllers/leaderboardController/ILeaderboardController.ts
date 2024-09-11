export interface ILeaderboardController {
    showLeaderboards: () => void
    saveRecord: (playerNickname: string, roundsPlayed: number, difficultyBeingPlayed: 1 | 2 | 3) => void
}