let nombreJugador = "Desconocido";

async function cargarNombreJugador() {
    try {
        const response = await fetch("/PROYECTO_2EV/api/check_login.php", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            console.error("Error HTTP:", response.status);
            return;
        }

        const data = await response.json();

        if (data.logged_in === true && data.username) {
            nombreJugador = data.username;
        } else {
            nombreJugador = "Invitado";
        }

        console.log("Nombre cargado:", nombreJugador);

    } catch (error) {
        console.error("Error verificando login:", error);
    }
}

cargarNombreJugador();

var juego = new GameCore();

async function iniciarJuegoCuandoEsteListo() {
    while (!juego.initialized) {
        await new Promise(r => setTimeout(r, 50));
    }

    actualizarInterfaz();
}

iniciarJuegoCuandoEsteListo();

var imagenCartaJugador  = document.getElementById("img-jugador");
var imagenCartaRival    = document.getElementById("img-rival");

var textoPuntuacionJ1 = document.querySelector(".puntuacionJ1");
var textoPuntuacionJ2 = document.querySelector(".puntuacionJ2");

var textoRonda = document.querySelector(".ronda");

var elementoBandera = document.getElementById("bandera");
var imagenBandera   = document.querySelector(".win1");

var botonAtacar  = document.getElementById("atacar");
var botonDefender = document.getElementById("defensa");
var botonReiniciar = document.getElementById("restartGame");
var botonLogout = document.getElementById("logout");

var popupFinal     = document.getElementById("popup-final");
var popupNombre    = document.getElementById("popup-nombre");
var popupPJ        = document.getElementById("popup-pj");
var popupPR        = document.getElementById("popup-pr");
var popupRondas    = document.getElementById("popup-rondas");
var popupBtnSi     = document.getElementById("popup-si");
var popupBtnNo     = document.getElementById("popup-no");

function actualizarInterfaz() {

    var cartaJ = juego.cartaJugador;
    var cartaR = juego.cartaRival;

    if (cartaJ) imagenCartaJugador.src = cartaJ.imagen;
    if (cartaR) imagenCartaRival.src   = cartaR.imagen;

    if (cartaJ) {
        document.getElementById("atk-jugador").textContent = cartaJ.ataque;
        document.getElementById("def-jugador").textContent = cartaJ.defensa;
    } else {
        document.getElementById("atk-jugador").textContent = "-";
        document.getElementById("def-jugador").textContent = "-";
    }

    if (cartaR) {
        document.getElementById("atk-rival").textContent = cartaR.ataque;
        document.getElementById("def-rival").textContent = cartaR.defensa;
    } else {
        document.getElementById("atk-rival").textContent = "-";
        document.getElementById("def-rival").textContent = "-";
    }

    textoPuntuacionJ1.textContent = juego.puntuacionJugador;
    textoPuntuacionJ2.textContent = juego.puntuacionRival;

    textoRonda.textContent = juego.ronda;
}

function mostrarResultadoTemporal(ganador) {

    if (ganador === "jugador") imagenBandera.src = "../img/win1.png";
    else if (ganador === "rival") imagenBandera.src = "../img/win2.png";
    else imagenBandera.src = "../img/win1.png";

    elementoBandera.classList.add("show");

    setTimeout(() => {
        elementoBandera.classList.remove("show");
    }, 3000);
}

function ejecutarJugada(accionElegida) {

    var resultado = juego.jugar(accionElegida);

    if (resultado.ganador) {
        mostrarResultadoTemporal(resultado.ganador);
    }

    actualizarInterfaz();

    if (resultado.terminado === true) {
        finDeJuego(resultado.ganador);
    }
}

function finDeJuego(ganadorFinal) {

    popupNombre.textContent = nombreJugador;

    popupPJ.textContent = juego.puntuacionJugador;
    popupPR.textContent = juego.puntuacionRival;
    popupRondas.textContent = juego.ronda - 1;

    popupFinal.classList.remove("oculto");

    popupBtnSi.onclick = async function () {

    let victoriaInt = 0;

        if (ganadorFinal === "jugador") victoriaInt = 1;
        else if (ganadorFinal === "empate") victoriaInt = 2; 

        const datos = {
            puntuacion: juego.puntuacionJugador,
            victoria: victoriaInt
        };

        try {
            const response = await fetch("/PROYECTO_2EV/api/save_score.php", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            if (response.ok) {
                alert("Puntuación guardada correctamente.");
            } else {
                alert("Error al guardar puntuación.");
            }

            juego.logout();

        } catch (error) {
            alert("Error de conexión.");
        }
    };

    popupBtnNo.onclick = function () {
        juego.logout();
    };
}

botonAtacar.addEventListener("click", e => {
    e.preventDefault();
    ejecutarJugada("ataque");
});

botonDefender.addEventListener("click", e => {
    e.preventDefault();
    ejecutarJugada("defensa");
});

botonReiniciar.addEventListener("click", () => {
    juego.reset();
    actualizarInterfaz();
});

botonLogout.addEventListener("click", () => {
    juego.logout();
});

actualizarInterfaz();
