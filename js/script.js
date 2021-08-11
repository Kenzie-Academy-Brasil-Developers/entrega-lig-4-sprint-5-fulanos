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
    jogada = 'vermelho'
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

                jogada = 'vermelho'
                defineVitoria(posicaoDisco, classeDisco)
                break
            }
        }
    }
}

function defineVitoria(posicao, classe) {
    verificaHorizontal(posicao, classe)
    verificaVertical(posicao, classe)
    verificaDiagonalCrescente(posicao, classe)
    verificaDiagonalDecrescente(posicao, classe)
}

function verificaHorizontal(posicao, classe) { }
function verificaVertical(posicao, classe) { }

function verificaDiagonalCrescente(posicao, classe) {

    let classeReferencia = classe.split("-")[1]
    let conjuntos = 4
    let coluna = posicao[0] - 3
    let linha = posicao[1] - 3
    
    for (let i = 0; i < conjuntos; i++) {
        let contagem = 0

        if (coluna >= 0 && coluna <= 6 && linha >= 0 && linha <= 5) {
            if (tabuleiro[coluna][linha] === classeReferencia) { contagem++ }
            if (tabuleiro[coluna + 1][linha + 1] === classeReferencia) { contagem++ }
            if (tabuleiro[coluna + 2][linha + 2] === classeReferencia) { contagem++ }
            if (tabuleiro[coluna + 3][linha + 3] === classeReferencia) { contagem++ }

        }
        if (contagem === 4) {
            //Chamada da função de vitória AQUI
            console.log(classeReferencia, " venceu")
            break
        }
        coluna++
        linha++
    }
}

function verificaDiagonalDecrescente(posicao, classe) {

    let classeReferencia = classe.split("-")[1]
    let conjuntos = 4
    let coluna = posicao[0] - 3
    let linha = posicao[1] + 3
    for (let i = 0; i < conjuntos; i++) {
        let contagem = 0
        if (coluna >= 0 && coluna <= 6 && linha >= 0 && linha <= 5) {
            if (tabuleiro[coluna][linha] === classeReferencia) { contagem++ }
            if (tabuleiro[coluna + 1][linha - 1] === classeReferencia) { contagem++ }
            if (tabuleiro[coluna + 2][linha - 2] === classeReferencia) { contagem++ }
            if (tabuleiro[coluna + 3][linha - 3] === classeReferencia) { contagem++ }
        }
        if (contagem === 4) {
            //Chamada da função de vitória AQUI
            console.log(classeReferencia, " venceu")
            break
        }
        coluna++
        linha--
    }
}