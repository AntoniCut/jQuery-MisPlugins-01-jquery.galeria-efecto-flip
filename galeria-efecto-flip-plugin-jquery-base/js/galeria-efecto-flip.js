//  *************************************************************************************************************  
//  **********  /01-todo-jquery-de-novato-a-experto/02-jquery-ejercicios-ejemplos/  *****************************
//  **********  /seccion14-galeria-efecto-flip/51-galeria-efecto-flip/js/mosaico-fotos-efecto-flip.js  **********  
//  *************************************************************************************************************  


//  ----------  ELEMENTOS GLOBALES  ----------

//  -----  Variables  -----
let fondo = 1;
const numFondos = 6;
let banderaCiclo = false;
let timer;


//  -----  Arreglo de Efectos  -----
const efectosArray = [
    'lr',       //  Izquierda a Derecha
    'rl',       //  Derecha a Izquierda
    'tb',       //  Arriba a Abajo
    'bt',       //  Abajo a Arriba
];


//  -----  Referencias al HTML  -----
const $foto = $("#foto");
const $inicio = $("#inicio");
const $atras = $("#atras");
const $play = $("#play");
const $stop = $("#stop");
const $adelante = $("#adelante");
const $fin = $("#fin");


//  ----------  AL CARGAR EL DOCUMENTO  ----------
$(document).ready(inicio);


//  ----------  INICIO  ----------
function inicio() {

    console.warn('----------  Documento Cargado!!!  ----- ', 'CDN Google - jQuery version:', $.fn.jquery, ' ----------', '\n');


    //  -----  Eventos click  -----
    $foto.click(avanza);

    $inicio.click(inicia);
    $atras.click(atras);
    $play.click(ciclo);
    $stop.click(stop);
    $adelante.click(avanza);
    $fin.click(ultimo);

    $stop.hide();       //  -----  ocultar botón de stop  -----

}


//  ----------  VOLTEA  ----------
function voltea() {

    const archivo = `fondo${fondo}.jpg`;                                //  guardamos la url de la imagen.
    const efecto = Math.floor(Math.random() * efectosArray.length);     //  Nº aleatorio del efecto.

    //  -----  Efecto flip de la libreria  -----
    $foto.flip({
        direction: efectosArray[efecto],
        color: "#ffffff",
        onEnd: function () {
            $("#foto").html("<img src='fondos/" + archivo + "' width='600px' height='400px'/>");
        }
    });

    if (banderaCiclo) {
        timer = setTimeout(continuaCiclo, 2000);
    }
}



//  ----------  |<<  --  voltea la primera foto  ----------
function inicia() {
    
    verificaCiclo();
    fondo = 1;
    voltea();
}


//  ----------  <<  --  Retrocede una foto hacia atras  -----
function atras() {
    verificaCiclo();
    fondo--;
    if (fondo === 0) fondo = numFondos;
    voltea();
}


//  ----------  >  --  PLAY  --  Ciclo secuencial  ----------
function ciclo() {
    $play.hide();
    $stop.show();
    banderaCiclo = true;
    continuaCiclo();
}


//  ----------  #  --  STOP  --  llama a verificaciclo y lo para  ----------
function stop() {
    verificaCiclo();
}


//  ----------  Verifica y Para el Ciclo  ----------
function verificaCiclo() {

    if (banderaCiclo) {
        clearTimeout(timer);
        $stop.hide();
        $play.show();
        banderaCiclo = false;
    }
}

//  ----------  >>  --  Avanza una foto hacia delente  -----
function avanza() {
    verificaCiclo();
    fondo++;
    if (fondo > numFondos) fondo = 1;
    voltea();
}


//  ----------  >>|  --  voltea la ultima foto  ----------
function ultimo() {
    verificaCiclo();
    fondo = numFondos;
    voltea();
}


//  ----------  continua con el ciclo  ----------
function continuaCiclo() {
    fondo++;
    if (fondo > numFondos) fondo = 1;
    voltea();
}
