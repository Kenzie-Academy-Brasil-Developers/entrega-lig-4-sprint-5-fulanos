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
let somJogador = new Audio('audio/toin.mp3');

function geraTabuleiro(mapa) {

    let principal = document.createElement("div")
    principal.classList.add("principal")

    for (let i = 0; i < mapa.length; i++) {
        let coluna = document.createElement("div")
        coluna.classList.add("coluna")

        for (let j = 0; j < mapa[i].length; j++) {
            let celula = document.createElement("div")
            celula.classList.add("linha")
            celula.classList.add(j)
            coluna.append(celula)
        }
        principal.append(coluna)
    }
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
    jogada = 'vermelho' //Reiniciar o jogo com a peça vermelha. Não estava resetando o revezamento de jogador.
    selecionarTorres()
}

function selecionarTorres() {

    let torres = document.querySelectorAll('.coluna')
    torres = [...torres]

    torres.forEach(function (tower) {
        tower.addEventListener("click", revezarJogador)
    })
}

function revezarJogador(event) {

    let torre = Array.from(event.currentTarget.children)

    for (let i = 0; i < torre.length; i++) {

        if (!torre[i].hasChildNodes()) {

            if (jogada === 'vermelho') {

                let disco = document.createElement('div')
                disco.classList.add('disco-vermelho')
                torre[i].appendChild(disco)
                duasVezes() //efeito de áudio
                jogada = 'preto'
                break

            } else {

                let disco = document.createElement('div')
                disco.classList.add('disco-preto')
                torre[i].appendChild(disco)
                duasVezes() //efeito de áudio
                jogada = 'vermelho'
                break
            }
        }
    }
}

function duasVezes() { //função que sincroniza a animação com o audio
    function toca() {
        somJogador.volume = 0.1
        somJogador.play();
    }
    toca();
    setTimeout(toca, 1000);
}

function defineVitoria() {

}