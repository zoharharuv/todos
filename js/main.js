function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function (todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
        </li>`;
    })

    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    if (todos.length) {
        document.querySelector('.total-count').innerText = getTotalCount();
        document.querySelector('.active-count').innerText = getActiveCount();
    }
    else {
        document.querySelector('.total-count').innerText = '0';
        document.querySelector('.active-count').innerText = '0';
    }
}


function onToggleTodo(todoId) {
    console.log('Toggling: ', todoId);
    toggleTodo(todoId);
    renderTodos();
}

function onRemoveTodo(todoId, ev) {
    console.log('Removing: ', todoId);
    ev.stopPropagation();
    var confirmDelete = confirm('Delete entry?');
    if(!confirmDelete) return;
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTxt = document.querySelector('[name=newTodoTxt]');
    var elImportance = document.querySelector('.importance');
    var txt = elTxt.value;
    var importance = elImportance.value;
    if (!txt) return;

    addTodo(txt, importance)
    console.log('added:', txt);

    elTxt.value = '';

    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering by:', filterBy);
    setFilterBy(filterBy);
    renderTodos();
}

function onSetImportance(importanceBy) {
    console.log('Filtering by:', importanceBy);
}