// Chatbot avanzado para DentistYa

const info = {
    nombre: "DentistYa",
    direccion: "Yanez Pinzón y Avenida Cristobal Colón",
    telefono: "+593 97 901 7059",
    email: "info@dentistya.com",
    horario: "Lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 13:00.",
    servicios: [
        "Implantología: Colocación de implantes dentales para recuperar piezas perdidas.",
        "Ortodoncia: Corrección de la posición de los dientes y la mordida.",
        "Estética Dental: Blanqueamiento, carillas y diseño de sonrisa.",
        "Odontopediatría: Atención especializada para niños.",
        "Limpieza dental profesional.",
        "Tratamientos de encías.",
        "Extracciones y cirugías menores.",
        "Urgencias odontológicas."
    ],
    equipo: [
        "Dr. Juan Pérez - Especialista en Implantología, más de 15 años de experiencia.",
        "Dra. María López - Ortodoncia y Estética Dental, apasionada por el diseño de sonrisa.",
        "Dr. Carlos Ruiz - Odontopediatría, experto en atención infantil."
    ],
    instalaciones: [
        "Consultorios modernos y cómodos.",
        "Tecnología de radiografía digital.",
        "Sala de espera con WiFi y café.",
        "Ambiente seguro y amigable."
    ],
    testimonios: [
        "Laura G.: 'Me devolvieron la confianza para sonreír. ¡Excelente atención!'",
        "Carlos M.: 'El equipo es muy profesional y amable. Recomiendo DentistYa.'",
        "Sofía R.: 'La clínica es moderna y los tratamientos son efectivos.'"
    ],
    redes: [
        "Instagram: @dentistya",
        "Facebook: DentistYa",
        "WhatsApp: +593 97 901 7059"
    ],
    consejos: [
        "Recuerda cepillarte los dientes al menos dos veces al día.",
        "Visita al dentista cada 6 meses para una revisión.",
        "Evita el consumo excesivo de azúcares para cuidar tu salud bucal.",
        "Usa hilo dental diariamente para limpiar entre los dientes."
    ]
};

// Crear el widget del chatbot
const botBtn = document.createElement('button');
botBtn.innerHTML = `<img src="../img/logo.avif" alt="DentistYa" style="width:60px;height:60px;border-radius:50%;box-shadow:0 2px 8px rgba(0,150,136,0.15);">`;
botBtn.style.position = "fixed";
botBtn.style.bottom = "60px";
botBtn.style.right = "60px";
botBtn.style.background = "#009688";
botBtn.style.color = "#fff";
botBtn.style.border = "none";
botBtn.style.borderRadius = "50%";
botBtn.style.width = "60px";
botBtn.style.height = "60px";
botBtn.style.fontSize = "1.2em";
botBtn.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
botBtn.style.cursor = "pointer";
botBtn.style.zIndex = "9999";
document.body.appendChild(botBtn);

const chatBox = document.createElement('div');
chatBox.style.position = "fixed";
chatBox.style.bottom = "100px";
chatBox.style.right = "30px";
chatBox.style.width = "340px";
chatBox.style.maxWidth = "95vw";
chatBox.style.background = "#fff";
chatBox.style.borderRadius = "16px";
chatBox.style.boxShadow = "0 4px 24px rgba(0,150,136,0.18)";
chatBox.style.display = "none";
chatBox.style.flexDirection = "column";
chatBox.style.overflow = "hidden";
chatBox.style.zIndex = "9999";
document.body.appendChild(chatBox);

chatBox.innerHTML = `
    <div style="background:#009688;color:#fff;padding:1em;font-weight:bold;text-align:center;">
        Chat DentistYa
        <span style="float:right;cursor:pointer;" id="closeBot">&times;</span>
    </div>
    <div id="chatContent" style="padding:1em;height:260px;overflow-y:auto;font-size:1em;"></div>
    <form id="chatForm" style="display:flex;border-top:1px solid #eee;">
        <input id="chatInput" type="text" placeholder="Escribe tu pregunta..." style="flex:1;padding:0.7em;border:none;">
        <button type="submit" style="background:#ff9800;color:#fff;border:none;padding:0 1em;font-weight:bold;cursor:pointer;">Enviar</button>
    </form>
`;

const chatContent = chatBox.querySelector('#chatContent');
const chatForm = chatBox.querySelector('#chatForm');
const chatInput = chatBox.querySelector('#chatInput');
const closeBot = chatBox.querySelector('#closeBot');

