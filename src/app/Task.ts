
export interface Task{
    id: number,
    name: string,
    isCompleted: boolean,
    createdAt: string,
    categoryIds: number[],
    note: string,
    noteSavedAt: string,
    isImportant: boolean
}