# Prohibiciones

## Seguridad crítica

- NUNCA leer, mostrar ni acceder al archivo .env (usar .env.example como referencia)
- NUNCA ejecutar comandos git de escritura (commit, push, merge, rebase, reset)
- NUNCA ejecutar migraciones destructivas sin aprobación explícita
- NUNCA exponer credenciales, tokens ni secrets en código o logs

## Código

- No instalar paquetes sin mi aprobación explícita
- No usar dd(), dump(), var_dump() ni ray()
- No usar env() fuera de archivos de config
- No modificar archivos de configuración sin justificación
- No usar query raw SQL sin justificación
- No usar Facades cuando se puede inyectar
