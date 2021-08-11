let tabuleiro = [
    [[""],[""],[""],[""],[""],[""]],
    [[""],[""],[""],[""],[""],[""]],
    [[""],[""],[""],[""],[""],[""]],
    [[""],[""],[""],[""],[""],[""]],
    [[""],[""],[""],[""],[""],[""]],
    [[""],[""],[""],[""],[""],[""]],
    [[""],[""],[""],[""],[""],[""]]
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
  return principal;
}

let button = document.getElementById("startbutton");
button.addEventListener("click", startGame);

let section = document.querySelector("section");
function startGame() {
  section.innerHTML = "";
  let insersao = geraTabuleiro(tabuleiro);
  section.append(insersao);
  button.innerText = "Reiniciar";
  jogada = 'vermelho'
  selecionarTorres();
}

function selecionarTorres() {
 
    let torres = document.querySelectorAll('.coluna')
    torres = [...torres]

    torres.forEach(function (tower) {
        tower.addEventListener("click", revezarJogador)
    })
}

function revezarJogador(event) {
  let torre = Array.from(event.currentTarget.children);

  for (let i = 0; i < torre.length; i++) {
    if (!torre[i].hasChildNodes()) {
      if (jogada === "vermelho") {
        let disco = document.createElement('div')
        disco.classList.add('disco-vermelho')
        torre[i].appendChild(disco)
        
        let celulaDisco = disco.parentElement
        let colunaDisco = disco.parentElement.parentElement
        let posicaoDisco = [Number(colunaDisco.classList[1]), Number(celulaDisco.classList[1])]
        let classeDisco = disco.classList[0]
        tabuleiro[posicaoDisco[0]][posicaoDisco[1]] = jogada
        
        jogada = 'preto'
        defineVitoria(posicaoDisco,classeDisco)
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
        defineVitoria(posicaoDisco,classeDisco)
        break
      }
    }
  }
}



function defineVitoria(posicao,classe) {
    verificaHorizontal(posicao,classe)
    verificaVertical(posicao,classe)
    verificaDiagonalCrescente(posicao,classe)
    verificaDiagonalDecrescente(posicao,classe)
}

function verificaHorizontal(posicao,classe) { }

function verificaVertical(posicao,classe) {
  let contagem  = 0
  let corClasse = classe.split("-")[1]
  let x = posicao[0] //coluna
  let y = posicao[1]-3 //linha
  
  for(let i = 0; i < 4; i++){
    let contagem = 0
    if(y >= 0 && y <= 5 && x >= 0 && x <= 6){
      if(tabuleiro[x][y] === corClasse){contagem++}
      if(tabuleiro[x][y+1] === corClasse){contagem++}
      if(tabuleiro[x][y+2] === corClasse){contagem++}
      if(tabuleiro[x][y+3] === corClasse){contagem++}
    }
    if(contagem === 4){
      console.log(corClasse, 'venceu')
      break
    }
    y++
  }
}


 

function verificaDiagonalCrescente(posicao,classe) {
   
}

function verificaDiagonalDecrescente(posicao,classe) { }
