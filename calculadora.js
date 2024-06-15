const pantalla = document.querySelector('.screen');
const botones = document.querySelectorAll('.btn');
const operadores = document.querySelectorAll('.operator');

let mostrar = '';
let operacionPendiente = '';
let operando1 = null;
let operando2 = null;

function mostrarnum(numero) {
    mostrar += numero;
    pantalla.value = mostrar;
}

function realizarOperacion() {
    if (operando1 !== null && operacionPendiente !== '' && mostrar !== '') {
        operando2 = parseFloat(mostrar);
        let resultado;

        switch (operacionPendiente) {
            case '+':
                resultado = operando1 + operando2;
                break;
            case '-':
                resultado = operando1 - operando2;
                break;
            case '*':
                resultado = operando1 * operando2;
                break;
            case '/'://si se divide por algun distinto a 0 la operacion se hara, si se divide por 0 saldra infinito 
                if (operando2 !== 0) {
                    resultado = operando1 / operando2;
                } else {
                    resultado = 'Infinito';
                }
                break;
            default:
                resultado = 'Error';
        }

        if (Math.abs(resultado) > 10000000*10000000) {
            alert("El número es demasiado largo.");
            pantalla.value = '';
            mostrar = '';
            operacionPendiente = '';
            operando1 = null;
            operando2 = null;
        } else {

        pantalla.value = resultado;
        mostrar = resultado.toString();
        operacionPendiente = '';
        operando1 = null;
        operando2 = null;
    }
}
}


function operacion(operador) {
    if (operador === 'C') {
        mostrar = '';
        operacionPendiente = '';
        operando1 = null;
        operando2 = null;
        pantalla.value = '';
    } else if (operador === '=') {
        realizarOperacion();
    } else {
        if (mostrar !== '') {
            operando1 = parseFloat(mostrar);
            operacionPendiente = operador;
            mostrar = '';
        }
    }
}

function agregarEventoBoton(boton) {//esto para que se me agregue el boton y para que funcione si no esta no funciona nada
    boton.addEventListener('click', function() {
        if (boton.value === 'C') {
            operacion('C');
        } else {
            mostrarnum(boton.value);
        }
    });
}

function agregarEventoOperador(operador) {//esto es para que reaccione al click en los operadores
    operador.addEventListener('click', function() {
        operacion(operador.value);
    });
}

for (let i = 0; i < botones.length; i++) {//este for es para q me salgan los numeros por pantalla
    agregarEventoBoton(botones[i]);
}

for (let i = 0; i < operadores.length; i++) { //este for es para q me realice la operacion si no los operadores me salen por pantalla y no me hace nada
    agregarEventoOperador(operadores[i]);
}

document.querySelector('.container').addEventListener('click', function(deteccion) {//esto es para q se realice la operacion al darle al igual
    if (deteccion.target && deteccion.target.value === '=') {
        operacion('=');
    }
});
