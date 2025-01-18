// Custom variables
var pengirim = "Someone❤️";
var musik = "musikku.mp3";
var ucapan = "Hai, kenalan dong...";  // Pesan untuk notifikasi pertama
var pesanKedua = "Di tahun kehidupan kamu yang ke-24 ini, aku mau bilang terimakasih karna sudah hadir di keh"; // Pesan untuk notifikasi kedua
var background1 = "bg.png";
var background2 = "bg.png";
var noWhatsapp = "6281255173749";
var pesanWhatsapp = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";

// Main function
function customWhatsApp() {
    // Audio setup
    const audio = new Audio(musik);
    audio.loop = true;
    
    // Notifikasi sound setup
    const notifSound = new Audio('notif.mp3'); // Tambahkan file suara notifikasi WhatsApp

    // Background setup
    document.querySelector('.background1').style.backgroundImage = `url(${background1})`;
    document.querySelector('.background2').style.backgroundImage = `url(${background2})`;

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
    nama1.innerHTML = pengirim;
    nama2.innerHTML = pengirim;
    pesan1.innerHTML = ucapan;
    pesan2.innerHTML = pesanKedua;

    // Hide loading screen after 1 second
    setTimeout(() => {
        document.querySelector('.loading').style.display = 'none';
    }, 1000);

    // Initialize click events
    btnMulai.addEventListener('click', function() {
        if (hilang1.style.display !== 'none') {
            // First click
            audio.play();
            notifSound.play(); // Mainkan suara notifikasi
            hilang1.style.display = 'none';
            hilang2.style.display = 'inline-block';
            notif1.style.transform = 'translateX(0)';
        } else if (hilang2.style.display !== 'none') {
            // Second click
            notifSound.play(); // Mainkan suara notifikasi
            hilang2.style.display = 'none';
            kirimWA.style.display = 'inline-block';
            notif2.style.transform = 'translateX(0)';
        } else {
            // Final click - Open WhatsApp
            let pesan = pesanWhatsapp;
            window.open(`https://api.whatsapp.com/send?phone=${noWhatsapp}&text=${encodeURIComponent(pesan)}`);
        }
    });

    // Update clock
    function updateClock() {
        const now = new Date();
        const jam = document.getElementById('jam');
        const tgl = document.querySelector('.tgl');
        
        // Update time
        jam.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        // Update date
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        tgl.textContent = now.toLocaleDateString('en-US', options);
    }

    // Update clock every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
}

// Start everything
window.addEventListener('load', customWhatsApp);

// Disable right click
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});