document.addEventListener('DOMContentLoaded', () => {
    const fase1 = document.getElementById('fase1');
    const faseHistorial = document.getElementById('faseHistorial');
    const faseCitas = document.getElementById('faseCitas');
    const faseMaterial = document.getElementById('faseMaterial');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    const btnOpciones = document.querySelectorAll('.btn-opcion');
    const btnVolver = document.querySelectorAll('.btn-volver');

    btnCerrarSesion.addEventListener('click', () => {
        window.location.href = "../../index.html";
    });

    btnOpciones.forEach(btn => {
        btn.addEventListener('click', () => {
            fase1.style.display = 'none';
            if (btn.dataset.fase === 'historial') {
                faseHistorial.style.display = 'block';
            } else if (btn.dataset.fase === 'citas') {
                faseCitas.style.display = 'block';
            } else if (btn.dataset.fase === 'material') {
                faseMaterial.style.display = 'block';
            }
        });
    });

    btnVolver.forEach(btn => {
        btn.addEventListener('click', () => {
            faseHistorial.style.display = 'none';
            faseCitas.style.display = 'none';
            faseMaterial.style.display = 'none';
            fase1.style.display = 'block';
        });
    });
});