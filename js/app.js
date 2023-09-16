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
const saveTodo = (text) => {
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
  todoList.appendChild(todoElement)
  todoInput.value = ""
  todoInput.focus()
  if(document.querySelector("#todo-list .todo")) 
    todoListInfo.classList.add("hide")
}
// edição das tarefas
const editForm = () => {
  const todoListItems = document.querySelectorAll("#todo-list .todo")
  todoEdit.classList.toggle("hide")
  todoForm.classList.toggle("hide")
  toolbar.classList.toggle("hide")
  todoListItems.forEach(todo => todo.classList.toggle("hide"))
  todoListInfo.classList.toggle("hide")
  todoListInfo.firstElementChild.innerText = "Editando tarefa..."
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
      todoListInfo.classList.remove("hide")
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