function botBubble(respuesta) {
    // Si la respuesta es corta, muestra imagen
    if (respuesta.length < 60) {
        return `<div style="
            display:flex;
            align-items:center;
            gap:0.7em;
            justify-content:right;
            margin:0.7em 0;
            animation: fadeIn 0.5s;">
            <img src="../img/logo.avif" alt="DentistYa"
                style="width:36px;height:36px;border-radius:50%;box-shadow:0 2px 8px rgba(0,150,136,0.15);border:2px solid #b2dfdb;">
            <span style="
                background:linear-gradient(90deg,#e0f7fa 80%,#b2dfdb 100%);
                color:#00695c;
                padding:0.7em 1.2em;
                border-radius:18px 18px 0 18px;
                box-shadow:0 2px 12px rgba(0,150,136,0.08);
                font-size:1.05em;
                font-family: 'Segoe UI', Arial, sans-serif;
                display:inline-block;
                white-space:pre-line;">
                ${respuesta}
            </span>
        </div>`;
    }
    // Normal sin imagen
    return `<div style="
        margin:0.7em 0;
        text-align:right;
        animation: fadeIn 0.5s;">
        <span style="
            background:linear-gradient(90deg,#e0f7fa 80%,#b2dfdb 100%);
            color:#00695c;
            padding:0.7em 1.2em;
            border-radius:18px 18px 0 18px;
            box-shadow:0 2px 12px rgba(0,150,136,0.08);
            font-size:1.05em;
            font-family: 'Segoe UI', Arial, sans-serif;
            display:inline-block;
            white-space:pre-line;">
            ${respuesta}
        </span>
    </div>`;
}

function showBotResponseGradually(html) {
    chatContent.innerHTML += botBubble(html);
}

