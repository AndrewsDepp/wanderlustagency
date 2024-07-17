function openModal(id) {
    document.getElementById('ventana_info' + id).classList.add('active');
    if (id === 1) {
        readFromFile('texts/limites.txt');
    } else if (id === 2) {
        readFromFile('texts/elvuelo.txt');
    }
}

function closeModal() {
    document.querySelectorAll('.ventana_info').forEach(modal => {
        modal.classList.remove('active');
    });
    window.speechSynthesis.cancel();
}

function openInstructions() {
    document.getElementById('ventana_instrucciones').classList.add('active');
    textAloud('Bienvenidos', 'Nos alegra que hayan elegido confiar en nosotros. Hoy tendrán la oportunidad de unirse a nuestro emocionante recorrido y descubrir todo lo que Baños de Agua Santa tiene para ofrecer.');
}

function closeInstructions() {
    document.getElementById('ventana_instrucciones').classList.remove('active');
}

function openNewInstructions() {
    document.getElementById('nueva_ventana_instrucciones').classList.add('active');
}

function closeNewInstructions() {
    document.getElementById('nueva_ventana_instrucciones').classList.remove('active');
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
        closeInstructions();
        closeNewInstructions();
    } else if (event.key === "m" || event.key === "M") {
        toggleMute();
    } else if (event.key === "i" || event.key === "I") {
        openNewInstructions();
    }
});

// Background music control with delay
setTimeout(function() {
    var music = document.getElementById('background-music');
    music.volume = 0.2;
    music.play();
}, 10000); // Delay of 3 seconds

function toggleMute() {
    var music = document.getElementById('background-music');
    music.muted = !music.muted;
}

// Text aloud functionality
function textAloud(title, description) {
    var utterance = new SpeechSynthesisUtterance(title + ". " + description);
    utterance.lang = 'es-ES';
    utterance.volume = 0.6;
    window.speechSynthesis.speak(utterance);
}

function readFromFile(file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al leer el archivo');
            }
            return response.text();
        })
        .then(text => {
            const chunkLength = 200;  // Define el tamaño de cada fragmento
            const chunks = text.match(new RegExp('.{1,' + chunkLength + '}', 'g'));
            let currentIndex = 0;

            function speakNextChunk() {
                if (currentIndex < chunks.length) {
                    const utterance = new SpeechSynthesisUtterance(chunks[currentIndex]);
                    utterance.lang = 'es-ES';
                    utterance.volume = 0.6;
                    utterance.onend = speakNextChunk;
                    window.speechSynthesis.speak(utterance);
                    currentIndex++;
                }
            }

            speakNextChunk();
        })
        .catch(error => console.error('Error al leer el archivo:', error));
}


// Click sound for a-box elements
document.querySelectorAll('.clickable').forEach(function(box) {
    box.addEventListener('click', function() {
        document.getElementById('click-sound').play();
    });
});

// Open instructions pop-up on load
window.onload = function() {
    openInstructions();
};
