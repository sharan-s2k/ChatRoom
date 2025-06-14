// CS50 Search Application JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Get all page elements
    const searchPage = document.getElementById('search-page');
    const imagesPage = document.getElementById('images-page');
    const advancedPage = document.getElementById('advanced-page');
    
    // Get navigation elements
    const navSearch = document.getElementById('nav-search');
    const navImages = document.getElementById('nav-images');
    const navAdvanced = document.getElementById('nav-advanced');
    
    // Get all forms
    const searchForm = document.getElementById('search-form');
    const imagesForm = document.getElementById('images-form');
    const advancedForm = document.getElementById('advanced-form');
    
    // Current page state
    let currentPage = 'search';
    
    // Initialize the application
    init();
    
    function init() {
        // Set up navigation event listeners
        navSearch.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('search');
        });
        
        navImages.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('images');
        });
        
        navAdvanced.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('advanced');
        });
        
        // Set up form event listeners
        setupFormHandlers();
        
        // Set initial page state
        showPage('search');
        
        // Set up keyboard navigation
        setupKeyboardHandlers();
    }
    
    function showPage(page) {
        // Hide all pages
        searchPage.classList.remove('active');
        imagesPage.classList.remove('active');
        advancedPage.classList.remove('active');
        
        // Show the requested page
        switch(page) {
            case 'search':
                searchPage.classList.add('active');
                updateNavigation('search');
                focusSearchInput(searchPage);
                break;
            case 'images':
                imagesPage.classList.add('active');
                updateNavigation('images');
                focusSearchInput(imagesPage);
                break;
            case 'advanced':
                advancedPage.classList.add('active');
                updateNavigation('advanced');
                focusFirstAdvancedInput();
                break;
        }
        
        currentPage = page;
    }
    
    function updateNavigation(currentPage) {
        // Hide all nav links first
        navSearch.style.display = 'none';
        navImages.style.display = 'none';
        navAdvanced.style.display = 'none';
        
        // Show appropriate nav links based on current page
        switch(currentPage) {
            case 'search':
                // On main search page, show Images and Advanced Search
                navImages.style.display = 'inline-block';
                navAdvanced.style.display = 'inline-block';
                break;
            case 'images':
            case 'advanced':
                // On Images and Advanced pages, show Google Search
                navSearch.style.display = 'inline-block';
                break;
        }
    }
    
    function setupFormHandlers() {
        // Main search form handler
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="q"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
                return;
            }
            // Form will submit normally to Google
        });
        
        // Images search form handler
        imagesForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="q"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
                return;
            }
            // Form will submit normally to Google Images
        });
        
        // Advanced search form handler
        advancedForm.addEventListener('submit', function(e) {
            // Get all input values
            const allWords = this.querySelector('input[name="as_q"]').value.trim();
            const exactPhrase = this.querySelector('input[name="as_epq"]').value.trim();
            const anyWords = this.querySelector('input[name="as_oq"]').value.trim();
            const excludeWords = this.querySelector('input[name="as_eq"]').value.trim();
            
            // Check if at least one field is filled
            if (!allWords && !exactPhrase && !anyWords && !excludeWords) {
                e.preventDefault();
                alert('Please fill in at least one search field.');
                this.querySelector('input[name="as_q"]').focus();
                return;
            }
            
            // If we have values, let the form submit normally
            // The form action and method are already set correctly
        });
    }
    
    function setupKeyboardHandlers() {
        // Add keyboard support for navigation
        document.addEventListener('keydown', function(e) {
            // Alt + S for Search page
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                showPage('search');
            }
            // Alt + I for Images page
            else if (e.altKey && e.key === 'i') {
                e.preventDefault();
                showPage('images');
            }
            // Alt + A for Advanced page
            else if (e.altKey && e.key === 'a') {
                e.preventDefault();
                showPage('advanced');
            }
        });
        
        // Handle Enter key on search inputs
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // Submit the form
                    const form = this.closest('form');
                    if (form) {
                        form.submit();
                    }
                }
            });
        });
        
        // Handle Enter key on advanced search inputs
        const advancedInputs = document.querySelectorAll('.advanced-input');
        advancedInputs.forEach(input => {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // Submit the advanced form
                    advancedForm.submit();
                }
            });
        });
    }
    
    function focusSearchInput(pageElement) {
        // Focus on the search input when switching to a search page
        setTimeout(() => {
            const searchInput = pageElement.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
    }
    
    function focusFirstAdvancedInput() {
        // Focus on the first advanced search input
        setTimeout(() => {
            const firstInput = advancedPage.querySelector('input[name="as_q"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }
    
    // Handle "I'm Feeling Lucky" button specifically
    const luckyButton = document.querySelector('button[name="btnI"]');
    if (luckyButton) {
        luckyButton.addEventListener('click', function(e) {
            const searchInput = searchForm.querySelector('input[name="q"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                alert('Please enter a search term.');
                searchInput.focus();
                return;
            }
            // The form will handle the submission with btnI parameter
        });
    }
    
    // Add input validation feedback
    function addInputValidation() {
        const searchInputs = document.querySelectorAll('.search-input');
        
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const value = this.value.trim();
                const form = this.closest('form');
                const submitButtons = form.querySelectorAll('button[type="submit"]');
                
                submitButtons.forEach(button => {
                    if (value.length > 0) {
                        button.style.opacity = '1';
                        button.disabled = false;
                    } else {
                        button.style.opacity = '0.7';
                        button.disabled = false; // Still allow clicking for validation
                    }
                });
            });
        });
        
        // Advanced form validation
        const advancedInputs = document.querySelectorAll('.advanced-input');
        advancedInputs.forEach(input => {
            input.addEventListener('input', function() {
                const allInputs = Array.from(advancedInputs);
                const hasValue = allInputs.some(inp => inp.value.trim().length > 0);
                const submitButton = advancedForm.querySelector('button[type="submit"]');
                
                if (hasValue) {
                    submitButton.style.opacity = '1';
                    submitButton.disabled = false;
                } else {
                    submitButton.style.opacity = '0.7';
                    submitButton.disabled = false; // Still allow clicking for validation
                }
            });
        });
    }
    
    // Initialize input validation
    addInputValidation();
    
    // Handle browser back/forward buttons (basic history management)
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            showPage(e.state.page);
        }
    });
    
    // Set initial history state
    if (window.history && window.history.pushState) {
        window.history.replaceState({page: 'search'}, 'Google Search', window.location.href);
    }
    
    // Update history when navigating (override showPage)
    const originalShowPage = showPage;
    showPage = function(page) {
        originalShowPage(page);
        
        if (window.history && window.history.pushState) {
            const title = page === 'search' ? 'Google Search' : 
                         page === 'images' ? 'Google Images' : 
                         'Google Advanced Search';
            window.history.pushState({page: page}, title, window.location.href);
        }
    };
});