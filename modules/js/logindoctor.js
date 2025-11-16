document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const notificacion = document.getElementById('notificacion-validando');
    const modalError = document.getElementById('modal-error');
    const cerrarError = document.getElementById('cerrar-error');

    // Crear modal de éxito dinámicamente
    let modalExito = document.getElementById('modal-exito');
    if (!modalExito) {
        modalExito = document.createElement('div');
        modalExito.id = 'modal-exito';
        modalExito.className = 'modal-exito';
        modalExito.style.display = 'none';
        modalExito.innerHTML = `
            <div class="modal-exito-content">
                <span class="modal-exito-icon">✔</span>
                <span class="modal-exito-texto">Credenciales correctas, bienvenido</span>
            </div>
        `;
        document.body.appendChild(modalExito);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        notificacion.style.display = 'flex';

        setTimeout(() => {
            const correo = document.getElementById('correo').value.trim();
            const password = document.getElementById('password').value.trim();

            const credenciales = [
                { correo: 'adriel.bedoya@dentistya.com', password: 'adriel' },
                { correo: 'alan.velasco@dentistya.com', password: 'alan' }
            ];

            const valido = credenciales.some(c =>
                c.correo === correo && c.password === password
            );

            notificacion.style.display = 'none';

            if (valido) {
                modalExito.style.display = 'flex';
                setTimeout(() => {
                    modalExito.style.display = 'none';
                    window.location.href = "doctor.html";
                }, 1000);
            } else {
                modalError.style.display = 'flex';
            }
        }, 1000); // 1 segundo de "validando datos"
    });

    cerrarError.addEventListener('click', () => {
        modalError.style.display = 'none';
    });
});