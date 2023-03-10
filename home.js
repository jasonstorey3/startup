/*!
 * Start Bootstrap - Simple Sidebar v6.0.5 (https://startbootstrap.com/template/simple-sidebar)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
            document.body.classList.toggle('sb-sidenav-toggled');
        }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});

// Get references to the sidebar toggle button and the page content wrapper
const sidebarToggle = document.getElementById('sidebarToggle');
const pageContentWrapper = document.getElementById('page-content-wrapper');

// Add an event listener to the sidebar toggle button
sidebarToggle.addEventListener('click', () => {
    // Toggle the "toggled" class on the page content wrapper
    pageContentWrapper.classList.toggle('toggled');

    // Get a reference to the iframe containing the map
    const mapIframe = document.querySelector('iframe');

    // If the sidebar is now toggled, increase the width of the map iframe
    if (pageContentWrapper.classList.contains('toggled')) {
        mapIframe = "calc(100% - 250px)";
    } else {
        mapIframe = "1000px";
    }
});

// Show the events sidebar when the Events button is clicked
$("#events-sidebar-toggle").click(function (e) {
    e.preventDefault();
    $("#events-sidebar-wrapper").toggleClass("toggled");
});

// Hide the events sidebar when the close button is clicked
$("#events-sidebar-close").click(function (e) {
    e.preventDefault();
    $("#events-sidebar-wrapper").toggleClass("toggled");
});