document.addEventListener('DOMContentLoaded', function() {
    const viewActivityButtons = document.querySelectorAll('.view-activity-button');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const userActivityPopup = document.getElementById('userActivityPopup');
    const closePopup = document.getElementById('closePopup');
    const openNotificationForm = document.getElementById('openNotificationForm');
    const notificationFormPopup = document.getElementById('notificationFormPopup');
    const closeNotificationForm = document.getElementById('closeNotificationForm');
    const viewAdminProfile = document.getElementById('viewAdminProfile');
    const adminProfilePopup = document.getElementById('adminProfilePopup');
    const closeAdminProfile = document.getElementById('closeAdminProfile');

    // Show pop-up when "View Activity" button is clicked
    viewActivityButtons.forEach(button => {
      button.addEventListener('click', function() {
        popupOverlay.style.display = 'flex';
      });
    });

    // Hide pop-up when close button is clicked
    closeBtn.addEventListener('click', function() {
      popupOverlay.style.display = 'none';
    });

    // Hide pop-up when clicking outside the content area
    popupOverlay.addEventListener('click', function(event) {
      if (event.target === popupOverlay) {
        popupOverlay.style.display = 'none';
      }
    });

    // Show the user details pop-up
    window.showUserDetailsPopup = function(user) {
      // Set user details
      document.getElementById('userName').textContent = user.name;
      document.getElementById('userEmail').textContent = user.email;
      document.getElementById('userStatus').textContent = user.status;

      // Show the user details pop-up
      userActivityPopup.style.display = 'flex';
    }

    // Close the user details pop-up
    closePopup.addEventListener('click', function() {
      userActivityPopup.style.display = 'none';
    });

    // Open notification form pop-up
    openNotificationForm.addEventListener('click', function() {
      notificationFormPopup.style.display = 'flex';
    });

    // Close notification form pop-up
    closeNotificationForm.addEventListener('click', function() {
      notificationFormPopup.style.display = 'none';
    });

    // Handle sending a notification
    document.getElementById('notificationForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Logic to send a notification
      alert('Notification sent: ' + document.getElementById('notificationMessage').value);
      // Close the notification form pop-up
      notificationFormPopup.style.display = 'none';
    });

    // Handle making a user an admin
    document.getElementById('makeAdmin').addEventListener('click', function() {
      // Logic to make the user an admin
      alert(document.getElementById('userName').textContent + ' has been promoted to admin.');
    });

    // Open admin profile pop-up
    viewAdminProfile.addEventListener('click', function() {
      adminProfilePopup.style.display = 'flex';
    });

    // Close admin profile pop-up
    closeAdminProfile.addEventListener('click', function() {
      adminProfilePopup.style.display = 'none';
    });

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  });