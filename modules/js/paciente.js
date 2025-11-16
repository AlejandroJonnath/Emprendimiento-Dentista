document.addEventListener('DOMContentLoaded', () => {
    // Fase 1
    const btnSiguiente = document.getElementById('btnSiguiente');
    const fase1 = document.getElementById('fase1');
    const fase2 = document.getElementById('fase2');
    const btnConfirmar = document.getElementById('btnConfirmar');
    const modalConfirmar = document.getElementById('modalConfirmar');
    const btnModalSi = document.getElementById('btnModalSi');
    const btnModalNo = document.getElementById('btnModalNo');
    const modalCita = document.getElementById('modalCita');
    const btnIrInicio = document.getElementById('btnIrInicio');
    const datosCita = document.getElementById('datosCita');

    let servicioSeleccionado = '';
    let doctorSeleccionado = '';

    btnSiguiente.addEventListener('click', () => {
        const servicio = document.querySelector('input[name="servicio"]:checked');
        if (!servicio) {
            alert('Por favor selecciona un servicio.');
            return;
        }
        servicioSeleccionado = servicio.value;
        fase1.style.display = 'none';
        fase2.style.display = 'block';
    });

    btnConfirmar.addEventListener('click', () => {
        const doctor = document.querySelector('input[name="doctor"]:checked');
        if (!doctor) {
            alert('Por favor selecciona un doctor.');
            return;
        }
        doctorSeleccionado = doctor.value;
        modalConfirmar.style.display = 'flex';
    });

    btnModalNo.addEventListener('click', () => {
        modalConfirmar.style.display = 'none';
    });

    btnModalSi.addEventListener('click', () => {
        modalConfirmar.style.display = 'none';
        fase2.style.display = 'none';
        // Mostrar datos en el modal verde
        datosCita.innerHTML = `
            <p><strong>Servicio:</strong> ${servicioSeleccionado}</p>
            <p><strong>Doctor:</strong> ${doctorSeleccionado}</p>
        `;
        modalCita.style.display = 'flex';
    });

    btnIrInicio.addEventListener('click', () => {
        window.location.href = "../../index.html";
    });
});