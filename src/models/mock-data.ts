import { Todo } from './todo';

export const TODOS: Todo[] = [
    { id: 1, title: 'Go to butchers', created: new Date(), description: 'Testing....', completed: true, setReminder: true, completeOn: new Date() },
    { id: 2, title: 'Shopping', created: new Date(), description: 'Testing....', completed: false, setReminder: true, completeOn: null },
    { id: 3, title: 'Car Insurance', created: new Date(), description: 'Testing....', completed: false, setReminder: false, completeOn: null },
    { id: 4, title: 'Go to gte Haircut', created: new Date(), description: 'Testing....', completed: false, setReminder: false, completeOn: new Date() },
    { id: 5, title: 'Meet the lads', created: new Date(), description: 'Testing....', completed: false, setReminder: false, completeOn: null },
    { id: 6, title: 'Pick up yung lad', created: new Date(), description: 'Testing....', completed: false, setReminder: false, completeOn: null }
];