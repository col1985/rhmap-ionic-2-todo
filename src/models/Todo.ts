export interface Todo {
    id: number;
    created: Date;
    title: string;
    description: string;
    completed: boolean;
    setReminder: boolean;
    completeOn: Date;
}