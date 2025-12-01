var juego = new GameCore("normal");

var nombreJugador = "Desconocido";

function cargarNombreJugador() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/check_login.php", true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var respuesta = JSON.parse(xhr.responseText);

                if (respuesta.logged === true && respuesta.username) {
                    nombreJugador = respuesta.username;
                }

            } catch (e) {
                console.error("Error procesando JSON de login:", e);
            }
        }
    };

    xhr.send();
}

cargarNombreJugador();

var imagenCartaJugador  = document.querySelector(".card img");
var imagenCartaRival    = document.querySelector(".enemy-card img");

var ataqueJugadorElem  = document.getElementById("ataque-jugador");
var defensaJugadorElem = document.getElementById("defensa-jugador");

var ataqueRivalElem    = document.getElementById("ataque-rival");
var defensaRivalElem   = document.getElementById("defensa-rival");

var botonAtacar  = document.getElementById("atacar");
var botonDefender = document.getElementById("defensa");

var textoPuntuacionJ1 = document.querySelector(".puntuacionJ1");
var textoPuntuacionJ2 = document.querySelector(".puntuacionJ2");

var textoRonda = document.querySelector(".ronda");

var elementoBandera = document.getElementById("bandera");
var imagenBandera   = document.querySelector(".win1");

var botonReiniciar = document.getElementById("restartGame");


var popupFinal     = document.getElementById("popup-final");
var popupNombre    = document.getElementById("popup-nombre");
var popupPJ        = document.getElementById("popup-pj");
var popupPR        = document.getElementById("popup-pr");
var popupRondas    = document.getElementById("popup-rondas");
var popupDificultad = document.getElementById("popup-dificultad");

var popupBtnSi     = document.getElementById("popup-si");
var popupBtnNo     = document.getElementById("popup-no");

function actualizarInterfaz() {

    var cartaJ = juego.cartaJugador;
    var cartaR = juego.cartaRival;

    if (cartaJ !== null) {
        imagenCartaJugador.src = cartaJ.imagen;
    }

    if (cartaR !== null) {
        imagenCartaRival.src = cartaR.imagen;
    }

    if (!document.getElementById("stats-jugador")) {

        var divStatsJ = document.createElement("div");
        divStatsJ.id = "stats-jugador";
        divStatsJ.className = "stats";

        divStatsJ.innerHTML = `
            <div class="stat attack" id="atk-jugador"></div>
            <div class="stat defense" id="def-jugador"></div>
        `;

        imagenCartaJugador.parentElement.appendChild(divStatsJ);
    }

    if (!document.getElementById("stats-rival")) {

        var divStatsR = document.createElement("div");
        divStatsR.id = "stats-rival";
        divStatsR.className = "stats";

        divStatsR.innerHTML = `
            <div class="stat attack" id="atk-rival"></div>
            <div class="stat defense" id="def-rival"></div>
        `;

        imagenCartaRival.parentElement.appendChild(divStatsR);
    }

    if (cartaJ !== null) {
        document.getElementById("atk-jugador").textContent = cartaJ.ataque;
        document.getElementById("def-jugador").textContent = cartaJ.defensa;
    }

    if (cartaR !== null) {
        document.getElementById("atk-rival").textContent = cartaR.ataque;
        document.getElementById("def-rival").textContent = cartaR.defensa;
    }

    textoPuntuacionJ1.textContent = juego.puntuacionJugador;
    textoPuntuacionJ2.textContent = juego.puntuacionRival;

    textoRonda.textContent = juego.ronda;
}

function mostrarResultadoTemporal(ganador) {

    if (ganador === "jugador") {
        imagenBandera.src = "img/win1.png";
    }
    else if (ganador === "rival") {
        imagenBandera.src = "img/win2.png";
    }
    else {
        imagenBandera.src = "img/win1.png";
    }

    elementoBandera.classList.add("show");

    setTimeout(function () {
        elementoBandera.classList.remove("show");
    }, 3000);
}

function ejecutarJugada(accionElegida) {

    selectorAccion.value = accionElegida;

    var resultado = juego.jugar(accionElegida);

    if (resultado.ganador !== null) {
        mostrarResultadoTemporal(resultado.ganador);
    }

    actualizarInterfaz();

    if (resultado.terminado === true) {
        finDeJuego(resultado.ganador);
    }
}

function finDeJuego(ganadorFinal) {

    popupNombre.textContent = nombreJugador;
    popupDificultad.textContent  = juego.dificultad;
    popupPJ.textContent = juego.playerScore;
    popupPR.textContent = juego.opponentScore;
    popupRondas.textContent = juego.round - 1;

    popupFinal.classList.remove("oculto");

    popupBtnSi.onclick = function () {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/save_score.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        var datos = JSON.stringify({
            jugador: nombreJugador,
            dificultad: juego.dificultad,
            puntuacionJugador: juego.playerScore,
            puntuacionRival: juego.opponentScore,
            rondas: juego.round - 1,
            resultado: ganadorFinal
        });

        xhr.onload = function () {
            if (xhr.status === 200) {
                alert("Puntuación guardada correctamente.");
            } else {
                alert("Error al guardar puntuación.");
            }
            window.location.href = "provisional.html";
        };

        xhr.send(datos);
    };

    popupBtnNo.onclick = function () {
        window.location.href = "provisional.html";
    };
}

// Botón ATACAR
botonAtacar.addEventListener("click", function (evento) {
    evento.preventDefault();
    ejecutarJugada("ataque");
});

// Botón DEFENDER
botonDefender.addEventListener("click", function (evento) {
    evento.preventDefault();
    ejecutarJugada("defensa");
});

// Botón REINICIAR
botonReiniciar.addEventListener("click", function () {
    juego.reiniciar();
    actualizarInterfaz();
});

actualizarInterfaz();