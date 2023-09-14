// Seleção de elementos
const themes = document.querySelectorAll("#todo-theme > span")

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

// Eventos

themes.forEach((theme) => theme.addEventListener("click", changeTheme))
