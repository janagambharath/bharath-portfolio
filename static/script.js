
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).classList.add('active');
  });
});

const words = ["AI Developer", "Python Programmer", "LLM Engineer"];
let i = 0, j = 0, isDeleting = false;
const speed = 100;
const element = document.querySelector('.typed-text');

function type() {
  if (!element) return;
  let word = words[i];
  if (isDeleting) {
    element.textContent = word.substring(0, j--);
  } else {
    element.textContent = word.substring(0, j++);
  }
  if (!isDeleting && j === word.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? speed / 2 : speed);
  }
}

type();
