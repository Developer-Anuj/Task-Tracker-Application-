const Task_input = document.querySelector("#Task_input");
const Task_Btn = document.querySelector("#Task_btn");
const Task_list = document.querySelector(".Task_list");

window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => AddTask(task));
});

const AddTask = (task = null) => {
    const div = document.createElement('div');
    div.classList.add('task-item');

    const input = document.createElement('input');
    input.type = 'text';
    input.value = task ? task.text : Task_input.value;
    input.readOnly = true;

    const btn1 = document.createElement('button');
    btn1.innerText = "Edit";

    const btn2 = document.createElement('button');
    btn2.innerText = "Delete";

    div.appendChild(input);
    div.appendChild(btn1);
    div.appendChild(btn2);
    Task_list.appendChild(div);

    if (!task) {
        saveTask(input.value);
    }

    Task_input.value = '';

    btn1.addEventListener('click', () => {
        if (input.readOnly) {
            input.readOnly = false;
            btn1.innerText = "Save";
        } else {
            input.readOnly = true;
            btn1.innerText = "Edit";
            updateTask(input.value, div);
        }
    });

    btn2.addEventListener('click', () => {
        Task_list.removeChild(div);
        deleteTask(input.value);
    });
};
const saveTask = (taskText) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const updateTask = (updatedText, taskDiv) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = [...Task_list.children].indexOf(taskDiv);
    tasks[index].text = updatedText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const deleteTask = (taskText) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

Task_Btn.addEventListener('click', () => {
    if (Task_input.value.trim() !== '') {
        AddTask();
    } else {
        alert("Please enter a task before adding.");
    }
});
