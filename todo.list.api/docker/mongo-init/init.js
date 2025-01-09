db = db.getSiblingDB('todo-list-db');

function insertTasks(numTasks) {
    const tasks = [];
    for (let i = 1; i <= numTasks; i++) {
        tasks.push({
            title: `Task ${i}`,
            description: `Description of task ${i}`,
            completed: false
        });
    }
    db.tasks.insertMany(tasks);
}

insertTasks(99);