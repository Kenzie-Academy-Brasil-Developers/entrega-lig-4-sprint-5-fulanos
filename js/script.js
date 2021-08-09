const tabuleiro = [
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    "      "
]

function geraTabuleiro(mapa) {
    
    let principal = document.createElement("div")
    principal.classList.add("principal")
    
    for (let i = 0; i < mapa.length; i++) {
        let coluna = document.createElement("div")
        coluna.classList.add("coluna")
        
        for (let j = 0; j < mapa[i].length; j++) {
            let celula = document.createElement("div")
            celula.classList.add("linha")
            celula.classList.add(`coluna${i}`)
            celula.classList.add(`linha${j}`)
            coluna.append(celula)
        }
        principal.append(coluna)
    }
    console.log(principal)
    return principal
}

let button = document.getElementById("startbutton")
button.addEventListener("click", startGame)

let section = document.querySelector("section")
function startGame() {
    section.innerHTML = ""
    let insersao = geraTabuleiro(tabuleiro)
    section.append(insersao)
    button.innerText = "Reiniciar"
}