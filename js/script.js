let todos = [];

const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

const filterAll = document.getElementById("filter-all");
const filterToday = document.getElementById("filter-today");
const clearAll = document.getElementById("filter-clear");

function render(list = todos) {
    todoList.innerHTML = "";

    if (list.length === 0) {
        todoList.innerHTML = `<tr><td colspan="3" class="not-found">No task available</td></tr>`;
        return;
    }

    list.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.text}</td>
            <td>${item.date}</td>
            <td>
                <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
            </td>
        `;
        todoList.appendChild(row);
    });
}

addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    const date = dateInput.value;

    if (!text || !date) {
        alert("Please fill both task and date!");
        return;
    }

    todos.push({ text, date });
    render();

    todoInput.value = "";
    dateInput.value = "";
});

function deleteTodo(index) {
    todos.splice(index, 1);
    render();
}

filterAll.addEventListener("click", () => render());

filterToday.addEventListener("click", () => {
    const today = new Date().toISOString().split("T")[0];
    const filtered = todos.filter(t => t.date === today);
    render(filtered);
});

clearAll.addEventListener("click", () => {
    if (confirm("Delete all tasks?")) {
        todos = [];
        render();
    }
});

render();
