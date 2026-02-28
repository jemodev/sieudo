---
name: conventional-commits
description: Generar mensajes de commit siguiendo Conventional Commits. Usar cuando el usuario pida un mensaje de commit, commit message o similar.
---

# Conventional Commits

## Reglas

- Idioma: siempre en inglés
- NUNCA ejecutar git commit, git push ni ningún comando git de escritura
- Solo generar el mensaje para que el usuario lo copie y ejecute

## Formato single line (cambios simples)

type: description

Ejemplos:
- feat: add user registration endpoint
- fix: resolve null pointer in payment service
- chore: update composer dependencies
- docs: add API authentication guide
- style: apply pint formatting rules
- refactor: extract email validation to dedicated action
- test: add unit tests for CreateUserAction

## Formato multi line (features complejas)

type: short description

- bullet point explaining what
- bullet point explaining why

Ejemplo:

feat: implement role-based access control

- Add Role and Permission models with many-to-many relationships
- Create AssignRoleAction and CheckPermissionAction
- Include middleware for route-level authorization

## Types permitidos

- feat: nueva funcionalidad
- fix: corrección de bug
- docs: documentación
- style: formato (no afecta lógica)
- refactor: reestructuración sin cambiar comportamiento
- test: añadir o corregir tests
- chore: tareas de mantenimiento (dependencias, config)
