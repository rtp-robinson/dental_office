const treatments = [
 ['Endodoncia','Atención del interior del diente para ayudar a conservarlo, según evaluación.'],
 ['Restauraciones','Recuperación de la forma y función de dientes que requieren reparación.'],
 ['Odontopediatría','Atención de la salud bucal de los más pequeños, con un trato cercano.'],
 ['Blanqueamiento','Evaluación de opciones para aclarar el tono de los dientes.'],
 ['Extracciones','Retiro de piezas dentales cuando la evaluación indique que es necesario.'],
 ['Prótesis totales y parciales','Opciones removibles para reemplazar piezas dentales ausentes.'],
 ['Prótesis fija','Alternativas de rehabilitación fija según las necesidades de cada sonrisa.'],
 ['Periodoncia','Evaluación y cuidado de las encías y los tejidos de soporte dental.'],
 ['Profilaxis','Limpieza profesional como parte del cuidado de tu salud bucal.'],
 ['Odontología preventiva','Orientación y controles para acompañarte en el cuidado diario de tu sonrisa.']
];
const credentials = [
 ['GRADO ACADÉMICO','2024','Bachiller en Odontología','Universidad de San Martín de Porres.'],
 ['COLEGIATURA','COP 62275','Colegiatura profesional','Colegio Odontológico del Perú.'],
 ['CONSTANCIA','2026–2027','Habilitación profesional','Vigencia documental hasta el 31/01/2027.'],
 ['FORMACIÓN CLÍNICA','2024','Internado odontológico','Hospital Militar III DE, Arequipa.'],
 ['ACTUALIZACIÓN','2024','Congreso de Odontología','Participación en el II Congreso Multidisciplinario Civil Militar.'],
 ['CURSO · 20 HORAS','2025','Cirugía plástica periodontal y peri-implantar','Curso de inmersión · 20 horas académicas.'],
 ['ÉTICA PROFESIONAL','2026','Código de Ética','Asistencia a la charla del Colegio Odontológico del Perú, Región Arequipa.'],
 ['RECONOCIMIENTO','2024','Presentación de caso clínico','Reconocimiento durante el internado en el Hospital Militar III DE.']
];
const tooth = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="M16 6c-5-4-11-2-11 4 0 5 3 8 4 14 .6 5 3 5 4 0l1-5c.5-3 3.5-3 4 0l1 5c1 5 3.4 5 4 0 1-6 4-9 4-14 0-6-6-8-11-4Z"/><path d="M12 5c2 2 4 3 7 3"/></svg>';
document.querySelector('#credential-grid').innerHTML=credentials.map(c=>`<article class="credential"><div class="meta"><span>${c[0]}</span><span>${c[1]}</span></div><h3>${c[2]}</h3><p>${c[3]}</p></article>`).join('');
document.querySelector('#treatment-grid').innerHTML=treatments.map((t,i)=>`<article class="treatment"><div class="treatment-top">${tooth}<span>${String(i+1).padStart(2,'0')}</span></div><h3>${t[0]}</h3><p>${t[1]}</p><a class="text-link" href="https://wa.me/51926388546?text=${encodeURIComponent('Hola, quisiera consultar sobre '+t[0]+'.')}" target="_blank" rel="noopener noreferrer" aria-label="Consultar sobre ${t[0]} por WhatsApp">Consultar tratamiento <span aria-hidden="true">↗</span></a></article>`).join('');
const treatment=document.querySelector('#treatment');
treatments.forEach(([name])=>treatment.add(new Option(name,name)));
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const date=document.querySelector('#date');
function limaToday(){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
date.min=limaToday();
document.querySelector('#year').textContent=new Intl.DateTimeFormat('es-PE',{timeZone:'America/Lima',year:'numeric'}).format(new Date());
const form=document.querySelector('#appointment-form');
form.addEventListener('input',()=>{document.querySelector('#form-error').textContent='';document.querySelector('#form-status').replaceChildren();document.querySelector('#name').setCustomValidity('');date.setCustomValidity('')});
form.addEventListener('submit',e=>{
 e.preventDefault();const name=document.querySelector('#name');const time=document.querySelector('#time');const error=document.querySelector('#form-error');date.min=limaToday();
 if(name.value.trim().length<2){name.setCustomValidity('Escribe tu nombre con al menos dos caracteres.');name.reportValidity();return}
 if(date.value<date.min){error.textContent='Selecciona una fecha de hoy en adelante.';date.setCustomValidity(error.textContent);date.reportValidity();return}
 if(new Date(`${date.value}T${time.value}:00-05:00`).getTime()<=Date.now()){error.textContent='Selecciona una fecha y hora futuras (hora de Arequipa).';return}
 if(!form.reportValidity())return;
 const displayDate=date.value.split('-').reverse().join('/');
 const message=`Hola, Dra. Danika. Quisiera solicitar una cita.\n\nNombre: ${name.value.trim()}\nTratamiento: ${treatment.value}\nFecha preferida: ${displayDate}\nHora preferida: ${time.value} (Arequipa)${document.querySelector('#comment').value.trim()?'\nComentario no clínico: '+document.querySelector('#comment').value.trim():''}\n\nEntiendo que la cita está sujeta a confirmación del consultorio.`;
 const url='https://wa.me/51926388546?text='+encodeURIComponent(message);
 const status=document.querySelector('#form-status');status.replaceChildren(document.createTextNode('Tu solicitud está preparada. Si WhatsApp no se abrió, '));
 const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.className='inline-link';link.textContent='abre tu mensaje aquí';status.append(link);
 window.open(url,'_blank','noopener,noreferrer');
});
document.querySelectorAll('.privacy-open').forEach(b=>b.addEventListener('click',()=>document.querySelector('#privacy-dialog').showModal()));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
document.querySelectorAll('.gallery-item').forEach(b=>b.addEventListener('click',()=>{const d=document.querySelector('#gallery-dialog');const im=document.querySelector('#lightbox-image');im.src=b.dataset.image;im.alt=b.dataset.caption;document.querySelector('#lightbox-caption').textContent=b.dataset.caption;d.showModal()}));
document.querySelector('#load-map').addEventListener('click',e=>{const iframe=document.createElement('iframe');iframe.src='https://maps.google.com/maps?q=Av.%20La%20Paz%20313%20A%2C%20Arequipa%2C%20Peru&output=embed';iframe.title='Mapa de referencia de Av. La Paz 313 A, Arequipa';iframe.referrerPolicy='no-referrer-when-downgrade';document.querySelector('#map-container').append(iframe);e.currentTarget.hidden=true; e.currentTarget.style.display='none'});
