//  *********************************************************************************************  
//  **********  /galeria-efecto-flip-plugin-jquery-v1/js/mosaico-fotos-efecto-flip.js  **********  
//  ********************************************************************************************  



(function ($) {


    $.fn.galeriaEfectoFlip = function (options) {


        console.warn('----------  Plugin jQuery Galeria Efecto Flip Cargado!!!  ---------- \n');


        //  ----------  Opciones por defecto y extendidas  ----------
        const defaults = {
            numFondos: 6,
            efectosArray: ['lr', 'rl', 'tb', 'bt'],
            intervalo: 2000,
            rutaFondos: 'fondos/',
            rutaBotones: 'fondos/botones/',
            widthImg: 600,
            heightImg: 400
        };

        const settings = $.extend({}, defaults, options);


        //  ----------  Variables internas  ----------
        let fondo = 1;
        let banderaCiclo = true;
        let timer;

        //  ----------  Crear HTML  ----------
        const crearHTML = ($galeria) => {

            const $foto = $(`<div style="width: ${settings.widthImg}px; height: ${settings.heightImg}px;">`, { id: "foto" });

            const imgFoto = $("<img>", {
                src: `${settings.rutaFondos}fondo1.jpg`,
                width: `${settings.widthImg}px`,
                height: `${settings.heightImg}px`
            });

            $foto.append(imgFoto);

            const botoneraDiv = $("<div>", {
                class: "botonera",
                style: `width: ${settings.widthImg}px;`
            });

            const botones = [
                { id: "inicio", src: `${settings.rutaBotones}inicio.png`, alt: "inicio" },
                { id: "atras", src: `${settings.rutaBotones}atras.png`, alt: "atrás" },
                { id: "play", src: `${settings.rutaBotones}play.png`, alt: "play" },
                { id: "stop", src: `${settings.rutaBotones}stop.png`, alt: "stop" },
                { id: "adelante", src: `${settings.rutaBotones}adelante.png`, alt: "adelante" },
                { id: "fin", src: `${settings.rutaBotones}fin.png`, alt: "último" }
            ];

            botones.forEach(boton => {
                const botonDiv = $("<div>", {
                    class: "botones",
                    id: boton.id
                });

                const imgBoton = $("<img>", {
                    src: boton.src,
                    alt: boton.alt,
                    width: "50px",
                    height: "40px"
                });

                botonDiv.append(imgBoton);
                botoneraDiv.append(botonDiv);
            });

            $galeria.append($foto, botoneraDiv);

            return {
                $foto,
                $botones: botones.map(b => $(`#${b.id}`))
            };
        };



        //  --------------------------------------------
        //  ----------  Lógica de la galería  ----------
        //  --------------------------------------------

        const voltea = ($foto) => {
            
            console.log(fondo);
            const archivo = `fondo${fondo}.jpg`;
            const efecto = Math.floor(Math.random() * settings.efectosArray.length);

            // Aplicar el efecto flip
            $foto.flip({
                direction: settings.efectosArray[efecto],
                color: "#ffffff",
                onEnd: function () {
                    // Cambiar la imagen después del efecto flip
                    $foto.html(`<img src='${settings.rutaFondos}${archivo}' width='${settings.widthImg}px' height='${settings.heightImg}px' />`);
                }
            });

            
            // Actualizar fondo para el siguiente ciclo
            if (banderaCiclo) {
                fondo = fondo < settings.numFondos ? fondo + 1 : 1;
                timer = setTimeout(() => voltea($foto), settings.intervalo);
            }
        };


        const verificaCiclo = ($play, $stop) => {
            $play.show();
            $stop.hide();
            if (banderaCiclo) {
                clearTimeout(timer);
                banderaCiclo = false;
            }
        };


        const avanza = ($play, $stop, $foto) => {
            
            verificaCiclo($play, $stop);
            fondo = fondo < settings.numFondos ? fondo + 1 : 1;
            voltea($foto);
            
        };


        const atras = ($play, $stop, $foto) => {
            verificaCiclo($play, $stop);
            fondo = fondo > 1 ? fondo - 1 : settings.numFondos;
            voltea($foto);
        };


        const inicia = ($play, $stop, $foto) => {
            verificaCiclo($play, $stop);
            fondo = 1;
            voltea($foto);
        };


        const ultimo = ($play, $stop, $foto) => {
            verificaCiclo($play, $stop);
            fondo = settings.numFondos;
            voltea($foto);
        };


        const ciclo = ($play, $stop, $foto) => {
            banderaCiclo = true;
            continuaCiclo($foto);
            $play.hide();
            $stop.show();
        };


        const stop = ($play, $stop) => {
            verificaCiclo($play, $stop);
        };


        const continuaCiclo = ($foto) => {
            
            fondo = fondo < settings.numFondos ? fondo + 1 : 1;
            //if(fondo < settings.numFondos) fondo++;
            //else fondo = 1;
            voltea($foto);  // Llamar a voltea para actualizar la imagen
        };


        //  ----------  Inicializar el plugin  ----------
        return this.each(function () {

            const $galeria = $(this);

            //  -----  Crear HTML  -----
            const { $foto, $botones } = crearHTML($galeria);

            //  -----  Iniciamos la aplicación con movimiento  -----
            timer = setTimeout(() => voltea($foto), settings.intervalo);

            const [inicioBtn, atrasBtn, playBtn, stopBtn, adelanteBtn, finBtn] = $botones;

            //  -----  Asignar eventos  -----
            $foto.click(() => avanza(playBtn, stopBtn, $foto));
            inicioBtn.click(() => inicia(playBtn, stopBtn, $foto));
            atrasBtn.click(() => atras(playBtn, stopBtn, $foto));
            playBtn.click(() => ciclo(playBtn, stopBtn, $foto));
            stopBtn.click(() => stop(playBtn, stopBtn));
            adelanteBtn.click(() => avanza(playBtn, stopBtn, $foto));
            finBtn.click(() => ultimo(playBtn, stopBtn, $foto));

            playBtn.hide(); // Ocultar el botón de play al inicio

        });
    };

})(jQuery);
