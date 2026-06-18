// Mobile nav toggle
document.addEventListener('click', function (e) {
  if (e.target.closest('.menu-btn')) {
    var ul = document.querySelector('nav.main ul');
    if (ul) ul.classList.toggle('open');
  }
});
