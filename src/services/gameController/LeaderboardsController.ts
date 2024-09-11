import { IRepository } from "../../application/Repository/IRepository";
import { IUserInterface } from "../../application/UserInterface/IUserInterface";
import { PersonalRecord } from "../../modules/personalRecord/PersonalRecord";
import { PersonalRecordRepository } from "../../modules/personalRecord/repository/PersonalRecordRepository";

export class LeaderboardsController {
    private personalRecordRepository: PersonalRecordRepository
    private userInterface: IUserInterface

    constructor(database: IRepository, userInterface: IUserInterface,){
        this.userInterface = userInterface
        this.personalRecordRepository = new PersonalRecordRepository(database)
    }

    showLeaderboards(){
        const retrievedRecords = this.personalRecordRepository.retrieveRecords()

        let leaderboardEasy: any[] = []
        let leaderboardMedium: any[] = []
        let leaderboardHard: any[] = []

        retrievedRecords.forEach((element: { difficulty: number; }) => {
            if(element.difficulty === 1) leaderboardEasy.push(element)
            else if(element.difficulty === 2) leaderboardMedium.push(element)
            else leaderboardHard.push(element)
        });

        leaderboardEasy.sort((a, b) => a.round - b.rounds)
        leaderboardMedium.sort((a, b) => a.round - b.rounds)
        leaderboardHard.sort((a, b) => a.round - b.rounds)

        console.log('')
        if(leaderboardEasy.length) this.userInterface.displayLeaderboard(leaderboardEasy)
        console.log('')
        if(leaderboardMedium.length) this.userInterface.displayLeaderboard(leaderboardMedium)
        console.log('')
        if(leaderboardHard.length) this.userInterface.displayLeaderboard(leaderboardHard)
        console.log('')
    }

    saveRecord(playerNickname: string, roundsPlayed: number, difficultyBeingPlayed: 1 | 2 | 3) {
        const record = new PersonalRecord(playerNickname, roundsPlayed, difficultyBeingPlayed)

        this.personalRecordRepository.save(record)
    }
}