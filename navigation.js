// navigation.js

// Function to handle URL hash parameters
function handleUrlNavigation() {
    const hash = window.location.hash.substring(1); // Remove the # symbol
    const params = new URLSearchParams(hash);
    const page = params.get('page');
    
    if (page) {
        loadContent(page);
    }
}

// Function to dynamically load content based on the selected section
function loadContent(section) {
    let page = '';

    // Update URL hash without triggering reload
    if (section !== 'cancelhostrequest') {
        window.history.pushState(null, null, `#page=${section}`);
    }

    switch (section) {
        case 'AR':
            page = '/FoodRecovery/templates/AR.html';
            break;
        case 'VR':
            page = '/FoodRecovery/templates/VR.html';
            break;
        case 'apiCall':
            page = '/FoodRecovery/templates/apiCall.html';
            break;
        case 'apiCallWebSocket':
            page = '/FoodRecovery/templates/apiCallWebSocket.html';
            break;
        case 'about':
            page = '/FoodRecovery/templates/about.html';
            break;
        case 'featuredContent':
            page = '/templates/featuredContent.html';
            break;
        case 'hero_centered':
            page = '/FoodRecovery/templates/hero_centered.html';
            break;
        case 'iconList':
            page = '/FoodRecovery/templates/iconList.html';
            break;
        case 'modals':
            page = '/FoodRecovery/templates/modals.html';
            break;
        case 'notifications':
            page = '/FoodRecovery/templates/notifications.html';
            break;
        case 'llama':
            page = '/FoodRecovery/templates/llama.html';
            break;
        case 'dropdownPages':
            page = '/FoodRecovery/templates/dropdownPages.html';
            break;
        case 'styles':
            page = '/FoodRecovery/templates/styles.html';
            break;
        case 'home':
            page = '/FoodRecovery/templates/home.html';
            break;
        case 'requestsubmitted':
            page = '/FoodRecovery/templates/requestsubmitted.html';
            break;
        case 'hostrequest':
            page = '/FoodRecovery/templates/hostrequest.html';
            break;
        case 'volunteerlogin':
            page = '/FoodRecovery/templates/volunteerlogin.html';
            break;
        case 'volunteerdashboard': 
            page = '/FoodRecovery/templates/volunteerdashboard.html';
            break;
        case 'pickuprequestdetails':
            page = '/FoodRecovery/templates/pickuprequestdetails.html';
            break;
        case 'acceptedrequest':
            page = '/FoodRecovery/templates/acceptedrequest.html';
            break;
        case 'confirmfoodpickup':
            page = '/FoodRecovery/templates/confirmfoodpickup.html';
            break;
        case 'pickupcompleted':
            page = '/FoodRecovery/templates/pickupcompleted.html';
            break;
        case 'login':
            page = '/FoodRecovery/templates/volunteerlogin.html';
            break;    
        case 'support':
            page = '/FoodRecovery/templates/support.html';
            break;
        case 'cancelhostrequest':
            $('#main-content').load('templates/cancelhostrequest.html', function() {
                console.log('Cancel host request page loaded');
            });
            return; // Exit function to avoid updating the URL hash
        case 'profilesettings':
            page = '/FoodRecovery/templates/profilesettings.html';
            break;
        case 'myaccount':
            page = '/FoodRecovery/templates/myaccount.html';
            break;
        case 'volunteersignup':
            page = '/FoodRecovery/templates/volunteersignup.html';
            break;
        case 'viewrequestdetails':
            page = '/FoodRecovery/templates/viewrequestdetails.html';
            break;
        default:
            page = '/FoodRecovery/templates/home.html';
    }

    $('#main-content').load(page, function(response, status, xhr) {
        if (status === "error" || (status === "success" && !response.trim())) {
            console.error("Error loading content: ", xhr.status, xhr.statusText);
            $('#main-content').html(`<div class="alert alert-danger" role="alert">
                                        Error loading content. Please try again later.
                                    </div>`);
        } else if (section === 'AR' || section === 'VR') {
            window.location.href = page;
        }
        $('.navbar-collapse').removeClass('show');
    });
}

$(document).ready(function() {
    // Handle direct URL navigation
    handleUrlNavigation();

    // Listen for hash changes
    window.addEventListener('hashchange', handleUrlNavigation);

    // Event listeners for navigation links
    $('#home-link').click(function(event) {
        event.preventDefault();
        loadContent('home');
    });

    $('#about-link').click(function(event) {
        event.preventDefault();
        loadContent('about');
    });

    $('#volunteer-dashboard-link').click(function(event) {
        event.preventDefault();
        loadContent('volunteerdashboard');
    });

    $('#accepted-request-link').click(function(event) {
        event.preventDefault();
        loadContent('acceptedrequest');
    });

    $('#myaccount-link').click(function(event) {
        event.preventDefault();
        loadContent('myaccount');
    });

    $('#support-link').click(function(event) {
        event.preventDefault();
        loadContent('support');
    });

    $('#logout-link').click(function(event) {
        event.preventDefault();
        localStorage.setItem('loggedIn', false);
        sessionStorage.removeItem('loggedInUser');
        loadContent('login');
    });

    $('#myprofile-link').click(function(event) {
        event.preventDefault();
        loadContent('profilesettings');
    });

    $('#app-name-link').click(function(event) {
        event.preventDefault(); 
        loadContent('home');
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.navbar').length && $('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').trigger('click');
        }
    });

    if (!localStorage.getItem('firstVisit')) {
        localStorage.setItem('firstVisit', true);
        loadContent('login');
    } else {
        if (localStorage.getItem('loggedIn') === 'true') {
            loadContent('home');
        } else {
            loadContent('login');
        }
    }
});

// ... other functions ...

function setupAboutPage() {
    $('#host-request-link, #volunteer-signup-link').click(function(event) {
        event.preventDefault();
        const page = $(this).attr('id') === 'host-request-link' ? 'hostrequest' : 'volunteersignup';
        loadContent(page);
    });
}