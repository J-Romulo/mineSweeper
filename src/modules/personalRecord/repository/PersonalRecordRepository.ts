import { IRepository } from "../../../application/Repository/IRepository";
import { PersonalRecord } from "../PersonalRecord";

export class PersonalRecordRepository {
    private db: IRepository

    constructor(db: IRepository) {
        this.db = db
    }

    save(record: PersonalRecord){
        this.db.saveData(JSON.stringify(record), 'personalRecords')
    }

    retrieveRecords(){
        const records = this.db.retrieveData('personalRecords')

        return records
    }
}