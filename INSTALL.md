# INSTALL – Guía de Instalación y Despliegue (VSGAME con NGINX)

Este documento explica cómo instalar y ejecutar VSGAME utilizando **Nginx + PHP-FPM + MySQL** y un dominio local `vsgame.local`.

---

# 1. 📦 Requisitos Previos

## Software Necesario
- **Nginx**
- **PHP 8+**
- **php-fpm**
- **php-mysql**
- **MySQL/MariaDB**
- Extensiones recomendadas:
  - php-json
  - php-mbstring
  - php-xml
  - php-session

## Sistema
- Linux (recomendado)
- Permisos para editar:
  - `/etc/nginx/sites-available/`
  - `/etc/hosts`

---

# 2. ⚙ Instalación del Entorno

## 2.1 Instalar Nginx
Instala y verifica que Nginx esté funcionando correctamente.  
Después de la instalación, el servicio debe quedar activo y accesible en `http://localhost`.

## 2.2 Instalar PHP + PHP-FPM
Instala PHP y las extensiones necesarias.  
Asegúrate de que PHP-FPM esté iniciado y que exista un socket activo en `/run/php/`.  
La versión más habitual sería `php8.2-fpm.sock`, aunque puede variar según el sistema.

Confirma que PHP está funcionando correctamente ejecutando `php -v` o revisando el servicio PHP-FPM.

---

# 3. 🌐 Configurar DNS Local (vsgame.local)

Edita el archivo `/etc/hosts` para añadir un dominio local que redirija a tu máquina:


Esto permitirá acceder al proyecto desde `http://vsgame.local`.

---

# 4. 📁 Copiar el Proyecto al Servidor

Crea el directorio `/var/www/vsgame/` y coloca dentro todo el proyecto.  
Asegúrate de asignar permisos correctos para que Nginx pueda leer los archivos:

- El propietario debe ser `www-data`
- Las carpetas deben tener permisos 755
- Los archivos deben tener permisos 644

Esto garantiza compatibilidad y seguridad para un entorno estándar Nginx/PHP.

---

# 5. 🛢 Crear la Base de Datos

Inicia MySQL y crea una base de datos llamada `vsgame`.  
Importa dentro de ella el archivo `vsgame.sql` proporcionado en el proyecto.  
Debe contener las tablas `usuarios`, `cartas`, `partidas` y `configuracion`.

Una vez importado, revisa que las tablas existen ejecutando un `SHOW TABLES` dentro de MySQL.

---

# 6. 🔐 Configurar Acceso a la Base de Datos

En el archivo del proyecto correspondiente a la configuración (`admin/config/database.php`), cambia:

- host
- usuario
- contraseña
- nombre de la base de datos

para que coincidan con los datos reales de tu servidor MySQL.

Es imprescindible que el usuario tenga permisos de lectura/escritura sobre la base de datos `vsgame`.

---

# 7. 🔧 Configurar NGINX para el Proyecto

Crea un archivo de configuración dentro de `/etc/nginx/sites-available/vsgame`.  
Este archivo debe contener:

- El dominio `vsgame.local`
- La ruta raíz del proyecto `/var/www/vsgame`
- La configuración para servir archivos estáticos dentro de `/assets/`
- La configuración para acceder a los endpoints dentro de `/api/`
- Un **Front Controller** que redirija todas las rutas a `index.php`
- La conexión con **PHP-FPM** para procesar archivos `.php`
- Bloqueo de archivos ocultos por seguridad

Una vez creado, activa el sitio enlazándolo en `/etc/nginx/sites-enabled/` y recarga Nginx.

También debes validar la configuración con `nginx -t` para asegurarte de que no hay errores.

---

# 8. 🚀 Verificar el Funcionamiento del Servidor

Una vez reiniciado Nginx:

1. Abre `http://vsgame.local` en tu navegador.
2. Comprueba que la página principal del proyecto se carga.
3. Accede a endpoints como:
   - `/api/login.php`
   - `/api/start_game.php`

Si responden sin errores, la comunicación entre Nginx → PHP-FPM → Proyecto es correcta.

---

# 9. 🧪 Comprobaciones Finales del Entorno

Antes de usar la aplicación comprueba:

- Que las sesiones funcionan (prueba login/logout).
- Que PHP puede escribir si el proyecto lo requiere.
- Que la base de datos responde (por ejemplo, registrando un usuario nuevo).
- Que el router central `index.php` maneja correctamente las rutas.

---

# 10. ❗ Solución de Problemas Frecuentes

### Error: Página PHP aparece como texto
Significa que PHP-FPM no está procesando los archivos.  
Revisa la ruta del socket en la configuración de Nginx y asegúrate de que PHP-FPM está iniciado.

### Error: 404 en /api/
Comprueba que:
- El archivo exista realmente en `/api/`
- Nginx esté apuntando correctamente a la ruta del proyecto
- El nombre del archivo sea idéntico (mayúsculas/minúsculas incluidas)

### Error: Sesiones no funcionan
- Verifica que `session_start()` está al inicio de los archivos que lo requieren
- Revisa permisos del directorio de sesiones de PHP

### Error: No conecta a la base de datos
Confirma:
- Credenciales correctas
- MySQL en ejecución
- La base de datos `vsgame` existe

---

# 11. ✔ Instalación Completada

Si todos los pasos anteriores funcionan, ya puedes:

- Registrar usuarios  
- Iniciar sesión  
- Jugar una partida completa  
- Guardar puntuaciones  
- Acceder al panel de administración  

El servidor Nginx está configurado, el proyecto es accesible desde `vsgame.local` y la comunicación con PHP y MySQL funciona correctamente.

