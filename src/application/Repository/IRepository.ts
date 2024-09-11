export interface IRepository {
    saveData: (data: string, key: string) => void
    retrieveData: (key: string) => any
}