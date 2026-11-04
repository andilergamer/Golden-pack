document.addEventListener('DOMContentLoaded', function() {

    const datos_envases = [
        {
            titulo: "Capacillos",
            desc: "El molde ideal para cualquier ocasión",
            desc_detallada: `Perfectos para una reunión, movilidad y reposterías.

Tenemos tamaños que abarcan desde el 6 al 12 con las siguientes características:

Número  |    Diámetro    |      Altura
• #6         Base de 2.5 cm     1.75 cm
• #7         Base de 3 cm        2 cm
• #8         Base de 3.5 cm     2.25 cm
• #9         Base de 4 cm        2.5 cm
• #10       Base de 4.5 cm     2.75 cm
• #11       Base de 5 cm        3 cm
• #12       Base de 5.5 cm     3.25 cm`,
            whatsapp: "https://wa.me/584120000000?text=Hola,%20estoy%20interesado%20en%20los%20capacillos",
            imagenes: [
                "images/molde1-0.png",
                "images/molde1-1.png",
                "images/molde1-2.png",
                "images/molde1-3.png",
                "images/molde1-4.png"
            ]
        },
        {
            titulo: "2",
            desc: "desc_2",
            desc_detallada: "desc_detallada 2",
            whatsapp: "https://wa.me/584120000000?text=Hola,%20estoy%20interesado%20en%20el%20modelo%202",
            imagenes: [
                "https://via.placeholder.com/400x250/FF000/2C1D11?text=Caja+Foto+1",
                "https://via.placeholder.com/400x250/FF000/2C1D11?text=Caja+Foto+2",
                "https://via.placeholder.com/400x250/FF000/FFFDF9?text=Caja+Foto+3"
            ]
        },
        {
            titulo: "3",
            desc: "desc_3",
            desc_detallada: "desc_detallada 3",
            whatsapp: "https://wa.me/584120000000?text=Hola,%20estoy%20interesado%20en%20el%20modelo%203",
            imagenes: [
                "https://via.placeholder.com/400x250/FF000/2C1D11?text=Tarta+Foto+1",
                "https://via.placeholder.com/400x250/FF000/2C1D11?text=Tarta+Foto+2",
                "https://via.placeholder.com/400x250/FF000/FFFDF9?text=Tarta+Foto+3"
            ]
        }
    ];

    const transition_1 = document.querySelectorAll('.transition_1');
    const transition_2 = document.querySelectorAll('.transition_2');
    const gridContainer = document.getElementById('catalog-grid');
    const modalOverlay = document.querySelector('.modal-overlay');
    const btnCerrar = document.querySelector('.btn-cerrar');
    
    const modalWhatsapp = modalOverlay ? modalOverlay.querySelector('.btn-whatsapp-modal') : null;
    const modalTitulo = modalOverlay ? modalOverlay.querySelector('.card-title') : null;
    const modalDesc = modalOverlay ? modalOverlay.querySelector('.modal-desc') : null; // Apunta correctamente al modal sin el .document
    const carruselImg = modalOverlay ? modalOverlay.querySelector('.carrusel-img') : null;
    const btnPrev = modalOverlay ? modalOverlay.querySelector('.carrusel-btn.prev') : null;
    const btnNext = modalOverlay ? modalOverlay.querySelector('.carrusel-btn.next') : null;
    const contador = modalOverlay ? modalOverlay.querySelector('.carrusel-contador') : null;

    let imagenesActuales = [];
    let indiceActual = 0;

    // Transiciones iniciales del DOM
    setTimeout(function() {
        for (let i = 0; i < transition_1.length; i++) {
            transition_1[i].style.opacity = '1';
            transition_1[i].style.transform = 'translate(0rem, 0rem)';
        }
    }, 850);

    setTimeout(function() {
        for (let i = 0; i < transition_2.length; i++) {
            transition_2[i].style.opacity = '1';
            transition_2[i].style.transform = 'translateY(0px)';
        }
    }, 500);

    // Generación dinámica de tarjetas
    if (gridContainer) {
        datos_envases.forEach(envase => {
            const article = document.createElement('article');
            article.classList.add('card', 'transition_3');

            article.innerHTML = `
                <img src="${envase.imagenes[0]}" alt="${envase.titulo}" class="card-img">
                <div class="card-content">
                    <h3 class="card-title">${envase.titulo}</h3>
                    <p class="card-desc">${envase.desc}</p>
                    <button class="btn-detalles">Ver detalles</button>
                </div>
            `;

            const btnDetalles = article.querySelector('.btn-detalles');
            btnDetalles.addEventListener('click', function(evento) {
                evento.preventDefault();

                if (modalTitulo) modalTitulo.textContent = envase.titulo;
                if (modalDesc) modalDesc.textContent = envase.desc_detallada; // Carga la descripción detallada
                if (modalWhatsapp) modalWhatsapp.href = envase.whatsapp;

                imagenesActuales = envase.imagenes;
                indiceActual = 0;
                actualizarCarrusel();

                if (modalOverlay) modalOverlay.classList.add('activo');
            });

            gridContainer.appendChild(article);
        });
    }

    // Generación de imagenes (galería)
    const galeriaGrid = document.getElementById('galeria-grid');

    if (galeriaGrid) {
        datos_envases.forEach(envase => {
            envase.imagenes.forEach((imgUrl, index) => {
                const article = document.createElement('article');
                article.classList.add('galeria-card', 'transition_3');

                article.innerHTML = `
                    <img src="${imgUrl}" alt="Modelo ${envase.titulo} - Vista ${index + 1}" class="card-img galeria-trigger" style="cursor: pointer;">
                    <div class="galeria-card-content">
                        <h3 class="galeria-card-title">Modelo ${envase.titulo}</h3>
                    </div>
                `;
                // Al hacer clic en la imagen de la galería, se abre el modal existente adaptado
                const imgTrigger = article.querySelector('.galeria-trigger');
                imgTrigger.addEventListener('click', () => {
                    if (carruselImg && modalOverlay) {
                        carruselImg.src = imgUrl;
                        // Adaptamos el modal de la galería ocultando controles de carrusel/whatsapp que no aplican aquí
                        if (modalTitulo) modalTitulo.textContent = `Modelo ${envase.titulo} - Vista ${index + 1}`;
                        if (modalDesc) modalDesc.style.display = 'none';
                        if (modalWhatsapp) modalWhatsapp.style.display = 'none';
                        if (btnPrev) btnPrev.style.display = 'none';
                        if (btnNext) btnNext.style.display = 'none';
                        if (contador) contador.style.display = 'none';

                        modalOverlay.classList.add('activo');
                    }
                });

                galeriaGrid.appendChild(article);
            });
        });
    }

    // Transición diferida para las tarjetas inyectadas (.transition_3)
    const transition_3 = document.querySelectorAll('.transition_3');
    setTimeout(function() {
        for (let i = 0; i < transition_3.length; i++) {
            transition_3[i].style.opacity = "1";
            transition_3[i].style.transform = "translateY(0)";
        }
    }, 1200);

    function actualizarCarrusel() {
        if (!carruselImg) return;
        carruselImg.style.opacity = "0";
        setTimeout(() => {
            carruselImg.src = imagenesActuales[indiceActual];
            if (contador) {
                contador.textContent = `${indiceActual + 1} / ${imagenesActuales.length}`;
            }
            carruselImg.style.opacity = "1";
        }, 200);
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            if (imagenesActuales.length === 0) return;
            indiceActual = (indiceActual + 1) % imagenesActuales.length;
            actualizarCarrusel();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (imagenesActuales.length === 0) return;
            indiceActual = (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length;
            actualizarCarrusel();
        });
    }

    if (btnCerrar && modalOverlay) {
        btnCerrar.addEventListener('click', () => {
            modalOverlay.classList.remove('activo');
        });
    }

    // Control del menú desplegable (Dropdown del Header)
    // Control del menú desplegable (Dropdown del Header)
    const btnMenu = document.querySelector('.caida-menu');
    const contenidoMenu = document.querySelector('.contenido-menu');

    if (btnMenu && contenidoMenu) {
        btnMenu.addEventListener('click', (evento) => {
            evento.stopPropagation();
            contenidoMenu.classList.toggle('activo');
        });

        // Evita que los clics dentro del menú lo cierren por accidente
        contenidoMenu.addEventListener('click', (evento) => {
            evento.stopPropagation();
        });

        // Cierra el menú al hacer clic fuera
        document.addEventListener('click', () => {
            contenidoMenu.classList.remove('activo');
        });
    }
});