export interface IUserInputs {
    promptUser(typeInput: 'numeric' | 'text', options?: number[], text?: string): string | number
    fieldCoordinates(): {x: number, y: number} 
}