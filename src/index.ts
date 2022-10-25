import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos: TodoItem[] = [new TodoItem(1, 'get dressed'), new TodoItem(2, 'buy some foods'), new TodoItem(3, 'let a notice for the maid')]

let collection: TodoCollection = new TodoCollection('Madsen', todos);

console.clear();
console.log(`${collection.userName} List`);

let newId: number = collection.addTodo('call the taxi');
// let todoItem: TodoItem = collection.getTodoById(newId);

collection.markComplete(newId, true);

// collection.removeComplete();

console.log(`${collection.userName}'s Todo List, ${collection.getItemCounts().incomplete} items to do...`);

collection.getTodoItems(true).forEach(item => item.printDetails());

