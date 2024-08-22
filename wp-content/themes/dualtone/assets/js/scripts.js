/**
 * DualTone scripts
 * @author David Ballarin Prunera under GPL v2 license
 * @description JavaScript functions to implement the DualTone behavior
 */
document.addEventListener('DOMContentLoaded', function() {
    activateGoBackLinks('.go-back-link');
    deactivateHashLinks();
    findEmptyElements('.wp-block-template-part');
    findEmptyElements('.wp-block-post-navigation-link');
    watchSearchInputFocus('wp-block-search__input', 'wp-block-search__focused');
    addAriaLabelToNewTabLinks();
});


/**
 * Find empty elements
* @param {string} elementSelector selector to identify elements to empty
 */
function findEmptyElements(elementSelector) {
    var elements = document.querySelectorAll(elementSelector);
    elements.forEach(function(element) {
        if (element.innerHTML.trim() === '') {
            element.classList.add('empty');
        }
    });
}


/**
 * Activate go back links for elements with a class
 * @param {string} elementSelector selector to identify link
 */
function activateGoBackLinks(elementSelector) {
    var goBackLinks = document.querySelectorAll(elementSelector);
    goBackLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            goBack();
        });
    });
}


/**
 * Function to go back in history or close a tab
 */
function goBack() {
    if (window.history.length > 1) {
        // Si hay historial, ir atrás en la historia
        window.history.back();
    } else {
        // Si no hay historial, cerrar la pestaña
        window.close();
    }
}


/**
 * Find inactive links and set theme up
 */
function deactivateHashLinks() {
    // Get all links on the page
    var links = document.querySelectorAll('a[href="##"]');
  
    // Loop through each link
    links.forEach(function(link) {
        // Prevent default click event
        link.addEventListener('click', function(event) {
            event.preventDefault();
        });

        // Add the class 'inactive' to the link
        link.classList.add('inactive');
    });
}


/**
 * Adds and removes class to form when input receives or loses focus
 * @param {string} inputClass class of the input element
 * @param {string} formClassToAdd class to add / remove to the form
 */
function watchSearchInputFocus(inputClass, formClassToAdd) {

    // Select all input elements with the specified class
    const inputs = document.querySelectorAll(`input.${inputClass}`);

    inputs.forEach(input => {
        // Add focus event listener to each input
        input.addEventListener('focus', function() {
            // Find the parent form element
            const form = input.closest('form');
            if (form) {
                // Add the specified class to the form
                form.classList.add(formClassToAdd);
            }
        });

        // Add blur event listener to remove the class when focus is lost
        input.addEventListener('blur', function() {
            const form = input.closest('form');
            if (form) {
                form.classList.remove(formClassToAdd);
            }
        });
    });
}

/**
 * Adds aria-label tag to links that open in new tab
 */
function addAriaLabelToNewTabLinks() {
    // Select all links on the page
    const links = document.querySelectorAll('a');

    // Loop through each link
    links.forEach(link => {
        // Check if the link has a target attribute that is either _blank or blank
        if (link.target === '_blank' || link.target === 'blank') {
            // Add the aria-label attribute with the specified text
            link.setAttribute('aria-label', 'This link opens in a new tab');
        }
    });
}