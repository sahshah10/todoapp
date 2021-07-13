let completeTask = event => {
    if (event.currentTarget.classList.contains('completed'))
        event.currentTarget.classList.remove('completed');
    else
        event.currentTarget.classList.add('completed');
    
    if(document.getElementsByClassName('active')[0].getAttribute("tab-id") != "all")
        event.currentTarget.classList.add("hidden");
}

let deleteTask = event => {
    if (event.target.tagName == "BUTTON") {
        event.currentTarget.remove();
    }
}

let getNewTaskRow = (newTaskName) => {
    let li = document.createElement("li");
    li.classList.add("task-row");

    let span = document.createElement("span");
    span.classList.add("task");
    span.innerText = newTaskName;

    let button = document.createElement("button");
    button.classList.add("cross");
    button.innerText = "x";

    li.appendChild(span);
    li.appendChild(button);

    li.addEventListener('click', completeTask);
    li.addEventListener('click', deleteTask);
    return li;
}

let addTask = () => {
    let inputText = document.getElementsByClassName("input-text")[0];
    let newTaskName = inputText.value;
    if (newTaskName === "")
        return ;
    
    let taskList = document.getElementsByClassName("todo-list")[0];
    taskList.appendChild(getNewTaskRow(newTaskName));
    inputText.value = "";
}

document.getElementsByClassName("input-text")[0].addEventListener('keyup', function (e) {
    if (e.key === 'Enter')
        addTask();
});
document.getElementsByClassName("input-button")[0].addEventListener("click", addTask);

document.querySelectorAll('.task-row').forEach(item => {
    item.addEventListener('click', completeTask)
})

document.querySelectorAll('.task-row').forEach(item => {
    item.addEventListener('click', deleteTask)
})

document.querySelectorAll('.tab').forEach(item => {
    item.addEventListener('click', event => {
        cur = event.currentTarget;
        if (!cur.classList.contains('active')) {
            tasks = document.getElementsByClassName("task-row");
            tab_id = cur.getAttribute('tab-id');
            for(task of tasks) {
                is_completed = task.classList.contains("completed");
                is_hidden = task.classList.contains("hidden");
                switch(tab_id) {
                    case "all":
                        if (is_hidden)
                            task.classList.remove("hidden");
                    break;

                    case "completed":
                        if (is_completed && is_hidden)
                            task.classList.remove("hidden");
                        else if (!is_completed && !is_hidden)
                            task.classList.add("hidden");
                    break;
                    
                    case "pending":
                        if (is_completed && !is_hidden)
                            task.classList.add("hidden");
                        else if (!is_completed && is_hidden)
                            task.classList.remove("hidden");
                    break;
                }
            }

            document.getElementsByClassName("active")[0].classList.remove("active");
            cur.classList.add('active');
        }
    })
})