function botReply(msg) {
    let respuesta = "";
    const m = msg.toLowerCase();

    // Detectar respuesta afirmativa
    if (["sí", "si", "claro", "por supuesto", "ok", "vale"].includes(m.trim())) {
        respuesta = `
            <div style="text-align:left;">
                <strong>¡Perfecto!</strong><br>
                ¿Sobre qué tema te gustaría saber más?<br>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    <li>Servicios</li>
                    <li>Equipo</li>
                    <li>Horarios</li>
                    <li>Ubicación</li>
                    <li>Consejos de salud dental</li>
                    <li>Instalaciones</li>
                </ul>
                Escribe el tema que te interesa.
            </div>
        `;
    }
    // Saludos y bienvenida
    else if (m.match(/(hola|buenas|buenos días|buenas tardes|buenas noches)/)) {
        respuesta = `
            <div style="text-align:left;">
                <strong>¡Hola! Soy el asistente virtual de DentistYa 😊</strong><br>
                ¿En qué puedo ayudarte hoy?
            </div>
        `;
    }
    // Horario
    else if (m.includes("horario") || m.includes("abren") || m.includes("cierran")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Horario de atención:</strong><br>
                <span style="color:#009688;">${info.horario}</span>
            </div>
        `;
    }
    // Dirección
    else if (m.includes("dirección") || m.includes("ubicación") || m.includes("dónde están") || m.includes("cómo llegar")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Dirección de la clínica:</strong><br>
                <span style="color:#009688;">${info.direccion}</span><br>
                <span>¿Te gustaría recibir indicaciones para llegar?</span>
            </div>
        `;
    }
    // Teléfono y contacto
    else if (m.includes("teléfono") || m.includes("contacto") || m.includes("llamar") || m.includes("whatsapp")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Teléfono y contacto:</strong>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    <li><a href="tel:${info.telefono}" style="color:#009688;text-decoration:none;">${info.telefono}</a></li>
                    <li>WhatsApp: ${info.telefono}</li>
                    <li>Email: <a href="mailto:${info.email}" style="color:#009688;text-decoration:none;">${info.email}</a></li>
                </ul>
                <span>¡Estamos para ayudarte!</span>
            </div>
        `;
    }
    // Email
    else if (m.includes("correo") || m.includes("email")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Correo electrónico:</strong><br>
                <a href="mailto:${info.email}" style="color:#009688;text-decoration:none;">${info.email}</a><br>
                ¡Escríbenos para cualquier consulta!
            </div>
        `;
    }
    // Servicios
    else if (m.includes("servicio") || m.includes("tratamiento") || m.includes("ofrecen") || m.includes("qué hacen")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Estos son algunos de nuestros servicios:</strong>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    ${info.servicios.map(s => `<li style="margin-bottom:0.4em;">${s}</li>`).join("")}
                </ul>
                <span style="color:#009688;">¿Te gustaría saber más sobre alguno en particular?</span>
            </div>
        `;
    }
    // Equipo
    else if (m.includes("equipo") || m.includes("doctores") || m.includes("especialistas") || m.includes("dentistas")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Nuestro equipo:</strong>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    ${info.equipo.map(e => `<li style="margin-bottom:0.4em;">${e}</li>`).join("")}
                </ul>
            </div>
        `;
    }
    // Instalaciones
    else if (m.includes("instalaciones") || m.includes("clínica") || m.includes("consultorio")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Nuestras instalaciones:</strong>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    ${info.instalaciones.map(i => `<li style="margin-bottom:0.4em;">${i}</li>`).join("")}
                </ul>
            </div>
        `;
    }
    // Testimonios
    else if (m.includes("opiniones") || m.includes("testimonios") || m.includes("recomendaciones")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Lo que dicen nuestros pacientes:</strong>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    ${info.testimonios.map(t => `<li style="margin-bottom:0.4em;">${t}</li>`).join("")}
                </ul>
            </div>
        `;
    }
    // Redes sociales
    else if (m.includes("instagram") || m.includes("facebook") || m.includes("redes")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Síguenos en nuestras redes sociales:</strong>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    ${info.redes.map(r => `<li style="margin-bottom:0.4em;">${r}</li>`).join("")}
                </ul>
            </div>
        `;
    }
    // Consejos dentales
    else if (m.includes("consejo") || m.includes("cuidados") || m.includes("tips") || m.includes("salud")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Consejos para tu salud dental:</strong>
                <ul style="padding-left:1.2em;margin:0.5em 0;">
                    ${info.consejos.map(c => `<li style="margin-bottom:0.4em;">${c}</li>`).join("")}
                </ul>
                <span style="color:#009688;">¿Quieres saber más sobre algún consejo en particular?</span>
            </div>
        `;
    }
    // Agendar cita
    else if (m.includes("cita") || m.includes("agendar") || m.includes("reservar") || m.includes("agenda")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>¿Quieres agendar una cita?</strong><br>
                Puedes llamarnos al <a href="tel:${info.telefono}" style="color:#009688;text-decoration:none;">${info.telefono}</a>, escribirnos por WhatsApp o usar la sección de contacto en nuestra web.<br>
                ¿Te gustaría que te ayude con el proceso?
            </div>
        `;
    }
    // Precios
    else if (m.includes("precio") || m.includes("cuánto cuesta") || m.includes("tarifa") || m.includes("cobran")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Precios y tarifas:</strong><br>
                Los precios varían según el tratamiento.<br>
                Si me indicas el servicio que te interesa, puedo darte una referencia o agendarte una valoración gratuita.
            </div>
        `;
    }
    // Urgencias
    else if (m.includes("urgencia") || m.includes("emergencia") || m.includes("dolor")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>¿Tienes una urgencia dental?</strong><br>
                Llámanos directamente al <a href="tel:${info.telefono}" style="color:#009688;text-decoration:none;">${info.telefono}</a> y te atenderemos lo más pronto posible.
            </div>
        `;
    }
    // Agradecimientos
    else if (m.includes("gracias") || m.includes("muchas gracias") || m.includes("te agradezco")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>¡Gracias a ti por confiar en nosotros!</strong><br>
                Si tienes otra pregunta, aquí estoy para ayudarte.
            </div>
        `;
    }
    // Despedidas
    else if (m.includes("adiós") || m.includes("hasta luego") || m.includes("nos vemos")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>¡Hasta pronto!</strong><br>
                Recuerda que tu sonrisa es nuestra pasión. 😊
            </div>
        `;
    }
    // Pregunta por ubicación exacta
    else if (m.includes("mapa") || m.includes("google maps")) {
        respuesta = `
            <div style="text-align:left;">
                <strong>Ubicación en Google Maps:</strong><br>
                Puedes encontrarnos buscando <span style="color:#009688;">'DentistYa'</span>.<br>
                ¿Te gustaría que te envíe el enlace?
            </div>
        `;
    }
    // Default
    else {
        respuesta = `
            <div style="text-align:left;">
                <strong>¡Gracias por tu mensaje!</strong><br>
                ¿Quieres saber más sobre nuestros <b>servicios</b>, <b>equipo</b>, <b>horarios</b>, <b>ubicación</b>, <b>consejos de salud dental</b> o <b>algo más</b>?<br>
                Si quieres información, responde <b>sí</b> o escribe el tema que te interesa.
            </div>
        `;
    }

    showBotResponseGradually(respuesta);
}

botBtn.onclick = () => {
    chatBox.style.display = "flex";
    botBtn.style.display = "none";
    chatContent.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.5em;">
            <img src="../img/logo.avif" alt="DentistYa" style="width:32px;height:32px;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.10);">
            <span style="background:#009688;color:#fff;padding:0.5em 1em;border-radius:12px;display:inline-block;">
                ¡Hola! Soy el chatbot de DentistYa. Pregúntame sobre nuestros servicios, equipo, horarios, ubicación, consejos de salud dental y más. 😊
            </span>
        </div>
    `;
};

closeBot.onclick = () => {
    chatBox.style.display = "none";
    botBtn.style.display = "block";
};

chatForm.onsubmit = (e) => {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    chatContent.innerHTML += `<div style="margin:0.5em 0;text-align:left;"><span style="background:#ff9800;color:#fff;padding:0.5em 1em;border-radius:12px;display:inline-block;">${userMsg}</span></div>`;
    botReply(userMsg);
    chatInput.value = "";
    // chatContent.scrollTop = chatContent.scrollHeight; // Elimina o comenta esta línea
};