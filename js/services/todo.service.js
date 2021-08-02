var gTodos = [];
var gFilterBy = 'all';
// to localstorage
_createTodos();


function getTodosForDisplay() {
    // if empty return []
    if (!gTodos.length) return gTodos = [];
    // if all return ALL
    if (gFilterBy === 'all') return gTodos;
    // not active/done and length=1 return [0]
    var todos = gTodos.slice();
    if (!gFilterBy === 'active' || !gFilterBy === 'done') {
        if (gTodos.length === 1) return gTodos;
    }
    // compare abc
    if (gFilterBy === 'txt') {
        todos.sort(function (todo1, todo2) {
            return todo1.txt.localeCompare(todo2.txt);
        })
    }
    // comprate timestamp
    else if (gFilterBy === 'created') {
        todos.sort(function (todo1, todo2) {
            return todo1.createdAt - todo2.createdAt;
        })
    }
    else if (gFilterBy === 'importance') {
        todos.sort(function (todo1, todo2) {
            return todo1.importance - todo2.importance;
        })
    }
    else {
        todos = gTodos.filter(function (todo) {
            return (gFilterBy === 'active' && !todo.isDone) ||
                (gFilterBy === 'done' && todo.isDone);

        })
    }
    return todos;
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    var todo = {
        id: _makeId(),
        txt,
        importance,
        createdAt: Date.now(),
        isDone: false
    }
    gTodos.unshift(todo);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId;
    })
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy;
}

function getFilter() {
   return gFilterBy;
}

function getTotalCount() {
    return gTodos.length;
}
function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone;
    })
    return activeTodos.length;
}


function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos);
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (todos && todos.length) {
    } else {
        todos = [];
    }
    gTodos = todos;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}