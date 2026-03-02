# Solicitud de documentos

Necesito mostrar en @resources/js/pages/dashboard.tsx el listado de solicitud de documentos
de forma dinámica, para ello he creado un documento que corresponde a la version legacy de
este proyecto que muestra el listado de documentos. Este documento se encuentra en
@../egresados/docs/sistema-solicitud-documentos.md

Los modelos y las queries aca descritas corresponde a un version legacy del proyecto que utiliza además modelos y base de datos con nombre de tablas y campos en español.

Para el proyecto actual, necesito utilizar los modelos y las queries a la versión actual del proyecto que utiliza nombres de tablas y campos en inglés.

Aunque en el dashboard se muestran más secciones aparte de la solicitud de documentos, enfócate solo en la solicitud de documentos.

## A considerar
- Crear componentes de react para mostrar los documentos solicitados.
- Haz las queries del lado del backend.
- Optimiza las queries.
- Si es necesario, podemos instalar tanstack react query.
  - Utiliza el hook useQuery de tanstack react query para hacer las queries.
  - Utiliza el hook useMutation para hacer las mutations.
