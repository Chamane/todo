import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";

let todos: TodoItem[] = [new TodoItem(1, 'get dressed'), new TodoItem(2, 'buy some foods'), new TodoItem(3, 'let a notice for the maid')]

let collection: TodoCollection = new TodoCollection('Madsen', todos);

let newId: number = collection.addTodo('call the taxi');
// let todoItem: TodoItem = collection.getTodoById(newId);

collection.markComplete(newId, true);

// collection.removeComplete();

let showCompleted = true;

function displayTodoList(): void{
    console.log(`${collection.userName}'s Todo List, ${collection.getItemCounts().incomplete} items to do...`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
    Add = "Add New Task",
    Complete = "Complete Task",
    Toggle = "Show/Hide Completed",
    Purge = "Remove completed tasks",
    Quit = "Quit"
}

function promptAdd(): void{
    console.clear();
    inquirer.prompt({type:"input", name:"add", message:"Enter task:"}).then(
        answers => {
            if(answers['add'] !== ""){
                collection.addTodo(answers['add']);
            }
            promptUser();
        });
   
}

function promptComplete(): void{
    console.clear();
    inquirer.prompt({
        type:"checkbox",
        name:"complete",
        message:"Complete Task",
        choices:collection.getTodoItems(showCompleted).map(
            item => ({name:item.task, value:item.id, checked:item.complete})
        )
    }).then(answers => {
        let completedTask = answers['complete'] as number[];
        collection.getTodoItems(true).forEach(
            item => collection.markComplete(
                item.id, 
                completedTask.find(id => item.id === id) !== undefined
            )
        );
        promptUser();
    });
}

function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt(
        {
            type: "list",
            name: "command",
            message: "Choose option",
            choices: Object.values(Commands)
        }
    ).then( answers => {
        switch(answers["command"]){
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break; 
            case Commands.Complete:
                promptComplete();
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    });
}

promptUser();