document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('.page-section');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // Remove active class from all links and sections
      links.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Add active class to clicked link and matching section
      link.classList.add('active');
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.classList.add('active');
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
