# Login

1. A esta funcionalidad se accederá desde la vista de inicio
2. En caso de que la Cédula de Identidad introducida no se encuentre registrada en la tabla users, se mostrará el mensaje de incidencia correspondiente.
3. Si la contraseña introducida es incorrecta se mostrará el mensaje de incidencia correspondiente
4. En esta vista se llevará un conteo de los intentos, máximo 3, los intentos fallidos se registrarán en la tabla users, campo `login_attempt`, que originalmente, al registrarse el usuario se establece en cero.
   1. En el segundo intento de acceso con contraseña errónea se mostrará el siguiente mensaje de incidencia y se aumentará en “1” el registro del campo `login_attempt` de la tabla users.
   2. En el tercer intento de acceso con contraseña errónea se mostrará el mensaje de incidencia y se aumentará en “1” el registro del campo `login_attempt` de la tabla users, siendo éste igual a tres, el usuario quedará bloqueado
   3. A partir de ahora, al tener el campo `login_attempt` = 3, si el usuario intenta acceder al sistema, se mostrará el mensaje de incidencia correspondiente, notificando de que el usuario ha sido bloqueado y que debe comunicarse con soporte técnico al correo incidencias.registro.cgceudo@gmail.com.
5. En caso de acceso exitoso se accederá a la vista dashboard.

## A considerar:
- Utiliza la funcionalidad login ya existente con laravel forge haciendo los ajustes necesarios.
- Al ser un formulario simple (2 campos), creo que lo mejor es utilizar el componente Form de inertia.
- Agregar mensajes de validación en español.
- Es necesario crear un schema de zod?
