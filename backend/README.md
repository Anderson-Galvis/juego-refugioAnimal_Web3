pasos para registrar un usuario desde postman 
1 registrar el usuario en el sistema. 

POST http://localhost:4000/auth/register

{
  "nombre": "Juan López",
  "email": "juan@example.com",
  "password": "123456"
} // datos de el nuevo usuario 

2 obtener el token e iniciar refugio 

POST http://localhost:4000/auth/login


{
  "email": "juan@example.com",
  "password": "123456"
}

la respuesta es un token 
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
}

3 creamos la partida para el usuario

POST http://localhost:4000/partida/create

headers :
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json

body 

{
  "nombre_refugio": "Refugio El Buen Amigo"
}


respuesta 
{
  "message": "Partida creada exitosamente"
}


4 cambiar de ubicacion en el mapa a ciudad para rescatar 

PATCH http://localhost:4000/partida/cambiar-ubicacion

headers
Authorization: Bearer TU_TOKEN_AQUI
Content-Type: application/json
body 
{
  "nueva_ubicacion": "Ciudad"
}
respuesta esperada 
{
  "message": "Ubicación cambiada a Ciudad"
}

5 consultamos la partida del usuario
GET http://localhost:4000/partida/ID_DEL_USUARIO
