document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav a");
  const logoLinks = document.querySelector(".logo");
  const sections = document.querySelectorAll("section");
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector("header nav");

  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  });

  const activePage = () => {
    const header = document.querySelector("header");
    const barsBox = document.querySelector(".bars-box");

    header.classList.remove("active");
    setTimeout(() => {
      header.classList.add("active");
    }, 1100);

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    barsBox.classList.remove("active");
    setTimeout(() => {
      barsBox.classList.add("active");
    }, 1100);

    sections.forEach((section) => {
      section.classList.remove("active");
    });

    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  };

  navLinks.forEach((link, idx) => {
    link.addEventListener("click", () => {
      if (!link.classList.contains("active")) {
        activePage();

        link.classList.add("active");
        setTimeout(() => {
          sections[idx].classList.add("active");
        }, 1100);
      }
    });
  });

  logoLinks.addEventListener("click", () => {
    if (!navLinks[0].classList.contains("active")) {
      activePage();

      navLinks[0].classList.add("active");
      setTimeout(() => {
        sections[0].classList.add("active");
      }, 1100);
    }
  });

  const resumeBtns = document.querySelectorAll(".resume-btn");

  resumeBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const resumeDetails = document.querySelectorAll(".resume-detail");
      resumeBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      btn.classList.add("active");

      resumeDetails.forEach((detail) => {
        detail.classList.remove("active");
      });
      resumeDetails[idx].classList.add("active");
    });
  });

  const arrowRight = document.querySelector(
    ".portfolio-box .navigation .arrow-right"
  );

  const arrowLeft = document.querySelector(
    ".portfolio-box .navigation .arrow-left"
  );

  let index = 0;
  const activePortfolio = () => {
    const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
    const portfolioDetails = document.querySelectorAll(".portfolio-detail");
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
    portfolioDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    portfolioDetails[index].classList.add("active");
  };

  arrowRight.addEventListener("click", () => {
    if (index < 4) {
      index++;
      arrowLeft.classList.remove("dsiabled");
    } else {
      index = 5;
      arrowRight.classList.add("dsiabled");
    }
    activePortfolio();
  });

  arrowLeft.addEventListener("click", () => {
    if (index > 1) {
      index--;
      arrowRight.classList.remove("dsiabled");
    } else {
      index = 0;
      arrowLeft.classList.add("dsiabled");
    }
    activePortfolio();
  });

  /* ===============================
     EMAILJS CONTACT FORM (UPDATED)
     =============================== */

  // ✅ Initialize EmailJS with your Public Key
  emailjs.init("ERImdSXC5X5cli_J_"); // <-- Replace with your EmailJS public key

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm(
        "service_6kuk5dz",   // <-- Replace with your EmailJS Service ID
        "template_h9o2b73",  // <-- Replace with your EmailJS Template ID
        this
      ).then(
        () => {
      Toastify({
  text: "✅ Message sent successfully!",
  duration: 3000,
  gravity: "top",
  position: "center",
  style: {
    background: "#2889a7ff",
    zIndex: 99999,
    position: "fixed",
    width: "300px",      // width
    height: "50px",      // height
    display: "flex",     // center text vertically
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px", // optional: rounded corners
    fontSize: "16px"     // optional: font size
  }
}).showToast();



          contactForm.reset();
        },
        (error) => {
         Toastify({
      text: "✅ Message not sent successfully!",
      duration: 3000,
      gravity: "top",
      position: "center",
      style: {
        background: "#a72828ff",
        zIndex: 99999,
        position: "fixed"
      }
    }).showToast();


          console.error("EmailJS Error:", error);
        }
      );
    });
  }
});
