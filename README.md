# VSGAME – Juego de Cartas (Proyecto FullStack)

VSGAME es un juego de cartas donde un usuario compite contra la máquina en rondas de ataque y defensa.  
La lógica del juego se ejecuta completamente en el **Front-End**, mientras que el Back-End se encarga de la autenticación, la persistencia de datos y la administración.

---

## 🎯 Objetivo del Proyecto
Crear una aplicación web completa (FE + BE + BD) con arquitectura modular, panel de administración, APIs funcionales y flujo completo de juego.

---

## 👥 Equipo
- **Front-End (FE) - Ibai Amaya** – Lógica del juego, UI y experiencia de usuario  
- **Back-End (BE) - César García** – APIs, seguridad, panel admin  
- **Scrum Master (SM) - Andrea Pradas** – Documentación, CI, BD, despliegue, coordinación

---

## 📁 Estructura del Proyecto
/vsgame/
├── /admin/ # Panel de administración
├── /api/ # Endpoints PHP
├── /assets/ # CSS, JS, imágenes
│ ├── css/
│ ├── js/
│ └── images/
├── index.php # Front Controller principal
└── README.md

---

## 🚀 Requisitos
- Apache2 o Nginx
- PHP 8+
- MySQL/MariaDB
- Extensión mysqli habilitada
- DNS local configurado → `vsgame.local`

---

## 🧩 Funcionalidades

### **Front-End**
- Login / Registro  
- Validación avanzada en cliente  
- Lógica completa del juego (ataque/defensa)  
- Historial y puntuación  
- UI responsive  

### **Back-End**
- Autenticación (hashing, sesiones)  
- CRUD de cartas  
- Guardar partidas y puntuaciones  
- API REST en PHP  
- Panel admin  

---

## 📌 Endpoints principales (API)
- `POST /api/login.php`
- `POST /api/register.php`
- `GET /api/check_login.php`
- `POST /api/logout.php`
- `GET /api/start_game.php`
- `POST /api/save_score.php`

---

## ⚙ Instalación
Consulta el archivo **INSTALL.md**.

---

## 📚 Documentación Adicional
- `RETROSPECTIVE.md`

---

## 📝 Licencia
Proyecto académico.



