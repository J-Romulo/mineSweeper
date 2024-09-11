import { IPersistence } from "../../../application/persistence/interfaces/IPersistence";
import { IRepository } from "../../../application/persistence/interfaces/IRepository";
import { PersonalRecord } from "../PersonalRecord";

export class PersonalRecordRepository implements IRepository<PersonalRecord> {
    private db: IPersistence

    constructor(db: IPersistence) {
        this.db = db
    }

    save(data: PersonalRecord){
        this.db.saveData(JSON.stringify(data), 'personalRecords')
    }

    retrieveAll(){
        const records = this.db.retrieveData('personalRecords')

        return records
    }
}