const pantalla = document.querySelector('.screen');
const botones = document.querySelectorAll('.btn');
const operadores = document.querySelectorAll('.operator');

let mostrar = '';//Lo que hace esto es q muestra lo que se pulse en la calculadora

function mostrarnum(numero) {
    mostrar += numero;//esto es para q se ponga el mostrar mas el numero, es decir q no se reinicie cuando ponga un numero y luego otro
    pantalla.value = mostrar;
}

function operacion(operador) {
    if (operador === '=') {
        try {
            const sanitizedInput = sanitizeInput(mostrar);//Esto lo busque en internet y lo que hace es que cuando pulse otro caracter q no sea un numero, al poner un numero o un signo luego se elimina
            const resultado = eval(sanitizedInput);
            if (resultado === Infinity) {
                pantalla.value = 'Infinito';//esto es como eextra para que cuando divida entre 0 y me salga infinity me salga infinito en español(no funciona pero dejo la intencion aqui ._. es como q lo solapa lo del error del maximo permitido)
            }
            
        } catch (error) {
            pantalla.value = 'Error';
        }
    } else if (operador === 'C') {
        mostrar = '';//esto hace que cuando apretes la C te deja vacio lo puesto en la calculadora
        pantalla.value = mostrar;
    } else {
        mostrar += operador;//y si es un signo que al apretarlo te lo muestre
        pantalla.value = mostrar;
    }
}

function sanitizeInput(salida) {
    return salida.replace(/[^-()\d/*+.]/, '');//esto como se puede ver acompaña al sanitizeinput de arriba por el return lo devuelve y lo que hace es lo comentado arriba no deja poner algo q no sea un numero o signo sin que se elimine despues 
}

botones.forEach(laC => {
    laC.addEventListener('click', () => {//el igual y el mayor, q hace la flecha la puse porque busque por internet porque no me dejaba hacerlo con el igual y tuve q hacerlo asi
        if (laC.value === 'C') {
            operacion('C');
        } else {
            mostrarnum(laC.value);//esto es para 
        }
    });
});

operadores.forEach(operador => {
    operador.addEventListener('click', () => {//lo que hace esto es que detecta el click realizado en algun numero o caracter y resuelve la operacion
        operacion(operador.value);
    });
});

document.querySelector('.container').addEventListener('click', function(deteccion) {//detecta en el contenedro si el signo igual es correcto y si lo es realiza la operacion
    if (deteccion.target && deteccion.target.value === '=') {
        operacion('=');
    }

});
function operacion(operador) {
    if (operador === '=') {
        try {
            const sanitizedInput = sanitizeInput(mostrar);
            const resultado = eval(sanitizedInput);

            // Para poner el alert si el resultado excede el límite
            if (Math.abs(resultado) > 100000000 * 1000000000000) {
                alert("El resultado excede el límite permitido.");
                return;
            }

            // De aqui abajo tuve que poner todo esto otra vez porque no me funciona bien el tema del limite por numeros 
            if (Number. isInteger(resultado)) {
                pantalla.value = resultado;
                mostrar = resultado.toString();
            } else {
                pantalla.value = 'Error';
            }
        } catch (error) {
            pantalla.value = 'Error';
        }
    } else if (operador === 'C') {
        mostrar = '';
        pantalla.value = mostrar;
    }
     else {
        mostrar += operador;
        pantalla.value = mostrar;
    }
   
}
;