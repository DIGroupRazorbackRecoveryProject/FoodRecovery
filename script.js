// js/script.js

$(document).ready(function() {
    // Theme Management: Check if a theme is stored in local storage and apply it
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    // Event listener for theme toggle button
    $('#theme-toggle').click(function() {
        const newTheme = $('body').hasClass('light-theme') ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Function to set the theme by enabling/disabling Bootstrap CSS files
    function setTheme(theme) {
      if (theme === 'light') {
        $('#bootstrap-light').prop('disabled', false);
        $('#bootstrap-dark').prop('disabled', true);
        $('body').removeClass('dark-theme').addClass('light-theme');
        $('.navbar').removeClass('navbar-dark bg-dark').addClass('navbar-light bg-light');
        $('#theme-toggle').text('Switch to Dark Theme');
        // Add changes for footer
        $('.footer').removeClass('bg-dark text-light').addClass('bg-light text-dark');
        // Changes for main content section
        //$('#main-content').removeClass('bg-dark text-light').addClass('bg-light text-dark'); 
    } else {
        $('#bootstrap-light').prop('disabled', true);
        $('#bootstrap-dark').prop('disabled', false);
        $('body').removeClass('light-theme').addClass('dark-theme');
        $('.navbar').removeClass('navbar-light bg-light').addClass('navbar-dark bg-dark');
        $('#theme-toggle').text('Switch to Light Theme');
        // Add changes for footer
        $('.footer').removeClass('bg-light text-dark').addClass('bg-dark text-light');
        // Changes for main content section
        //$('#main-content').removeClass('bg-light text-dark').addClass('bg-dark text-light');
    }
        localStorage.setItem('theme', theme);
    }

    // Register service worker for the PWA 

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('./service-worker.js')
            .then(function (registration) {
              console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(function (error) {
              console.log('Service Worker registration failed:', error);
            });
        });
      }
});
