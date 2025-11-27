let ALL_CARDS = [];

async function cargarCartas() {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/api/start_game.php", true);

        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4) {

                if (xhr.status !== 200) {
                    console.error("Error HTTP:", xhr.status);
                    reject(false);
                    return;
                }

                try {
                    const data = JSON.parse(xhr.responseText);
                    ALL_CARDS = data;
                    console.log("Cartas recibidas:", ALL_CARDS);
                    resolve(true);
                }
                catch (e) {
                    console.error("JSON inválido:", e);
                    reject(false);
                }
            }
        };

        xhr.onerror = function () {
            console.error("Error de red");
            reject(false);
        };

        xhr.send();
    });
}

class GameCore {

    constructor(dificultad = "normal") {
        this.dificultad = dificultad;
        this.initialized = false;

        this.init();
    }

    async init() {
        const ok = await cargarCartas();

        if (!ok) {
            alert("No se pudieron cargar las cartas.");
            return;
        }

        this.reset();
        this.initialized = true;
    }

    obtenerCartasPorDificultad() {

        if (this.dificultad === "facil") {
            return ["A1","A2","B1","B2","C1","C2"];
        }

        if (this.dificultad === "normal") {
            return ["B1","B2","C1","C2"];
        }

        if (this.dificultad === "dificil") {
            return ["C1","C2"];
        }

        return ["A1","A2","B1","B2","C1","C2"];
    }

    generarMazo(maxCards, misCartas) {

        let tiposPermitidos;

        if (misCartas === "jugador") {
            tiposPermitidos = ["A1","A2","B1","B2","C1","C2"];
        }
        else {
            tiposPermitidos = this.obtenerCartasPorDificultad();
        }

        const cartasFiltradas = [];

        for (const carta of ALL_CARDS) {
            if (tiposPermitidos.includes(carta.tipo)) {
                cartasFiltradas.push(carta);
            }
        }

        const mazo = [];

        for (let i = 0; i < maxCards; i++) {
            const indice = Math.floor(Math.random() * cartasFiltradas.length);
            mazo.push(cartasFiltradas[indice]);
        }

        return mazo;
    }

    reset() {

        this.ronda = 1;
        this.puntuacionJugador = 0;
        this.puntuacionRival = 0;

        this.mazoJugador = this.generarMazo(10, "jugador");
        this.mazoRival   = this.generarMazo(10, this.dificultad);

        this.historial = [];

        this.actualizarCartasActuales();
    }

    logout() {
        fetch("/api/logout.php")
            .then(response => {
                if (response.ok) {
                    window.location.href = "../login/login.html";
                } else {
                    console.error("Error HTTP:", response.status);
                }
            })
            .catch(error => {
                console.error("Error de red:", error);
            });
    }

    actualizarCartasActuales() {

        this.cartaJugador = this.mazoJugador.length > 0
            ? this.mazoJugador[0]
            : null;

        this.cartaRival = this.mazoRival.length > 0
            ? this.mazoRival[0]
            : null;
    }

    jugar(accion) {

        if (!this.cartaJugador || !this.cartaRival) {
            return { terminado: true };
        }

        let valorJugador, valorRival;

        if (accion === "ataque") {
            valorJugador = this.cartaJugador.ataque;
            valorRival   = this.cartaRival.ataque;
        }
        else {
            valorJugador = this.cartaJugador.defensa;
            valorRival   = this.cartaRival.defensa;
        }

        let ganador;

        if (valorJugador > valorRival) {
            ganador = "jugador";
            this.puntuacionJugador++;
        }
        else if (valorJugador < valorRival) {
            ganador = "rival";
            this.puntuacionRival++;
        }
        else {
            ganador = "empate";
        }

        this.historial.push({
            ronda: this.ronda,
            accion: accion,
            cartaJugador: this.cartaJugador,
            cartaRival: this.cartaRival,
            valorJugador,
            valorRival,
            ganador
        });

        this.mazoJugador.shift();
        this.mazoRival.shift();

        this.ronda++;
        this.actualizarCartasActuales();

        if (this.mazoJugador.length === 0 || this.mazoRival.length === 0) {

            let ganadorFinal;

            if (this.puntuacionJugador > this.puntuacionRival) ganadorFinal = "jugador";
            else if (this.puntuacionJugador < this.puntuacionRival) ganadorFinal = "rival";
            else ganadorFinal = "empate";

            return { terminado: true, ganador: ganadorFinal };
        }

        return { terminado: false, ganador };
    }
}
