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
          setTimeout(() => coursesCarousel.classList.remove("carousel-entry"), 1800);
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
        const maxScrollLeft = coursesCarousel.scrollWidth - coursesCarousel.clientWidth;

        if (coursesCarousel.scrollLeft >= maxScrollLeft - 5) {
          coursesCarousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          coursesCarousel.scrollBy({ left: 344, behavior: "smooth" });
        }
      }, 3500);

      coursesCarousel.addEventListener("mouseenter", () => clearInterval(autoScroll));

      coursesCarousel.addEventListener("mouseleave", () => {
        autoScroll = setInterval(() => {
          const maxScrollLeft = coursesCarousel.scrollWidth - coursesCarousel.clientWidth;

          if (coursesCarousel.scrollLeft >= maxScrollLeft - 5) {
            coursesCarousel.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            coursesCarousel.scrollBy({ left: 344, behavior: "smooth" });
          }
        }, 3500);
      });
    }