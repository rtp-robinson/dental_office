# Consultorio odontológico — Dra. Danika Cama Palomino

Landing page para presentar a la doctora, su formación y el consultorio en Arequipa, y preparar solicitudes de cita por WhatsApp. Esta guía describe la implementación real y cómo mantenerla.

## Ejecutar localmente

No requiere paquetes ni compilación. Para iniciar el servidor necesitas Python instalado. En Windows abre `ABRIR-VISTA-PREVIA.cmd` o ejecuta desde esta carpeta:

```sh
python -m http.server 8768 --bind 127.0.0.1 --directory dist
```

Visita http://127.0.0.1:8768. Guarda los cambios y recarga; usa Ctrl+F5 si ves estilos antiguos. Mantén abierta la terminal y pulsa Ctrl+C para detener el servidor. Si el puerto está ocupado, cierra el servidor anterior o elige otro puerto. También puedes abrir `dist/index.html` para una revisión sencilla.

## Estructura de archivos

```text
dental_office/
├── dist/
│   ├── index.html      # Estructura y contenido fijo
│   ├── styles.css      # Diseño base y adaptación responsive
│   ├── refresh.css     # Paleta, tipografía y acabados actuales
│   ├── app.js          # Datos e interacciones
│   └── assets/         # Fotografías, logotipo e ilustraciones
├── ABRIR-VISTA-PREVIA.cmd
├── VERIFICACION.md     # Comprobaciones anteriores
├── .gitignore
└── README.md
```

Aunque se llama `dist`, contiene el código editable y los archivos listos para servir; no es una carpeta generada. Publicar consiste en servir su contenido desde un alojamiento estático.

## Secciones de la página

| Sección / identificador | Contenido | Archivo principal |
| --- | --- | --- |
| Cabecera | Logotipo y navegación | `index.html` |
| `inicio` | Presentación y botones | `index.html` |
| Franja `.values` | Mensajes e ilustraciones dentales | HTML y CSS |
| `doctora` | Biografía y fotografía | `index.html` |
| `formacion` | Credenciales | Array `credentials` de `app.js` |
| `tratamientos` | Tarjetas y consultas | Array `treatments` de `app.js` |
| `consultorio` | Instalaciones y galería | `index.html` |
| `cita` | Formulario | HTML y evento `submit` de JS |
| `ubicacion` | Dirección, contacto y mapa | HTML y evento `load-map` |
| Pie y diálogos | Contactos, año y privacidad | HTML y JS |

Un enlace `href="#cita"` lleva al elemento `id="cita"`. Si cambias un identificador, actualiza sus enlaces y selectores.

## Arquitectura de software

Es una web estática ejecutada en el navegador con HTML, CSS y JavaScript nativos. No utiliza framework, servidor de aplicación, API propia ni base de datos. El servidor local solo entrega archivos; no procesa reservas.

```text
Servidor de archivos → index.html
                          ├── styles.css → refresh.css
                          └── app.js → tarjetas y eventos
                                          └── WhatsApp / Google Maps
```

HTML define estructura y contenido; CSS controla presentación; JavaScript crea tarjetas y responde a acciones. `defer` permite ejecutar el script después de analizar el documento.

`refresh.css` se carga después de `styles.css`. Sus reglas prevalecen cuando lo permiten la especificidad y la cascada. Para cambiar la apariencia actual, comienza por `refresh.css`; para distribución base, revisa también `styles.css`. Ambas hojas son necesarias. Evita acumular reglas contradictorias; modifica las existentes. Consolidarlas sería una mejora futura.

## Patrones y decisiones presentes

- **Separación de responsabilidades:** estructura, presentación y comportamiento en archivos distintos. No se implementa MVC, arquitectura hexagonal ni microservicios.
- **Renderizado basado en datos:** `map()` transforma los arrays `credentials` y `treatments` en tarjetas. Los tratamientos también alimentan el selector del formulario.
- **Programación orientada a eventos:** `addEventListener()` responde a clics, escritura, envío y tecla Escape.
- **Componentes visuales reutilizables:** clases `.button`, `.credential`, `.text-link` y `.gallery-item` comparten apariencia; no son componentes de un framework.
- **Variables de diseño:** `--accent`, `--ink` y otras propiedades CSS centralizan parte de la paleta. Aún existen colores escritos directamente en reglas.
- **Carga bajo demanda:** el mapa se crea después de pulsar su botón y varias imágenes usan `loading="lazy"`.

La navegación usa anclas, no un enrutador. El estado temporal reside en el DOM: menú abierto, diálogo visible y valores del formulario. No existe un gestor global de estado.

## Flujo de solicitud de cita

