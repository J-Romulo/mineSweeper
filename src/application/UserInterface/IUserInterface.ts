interface IUserInterface {
    mainMenu: () => void;
    difficultyLevel: () => void;
    field: (field: number[][]) => void
    finalField: (field: number[][]) => void
}