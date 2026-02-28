# Arquitectura del Proyecto

## Actions

Toda lógica de negocio va en Actions invocables.
Ubicación: `app/Actions/`
- Clase final con método `__invoke()`
- Recibe un DTO como argumento
- Retorna el resultado de la operación

## DTOs

Ubicación: `app/DTOs/`
- Clases readonly
- Solo propiedades públicas tipadas

## Form Requests

Cada FormRequest incluye un método `toDto()` que construye y devuelve el DTO correspondiente.

## Controladores

Los controladores son finales y nunca contienen lógica de negocio.
- Invocables (`__invoke()`) para acciones específicas que no son CRUD
- Resource (index, store, show, update, destroy) para CRUD

El flujo siempre es: Request → FormRequest valida → toDto() → Controller pasa DTO a Action → Action ejecuta.
