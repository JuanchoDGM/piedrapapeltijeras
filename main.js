let puntosUsuario = 0;
let puntosCpu = 0;
const span_puntosUsuario = document.getElementById("puntosUsuario");
const span_puntosCpu = document.getElementById("puntosCpu");
const scoreBoard = document.querySelector(".scoreBoard");
const resultado = document.querySelector(".resultado p");
const piedra = document.getElementById("piedra");
const papel = document.getElementById("papel");
const tijeras = document.getElementById("tijeras");

// Aquí defino la función "crearEleccionCpu", esto controla la eleccion de la computadora.
// Tiene una matríz (array) con las 3 opciones, numero random entre 0 - 3, redondeado.
function crearEleccionCpu() {
	const opciones = ["piedra","papel","tijeras"];
	const numeroRandom = Math.floor(Math.random() * 3);
	return opciones[numeroRandom];
}

// Aqui se define la funcion en caso de que el jugador gane. Recibirá la información de la funcion game.
function ganar(jugador, maquina) {
	puntosUsuario++;
	span_puntosUsuario.innerHTML = puntosUsuario;
	span_puntosCpu.innerHTML = puntosCpu;

	resultado.innerHTML = `<span class="resultadoJS">${jugador}</span> vence a <span class="resultadoJS">${maquina}</span>.<br> Ganaste!`;
	if (puntosUsuario === 10) {
		puntosUsuario = puntosUsuario - 10;
		puntosCpu = puntosCpu - puntosCpu;
		resultado.innerHTML = "Llegaste a 10 puntos. Eres el campeón";
	}

	// estos console.log los tenia para arreglar un bug. Los dejo como dato curioso.
	console.log("Eleccion usuario => " + jugador + "Eleccion cpu => " + maquina + " x");
}

// funcion en caso de que el jugador pierda.
function perder(jugador, maquina) {
	puntosCpu++;
	span_puntosUsuario.innerHTML = puntosUsuario;
	span_puntosCpu.innerHTML = puntosCpu;

	resultado.innerHTML = `<span class="resultadoJS">${jugador}</span> pierde contra <span class="resultadoJS">${maquina}</span>.<br> Perdiste!`;
	if (puntosCpu === 10) {
		resultado.innerHTML = "Tu oponente llegó a 10 puntos. Suerte para la próxima!";
		puntosUsuario = puntosUsuario - puntosUsuario;
		puntosCpu = puntosCpu - 10;
	} 

	// estos console.log los tenia para arreglar un bug. Los dejo como dato curioso.
	console.log("Eleccion usuario => " + jugador + "Eleccion cpu => " + maquina + " x");
}

//funcion en caso de empate
function empatar(jugador, maquina) {
	resultado.innerHTML = `<span class="resultadoJS">${jugador}</span> es igual que <span class="resultadoJS">${maquina}</span>.<br> Es un empate!`;
	
	// estos console.log los tenia para arreglar un bug. Los dejo como dato curioso.
	console.log("Eleccion usuario => " + jugador + "Eleccion cpu => " + maquina + " x");
}

// Aquí defino la función "eleccionUsuario", que va a controlar lo que el jugador elija.
function game(eleccionUsuario) {

	// Aquí se va a comprobar quien ganó, dependiendo de las opciones elegidas por cada uno. Están todos los casos posibles, y se especifica en 
	// cuales ganaste, en cuales perdiste, y en cuales ha sido un empate. Cada uno de los casos (ganar, perder, empatar) tiene un "break;", el 
	// cual nos corta el codigo cuando haya conseguido la respuesta para que no se continúe ejecutando.
	const eleccionCpu = crearEleccionCpu();
	switch (eleccionUsuario + eleccionCpu) {
		case "piedratijeras":
		case "papelpiedra":
		case "tijeraspapel":
			ganar(eleccionUsuario, eleccionCpu);
			break;
		case "papeltijeras":
		case "piedrapapel":
		case "tijeraspiedra":
			perder(eleccionUsuario, eleccionCpu);
			break;
		case "papelpapel":
		case "piedrapiedra":
		case "tijerastijeras":
			empatar(eleccionUsuario, eleccionCpu);
			break;
	}
}

// Aquí defino la función principal del juego. La cual, según lo que el jugador clique sabrá que fue lo que escogió, y le pasará el dato a la 
// función eleccionUsuario para que ella opere con dicho dato.
function main() {

	// si clicas el ícono de la piedra, le pasará "piedra" a la función.
	piedra.addEventListener('click', function(){
		game("piedra");
	})

	// si clicas el icono del papel, le pasará "papel" a la función.
	papel.addEventListener('click', function(){
		game("papel");
	})

	// si clicas el icono de las tijeras, le pasará "tijeras" a la función.
	tijeras.addEventListener('click', function(){
		game("tijeras");
	})
}

// Aquí se llama a la función principal para que se ejecute
main();

