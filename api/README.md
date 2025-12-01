## API

```bash
curl -d '{"username": "juan", "password": "1234", "email": "juan@example.com"}' http://localhost:8000/api/register.php

curl -d '{"username": "juan", "password": "1234"}' http://localhost:8000/api/login.php -v

curl -b "PHPSESSID=obtenido desde el login" http://localhost:8000/api/check_login.php

curl -b "PHPSESSID=obtenido desde el login" http://localhost:8000/api/start_game.php

curl -b "PHPSESSID=obtenido desde el login" -d '{"puntuacion": 30, "victoria": 2}' http://localhost:8000/api/save_score.php
```
