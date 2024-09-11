import fs from 'fs'
import path from 'node:path'

import { IPersistence } from "../interfaces/IPersistence";

export class FilePersistense implements IPersistence {
    saveData(data: string, key: string) {
        try {
            const dataRetrieved = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'DB', 'db.json'), 'utf8'));
            const keyedData = dataRetrieved[key]
            keyedData.push(JSON.parse(data))

            dataRetrieved[key] = keyedData

            fs.writeFileSync(path.resolve(__dirname, '..', '..', 'DB', 'db.json'), JSON.stringify(dataRetrieved));
            // file written successfully
          } catch (err) {
            console.error(err);
          }
    }

    retrieveData(key: string) {
        try {
            const dataRetrieved = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'DB', 'db.json'), 'utf8'));
            
            return dataRetrieved[key]
          } catch (err) {
            console.error(err);
            return ''
          }
    }
}