// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Gallery Modal Functions
function openModal(element) {
  const modal = document.getElementById("imageModal")
  const modalImg = document.getElementById("modalImage")
  const img = element.querySelector("img")

  modal.style.display = "block"
  modalImg.src = img.src
  modalImg.alt = img.alt
}

function closeModal() {
  const modal = document.getElementById("imageModal")
  modal.style.display = "none"
}

// Close modal when clicking outside the image
window.addEventListener("click", (event) => {
  const modal = document.getElementById("imageModal")
  if (event.target === modal) {
    closeModal()
  }
})

// Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Simple validation
  if (!data.nombre || !data.email || !data.mensaje || !data.servicio) {
    alert("Por favor, completa todos los campos requeridos.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Por favor, ingresa un email válido.")
    return
  }

  // Simulate form submission
  const submitButton = document.querySelector(".submit-button")
  const originalText = submitButton.textContent

  submitButton.textContent = "Enviando..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
    this.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

// Add fade-in class to sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.classList.add("fade-in")
  })

  // Initial check
  animateOnScroll()
})

// Listen for scroll events
window.addEventListener("scroll", animateOnScroll)

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add active class styles
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
`
document.head.appendChild(style)

// Keyboard navigation for accessibility
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()

    // Close mobile menu if open
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }
})

// Lazy loading for images (simple implementation)
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })
})
