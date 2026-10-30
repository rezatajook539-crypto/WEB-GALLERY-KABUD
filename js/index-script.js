/* ==========================================================
   KABUD | Vermeer Gallery
   Hero slider: the < and > buttons cycle through 4 paintings.
   Works on all three pages (en, nl, fa) by reading <html lang>.
   ========================================================== */

// ========== SETTINGS ==========
// Folder that holds the paintings, relative to the HTML file
const IMAGE_PATH = "../pic/";

// "en", "nl" or "fa" (taken from <html lang="...">)
const lang = document.documentElement.lang;

// In the Persian page the layout is right-to-left
const isRtl = document.documentElement.dir === "rtl";

// ========== DATA ==========
const slides = [
  {
    file: "View of Delft.jpg",
    alt: {
      en: "View of Delft by Johannes Vermeer, a town under a cloudy sky",
      nl: "Gezicht op Delft van Johannes Vermeer, een stad onder een bewolkte hemel",
      fa: "نمای دلفت اثر یوهانس ورمیر، شهری زیر آسمان ابری"
    }
  },
  {
    file: "Girl with a pearl.jpg",
    alt: {
      en: "Girl with a Pearl Earring by Vermeer",
      nl: "Meisje met de parel van Vermeer",
      fa: "دختر با گوشواره مروارید اثر ورمیر"
    }
  },
  {
    file: "The Milkmaid.jpg",
    alt: {
      en: "The Milkmaid by Vermeer, a woman pouring milk",
      nl: "Het melkmeisje van Vermeer, een vrouw die melk schenkt",
      fa: "دختر شیرفروش اثر ورمیر، زنی که شیر می‌ریزد"
    }
  },
  {
    file: "Reading a Letter.jpg",
    alt: {
      en: "Woman in Blue Reading a Letter by Vermeer",
      nl: "Brieflezende vrouw in het blauw van Vermeer",
      fa: "زن آبی‌پوش در حال خواندن نامه اثر ورمیر"
    }
  }
];

// ========== ELEMENTS ==========
const heroImg = document.querySelector(".hero-img");
const controlButtons = document.querySelectorAll(".hero-controls .circle-btn");

// In every page the first button is "previous" and the second is "next"
// (in Persian the first button sits on the right, so the order still works)
const prevBtn = controlButtons[0];
const nextBtn = controlButtons[1];

let current = 0;

// ========== FUNCTIONS ==========
function showSlide(index) {
  // Wrap around: after the last painting, go back to the first one
  current = (index + slides.length) % slides.length;
  const slide = slides[current];

  // Fade out, swap the picture, fade in
  heroImg.style.opacity = 0;

  setTimeout(function () {
    heroImg.src = IMAGE_PATH + slide.file;
    heroImg.alt = slide.alt[lang] || slide.alt.en;
    heroImg.style.opacity = 1;
  }, 250);
}

function nextSlide() {
  showSlide(current + 1);
}

function prevSlide() {
  showSlide(current - 1);
}

// Load all hero images in the background so switching feels instant
function preloadImages() {
  slides.forEach(function (slide) {
    const img = new Image();
    img.src = IMAGE_PATH + slide.file;
  });
}

// ========== START ==========
// Only run if the hero elements exist on the page
if (heroImg && prevBtn && nextBtn) {
  heroImg.style.transition = "opacity 0.25s ease";

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Keyboard: arrow keys follow the reading direction of the page
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      isRtl ? prevSlide() : nextSlide();
    }
    if (event.key === "ArrowLeft") {
      isRtl ? nextSlide() : prevSlide();
    }
  });

  preloadImages();
}