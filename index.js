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

/* ===================================== */
/* === CUSTOM CURSOR ANIMATION ========= */
/* ===================================== */

/**
 * Professional Custom Cursor System
 * Features:
 * - Smooth dot cursor with instant tracking
 * - Lagging ring with lerp interpolation
 * - Subtle trail particles with fade effect
 * - Hover interactions on interactive elements
 * - Performance optimized with requestAnimationFrame
 * - Fully customizable via CSS variables
 */

class CustomCursor {
  constructor() {
    // === CONFIGURATION ===
    this.config = {
      lerpAmount: 0.15,           // Ring lag amount (0-1, lower = more lag)
      trailInterval: 15,          // ms between trail particles
      maxTrailElements: 40,       // Max particles to maintain
      isMobile: this.detectMobile(),
    };

    // Don't initialize on mobile/touch devices
    if (this.config.isMobile) return;

    // === DOM ELEMENTS ===
    this.cursorDot = document.getElementById("cursorDot");
    this.cursorRing = document.getElementById("cursorRing");

    // === POSITION TRACKING ===
    this.mouseX = 0;
    this.mouseY = 0;
    this.ringX = 0;
    this.ringY = 0;

    // === TRAIL MANAGEMENT ===
    this.trailElements = [];
    this.lastTrailTime = 0;

    // === EVENT LISTENERS ===
    this.setupEventListeners();

    // === START ANIMATION LOOP ===
    this.animate();
  }

  /**
   * Detect if user is on mobile/touch device
   */
  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Track mouse movement
    document.addEventListener("mousemove", (e) => this.handleMouseMove(e));

    // Track hover state on interactive elements
    document.addEventListener("mouseenter", (e) => this.handleHover(e), true);
    document.addEventListener("mouseleave", (e) => this.handleHoverOut(e), true);

    // Disable cursor when leaving window
    document.addEventListener("mouseleave", () => {
      this.cursorDot.style.opacity = "0";
      this.cursorRing.style.opacity = "0";
    });

    // Re-enable cursor when entering window
    document.addEventListener("mouseenter", () => {
      this.cursorDot.style.opacity = "1";
      this.cursorRing.style.opacity = "1";
    });
  }

  /**
   * Handle mouse movement - update cursor position
   */
  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Dot follows instantly
    this.cursorDot.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px) translate(-50%, -50%)`;

    // Create trail particles
    this.createTrail(e.clientX, e.clientY);
  }

  /**
   * Create trail particles at cursor path
   */
  createTrail(x, y) {
    const now = Date.now();

    // Only create trail every N milliseconds
    if (now - this.lastTrailTime < this.config.trailInterval) return;

    this.lastTrailTime = now;

    // Create trail particle
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.left = x + "px";
    trail.style.top = y + "px";

    // Random slight offset for organic feel
    const offsetX = (Math.random() - 0.5) * 8;
    const offsetY = (Math.random() - 0.5) * 8;
    trail.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${0.6 + Math.random() * 0.6})`;

    document.body.appendChild(trail);
    this.trailElements.push(trail);

    // Clean up old trail elements to prevent memory bloat
    if (this.trailElements.length > this.config.maxTrailElements) {
      const oldTrail = this.trailElements.shift();
      oldTrail.remove();
    }

    // Remove trail element after animation completes
    setTimeout(() => {
      trail.remove();
    }, 800);
  }

  /**
   * Handle hover over interactive elements
   */
  handleHover(e) {
    // Check if hovering over interactive element
    if (this.isInteractiveElement(e.target)) {
      this.cursorDot.classList.add("cursor-hover");
      this.cursorRing.classList.add("cursor-hover");
    }
  }

  /**
   * Handle hover out of interactive elements
   */
  handleHoverOut(e) {
    if (this.isInteractiveElement(e.target)) {
      this.cursorDot.classList.remove("cursor-hover");
      this.cursorRing.classList.remove("cursor-hover");
    }
  }

  /**
   * Check if element is interactive (link, button, input, etc.)
   */
  isInteractiveElement(element) {
    const interactiveTags = [
      "A",
      "BUTTON",
      "INPUT",
      "SELECT",
      "TEXTAREA",
      "LABEL",
    ];
    const interactiveClasses = [
      "btn",
      "services-box",
      "portfolio-carousel",
      "resume-btn",
      "bx-menu",
    ];

    // Check tag name
    if (interactiveTags.includes(element.tagName)) return true;

    // Check class list
    for (let className of interactiveClasses) {
      if (element.classList.contains(className)) return true;
    }

    // Check parent elements (useful for nested elements)
    if (element.parentElement) {
      return this.isInteractiveElement(element.parentElement);
    }

    return false;
  }

  /**
   * Linear interpolation (lerp) for smooth ring following
   */
  lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  /**
   * Main animation loop using requestAnimationFrame
   * Runs at ~60fps for smooth motion
   */
  animate() {
    // Smooth ring movement using lerp
    this.ringX = this.lerp(this.ringX, this.mouseX, this.config.lerpAmount);
    this.ringY = this.lerp(this.ringY, this.mouseY, this.config.lerpAmount);

    // Apply ring position
    this.cursorRing.style.transform = `translate(${this.ringX}px, ${this.ringY}px) translate(-50%, -50%)`;

    // Continue animation loop
    requestAnimationFrame(() => this.animate());
  }
}

/**
 * Initialize cursor when DOM is ready
 * Check for mobile before initializing
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new CustomCursor();
  });
} else {
  new CustomCursor();
}

