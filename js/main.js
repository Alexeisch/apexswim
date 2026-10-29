// ===================== НАСТРОЙКИ =====================
// Адрес берётся из блока "Адрес" в index.html (элемент с классом js-address).
// По нему автоматически строятся ссылка на Яндекс.Карты и сама карта.
// Если хотите указать точную ссылку вручную — вставьте её сюда вместо пустой строки,
// например: "https://yandex.ru/maps/-/CDqZ4X~K"
const YANDEX_MAPS_LINK = "";

const address = document.querySelector(".js-address").textContent.trim();
const query = encodeURIComponent(address);

document.querySelectorAll(".js-yandex-link").forEach((link) => {
  link.href = YANDEX_MAPS_LINK || `https://yandex.ru/maps/?text=${query}`;
});

document.querySelector(".js-yandex-map").src =
  `https://yandex.ru/map-widget/v1/?text=${query}&z=16`;

// ===================== ШАПКА ПРИ ПРОКРУТКЕ =====================
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("header--scrolled", window.scrollY > 50);
window.addEventListener("scroll", onScroll);
onScroll();

// ===================== МОБИЛЬНОЕ МЕНЮ =====================
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("burger--open");
  nav.classList.toggle("nav--open");
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    burger.classList.remove("burger--open");
    nav.classList.remove("nav--open");
  })
);

// ===================== ПОЯВЛЕНИЕ БЛОКОВ =====================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===================== ГАЛЕРЕЯ =====================
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

document.querySelectorAll(".gallery__item").forEach((item) =>
  item.addEventListener("click", (e) => {
    e.preventDefault();
    lightboxImg.src = item.href;
    lightbox.classList.add("lightbox--open");
  })
);

const closeLightbox = () => lightbox.classList.remove("lightbox--open");
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ===================== ГОД В ПОДВАЛЕ =====================
document.getElementById("year").textContent = new Date().getFullYear();
