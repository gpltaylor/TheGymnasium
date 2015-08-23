define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        search: function() {
            app.showMessage("Not Implemented", "Error");
        },

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/home', title: 'Home', nav: true },
                { route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'About Us', nav: true, hash: '#crm/aboutus' },
                { route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Why Join', nav: true, hash: '#crm/whyjoin' },
                { route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Membership', nav: true, hash: '#crm/membership' },
                { route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Timetable', nav: true, hash: '#crm/timetable' },
                //{ route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Personal Trainer', nav: true, hash: '#crm/personaltrainer' },
                //{ route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Events', nav: true, hash: '#crm/events' },
                //{ route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'B&F', nav: true, hash: '#crm/beforeandafter' },
                //{ route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Blog', nav: true, hash: '#crm/blog' },
                //{ route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'The Team', nav: true, hash: '#crm/theteam' },
                //{ route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'videos', nav: true, hash: '#crm/videos' },
                //{ route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Contact Us', nav: true, hash: '#crm/contactus' },
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
