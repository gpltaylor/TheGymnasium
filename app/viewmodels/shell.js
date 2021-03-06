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
                { route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Meet our PTs', nav: true, hash: '#crm/meet-our-pts' },
                { route: 'crm/:id', moduleId: 'viewmodels/crm', title: 'Personal Training', nav: true, hash: '#crm/personaltraining' },
                { route: 'timetable', moduleId: 'viewmodels/timetable', title: 'Timetable', nav: true },

            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
