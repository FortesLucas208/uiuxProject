const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);
revealElements.forEach((el) => observer.observe(el));
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});
const coursesSection = document.getElementById("cursos");
const coursesCarousel = document.getElementById("coursesCarousel");
const prevCourse = document.getElementById("prevCourse");
const nextCourse = document.getElementById("nextCourse");
const courseCards = document.querySelectorAll(".course-card");
function highlightFirstCourse() {
  if (!courseCards.length) return;
  courseCards.forEach((card) => card.classList.remove("spotlight"));
  courseCards[0].classList.add("spotlight");
  setTimeout(() => {
    courseCards[0].classList.remove("spotlight");
  }, 2600);
}
function cinematicGoToCourses(e) {
  const target = e.currentTarget.getAttribute("href");
  if (target !== "#cursos") return;
  e.preventDefault();
  if (!coursesSection) return;
  document.body.classList.add("transitioning");
  setTimeout(() => {
    coursesSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 180);
  setTimeout(() => {
    document.body.classList.remove("transitioning");
    if (coursesCarousel) {
      coursesCarousel.classList.add("carousel-entry");
      setTimeout(
        () => coursesCarousel.classList.remove("carousel-entry"),
        1800
      );
    }
    highlightFirstCourse();
  }, 950);
}
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = this.getAttribute("href");
    if (target === "#cursos") {
      cinematicGoToCourses(e);
      return;
    }
    const section = document.querySelector(target);
    if (section) {
      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
if (coursesCarousel && prevCourse && nextCourse) {
  prevCourse.addEventListener("click", () => {
    coursesCarousel.scrollBy({ left: -340, behavior: "smooth" });
  });
  nextCourse.addEventListener("click", () => {
    coursesCarousel.scrollBy({ left: 340, behavior: "smooth" });
  });
  let autoScroll = setInterval(() => {
    const maxScrollLeft =
      coursesCarousel.scrollWidth - coursesCarousel.clientWidth;
    if (coursesCarousel.scrollLeft >= maxScrollLeft - 5) {
      coursesCarousel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      coursesCarousel.scrollBy({ left: 344, behavior: "smooth" });
    }
  }, 3500);
  coursesCarousel.addEventListener("mouseenter", () =>
    clearInterval(autoScroll)
  );
  coursesCarousel.addEventListener("mouseleave", () => {
    autoScroll = setInterval(() => {
      const maxScrollLeft =
        coursesCarousel.scrollWidth - coursesCarousel.clientWidth;
      if (coursesCarousel.scrollLeft >= maxScrollLeft - 5) {
        coursesCarousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        coursesCarousel.scrollBy({ left: 344, behavior: "smooth" });
      }
    }, 3500);
  });
} 
const liveNumber = document.getElementById("liveNumber");

let current = 127;

setInterval(() => {
  const variation = Math.floor(Math.random() * 5);

  if (Math.random() > 0.5) {
    current += variation;
  } else {
    current -= variation;
  }

  if (current < 90) current = 90;
  if (current > 220) current = 220;

  if (liveNumber) {
    liveNumber.textContent = current;
  }
}, 2500);

//POPUP//

document.addEventListener("DOMContentLoaded", () => {

  const popup = document.getElementById("salePopup");
  const buyerName = document.getElementById("buyerName");
  const courseName = document.getElementById("courseName");
  const closePopup = document.getElementById("closePopup");

  let notificationsDisabled = false;

  const names = [
    "Lucas",
    "Maria",
    "Pedro",
    "Fernanda",
    "Carlos",
    "Juliana",
    "Rafael",
    "Ana"
  ];

  const courses = [
    "Programação Web",
    "Python",
    "Marketing",
    "Vendas Online",
    "JavaScript"
  ];

  function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function showPopup() {

    if (notificationsDisabled) return;

    buyerName.textContent = randomItem(names);
    courseName.textContent = randomItem(courses);

    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 4500);
  }

  function popupLoop() {

    const delay = Math.random() * 5000 + 4000;

    setTimeout(() => {

      showPopup();

      popupLoop();

    }, delay);
  }

  popupLoop();

  // clicar no popup → ir para cursos
  popup.addEventListener("click", (e) => {

    if (e.target.id === "closePopup") return;

    const cursos = document.getElementById("cursos");

    if (cursos) {
      cursos.scrollIntoView({
        behavior: "smooth"
      });
    }

  });

  // fechar + desativar notificações
  closePopup.addEventListener("click", (e) => {

    e.stopPropagation();

    popup.classList.remove("show");

    notificationsDisabled = true;

  });

});
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("change", () => {

  document.body.classList.toggle("light-mode");

});