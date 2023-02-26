//Array de controle
let palitos = [1, 1, 1, 1, 1];

//Array para armazenar numero de palitos removidos por cada jogador
let jPalit = new Array (2);
jPalit[0] = 0;
jPalit[1] = 0;

//Função para inicair o jogo
function play(){
    document.getElementById("box").remove();
    jogador = Math.floor(Math.random() * 2);
    atualizaJogador(jogador);
}

//Verica se o jogo chegou ao fim, caso tenha finalizado, exibe mensagem de vitória 
function fimJogo(jPalit, jogador){
    if(jPalit[0] + jPalit[1] == 15){
            
            let inicio = document.getElementById("palitos");
            let fim = document.createElement("div");
            fim.id = ("box");
            inicio.appendChild(fim);

            let b = document.getElementById("box");
            b.innerHTML = '<a id="play" class="btn btn-primary mt-2" onmousedown="resetaTabuleiro()" role="button">Reiniciar</a>';
            document.getElementById("quemJoga").textContent = "O jogo acabou. O Jogador " + (jogador + 1) + " venceu!";

            return true;
    }
}

//Troca a exibição do jogador 
function atualizaJogador(jogador){
    document.getElementById("quemJoga").textContent = "Vez do jogador " + (jogador + 1);
}

//Atualiza numero de palitos retirados por cada jogador
function atualizaPalitos(control){
    document.getElementById("point" + control).textContent = "Palitos retirados: " + jPalit[control];
}

//Marca palitos ao passar o ponteiro do mouse sobre os palitos
function marcaPalito(coluna, linha){
    for(let i = palitos[coluna]; i <= linha; i++){
        document.getElementById("img-" + coluna + i).src = "images/fosforo_mark.png";
        document.getElementById("img-" + coluna + i).style.backgroundColor = "#07a607";
    }
}

//Desmarca palitos ao retirar o ponteiro do mouse sobre os palitos
function desmarcaPalito(coluna, linha){
    for(let i = palitos[coluna]; i <= linha; i++){
        document.getElementById("img-" + coluna + i).src = "images/fosforo.png";
        document.getElementById("img-" + coluna + i).style.backgroundColor = "#024702";
    }
}

//Remove palitos clicados e realiza verificações de vitoria e atualização de dados
function removePalito(coluna, linha){
    
    let numPalit = 0;
    for(let i = palitos[coluna]; i <= linha; i++){
        //Busca o elemento
        let atualiza = document.getElementById("img-" + coluna + i);

        //Atualiza informações
        atualiza.src = "images/espaco_vazio.png";
        atualiza.id = ("vazio-" + coluna + i);
        atualiza.style.backgroundColor = "#024702";
        atualiza.disabled = true;

        palitos[coluna]++;
        numPalit++;
    }

    jPalit[jogador] += numPalit;
    atualizaPalitos(jogador);
    if(!fimJogo(jPalit, jogador)){
        if(numPalit != 0){
            if(jogador == 0)
                jogador = 1;
            else
                jogador = 0;
        }
        atualizaJogador(jogador);
    } 
}

// Restaura o tabuleiro
function resetaTabuleiro(){
    for(let i = 0; i < palitos.length; i++){
        for(let j = 1; j < palitos[i]; j++){
            //Busca o elemento
            let atualiza = document.getElementById("vazio-" + i + j);

            //Definindo id da imagem
            atualiza.id = ("img-" + i + j);
            
            //Definindo endereço imagem
            atualiza.src = "images/fosforo.png";
        }
    }

    palitos = [1, 1, 1, 1, 1];
    jPalit[0] = 0;
    jPalit[1] = 0;

    document.getElementById("box").remove();
    document.getElementById("point0").textContent = "Palitos retirados: 0";
    document.getElementById("point1").textContent = "Palitos retirados: 0";

    jogador = Math.floor(Math.random() * 2);
    atualizaJogador(jogador);
}