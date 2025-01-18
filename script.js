// Custom variables
const CONFIG = {
    pengirim: "Someone❤️",
    musik: "musikku.mp3",
    notifSound: "notif.mp3",
    ucapan: "Hai, kenalan dong...",
    pesanKedua: "Di tahun kehidupan kamu yang ke-24 ini, aku mau bilang terimakasih karna sudah hadir di keh",
    background1: "bgucapanwa.png",
    background2: "bgucapanwa.png",
    noWhatsapp: "6281255173749",
    pesanWhatsapp: "Hai..."
};

// Setup Audio Function
function setupAudio() {
    const audio = new Audio(CONFIG.musik);
    const notifSound = new Audio(CONFIG.notifSound);
    
    // Handle audio loading errors
    audio.addEventListener('error', () => {
        console.error('Gagal memuat file musik');
    });
    
    notifSound.addEventListener('error', () => {
        console.error('Gagal memuat file notifikasi');
    });
    
    return { audio, notifSound };
}

// Main function
function customWhatsApp() {
    // Audio setup
    const { audio, notifSound } = setupAudio();
    audio.loop = true;

    // Background setup
    document.querySelector('.background1').style.backgroundImage = `url(${CONFIG.background1})`;
    document.querySelector('.background2').style.backgroundImage = `url(${CONFIG.background2})`;

    // Get elements
    const btnMulai = document.querySelector('.btn-mulai');
    const hilang1 = document.querySelector('.hilang1');
    const hilang2 = document.querySelector('.hilang2');
    const kirimWA = document.querySelector('.kirimWA');
    const notif1 = document.querySelector('.notif1');
    const notif2 = document.querySelector('.notif2');
    const nama1 = document.querySelector('.nama1 p');
    const nama2 = document.querySelector('.nama2 p');
    const pesan1 = document.querySelector('.notif1 .isi p');
    const pesan2 = document.querySelector('.notif2 .isi p');

    // Set sender name and messages
    nama1.innerHTML = CONFIG.pengirim;
    nama2.innerHTML = CONFIG.pengirim;
    pesan1.innerHTML = CONFIG.ucapan;
    pesan2.innerHTML = CONFIG.pesanKedua;

    // Hide loading screen after 1 second
    setTimeout(() => {
        document.querySelector('.loading').style.display = 'none';
    }, 1000);

    // Handle notifications display
    function playFirstNotification() {
        audio.play().catch(console.error);
        notifSound.play().catch(console.error);
        hilang1.style.display = 'none';
        hilang2.style.display = 'inline-block';
        notif1.style.transform = 'translateX(0)';
    }

    function playSecondNotification() {
        notifSound.play().catch(console.error);
        hilang2.style.display = 'none';
        kirimWA.style.display = 'inline-block';
        notif2.style.transform = 'translateX(0)';
        notif2.classList.add('kelip'); // Tambahkan efek kelip ke notif2
    }

    function openWhatsApp() {
        const url = `https://api.whatsapp.com/send?phone=${CONFIG.noWhatsapp}&text=${encodeURIComponent(CONFIG.pesanWhatsapp)}`;
        window.open(url, '_blank');
    }

    // Handle button clicks
    function handleClick() {
        if (hilang1.style.display !== 'none') {
            playFirstNotification();
        } else if (hilang2.style.display !== 'none') {
            playSecondNotification();
        } else {
            openWhatsApp();
        }
    }

    btnMulai.addEventListener('click', handleClick);

    // Update clock function
    function updateClock() {
        try {
            const now = new Date();
            const jam = document.getElementById('jam');
            const tgl = document.querySelector('.tgl');
            
            // Update time
            const timeOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false 
            };
            jam.textContent = now.toLocaleTimeString('en-US', timeOptions);
            
            // Update date
            const dateOptions = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
            };
            tgl.textContent = now.toLocaleDateString('en-US', dateOptions);
        } catch (error) {
            console.error('Error updating clock:', error);
        }
    }

    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
}

// Start everything when window loads
window.addEventListener('load', customWhatsApp);

// Disable right click
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});