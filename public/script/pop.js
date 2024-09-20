const viewAdminProfile = document.getElementById('viewAdminProfile');
const adminProfilePopup = document.getElementById('adminProfilePopup');
const closeAdminProfile = document.getElementById('closeAdminProfile');
const closeAdminForm = document.querySelector('.close');



// Open admin profile pop-up
viewAdminProfile.addEventListener('click', function() {
  adminProfilePopup.style.display = 'flex';
});

// Close admin profile pop-up
closeAdminProfile.addEventListener('click', function() {
  adminProfilePopup.style.display = 'none';
});

document.querySelector('.create-admin').addEventListener('click', function(){
  document.querySelector('.form-overlay').style.display = 'flex'
})

closeAdminForm.addEventListener('click', function(){
  document.querySelector('.form-overlay').style.display = 'none'
});

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});