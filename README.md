# Consultorio odontológico — Dra. Danika Cama Palomino

Landing page responsive para el consultorio de la Dra. Danika Geraldine Cama Palomino (COP 62275), en Arequipa, Perú.

## Vista previa local

Abre `dist/index.html` en tu navegador, o ejecuta desde la raíz del repositorio:

```sh
python -m http.server 8768 --bind 127.0.0.1 --directory dist
```

Luego visita http://127.0.0.1:8768. No requiere instalación de dependencias ni compilación.

## Archivos para editar

| Archivo | Contenido |
| --- | --- |
| `dist/index.html` | Textos, estructura, contacto, enlaces y metadatos SEO |
| `dist/styles.css` | Colores, tipografía, espacios y diseño móvil |
| `dist/app.js` | Tratamientos, credenciales, formulario, menú y galería |
| `dist/assets/` | Fotografías WebP y logotipo original |
| `VERIFICACION.md` | Comprobaciones realizadas durante la preparación de la vista previa |

Guarda los cambios y recarga el navegador. Los archivos de `dist/` son la fuente del sitio y se versionan directamente.

## Funcionalidades

- Navegación por secciones y menú móvil.
- Formación y credenciales resumidas a partir de los documentos aportados.
- Diez tratamientos con enlaces de consulta.
- Fotografías originales optimizadas y galería ampliable.
- Formulario con campos obligatorios y validación de fecha y hora, usando la zona horaria de Arequipa.
- Mensaje de WhatsApp con `encodeURIComponent()` al número +51 926 388 546.
- Botón flotante de WhatsApp, contacto y enlace de Google Maps.
- Mapa de Google cargado bajo petición y política de privacidad.

El formulario no usa una base de datos ni almacenamiento local. Abre un mensaje que el visitante puede revisar antes de enviarlo. La solicitud queda sujeta a confirmación del consultorio.

## Estado de publicación

El código se guarda en GitHub; la web no se ha desplegado en Sites ni se ha configurado GitHub Pages. No hay automatizaciones de despliegue en este repositorio.

La vista previa mantiene `noindex,nofollow`. Antes de publicar, con autorización de la titular, revisar la información y privacidad, añadir la URL canónica y metadatos sociales definitivos, y retirar esa restricción de indexación.

El nombre de Facebook aparece como texto hasta disponer de la URL exacta. La vigencia de habilitación se presenta según la constancia proporcionada, no como verificación en tiempo real. Los cursos no se atribuyen como especialidades.

## Archivos excluidos

La configuración local de Sites (`.openai/`), credenciales, archivos temporales y documentos personales no se suben a este repositorio. Las fotografías se incluyen para este proyecto; la visibilidad del repositorio no concede por sí misma derechos de reutilización.

## Historial

La primera importación del sitio existente está organizada en commits temáticos: preparación, recursos visuales, estructura, diseño, funcionalidades y documentación. No representa fechas históricas de desarrollo.
