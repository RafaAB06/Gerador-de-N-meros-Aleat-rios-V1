const botaoGerador = document.getElementById('botao-gerador');
const textosBotaoGerador = ['Gerar Número', 'Gerando Número...']

const textoSobre = document.getElementById('texto-dentro-sobre');
const textosSobre = ['Insira um Intervalo Válido', 'Insira um Intervalo Numérico Real'];

const leaderBoard = document.getElementById('leaderBoard');

const somMotor = document.getElementById('som-motor');
const somCreeper = document.getElementById('som-creeper');
const somErro = document.getElementById('som-error');

const gears = document.getElementsByClassName('gear');

const quadradoQueGira = document.getElementById('quadrado-que-gira');

const min = document.getElementById('min'); 
const max = document.getElementById('max');

let minValue = 0;
let maxValue = 0;
let finalValue = 0;

let isGenerating = false;
let isError = false;

botaoGerador.addEventListener('click', gerarNumero);

min.addEventListener('input', MudarTextoParaOriginal);

max.addEventListener('input', MudarTextoParaOriginal);

function gerarNumero() {
    if(isGenerating){return;}
    
    minValue = min.value;
    maxValue = max.value;

    if((!Number.isInteger(parseInt(minValue)) || !Number.isInteger(parseInt(maxValue)))){
        MensagemDeErro();
        return;
    }
    if(parseInt(minValue) > parseInt(maxValue)){
        MensagemDeErro();
        return;
    }
    isGenerating = true;
    const tempo = 6000;

    max.readOnly = true;
    min.readOnly = true;

    Play(somMotor);

    GirarGear(true, gears[0]);
    GirarGear(false, gears[1]);

    botaoGerador.innerText = textosBotaoGerador[1];
    quadradoQueGira.classList.add('girando-estranho');

    pauseAndFinishAnimation(tempo);
}

function pauseAndFinishAnimation(time){

    setTimeout(() => {
        Pause(somMotor, true);
        quadradoQueGira.classList.remove('girando-estranho');

        Play(somCreeper);

        PararGear(true, gears[0]);
        PararGear(false, gears[1]);

        finalValue = getRandomInteger(parseInt(minValue), parseInt(maxValue));
        AdicionarItemPlacar(finalValue);

        max.readOnly = false;
        min.readOnly = false;

        isGenerating = false;

        botaoGerador.innerText = textosBotaoGerador[0];
    }, time);
}

function Play(audio){
    audio.play();
}

function Pause(audio, restart){
    audio.pause();
    if(!restart){return;}
    audio.currentTime = 0;
}

function GirarGear(horario, gear){
    if (horario) {
        gear.classList.add('gear-horario');
    } else {
        gear.classList.add('gear-antihorario');
    }
}

function PararGear(horario, gear){
    if (horario) {
        gear.classList.remove('gear-horario');
    } else {
        gear.classList.remove('gear-antihorario');
    }
}

function MensagemDeErro(){
    if(isError){return;}
    isError=true;
    textoSobre.innerText = textosSobre[0];
    Play(somErro);

    setTimeout(() => {
        textoSobre.innerText = textosSobre[1];
        isError=false;
    }, 2000);
}

function MudarTextoParaOriginal(){
    if(isGenerating){
        return;
    }
    botaoGerador.innerText = textosBotaoGerador[0];
}

let items = [];

function AdicionarItemPlacar(valor){
    if(items.length == 10){
        items[0].remove();
        items.shift();
    }
    subLed = document.createElement("div");
    subLed.classList.add('subLed');

    subLedText = document.createElement("h1");
    subLedText.classList.add('subLedText');
    subLedText.innerText = valor.toString();

    subLed.appendChild(subLedText);
    leaderBoard.appendChild(subLed);

    items.push(subLed);
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
