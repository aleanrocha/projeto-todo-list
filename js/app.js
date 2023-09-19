// Seleção de elementos

const themes = document.querySelectorAll("#todo-theme > span")
const todoForm = document.querySelector("#todo-form > form")
const todoEdit = document.querySelector("#edit-form")
const todoList = document.querySelector("#todo-list")
const todoListInfo = document.querySelector("#todo-list #todo-info")
const todoInput = document.querySelector("#todo-input")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const toolbar = document.querySelector("#toolbar")
const searchInput = document.querySelector("#search-input")
const eraseBtn = document.querySelector("#erase-btn")
const filter = document.querySelector("#filter-select")

let oldEditInput = ""

// Funções

// trocar tema
const changeTheme = (e) => {
  const btnSelected = e.target
  const idSelected = btnSelected.id
  themes.forEach((theme) => theme.classList.remove("selected"))
  btnSelected.classList.toggle("selected")
  document.body.classList = ""
  if(idSelected === "second-theme") {document.body.classList.add("second-gradient")
  } else if (idSelected === "third-theme") {document.body.classList.add("third-gradient")}
}

// criar e adicionar as tarefas
const saveTodo = (text, done = 0, save = 1) => {
  const todoElement = document.createElement("div")
  const todoTitle = document.createElement("h3")
  const btnDoneTask = document.createElement("button")
  const btnEditTask = document.createElement("button")
  const btnDeleteTask = document.createElement("button")
  todoTitle.innerText = text
  todoElement.classList.add("todo")
  btnDoneTask.classList.add("finish-todo")
  btnEditTask.classList.add("edit-todo")
  btnDeleteTask.classList.add("remove-todo")
  btnDoneTask.innerHTML = `<i class="fa-solid fa-check"></i>`
  btnEditTask.innerHTML = `<i class="fa-solid fa-pen"></i>`
  btnDeleteTask.innerHTML = `<i class="fa-solid fa-xmark"></i>`
  todoElement.append(todoTitle,btnDoneTask,btnEditTask,btnDeleteTask)
  // utilizando dados da localStorage
  if(done) todoTitle.classList.add("done")
  if(save) saveTodoLocalStorage({text, done})
  todoList.appendChild(todoElement)
  todoInput.value = ""
  todoInput.focus()
  if(document.querySelector("#todo-list .todo")) 
    todoListInfo.classList.add("hide")
}
// atualiza e exibe informações da lista de tarefas com uma mensagem
const todoInfo = (action, message) => {
  if(action === "remove") todoListInfo.classList.remove("hide")
  else if (action === "toggle") todoListInfo.classList.toggle("hide")
  else todoListInfo.classList.add("hide")
  todoListInfo.firstElementChild.innerText = message
}
// edição das tarefas
const editForm = () => {
  const todoListItems = document.querySelectorAll("#todo-list .todo")
  todoEdit.classList.toggle("hide")
  todoForm.classList.toggle("hide")
  toolbar.classList.toggle("hide")
  todoListItems.forEach(todo => todo.classList.toggle("hide"))
  todoInfo("toggle", "✏️ Editando tarefa...")
}
// ações das tarefas
const handleTodoActions = (e) => {
  const clickedEl = e.target
  const closestEl = clickedEl.closest("div")
  let todoTitle = "" 
  if(closestEl && closestEl.querySelector("h3")) {
    todoTitle = closestEl.querySelector("h3").innerText
  }
  if (clickedEl.classList.contains("finish-todo")) {
    closestEl.classList.toggle("done")
  } else if (clickedEl.classList.contains("remove-todo")) {
    closestEl.remove()
    if(!document.querySelector("#todo-list .todo")) 
      todoInfo("remove", "Você não possui nenhuma tarefa ☹️")
  } else if (clickedEl.classList.contains("edit-todo")) {
    editForm()
    editInput.value = todoTitle
    oldEditInput = todoTitle
  } 
}
// atualização das edições das tarefas 
const updateTodoInput = (newInputValue) => {
  const todos = document.querySelectorAll(".todo")
  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3")
    if(todoTitle.innerText.trim() === oldEditInput) {
      if(newInputValue.trim() !== "")
        todoTitle.innerText = newInputValue
    }
  })
}
// pesquisa e exibe tarefa específica da lista de tarefas
const getSearchTodos = (searchValue) => {
  const todos = document.querySelectorAll(".todo")
  let found = false
  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase()
    const search = searchValue.toLowerCase()
    todo.style.display = "flex"
    if(!todoTitle.includes(search.trim())) {todo.style.display = "none"}
    else {found = true} 
    if(!found) {
      todoInfo("remove", "Nenhum resultado encontrado 🚫")
    } else {
      todoListInfo.classList.add("hide")
    }
  })
}
// filtragem da lista de tarefas
const filterTodo = (filterValue) => {
  const todoElements = document.querySelectorAll(".todo")
  const isAll = filterValue.toLowerCase() === "all"
  const isDone = filterValue.toLowerCase() === "done"
  const isTodo = filterValue.toLowerCase() === "todo"
  let countMatching = 0
  todoListInfo.classList.add("hide")
  if(todoElements.length === 0) {
    todoInfo("remove", "Você não possui nenhuma tarefa ☹️")
    return
  }
  todoElements.forEach((todo) => {
    const isTodoDone = todo.classList.contains("done")
    if(isAll || (isDone && isTodoDone) || (isTodo && !isTodoDone)) {
      todo.style.display = "flex"
      countMatching++
    } else {
      todo.style.display = "none"
    }
  })
  if(countMatching === 0) {
    todoInfo("remove", isDone ? "⚠️ Nenhuma tarefa foi concluida." : "Todas as tarefas foram concluidas ✅")
  }
}

// Eventos

themes.forEach((theme) => theme.addEventListener("click", changeTheme))
todoForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const inputValue = todoInput.value
  if(inputValue && inputValue.trim() !== "") {
    saveTodo(inputValue)
  } else {
    alert("⚠️ Por favor, digite sua tarefa!")
  }
})
document.addEventListener("click", handleTodoActions)
cancelEditBtn.addEventListener("click", editForm)
todoEdit.addEventListener("submit", (e) => {
  e.preventDefault()
  const editInputValue = editInput.value
  if(editInputValue) updateTodoInput(editInputValue)
  editForm()
})
searchInput.addEventListener("keyup", (e) => {
  const searchValue = e.target.value
  getSearchTodos(searchValue)
})
eraseBtn.addEventListener("click", (e) => {
  e.preventDefault()
  searchInput.value = ""
  searchInput.dispatchEvent(new Event("keyup"))
})
filter.addEventListener("change", (e) => {
  const filterValue = e.target.value
  filterTodo(filterValue)
})

// localStore

const getTodoLocalStorage = () => {
  const todosLocal = JSON.parse(localStorage.getItem("todos")) || []
  return todosLocal
}

const saveTodoLocalStorage = (todo) => {

  // get todos os todo da lista
  const todos = getTodoLocalStorage()

  // add os todo no arr

  todos.push(todo)

  // save o todo na lista
  localStorage.setItem("todos", JSON.stringify(todos))

}