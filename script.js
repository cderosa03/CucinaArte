document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

//PER SEZIONE INGREDIENTI
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
    let activeCard = null; // Memorizza la card attualmente selezionata

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const row = card.closest('.row'); // Trova la riga della card
            const descriptionStripe = row.nextElementSibling; // Trova la striscia di descrizione
            const descriptionText = card.getAttribute('data-description'); // Prende il testo dalla card

            if (descriptionStripe && descriptionStripe.classList.contains('description-stripe')) {
                // Se la stessa card viene cliccata di nuovo, chiude la descrizione
                if (activeCard === card) {
                    descriptionStripe.classList.remove('visible');
                    descriptionStripe.innerHTML = "";
                    card.classList.remove('clicked');
                    activeCard = null; // Resetta la card attiva
                } else {
                    // Nasconde tutte le altre descrizioni e rimuove i colori delle altre card
                    document.querySelectorAll('.description-stripe').forEach(desc => {
                        desc.classList.remove('visible');
                        desc.innerHTML = "";
                    });
                    cards.forEach(c => c.classList.remove('clicked'));

                    // Mostra la nuova descrizione e aggiorna il testo
                    descriptionStripe.innerHTML = descriptionText;
                    descriptionStripe.classList.add('visible');
                    card.classList.add('clicked');

                    // Imposta questa card come attiva
                    activeCard = card;
                }
            }
        });
    });
});

//PER SEZIONE BUTTON
document.addEventListener("DOMContentLoaded", function() {
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            backToTop.style.display = "block"; // Mostra il pulsante dopo 300px di scroll
        } else {
            backToTop.style.display = "none"; // Nasconde il pulsante se torni su
        }
    });

    backToTop.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Torna su in modo fluido
    });
});

//RICETTA

 // Mostra il loading iniziale
        document.addEventListener('DOMContentLoaded', function() {
            const loading = document.getElementById('pdfLoading');
            loading.style.display = 'block';
            
            // Nascondi il loading dopo 2 secondi se non viene caricato
            setTimeout(() => {
                if (loading.style.display !== 'none') {
                    hideLoading();
                }
            }, 3000);
        });

        function hideLoading() {
            const loading = document.getElementById('pdfLoading');
            loading.style.display = 'none';
        }

        function showError() {
            const loading = document.getElementById('pdfLoading');
            loading.innerHTML = `
                <div style="color: #d32f2f;">
                    <h4>⚠️ Errore nel caricamento</h4>
                    <p>Non è possibile visualizzare il PDF.<br>
                    <a href="pdf/Analisi Nutrizionale Ricetta Leo.pdf" style="color: #d32f2f; text-decoration: underline;">
                        Clicca qui per scaricarlo
                    </a></p>
                </div>
            `;
        }

        // Intersection Observer per animazioni
        const observeElements = () => {
            const elements = document.querySelectorAll('.animated-fade-in');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            }, { threshold: 0.1 });

            elements.forEach(el => {
                observer.observe(el);
            });
        };

        document.addEventListener('DOMContentLoaded', observeElements);

        // Gestione errori PDF per browser non compatibili
        window.addEventListener('load', function() {
            const iframe = document.getElementById('pdfFrame');
            
            // Controlla se il PDF è stato caricato correttamente
            setTimeout(() => {
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    if (!iframeDoc || iframeDoc.body.innerHTML === '') {
                        showError();
                    }
                } catch (e) {
                    // Errore di accesso cross-origin è normale per i PDF
                    hideLoading();
                }
            }, 2000);
        });

//VIDEO

   document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("myVideo");
  const button = document.getElementById("toggleButton");
  let isPausedManually = false;

  // ▶ Scroll: play/pausa automatica
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isPausedManually) {
        video.play();
        button.textContent = "⏸ Stop";
      } else if (!isPausedManually) {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector("#video"));

  // ▶ Pulsante: play/pausa manuale
  button.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      button.textContent = "⏸ Stop";
      isPausedManually = false;
    } else {
      video.pause();
      button.textContent = "▶ Start";
      isPausedManually = true;
    }
  });
});




/*document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
    const descriptions = document.querySelectorAll('.description-stripe');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const row = card.closest('.row'); // Trova la riga della card
            const description = row.nextElementSibling; // Trova la descrizione associata alla riga

            // Se la descrizione esiste
            if (description && description.classList.contains('description-stripe')) {
                // Se la descrizione è già visibile, la nasconde
                if (description.classList.contains('visible')) {
                    description.classList.remove('visible');
                    card.classList.remove('clicked'); // Rimuove il colore dalla card
                } else {
                    // Nasconde tutte le altre descrizioni
                    descriptions.forEach(desc => desc.classList.remove('visible'));
                    cards.forEach(c => c.classList.remove('clicked'));

                    // Mostra la descrizione solo per la card cliccata
                    description.classList.add('visible');
                    card.classList.add('clicked');
                }
            }
        });
    });
});

*/


/*
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Chiude tutte le descrizioni aperte
            document.querySelectorAll('.description-stripe').forEach(desc => {
                desc.classList.remove('visible');
            });

            // Rimuove la classe "clicked" da tutte le card
            cards.forEach(c => c.classList.remove('clicked'));

            // Trova la descrizione della riga della card cliccata
            const description = card.closest('.row').nextElementSibling;

            // Se la descrizione esiste, la mostra
            if (description && description.classList.contains('description-stripe')) {
                description.classList.add('visible');
            }

            // Aggiunge l'effetto di colore solo alla card cliccata
            card.classList.add('clicked');
        });
    });
});
*/

/*// Script per aprire/chiudere la descrizione sotto la riga della card cliccata
document.querySelectorAll('.card').forEach((card, index) => {
    card.addEventListener('click', () => {
        // Trova la descrizione sotto la card cliccata
        const description = card.closest('.row').nextElementSibling;
        
        // Mostra o nascondi la descrizione
        description.classList.toggle('visible');
        
        // Cambia il colore della card e della descrizione
        card.classList.toggle('clicked');
        description.classList.toggle('clicked');
    });
});*/


