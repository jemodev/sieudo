# Solicitud de documentos con soporte

## Descripción
Los documentos **con soporte** son aquellos que requieren documentación física o entrega presencial del egresado. Ejemplos:
- Título Original
- Copia Certificada de Título
- Copia de Notas
- Constancia de Egreso con Firma Original

## Versión legacy
Existe una versión legacy de este proceso en /Users/jersonmr/Herd/egresados/ y puedes leer un documento que recopila esta funcionalidad legacy en /Users/jersonmr/Herd/egresados/docs/flujo-documentos-con-soporte.md

## A considerar:
- Los modelos y las queries aca descritas corresponde a un version legacy del proyecto que utiliza además modelos y base de datos con nombre de tablas y campos en español.
- Para el proyecto actual, necesito utilizar los modelos y las queries a la versión actual del proyecto que utiliza nombres de tablas y campos en inglés.
- En el documento legacy que te doy como contexto, se sugiere una reingenieria, sin embargo, utiliza los ajustes que se encuentran en el proyecto actual. Esto es debido a que el proyecto actual utiliza un modelo de datos diferente. El documento te lo adjunto principalmente para que puedas ver el contexto.
- A esta funcionalidad se accede desde el dashboard en @/resources/js/pages/dashboard.tsx en la sección de "Solicitudes de documentos" en el botón "Con Soporte"
- Utiliza un flujo similar al de la solicitud de documentos sin soporte.
- Haz las queries del lado del backend.
- Optimiza las queries.
- Haz las preguntas que sean necesarias para ayudar a tu contexto.
