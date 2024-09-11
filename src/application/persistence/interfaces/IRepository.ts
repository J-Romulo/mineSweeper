export interface IRepository<T> {
    save: (data: T) => void
    retrieveAll: () => T[]
}