# Solicitud de documentos sin soporte

## Descripción
Los documentos **sin soporte** son aquellos que la universidad genera directamente (no requieren documentación física del egresado). Ejemplos:
- Constancia de estudios
- Constancia de egreso
- Record de notas
- Título en proceso

## Versión legacy
Existe una versión legacy de este proceso en @../egresados y puedes leer un documento que recopila esta funcionalidad legacy en @../egresados/docs/flujo-documentos-sin-soporte.md

## A considerar:
- Los modelos y las queries aca descritas corresponde a un version legacy del proyecto que utiliza además modelos y base de datos con nombre de tablas y campos en español.
- Para el proyecto actual, necesito utilizar los modelos y las queries a la versión actual del proyecto que utiliza nombres de tablas y campos en inglés.
- A esta funcionalidad se accede desde el dashboard en @/resources/js/pages/dashboard.tsx en la sección de "Solicitudes de documentos" en el botón "Sin Soporte"
- Considero que es mejor crear una nueva page para mostrar la ui de esta funcionalidad.
- Haz las queries del lado del backend.
- Optimiza las queries.
- Haz las preguntas que sean necesarias para ayudar a tu contexto.
