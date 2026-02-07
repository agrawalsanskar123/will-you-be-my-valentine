/* ── Ambient: falling hearts & sparkles ── */

const heartSymbols = ["♥", "♡", "❤", "💕", "💖", "💗", "💓", "💝"];

/* Spawn a single falling heart */
const spawnFallingHeart = () => {
    const el = document.createElement("span");
    el.classList.add("falling-heart");
    el.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${16 + Math.random() * 28}px`;
    el.style.setProperty("--duration", `${6 + Math.random() * 8}s`);
    el.style.setProperty("--delay", "0s");
    el.style.setProperty("--peak-opacity", `${0.35 + Math.random() * 0.45}`);
    el.style.setProperty("--scale", `${0.6 + Math.random() * 0.6}`);
    el.style.setProperty("--spin", `${-30 + Math.random() * 60}deg`);
    el.style.color = `hsl(${335 + Math.random() * 25}, ${65 + Math.random() * 25}%, ${50 + Math.random() * 25}%)`;
    document.body.appendChild(el);

    /* Remove after animation completes to avoid DOM buildup */
    const duration = parseFloat(el.style.getPropertyValue("--duration")) * 1000;
    setTimeout(() => el.remove(), duration + 200);
};

/* Initial burst of hearts + continuous rain */
const startFallingHearts = () => {
    /* Staggered initial batch */
    for (let i = 0; i < 12; i++) {
        setTimeout(() => spawnFallingHeart(), i * 300);
    }
    /* Continuous stream */
    setInterval(() => spawnFallingHeart(), 600);
};

const createSparkles = () => {
    const sparkleCount = 22;

    for (let s = 0; s < sparkleCount; s++) {
        const el = document.createElement("span");
        el.classList.add("sparkle");
        el.style.left = `${Math.random() * 100}%`;
        el.style.top = `${Math.random() * 100}%`;
        el.style.setProperty("--duration", `${3 + Math.random() * 4}s`);
        el.style.setProperty("--delay", `${Math.random() * 6}s`);
        el.style.setProperty("--peak-opacity", `${0.2 + Math.random() * 0.35}`);
        el.style.width = `${3 + Math.random() * 4}px`;
        el.style.height = el.style.width;
        document.body.appendChild(el);
    }
};

startFallingHearts();
createSparkles();

/* ── Valentine logic ── */
const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    turkish: [
        "Hayır",
        "Emin misin?",
        "Gerçekten emin misin??",
        "Gerçekten gerçekten emin misin???",
        "Bir daha düşün?",
        "İkinci şanslara inanmıyor musun?",
        "Neden bu kadar soğuksun?",
        "Belki konuşabiliriz?",
        "Bir daha sormayacağım!",
        "Tamam bu artık duygularımı incitmeye başladı!",
        "Artık sadece kötü davranıyorsun!",
        "Bunu bana neden yapıyorsun?",
        "Lütfen bana bir şans ver!",
        "Durmanı yalvarıyorum!",
        "Tamam, baştan başlayalım.."
    ],
    emotional_damage: [
        "Reject",
        "You DARE?!",
        "My heart... it shatters...",
        "Et tu, Brute?!",
        "I trusted you with my SOUL!",
        "This betrayal... unforgivable!",
        "The pain... it's unbearable!",
        "Shakespeare wept writing this!",
        "I shall write a sonnet of my sorrow!",
        "Why hath thou forsaken me?!",
        "A thousand roses... wilted!",
        "My tears could fill an ocean!",
        "Even Bollywood can't script this tragedy!",
        "I'm not crying, YOU'RE crying!",
        "Fine. I'll go be dramatic elsewhere..."
    ]
};

answers_yes = {
    "english": "Yes",
    "turkish": "Evet",
    "emotional_damage": "...fine 💔"
}

const yesEscalationTexts = {
    english: [
        "Yes",
        "Accept destiny",
        "Resistance is futile",
        "Click me. You know you want to."
    ],
    turkish: [
        "Evet",
        "Kaderi kabul et",
        "Direnmek boşuna",
        "Tıkla. İstediğini biliyorsun."
    ],
    emotional_damage: [
        "...fine 💔",
        "Accept your fate 💀",
        "Even my ghost says yes 👻",
        "JUST. CLICK. ME. 😭"
    ]
};

const escalationClasses = ['vibrate', 'mega-glow', 'ultra-glow', 'final-form'];

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

let fontSize = 14;

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "public/images/no.gif";
        refreshBanner();
    }
    clicks++;

    // Shake the No button
    no_button.classList.remove('shake');
    void no_button.offsetWidth; // force reflow to restart animation
    no_button.classList.add('shake');

    // Grow the Yes button (size + font-size) and add pulsing glow
    const sizes = [40, 50, 30, 35, 45];
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random];
    fontSize += 2;
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    yes_button.style.fontSize = `${fontSize}px`;
    yes_button.classList.add('glow');

    /* ── Yes button escalation: gets TOO powerful ── */
    const removeAllEscalation = () => {
        escalationClasses.forEach(c => yes_button.classList.remove(c));
    };

    if (clicks >= 4 && clicks < 6) {
        /* Phase 1: Slight vibration — something stirs */
        yes_button.classList.add('vibrate');
    } else if (clicks >= 6 && clicks < 8) {
        /* Phase 2: Ridiculous glow — the button is charging up */
        removeAllEscalation();
        yes_button.classList.remove('glow');
        yes_button.classList.add('mega-glow');
    } else if (clicks >= 8 && clicks < 10) {
        /* Phase 3: Ultra glow — "Accept destiny" */
        removeAllEscalation();
        yes_button.classList.remove('glow');
        yes_button.classList.add('ultra-glow');
        yes_button.innerHTML = yesEscalationTexts[language][1];
    } else if (clicks >= 10 && clicks < 12) {
        /* Phase 4: "Resistance is futile" — No button begins to cower */
        removeAllEscalation();
        yes_button.classList.remove('glow');
        yes_button.classList.add('ultra-glow');
        yes_button.innerHTML = yesEscalationTexts[language][2];
        no_button.style.fontSize = '10px';
        no_button.style.padding = '0 10px';
        no_button.style.opacity = '0.55';
    } else if (clicks >= 12) {
        /* Phase 5: FINAL FORM — Yes fills 80% of card, No is microscopic */
        removeAllEscalation();
        yes_button.classList.remove('glow');
        yes_button.classList.add('final-form');
        yes_button.innerHTML = yesEscalationTexts[language][3];
        yes_button.style.width = '80%';
        yes_button.style.height = '80px';
        yes_button.style.fontSize = '22px';
        /* No button: microscopic and fading */
        no_button.style.fontSize = '5px';
        no_button.style.padding = '1px 4px';
        no_button.style.opacity = '0.2';
        no_button.style.height = '16px';
    }

    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        /* ── Bee plea: show bee.gif as a last-ditch effort ── */
        const banner = document.getElementById('banner');
        const questionHeading = document.getElementById('question-heading');
        const originalHeading = questionHeading.textContent;

        banner.src = "./bee.gif";
        refreshBanner();

        const beePleaTexts = {
            english: "Will you at least BEE my valentine? 🐝",
            turkish: "En azından arım olur musun? 🐝",
            emotional_damage: "Even the BEES feel my pain! 🐝💔"
        };
        questionHeading.textContent = beePleaTexts[language];
        questionHeading.classList.add("bee-plea");

        /* Hide buttons during bee plea */
        const buttonsDiv = document.getElementsByClassName('buttons')[0];
        buttonsDiv.style.opacity = '0';
        buttonsDiv.style.pointerEvents = 'none';

        /* After 3 seconds, show alert and reset everything */
        setTimeout(() => {
            alert(answers_no[language][i - 1]);

            /* ── Full reset ── */
            questionHeading.classList.remove("bee-plea");
            questionHeading.textContent = originalHeading;
            banner.src = "public/images/mid.gif";
            refreshBanner();
            buttonsDiv.style.opacity = '1';
            buttonsDiv.style.pointerEvents = '';

            i = 1;
            clicks = 0;
            no_button.innerHTML = answers_no[language][0];
            yes_button.innerHTML = answers_yes[language];
            yes_button.style.height = "50px";
            yes_button.style.width = "50px";
            yes_button.style.fontSize = "14px";
            yes_button.classList.remove('glow');
            /* Reset escalation classes */
            removeAllEscalation();
            yes_button.style.textTransform = '';
            yes_button.style.letterSpacing = '';
            yes_button.style.fontWeight = '';
            /* Reset No button styles */
            no_button.style.fontSize = '';
            no_button.style.padding = '';
            no_button.style.opacity = '';
            no_button.style.height = '';
            no_button.style.position = '';
            no_button.style.left = '';
            no_button.style.top = '';
            no_button.style.zIndex = '';
            no_button.classList.remove('dodging');
            size = 50;
            fontSize = 14;
        }, 3000);
    }
});

/* ── No button dodges cursor after 3+ clicks ── */
const dodgeTooltips = {
    english: [
        "Why are you still trying? 😏",
        "Too slow!",
        "You can't catch me!",
        "Just click Yes already!",
        "Nice try 😂",
        "The Yes button is lonely!",
        "I'll keep running forever!",
        "Give up yet?",
        "You're only hurting yourself 🥲",
    ],
    turkish: [
        "Neden hâlâ deniyorsun? 😏",
        "Çok yavaşsın!",
        "Beni yakalayamazsın!",
        "Sadece Evet'e tıkla!",
        "Güzel deneme 😂",
        "Evet butonu yalnız!",
        "Sonsuza kadar kaçarım!",
        "Vazgeçtin mi?",
        "Sadece kendine zarar veriyorsun 🥲",
    ]
};

const handleNoDodge = (e) => {
    if (clicks < 3) return;

    if (e.type === "touchstart") e.preventDefault();

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bw = no_button.offsetWidth;
    const bh = no_button.offsetHeight;
    const pad = 24;

    // Keep the button away from its current position (min 100px jump)
    let randomX, randomY;
    const currentRect = no_button.getBoundingClientRect();
    do {
        randomX = pad + Math.random() * (vw - bw - pad * 2);
        randomY = pad + Math.random() * (vh - bh - pad * 2);
    } while (
        Math.abs(randomX - currentRect.left) < 100 &&
        Math.abs(randomY - currentRect.top) < 100
    );

    no_button.style.position = "fixed";
    no_button.style.left = `${randomX}px`;
    no_button.style.top = `${randomY}px`;
    no_button.style.zIndex = "9999";

    // Restart pop animation
    no_button.classList.remove("dodging");
    void no_button.offsetWidth;
    no_button.classList.add("dodging");

    // Random tooltip
    const tips = dodgeTooltips[language];
    no_button.title = tips[Math.floor(Math.random() * tips.length)];
};

no_button.addEventListener("mouseenter", handleNoDodge);
no_button.addEventListener("touchstart", handleNoDodge, { passive: false });

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "public/images/yes.gif";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";

    // Play the celebration song
    const audio = new Audio("./au.mp3");
    audio.loop = true;
    audio.volume = 0.7;
    audio.play().catch((err) => console.warn("Audio autoplay blocked:", err));
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    const questionHeading = document.getElementById("question-heading");
    const successMessage = document.getElementById("success-message");
    const distanceMessage = document.getElementById("distance-message");

    // Remove dramatic class by default
    questionHeading.classList.remove("dramatic");

    if (language === "emotional_damage") {
        // ── Emotional Damage mode ──
        questionHeading.textContent = "Why do you wound me so?";
        questionHeading.classList.add("dramatic");
        successMessage.textContent = "You... you actually said yes?! *sobs dramatically*";
        distanceMessage.textContent = "My heart has been through a JOURNEY today, Zehra.";
    } else if (language === "turkish") {
        questionHeading.textContent = "Zehra, sevgilim olur musun?";
        successMessage.textContent = "Yepppie, yakında görüşürüz :3";
        distanceMessage.textContent = "Uzaktasın ama hep kalbimdesin, Zehra.";
    } else {
        questionHeading.textContent = "Zehra, will you be my valentine?";
        successMessage.textContent = "Yepppie, see you sooonnn :3";
        distanceMessage.textContent = "You're far away, but you're always close to my heart, Zehra.";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    if (clicks === 0) {
        no_button.innerHTML = answers_no[language][0];
    } else {
        const clampedIndex = Math.min(clicks, answers_no[language].length - 2);
        no_button.innerHTML = answers_no[language][clampedIndex];
    }
}
