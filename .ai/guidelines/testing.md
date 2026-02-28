# Testing

## Framework
Usar Pest PHP siempre. Nunca PHPUnit.

## Estructura
- tests/Architecture/ → Arch tests
- tests/Feature/{Dominio}/ → Tests de flujo completo
- tests/Unit/Actions/ → Tests de Actions aisladas

## Convenciones
- Nombres descriptivos con `it()`: `it('creates a user with valid data')`
- Un test, una aserción (o aserciones relacionadas)
- Usar factories para datos de prueba
- Arch tests en tests/Architecture/ArchTest.php
