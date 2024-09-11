import { IRepository } from "../../application/persistence/interfaces/IRepository";
import { IUserInterface } from "../../application/UserInterface/IUserInterface";
import { PersonalRecord } from "../../data/personalRecord/PersonalRecord";
import { ILeaderboardController } from "./ILeaderboardController";

export class LeaderboardController implements ILeaderboardController {
    private personalRecordRepository: IRepository<PersonalRecord>
    private userInterface: IUserInterface

    constructor(userInterface: IUserInterface, personalRecordRepository: IRepository<PersonalRecord>){
        this.userInterface = userInterface
        this.personalRecordRepository = personalRecordRepository
    }

    showLeaderboards(){
        const retrievedRecords = this.personalRecordRepository.retrieveAll()

        let leaderboardEasy: any[] = []
        let leaderboardMedium: any[] = []
        let leaderboardHard: any[] = []

        retrievedRecords.forEach((element: { difficulty: number; }) => {
            if(element.difficulty === 1) leaderboardEasy.push(element)
            else if(element.difficulty === 2) leaderboardMedium.push(element)
            else leaderboardHard.push(element)
        });

        leaderboardEasy.sort((a, b) => a.rounds - b.rounds)
        leaderboardMedium.sort((a, b) => a.rounds - b.rounds)
        leaderboardHard.sort((a, b) => a.rounds - b.rounds)

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