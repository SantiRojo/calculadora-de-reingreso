const frontContainer = document.querySelector('.front-container');
const backContainer = document.querySelector('.back-container');

/*Inputs de calificaciones*/
const inputObjetivo = document.querySelector('#input-objetivo');
const inputAtendidas = document.querySelector('#input-atendidas');
const inputReingresadas = document.querySelector('#input-reingresadas');


const containerTituloDesempenio = document.querySelector('.container-titulo-card');
const tituloCard = document.querySelector('.titulo-card');
const containerPorcentaje = document.querySelector('.container-porcentaje');
const porcentaje = document.querySelector('.porcentaje');

const mensaje = document.querySelector('#mensaje');
const mensajeObjetivo = document.querySelector('#mensaje-objetivo');

const calcButton = document.querySelector('#calc-button');
const calcular = document.querySelector('#calcular');
const cerrar = document.querySelector('#cerrado');

let objetivo;
let atendidas;
let reingresadas;
let cumplimientoObjetivo;
let desempenio;
let llamadasASumar;
let resultadoMetrica;

const resultados = [
    {
        resultado: 'SOBRESALIENTE',
        estilos: 'sobresaliente',
        mensaje: '¡Excelente! 👏🏼',
        compararDesempenio: () => {
            return desempenio > 115;
        }
    },
    {
        resultado: 'ADECUADO',
        estilos: 'adecuado',
        mensaje: '¡A seguir así! 🙌🏼',
        compararDesempenio: () => {
            return desempenio >= 100 && desempenio <= 115;
        }
    },
    {
        resultado: 'A MEJORAR',
        estilos: 'a-mejorar',
        mensaje: 'Podés lograrlo 💪🏼',
        compararDesempenio: () => {
            return desempenio >= 70 && desempenio < 100;
        }
    },
    {
        resultado: 'INADECUADO',
        estilos: 'inadecuado',
        mensaje: '¡Manos a la obra!',
        compararDesempenio: () => {
            return desempenio < 70;
        }
    }
];


const calcularCumplimientoObjetivo = (atendidas,reingresadas) => {
    return Math.floor((reingresadas * 100) / atendidas);
}
const calcularDesempenio = () => {
    return Math.floor(((100 - cumplimientoObjetivo) * 100) / (100 - objetivo));
}

const calcularLlamadasASumar = () => {
    let totalAtendidasInicial = atendidas;
    let cumplimientoObjetivoInicial = cumplimientoObjetivo;
    let acumulacionDeLlamadas;

    for(let i = 0; !(cumplimientoObjetivoInicial >= objetivo) ; i++){
    
        cumplimientoObjetivoInicial = calcularCumplimientoObjetivo(atendidas, reingresadas);
        
        totalAtendidasInicial++;
        
        acumulacionDeLlamadas = i;
        
      }
      
      return acumulacionDeLlamadas; 
 
}

const filtrarResultadoMetrica = () => {
    return resultados.filter(result => result.compararDesempenio());
}

const animar = () => {
    frontContainer.classList.toggle('front-rotate');
    backContainer.classList.toggle('back-rotate');
    calcButton.classList.toggle('cerrar');
    calcular.classList.toggle('inactive');
    cerrar.classList.toggle('inactive');
}



inputObjetivo.addEventListener('input', () => {
    objetivo = parseInt(inputObjetivo.value);
});

inputAtendidas.addEventListener('input', () => {
    atendidas = parseInt(inputAtendidas.value); 
});

inputReingresadas.addEventListener('input', () => {
    reingresadas = parseInt(inputReingresadas.value);
});


calcButton.addEventListener('click', () => {

    cumplimientoObjetivo = calcularCumplimientoObjetivo();

    desempenio = calcularDesempenio();

    if(cumplimientoObjetivo < objetivo){
        promotoresASumar = calcularPromotoresASumar();

        mensajeObjetivo.innerText = `Sumá ${llamadasASumar} llamadas y alcanzá el objetivo`;
    } else {
        mensajeObjetivo.innerText = 'Estás en objetivo';
    }

    resultadoMetrica = filtrarResultadoMetrica();

    

    containerTituloDesempenio.classList.toggle(resultadoMetrica[0].estilos);
    tituloCard.innerText = resultadoMetrica[0].resultado;
    containerPorcentaje.classList.toggle(resultadoMetrica[0].estilos);
    porcentaje.innerText = `${cumplimientoObjetivo}%`;
    mensaje.innerText = resultadoMetrica[0].mensaje;

    animar();
    
});