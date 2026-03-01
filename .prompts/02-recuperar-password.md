# Recuperación de contraseña

Al no contar actualmente con posibilidad de servidor de email, la recuperación de contraseña se realizará mediante las preguntas de seguridad establecidas en el momento del registro del egresado.
Se accederá a la funcionalidad desde la vista de inicio, pulsando sobre el texto “Olvidó su contraseña”

Vamos a modificar el flujo actual de recuperación de contraseña para que sea compatible con la nueva estructura y la base de datos. Utilizaremos el flujo actual que esta implementado con Laravel Fortify.

Una vez pulsado el botón, se dirigirá al usuario a la primera vista de recuperación, donde el egresado deberá introducir su número de Cédula de Identidad.

Si el número de Cédula de Identidad no aparece como registrado en el sistema (tabla users), se mostrará el mensaje de error correspondiente.

Si el número de Cédula de Identidad suministrado se encuentra registrado en la tabla users, se mostrará una vista, donde el egresado deberá responder las preguntas de seguridad establecidas cuando se registró. Utiliza un layout para esta vista que vaya de la mano con el layout de la app.

Los `id` de las preguntas y sus respuestas están almacenados en la tabla `answers`, se utilizará el campo `user_id` de esta tabla como clave foránea, relacionándolo con el `id` del usuario.

En esta vista se llevará un conteo de los intentos, máximo 5, los intentos fallidos se registrarán en la tabla `users`, campo `recovery_attempt`, que originalmente, al registrarse el usuario se establece en cero.

En caso de respuesta o respuestas erróneas, se mostrará al usuario un mensaje de respuesta incorrecta junto a la cantidad de intentos restantes.

Al responder de manera incorrecta el último intento se mostrará un mensaje avisando de que el usuario ha sido bloqueado.

Si se trata de recuperar la contraseña tras llegar al quinto intento, se mostrará el mensaje de que ha sido bloqueado y que se debe contactar con el personal técnico del sistema a traves del correo: incidencias.registro.cgceudo@gmail.com.

En cada intento de recuperación de contraseña se deberá consultar la tabla users, campo `recovey_attempt`, para determinar cuantos intentos de recuperación han sido realizados, en cada intento fallido se debe incrementar el campo `recovey_attempt` en 1.

Si en el campo `recovery_attempt` aparece la cifra 5 se debe mostrar la pantalla de bloqueo.

En caso de responder de manera correcta la preguntas de seguridad se mostrará la vista para que el usuario ingrese su nueva contraseña.
- mostrara un card con el header "Ingrese su nueva contraseña"
- mostrara un texto resaltando la cédula de identidad del usuario - nombre del usuario
- un formulario con dos campos: contraseña y confirmación de contraseña
- se debe validar de que ambas contraseñas sean iguales.
- una vez introducida correctamente la nueva contraseña, se debe actualizar el campo `password` en la tabla `users` con la nueva contraseña.
- se debe actualizar el campo `recovery_attempt` en la tabla `users` a 0.
- se debe mostrar un mensaje de éxito al usuario indicando que su contraseña ha sido actualizada correctamente.

## A considerar:
- Al tratarse de solo dos campos de formulario, creo que se debe usar el componente `Form` de inertia.
- Sopesa si es necesario utilizar zod schemas para validar los datos.
- De ser posible utiliza el componente Field de shadcn ui.
- Recuerda que las respuestas de las preguntas de seguridad están encriptadas en la tabla `answers`.
- Crear un getter para obtener el valor de la respuesta de la pregunta de seguridad?
- Reutiliza todo lo que puedas la recuperación de contraseña que ofrece Laravel Fortify.
