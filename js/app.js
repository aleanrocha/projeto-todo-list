// Seleção de elementos
const themes = document.querySelectorAll("#todo-theme > span")
const todoForm = document.querySelector("#todo-form > form")
const todoFdit = document.querySelector("#todo-edit > form")
const todoList = document.querySelector("#todo-list")
const todoInput = document.querySelector("#todo-input")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

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
}

// Eventos

themes.forEach((theme) => theme.addEventListener("click", changeTheme))
todoForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const inputValue = todoInput.value
  if(inputValue) {
    saveTodo(inputValue)
  } else {
    alert("⚠️ Por favor, digite sua tarefa!")
  }
})
