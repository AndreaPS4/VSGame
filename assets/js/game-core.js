let ALL_CARDS = [];

async function cargarCartas() {
    try {
        const response = await fetch("../api/start_game.php", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            console.error("Error HTTP:", response.status);
            return false;
        }

        const data = await response.json();

        if (!data.success) {
            console.error("Error en la API: Usuario no autorizado");
            return false;
        }

        ALL_CARDS = data.cartas;
        console.log("Cartas recibidas:", ALL_CARDS);

        return true;

    } catch (error) {
        console.error("Error de red:", error);
        return false;
    }
}

class GameCore {

    constructor() {
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

    generarMazo(maxCards) {

        const mazo = [];

        for (let i = 0; i < maxCards; i++) {
            const indice = Math.floor(Math.random() * ALL_CARDS.length);
            mazo.push(ALL_CARDS[indice]);
        }

        return mazo;
    }

    reset() {

        this.ronda = 1;
        this.puntuacionJugador = 0;
        this.puntuacionRival = 0;

        this.mazoJugador = this.generarMazo(10);
        this.mazoRival   = this.generarMazo(10);

        this.historial = [];

        this.actualizarCartasActuales();
    }

    logout() {
        fetch("../api/logout.php", { credentials: "include" })
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
        this.cartaJugador = this.mazoJugador[0] || null;
        this.cartaRival   = this.mazoRival[0]   || null;
    }

    jugar(accion) {

        if (!this.cartaJugador || !this.cartaRival) {
            return { terminado: true };
        }

        let valorJugador, valorRival;

        if (accion === "ataque") {
            valorJugador = this.cartaJugador.ataque;
            valorRival   = this.cartaRival.ataque;
        } else {
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
            accion,
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

            if      (this.puntuacionJugador > this.puntuacionRival) ganadorFinal = "jugador";
            else if (this.puntuacionJugador < this.puntuacionRival) ganadorFinal = "rival";
            else ganadorFinal = "empate";

            return { terminado: true, ganador: ganadorFinal };
        }

        return { terminado: false, ganador };
    }
}
