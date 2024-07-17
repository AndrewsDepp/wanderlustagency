// Función para reservar a través de WhatsApp
document.getElementById('reservarBtn').addEventListener('click', function() {
    // Reemplaza el número de teléfono con el número del dueño de la web
    var phoneNumber = '593981395666';
    var message = 'Hola, me gustaría reservar el museo virtual.';
    var whatsappUrl = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank');
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización del carrusel de la galería
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        // Asume que la inicialización de Slick se hace de alguna forma compatible con JS puro
        $(gallery).slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 2,
            centerMode: true,
            variableWidth: true,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 2000,
        });
    }

    // Smooth scrolling para la navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Lógica para mostrar/ocultar comentarios adicionales
    const showMoreBtn = document.getElementById('show-more-btn');
    const testimonials = document.querySelectorAll('.testimonial');

    // Mostrar el botón "Ver más" si hay más de tres comentarios
    if (testimonials.length > 3) {
        showMoreBtn.classList.remove('hidden');
    }

    // Inicialmente mostrar solo los tres primeros comentarios
    testimonials.forEach((testimonial, index) => {
        if (index < 3) {
            testimonial.classList.add('show');
        }
    });

    // Agregar evento de clic al botón "Ver más"
    showMoreBtn.addEventListener('click', function() {
        const hiddenTestimonials = document.querySelectorAll('.testimonial:not(.show)');
        if (hiddenTestimonials.length > 0) {
            hiddenTestimonials.forEach(testimonial => {
                testimonial.style.display = 'block'; // Asegurarse de que el elemento esté visible para la transición
                setTimeout(() => {
                    testimonial.classList.add('show');
                }, 10); // Pequeño retraso para permitir que la transición ocurra
            });
            showMoreBtn.textContent = 'Mostrar menos';
        } else {
            testimonials.forEach((testimonial, index) => {
                if (index >= 2) {
                    testimonial.classList.remove('show');
                    setTimeout(() => {
                        testimonial.style.display = 'none'; // Ocultar después de la transición
                        testimonial.classList.add('hidden'); // Asegurarse de que el elemento esté oculto
                    }, 500); // Coincidir con la duración de la transición CSS
                }
            });
            showMoreBtn.textContent = 'Ver más';
        }
    });




    //Code
    const ingresarBtn = document.getElementById('ingresarBtn');
    const accessCodeInput = document.getElementById('accessCode');
    const correctCode = '2024';  // Código de acceso correcto

    ingresarBtn.addEventListener('click', () => {
        const enteredCode = accessCodeInput.value;
        if (enteredCode === correctCode) {
            showModal('Código correcto', 'correct', 'Avanzar', () => {
                window.open('assets/museo360.html', '_blank');
            });
        } else {
            showModal('Código incorrecto', 'incorrect', 'Intentar de nuevo', closeModal);
        }
    });

    function showModal(message, messageType, buttonText, buttonAction) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'block';

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        messageParagraph.classList.add(messageType);

        const actionButton = document.createElement('button');
        actionButton.textContent = buttonText;
        actionButton.addEventListener('click', () => {
            buttonAction();
            modal.remove();
        });

        modalContent.appendChild(messageParagraph);
        modalContent.appendChild(actionButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    }

    function closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }










});
