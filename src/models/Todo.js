class Todo {
    constructor(task) {
        this.id = crypto.randomUUID();
        this.task = task;
        this.completed = false;
        this.date = new Date().toISOString();
    }
}

export default Todo;