1. El visitante escribe nombre, tratamiento, fecha, hora y comentario opcional no clínico.
2. Las restricciones HTML comprueban campos obligatorios. JavaScript comprueba el nombre y que fecha y hora sean futuras en Arequipa.
3. Se construye un mensaje y se codifica con `encodeURIComponent()` para incluir espacios, acentos y saltos de línea en una URL.
4. Se abre `https://wa.me/51926388546?text=...` y se ofrece un enlace alternativo si la ventana no se abre.
5. El visitante decide si envía el mensaje. El consultorio confirma la cita.

No se comprueba disponibilidad real ni se reserva automáticamente. El formulario no guarda información en una base de datos, cookies o almacenamiento local. Los valores permanecen en la página y se incluyen en el enlace externo a WhatsApp. No se deben introducir síntomas, diagnósticos ni documentos.

## Dónde hacer modificaciones

| Cambio | Lugar y comprobación |
| --- | --- |
| Texto fijo | Buscar la frase en `index.html` |
| Colores y botones | Variables y reglas de `refresh.css`, incluidos estados hover |
| Tipografía | `body`, títulos y reglas particulares |
| Diseño móvil | Consultas `@media` de ambas hojas CSS |
| Tratamiento | Array `treatments`; revisar tarjeta y selector |
| Credencial | Array `credentials`; respetar su significado documental |
| Fotografía | `assets/`, atributo `src`, dimensiones y texto alternativo |
| Galería ampliable | Actualizar también `data-image` y `data-caption` |
| Contacto | Buscar todas las apariciones en HTML y JS, incluidos metadatos |

Los datos de contacto no están totalmente centralizados: cambiar un solo enlace puede dejar otros con el número anterior. Usa la búsqueda global del editor.

## Buenas prácticas y límites

**Accesibilidad:** etiquetas de formulario, enlace para saltar al contenido, foco visible, textos alternativos, `aria-expanded` en el menú y diálogos nativos. Las imágenes decorativas se ocultan a lectores de pantalla y se respeta la preferencia de movimiento reducido. Esto no equivale a una auditoría completa.

**Seguridad:** los enlaces externos en nuevas pestañas utilizan `noopener noreferrer`. El texto introducido por visitantes no se inserta como HTML. Las tarjetas sí usan `innerHTML` con datos definidos en el código: si algún día provienen de usuarios o servicios externos, deberán escaparse o renderizarse con nodos y `textContent`.

**Privacidad:** no hay analítica propia ni almacenamiento de citas. El mapa y los enlaces conducen a servicios externos. Al añadir servicios nuevos, actualiza el aviso de privacidad según su comportamiento. No subas secretos ni documentos personales al repositorio.

**Rendimiento:** imágenes WebP, dimensiones declaradas y carga diferida donde corresponde. No hay dependencias JavaScript externas. La tipografía usa fuentes del sistema y puede variar ligeramente entre dispositivos.

**Responsive:** Grid, Flexbox y consultas de medios adaptan el diseño. Las reglas actuales ajustan estilos amplios para tamaños menores; no todo el CSS sigue estrictamente un enfoque mobile-first.

**Dependencia de JavaScript:** sin scripts no se generan las tarjetas ni se prepara el mensaje. Para disponer de todo el contenido sin JavaScript habría que escribir esas tarjetas directamente en HTML.

## SEO y publicación

El HTML incluye título, descripción, metadatos sociales básicos y datos estructurados `Dentist`. Conserva `noindex,nofollow` para la revisión. Al definir el alojamiento público, revisar esa directiva y añadir URL canónica y metadatos sociales definitivos. No existe despliegue automático configurado.

Facebook aparece como texto hasta disponer de su URL exacta. La habilitación refleja la constancia aportada, no una verificación en tiempo real. Los cursos no se presentan como especialidades. La disponibilidad del código no concede derechos de reutilización sobre las fotografías.

## Flujo con Git

Abre la carpeta completa en el editor. Revisa `git status` y guarda el trabajo anterior antes de traer cambios:

```sh
git status
git pull --ff-only
# Editar y revisar la página
git add dist/index.html dist/refresh.css
git commit -m "style: ajustar contraste y botones"
git push
```

Añade solo los archivos del cambio y separa avances reales en commits descriptivos. `commit` guarda una versión local; `push` la envía a GitHub. Ninguno publica la web automáticamente sin una integración de alojamiento. Git puede solicitar autenticación.

## Verificación antes de subir cambios

- Revisar escritorio y móvil: textos, imágenes y ausencia de desbordamiento horizontal.
- Navegar con teclado y comprobar foco visible.
- Si se modificaron, probar menú, anclas, galería y privacidad.
- Si cambió el formulario, probar campos vacíos, fecha pasada y solicitud futura; revisar número y mensaje sin enviarlo.
- Comprobar enlaces, imágenes y consola del navegador.
- Revisar `git diff` y `git status` antes del commit.

`VERIFICACION.md` contiene observaciones de revisiones anteriores, no pruebas automáticas ni garantías para cambios futuros. Actualmente no hay suite de tests ni integración continua.
