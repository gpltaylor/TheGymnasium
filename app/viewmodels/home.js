'use strict';

define(['knockout', 'durandal/app', 'durandal/system'], function (ko, app, system) {
    var title = "The Gymnasium";
    var isModelLoading = false;
    var moreToLoad = true;
    var that = this;

    var pages = [
        {page:'aboutus', isLoaded: true},
        {page:'whyjoin', isLoaded: false},
        {page:'membership', isLoaded: false},
        {page:'meet-our-pts', isLoaded: false},
        {page:'personaltraining', isLoaded: false},
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
                    loadNext(that);
                    isModelLoading = false;
            }

        });
    };

    // Load the next page into the view
    var loadNext = function() {
        var item = pages.filter(function(page) { return page.isLoaded == false; })[0];
        if(item) {
            console.log("loading in", that, item);
            $('#' + item.page).slideDown('slow');
            item.isLoaded = true;
        } else {
            // TODO: Get this to run as the scope of the View Model
            if(this != undefined && this.moreToLoad != undefined) {
                this.moreToLoad = false;
            }
        }
    };

    return {
        activate: activate,
        title: title,
        pages: pages,
        moreToLoad: moreToLoad,
        loadNext: loadNext
    };

});
