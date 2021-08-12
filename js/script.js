let tabuleiro = [
    [[""], [""], [""], [""], [""], [""]],
    [[""], [""], [""], [""], [""], [""]],
    [[""], [""], [""], [""], [""], [""]],
    [[""], [""], [""], [""], [""], [""]],
    [[""], [""], [""], [""], [""], [""]],
    [[""], [""], [""], [""], [""], [""]],
    [[""], [""], [""], [""], [""], [""]]
]

let jogada = 'vermelho'
let somJogador = new Audio('audio/toin.mp3');
let somApito = new Audio('audio/apito.mp3');
let titulo = document.getElementsByTagName('h1')[0]

function geraTabuleiro(mapa) {

    let principal = document.createElement("div")
    principal.classList.add("principal")

    for (let i = 0; i < mapa.length; i++) {
        let coluna = document.createElement("div")
        coluna.classList.add("coluna")
        coluna.classList.add(i)

        for (let j = 0; j < mapa[i].length; j++) {
            mapa[i][j] = " "
            let celula = document.createElement("div")
            celula.classList.add("linha")
            celula.classList.add(j)
            coluna.append(celula)
        }
        principal.append(coluna)
    }
    return principal;
}

let button = document.getElementById("startbutton");
button.addEventListener("click", startGame);

let section = document.querySelector("section");
function startGame() {
    section.innerHTML = ""
    let insersao = geraTabuleiro(tabuleiro)
    section.append(insersao)
    apito()
    button.innerText = "Reset"
    titulo.style.fontSize = '45px'
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

                let celulaDisco = disco.parentElement
                let colunaDisco = disco.parentElement.parentElement
                let posicaoDisco = [Number(colunaDisco.classList[1]), Number(celulaDisco.classList[1])]
                let classeDisco = disco.classList[0]
                tabuleiro[posicaoDisco[0]][posicaoDisco[1]] = jogada

                duasVezes() //efeito de áudio
                jogada = 'preto'
                defineVitoria(posicaoDisco, classeDisco)
                break

            } else {

                let disco = document.createElement('div')
                disco.classList.add('disco-preto')
                torre[i].appendChild(disco)

                let celulaDisco = disco.parentElement
                let colunaDisco = disco.parentElement.parentElement
                let posicaoDisco = [Number(colunaDisco.classList[1]), Number(celulaDisco.classList[1])]
                let classeDisco = disco.classList[0]
                tabuleiro[posicaoDisco[0]][posicaoDisco[1]] = jogada

                duasVezes() //efeito de áudio
                jogada = 'vermelho'
                defineVitoria(posicaoDisco, classeDisco)
                break
            }
        }

    }

}

function apito() {
    somApito.volume = 0.1
    somApito.play();
}

function duasVezes() { //função que sincroniza a animação com o audio
    function toca() {
        somJogador.volume = 0.1
        somJogador.play();
    }
    toca();
    setTimeout(toca, 1000);
}

function defineVitoria(posicao, classe) {
    verificaHorizontal(posicao, classe)
    verificaVertical(posicao, classe)
    verificaDiagonalCrescente(posicao, classe)
    verificaDiagonalDecrescente(posicao, classe)
}

function verificaHorizontal(posicao, classe) {

    let corClasse = classe.split("-")[1]
    let conjuntos = 4
    let coluna = posicao[0] - 3
    let linha = posicao[1]

    for (let i = 0; i < conjuntos; i++) {
        let contagem = 0
        for (let j = 0; j < 4; j++) {
            if (tabuleiro[coluna + j] !== undefined) {
                if (tabuleiro[coluna + j][linha] === corClasse) {
                    contagem++
                }
            }
        }
        if (contagem === 4) {
            vitoria(corClasse)
            break
        }
        coluna++
    }
}

function verificaVertical(posicao, classe) {

    let corClasse = classe.split("-")[1]
    let conjuntos = 1
    let coluna = posicao[0]
    let linha = posicao[1] - 3

    for (let i = 0; i < conjuntos; i++) {
        let contagem = 0
        for (let j = 0; j < 4; j++) {
            if (tabuleiro[coluna][linha + j] !== undefined) {
                if (tabuleiro[coluna][linha + j] === corClasse) {
                    contagem++
                }
            }
        }
        if (contagem === 4) {
            vitoria(corClasse)
            break
        }
        linha++
    }
}

function verificaDiagonalCrescente(posicao, classe) {

    let corClasse = classe.split("-")[1]
    let conjuntos = 4
    let coluna = posicao[0] - 3
    let linha = posicao[1] - 3

    for (let i = 0; i < conjuntos; i++) {
        let contagem = 0
        for (let j = 0; j < 4; j++) {
            if (tabuleiro[coluna + j] !== undefined) {
                if (tabuleiro[coluna + j][linha + j] === corClasse) {
                    contagem++
                }
            }
        }
        if (contagem === 4) {
            vitoria(corClasse)
            break
        }
        coluna++
        linha++
    }
}

function verificaDiagonalDecrescente(posicao, classe) {

    let corClasse = classe.split("-")[1]
    let conjuntos = 4
    let coluna = posicao[0] - 3
    let linha = posicao[1] + 3
    for (let i = 0; i < conjuntos; i++) {
        let contagem = 0
        for (let j = 0; j < 4; j++) {
            if (tabuleiro[coluna + j] !== undefined) {
                if (tabuleiro[coluna + j][linha - j] === corClasse) {
                    contagem++
                }
            }
        }
        if (contagem === 4) {
            vitoria(corClasse)
            break
        }
        coluna++
        linha--
    }
}

function vitoria(jogador) {

    let stringJogador = jogador.toString().toUpperCase()
    section.innerHTML = ""
    let vitoria = document.createElement("h1")
    vitoria.innerHTML = `${stringJogador} VENCEU!`
    section.appendChild(vitoria)

}