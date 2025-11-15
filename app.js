document.addEventListener('DOMContentLoaded', function() {
    // Modal para contacto
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const modalData = document.getElementById('modalData');
    let modalTimeout;

    function cerrarModalYRedirigir() {
        modal.style.display = 'none';
        clearTimeout(modalTimeout);
        window.location.href = "../index.html";
    }

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = form.nombre.value;
            const apellido = form.apellido.value;
            const telefono = form.telefono.value;
            const correo = form.correo.value;

            modalData.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1em;">
                    <img src="../img/check.png" alt="Enviado" style="width:60px;height:60px;background:#fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.12);margin-bottom:1em;">
                    <p style="font-size:1.2em;"><strong>Nombre:</strong> ${nombre}</p>
                    <p style="font-size:1.2em;"><strong>Apellido:</strong> ${apellido}</p>
                    <p style="font-size:1.2em;"><strong>Teléfono:</strong> ${telefono}</p>
                    <p style="font-size:1.2em;"><strong>Correo:</strong> ${correo}</p>
                </div>
            `;
            modal.style.display = 'flex';

            // Cierre automático en 4 segundos y redirige
            clearTimeout(modalTimeout);
            modalTimeout = setTimeout(cerrarModalYRedirigir, 4000);
        });
    }

    if(closeModal) {
        closeModal.onclick = cerrarModalYRedirigir;
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            cerrarModalYRedirigir();
        }
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const testimonios = document.querySelectorAll('.testimonio');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let current = 0;

    function showTestimonio(idx) {
        testimonios.forEach((t, i) => {
            t.classList.toggle('active', i === idx);
        });
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + testimonios.length) % testimonios.length;
        showTestimonio(current);
    });

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % testimonios.length;
        showTestimonio(current);
    });

    showTestimonio(current);
});

document.addEventListener('DOMContentLoaded', function() {
    // Navbar responsive toggle
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarLinks = document.getElementById('navbarLinks');
    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', function() {
            navbarLinks.classList.toggle('open');
            navbarToggle.classList.toggle('open');
        });
        // Optional: close menu when clicking a link (mobile)
        navbarLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('open');
                navbarToggle.classList.remove('open');
            });
        });
    }
});