# Registro de nuevo usuario

Mediante esta funcionalidad el egresado de la Universidad de Oriente se registrará en el sistema de solicitud de documentos.
Se accederá a la funcionalidad desde la vista de inicio, pulsando sobre el texto “Regístrese”:

El proceso de registro está contemplado para llevarse a cabo como un wizard de 4 pasos.
1. El egresado deberá introducir su número de cédula de identidad.
   - Se debe hacer una consulta a la base de datos sieudo, tabla opsu, campo cedula de base de datos para verificar que el solicitante sea egresado de la Universidad de Oriente.
   - Este campo es numérico con 8 dígitos, si el número de Cédula de Identidad Introducido tiene menos de 8 dígitos se deberán rellenar ceros a la izquierda para realizar la consulta. Casos posibles:
     - 12345678
     - 123456 (rellenar con 2 ceros a la izquierda: 00123456)
     - 1234567 (rellenar con 1 cero a la izquierda: 01234567)
   - Se aplicará una validación de front para que el número de Cédula introducido contenga entre 6 y 12 caracteres.
   - Si se pulsa el botón “Cancelar”, se dirigirá al usuario a la vista de inicio.
   - Al pulsar el botón “Siguiente”, se realizará una consulta a la base de datos para verificar que el solicitante sea egresado de la Universidad de Oriente.
     - En caso de que el Número de Cédula de Identidad introducido no se encuentre en la base de datos sieudo, tabla opsu, campo cedula de base de datos, se llevara a una vista con un card que tenga un mensaje informativo explicando que la cedula de identidad no se encuentra registrada. Al pulsar el botón "Aceptar" de esa card, se redirigirá al inicio.
     - En caso de que la Cédula de Identidad se encuentre registrada en la base de datos sieudo, tabla opsu, se deberá hacer una consulta a la base de datos sieudo, tabla users, campo dni, para verificar que el usuario no esté registrado previamente en el sistema, se mantendrá el criterio de campo de texto con 8 caracteres (ceros a la izquierda si el número de Cédula de Identidad cuenta con menos de 8 caracteres.
       - En caso de que el número de Cédula de Identidad aparezca registrado en la base de datos sieudo, tabla users, campo dni, se mostrará la vista informativa con el mensaje con la card explicando que el usuario ya se encuentra registrado en el sistema. Al pulsar el botón “Aceptar”, se dirigirá al usuario a la vista de inicio.
     - En caso de que el número de Cédula de Identidad aparezca en la tabla opsu y no aparezca en la tabla users, se dirigirá al usuario al paso 2, donde todos los datos serán rellenados:
2. Los campos Cédula (dni), Nombre (name) y Apellidos (surname) vendrán de los datos contenidos en la tabla opsu, sin posibilidad de edición por parte del usuario. Es posible que también venga el campo email, pero no siempre será así.
    - Se deberán realizar las validaciones de email, password y teléfono (phone) mostradas a continuación:
      - Password: Debe contener al menos 8 caracteres, con un máximo de 20 caracteres.
      - Email: Debe ser una dirección de correo electrónico válida.
      - Phone: Debe ser un número de teléfono válido con formato de número telefónico venezolano..
        - Códigos permitidos: 0414, 0424, 0416, 0426, 0412, 0422
        - Longitud después del código será de 7 dígitos
        - Puede haber un guion (o no) entre el código y los 7 dígitos. Ejemplo: 0414-1234567 o 04141234567
    - Las preguntas de seguridad serán extraídas de la base de datos sieudo, tabla questions, campo texto.
      - Cuando el usuario seleccione una pregunta para “Pregunta 1”, ésta quedará desactivada para las preguntas 2 y 3.
      - Cuando el usuario seleccione una pregunta para “Pregunta 2”, ésta quedará desactivada para la pregunta 3.
      - Preguntas 2 y 3 estarán desactivadas hasta que se rellene Pregunta 1.
      - Preguntas 3 estará desactivada hasta que se rellene Pregunta 2.
    - Una vez introducidos los datos se pasará al paso 3.
3. El paso 3 es una vista de confirmación de los datos introducidos por el usuario en el paso 2.
    - Tendrá dos acciones: Regresar y Confirmar
    - Si el usuario pulsa el botón “Regresar”, se le dirigirá a la vista anterior (la de carga de datos), conservando todos los datos rellenados previamente.
    - Si el usuario pulsa el botón “Confirmar”, se realizarán los procesos de inserción en base de datos que se describirán a continuación y se mostrará una vista de confirmación.

## Acciones en base de datos sieudo

- Se realizará una inserción en la tabla `users`:
    - Campo `dni` → El número de Cédula de Identidad del egresado, tal como aparece en la tabla `opsu`, con “ceros” delante hasta completar los 8 dígitos si fuera necesario.
    - Campo `name` → El nombre del egresado tal como aparece en la tabla `opsu`.
    - Campo `surname` → El apellido del egresado tal como aparece en la tabla `opsu`.
    - Campo `sex` → El género del egresado (M o F), según lo seleccionado en el formulario de registro.
    - Campo `email` → El email suministrado por el egresado en el formulario de registro.
    - Campo `email_verified_at` → `NULL`
    - Campo `password` → El password suministrado por el egresado en el formulario de registro.
    - Campo `phone` → El número de teléfono suministrado por el egresado en el formulario de registro.
    - Campo `login_attempt` → 0
    - Campo `recovery_attempt` → 0
    - Campo `remeber_token` → `NULL`
    - Campo `created_at` → Timestamp actual.
    - Campo `updated_at` → Timestamp actual.

- Se realizará tres (3) inserciones en la tabla `respuestas`, una por cada pregunta:
    - Campo `user_id` → El `id` del usuario recién registrado.
    - Campo `question_id` → El `id` de la primera pregunta que seleccionó (viene de la tabla `questions`)
    - Campo `answer` -> La respuesta ingresada por el usuario.
    - Campo `created_at` → Timestamp actual.
    - Campo `updated_at` → Timestamp actual.

Al pulsar el botón “Aceptar” del paso 4 en el wizard, se dirigirá al usuario a la vista de inicio.

