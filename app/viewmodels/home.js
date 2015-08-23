'use strict';

define(['knockout', 'durandal/app', 'durandal/system'], function (ko, app, system) {
    var title = "The Gymnasium";
    var isModelLoading = false;

    var pages = [
        {page:'aboutus', isLoaded: true},
        {page:'membership', isLoaded: false},
        {page:'whyjoin', isLoaded: false},
        {page:'personaltraining', isLoaded: false},
        {page:'meet-our-pts', isLoaded: false},
    ];

    var update = function() {
        this.title = "boo";
    };

    var activate = function() {
        // Register Scroll event and load pages
        $( window ).scroll(function(data) {

            if (isModelLoading === false && document.body.scrollHeight ==
                document.body.scrollTop +
                window.innerHeight) {
                    isModelLoading = true;
                    // Find the first item that's not loaded
                    var item = pages.filter(function(page) { return page.isLoaded == false; })[0];
                    if(item) {
                        console.log("loading in", item);
                        $('#' + item.page).slideDown('slow');
                        isModelLoading = false;
                        item.isLoaded = true;
                    }
            }

        });
    };

    return {
        activate: activate,
        title: title,
        pages: pages
    };

});
