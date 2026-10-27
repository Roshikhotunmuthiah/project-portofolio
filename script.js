// ===================== MENU MOBILE =====================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    const terbuka = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", terbuka);
});

// Tutup menu setelah salah satu link diklik (tampilan mobile)
document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Tandai menu aktif sesuai section yang sedang dilihat
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
    let current = "home";
    sections.forEach(function (sec) {
        if (window.scrollY >= sec.offsetTop - 120) {
            current = sec.id;
        }
    });
    navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
});

// ===================== VALIDASI FORM =====================
const form = document.getElementById("formKontak");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const inputPesan = document.getElementById("pesan");

const errNama = document.getElementById("errNama");
const errEmail = document.getElementById("errEmail");
const errPesan = document.getElementById("errPesan");

const successMsg = document.getElementById("successMsg");
const hasilForm = document.getElementById("hasilForm");

// Format email: teks@domain.tld
function emailValid(email) {
    const pola = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return pola.test(email);
}

function tampilkanError(input, pesanEl, teks) {
    input.parentElement.classList.add("invalid");
    pesanEl.textContent = teks;
}

function hapusError(input, pesanEl) {
    input.parentElement.classList.remove("invalid");
    pesanEl.textContent = "";
}

function validasiForm() {
    let valid = true;
    const nama = inputNama.value.trim();
    const email = inputEmail.value.trim();
    const pesan = inputPesan.value.trim();

    // Nama tidak boleh kosong
    if (nama === "") {
        tampilkanError(inputNama, errNama, "Nama tidak boleh kosong.");
        valid = false;
    } else {
        hapusError(inputNama, errNama);
    }

    // Email tidak boleh kosong + format harus benar
    if (email === "") {
        tampilkanError(inputEmail, errEmail, "Email tidak boleh kosong.");
        valid = false;
    } else if (!emailValid(email)) {
        tampilkanError(inputEmail, errEmail, "Format email tidak valid. Contoh: nama@email.com");
        valid = false;
    } else {
        hapusError(inputEmail, errEmail);
    }

    // Pesan tidak boleh kosong
    if (pesan === "") {
        tampilkanError(inputPesan, errPesan, "Pesan tidak boleh kosong.");
        valid = false;
    } else {
        hapusError(inputPesan, errPesan);
    }

    return valid;
}

// Hapus pesan error saat pengguna mulai mengetik ulang
[
    [inputNama, errNama],
    [inputEmail, errEmail],
    [inputPesan, errPesan]
].forEach(function (pair) {
    pair[0].addEventListener("input", function () {
        hapusError(pair[0], pair[1]);
    });
});

// ===================== KIRIM FORM =====================
form.addEventListener("submit", function (event) {
    event.preventDefault(); // cegah reload halaman

    if (!validasiForm()) {
        successMsg.hidden = true;
        hasilForm.hidden = true;
        return;
    }

    // Pesan berhasil
    successMsg.textContent = "Terima kasih, " + inputNama.value.trim() + "! Pesan Anda berhasil dikirim.";
    successMsg.hidden = false;

    // Fitur kreativitas: data form ditampilkan di bawah form
    // textContent dipakai agar input pengguna tidak dieksekusi sebagai HTML
    document.getElementById("outNama").textContent = inputNama.value.trim();
    document.getElementById("outEmail").textContent = inputEmail.value.trim();
    document.getElementById("outPesan").textContent = inputPesan.value.trim();
    document.getElementById("outWaktu").textContent = new Date().toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "short"
    });
    hasilForm.hidden = false;

    form.reset();
    hasilForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
});