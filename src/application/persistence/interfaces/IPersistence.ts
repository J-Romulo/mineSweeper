export interface IPersistence {
    saveData: (data: string, key: string) => void
    retrieveData: (key: string) => any
}