const tabuleiro = [
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    "      ",
    "      "
]

let jogada = 'vermelho'


function geraTabuleiro(mapa) {

    let principal = document.createElement("div")
    principal.classList.add("principal")

    for (let i = 0; i < mapa.length; i++) {
        let coluna = document.createElement("div")
        coluna.classList.add("coluna")

        for (let j = 0; j < mapa[i].length; j++) {
            let celula = document.createElement("div")
            celula.classList.add("linha")
            // celula.classList.add(`coluna${i}`)
            // celula.classList.add(`linha${j}`)
            celula.classList.add(j)
            coluna.append(celula)
        }
        principal.append(coluna)
    }
    // console.log(principal)
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
    selecionarTorres()
}

//revezar jogadores e adicionar evento de click nas torres

function selecionarTorres() {

    let torres = document.querySelectorAll('.coluna')
    torres = [...torres]    
    // console.log(torres)
    torres.forEach(function (tower) {
        tower.addEventListener("click", revezarJogador)
        // console.log('clicou')
    })
}

function revezarJogador(event) {

    let torre = Array.from(event.currentTarget.children)
    console.log(torre)
    console.log(torre.firstElementChild)

    for (let i = 0; i < torre.length; i++) {

        if (!torre[i].hasChildNodes()) {

            if (jogada === 'vermelho') {

                let disco = document.createElement('div')
                // disco.classList.remove('disco-preto')
                disco.classList.add('disco-vermelho')
                console.log(disco)
                torre[i].appendChild(disco)

                jogada = 'preto'
                break

            } else {

                let disco = document.createElement('div')
                // disco.classList.remove('disco-vermelho')
                disco.classList.add('disco-preto')
                console.log(disco)
                torre[i].appendChild(disco)
                jogada = 'vermelho'
                break
            }
        }
    }
}

function defineVitoria() {}