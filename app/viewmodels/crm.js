'use strict';

define(['knockout', 'durandal/app', 'durandal/system'], function (ko, app, system) {

    var fnc = function() {
        var that = this;
        this.title = 'The Gymnasium';
        this.page = 'aboutus';

        this.activate = function(arg) {
            that.page = arg;
        };
    };

    return fnc;

});
