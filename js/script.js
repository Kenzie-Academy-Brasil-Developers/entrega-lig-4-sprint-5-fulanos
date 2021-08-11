const tabuleiro = [
  "      ",
  "      ",
  "      ",
  "      ",
  "      ",
  "      ",
  "      ",
];

let jogada = "vermelho";

function geraTabuleiro(mapa) {
  let principal = document.createElement("div");
  principal.classList.add("principal");

  for (let i = 0; i < mapa.length; i++) {
    let coluna = document.createElement("div");
    coluna.classList.add("coluna");
    coluna.classList.add(i);
    for (let j = 0; j < mapa[i].length; j++) {
      let celula = document.createElement("div");
      celula.classList.add("linha");
      celula.classList.add(j);
      coluna.append(celula);
    }
    principal.append(coluna);
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
  selecionarTorres();
}

function selecionarTorres() {
  let torres = document.querySelectorAll(".coluna");
  torres = [...torres];

  torres.forEach(function (tower) {
    tower.addEventListener("click", revezarJogador);
  });
}

function revezarJogador(event) {
  let torre = Array.from(event.currentTarget.children);

  for (let i = 0; i < torre.length; i++) {
    if (!torre[i].hasChildNodes()) {
      if (jogada === "vermelho") {
        let disco = document.createElement("div");
        disco.classList.add("disco-vermelho");
        torre[i].appendChild(disco);

        //console.log(disco)
        jogada = "preto";
        defineVitoria(disco);
        break;
      } else {
        let disco = document.createElement("div");
        disco.classList.add("disco-preto");
        torre[i].appendChild(disco);

        //console.log(disco.parentElement)
        jogada = "vermelho";
        defineVitoria(disco);
        break;
      }
    }
  }
}

function defineVitoria(disco) {
  verificarVertical(disco);
  //verificarHorizontal(disco)
}

function verificarVertical(disco){
    let x = disco.parentElement.classList[1]
    let colunaDisco = disco.parentElement.parentElement
    console.log(colunaDisco)
    console.log(x)
    for(let i = x; i >= (x-3); i--){
        for(let j = colunaDisco; j < colunaDisco.length; j++)
        if([i] === 3 && j[i] && jogador == 'vermelho'){
            alert('vermelho ganhou')
        }else if([i] === 3 &&  colunaDisco){
            alert('preto ganhou')
        }
    }
}







// console.log(x)
// console.log(y)

//[[row, col], [row, col+1], [row, col+2], [row, col+3]]
//1 - checar possibilidades vertical-hori

//.classList.contains('i')
//disco.parentElement.classList

//linha brother - disco.parentElement.children

//1 - checar possibilidades vertical-hori

//.classList.contains('i')
//disco.parentElement.classList

//linha brother - disco.parentElement.children
