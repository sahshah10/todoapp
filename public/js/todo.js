let completeTask = event => {
    classList = event.currentTarget.classList;
    if (classList.contains('completed'))
        classList.remove('completed');
    else
        classList.add('completed');
    
    if(document.getElementsByClassName('active')[0].getAttribute("tab-id") != "all")
        classList.add("hidden");
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
                classList = task.classList;
                is_completed = classList.contains("completed");
                is_hidden = classList.contains("hidden");
                switch(tab_id) {
                    case "all":
                        if (is_hidden)
                            classList.remove("hidden");
                    break;

                    case "completed":
                        if (is_completed && is_hidden)
                            classList.remove("hidden");
                        else if (!is_completed && !is_hidden)
                            classList.add("hidden");
                    break;
                    
                    case "pending":
                        if (is_completed && !is_hidden)
                            classList.add("hidden");
                        else if (!is_completed && is_hidden)
                            classList.remove("hidden");
                    break;
                }
            }

            document.getElementsByClassName("active")[0].classList.remove("active");
            cur.classList.add('active');
        }
    })
})
