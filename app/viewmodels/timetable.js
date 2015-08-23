'use strict';

define(['knockout', 'durandal/app', 'durandal/system','moment'], function (ko, app, system, moment) {
    var title = "Timetable";
    var today = [];

    var classType = [
        {id: 1, name: 'Metafit', description: ''},
        {id: 2, name: 'Weekly Workout', description: ''},
        {id: 3, name: 'Fat Burner', description: ''},
        {id: 4, name: 'Circuits', description: ''},
        {id: 5, name: 'Stength & Tone', description: ''},
        {id: 6, name: 'TRX', description: ''},
        {id: 7, name: 'Spin', description: ''},
        {id: 8, name: 'Kettlebell', description: ''},
        {id: 9, name: 'Bootcamp', description: ''},
        {id: 10, name: 'Yoga', description: ''},
        {id: 11, name: 'Abs & Core', description: ''},
        {id: 12, name: 'Open Gym', description: 'Come and do your own thing'},
    ];

    var days = [
        {id: 2, name: 'Monday'},
        {id: 3, name: 'Tuesday'},
        {id: 4, name: 'Wednesday'},
        {id: 5, name: 'Thursday'},
        {id: 6, name: 'Friday'},
        {id: 7, name: 'Saturday'},
        {id: 1, name: 'Sunday'},
    ];

    var timetable = [
        // Monday
        {id: 1, dayId: 2, classtypeId: 1, from: { hour: 6, mins: 30}, to: { hour: 7, mins: 0 }, duration: 30 },
        {id: 2, dayId: 2, classtypeId: 5, from: { hour: 7, mins: 0}, to: { hour: 7, mins: 45 }, duration: 45 },
        {id: 3, dayId: 2, classtypeId: 11, from: { hour: 8, mins: 0}, to: { hour: 9, mins: 0 }, duration: 60 },
        {id: 4, dayId: 2, classtypeId: 8, from: { hour: 9, mins: 0}, to: { hour: 10, mins: 0 }, duration: 60 },
        {id: 5, dayId: 2, classtypeId: 11, from: { hour: 14, mins: 0}, to: { hour: 17, mins: 0 }, duration: 180 },

        // Tuesday
        {id: 1, dayId: 3, classtypeId: 2, from: { hour: 6, mins: 30}, to: { hour: 7, mins: 0 }, duration: 30 },

    ];

    var activate = function() {
        var that = this;
        var todayNum = 2;

        // Get today items
        that.today = that.timetable.filter(function(tt) { return tt.dayId == todayNum; });
        // Link up data
        that.today = that.today
            .map(function(item) {
                return {
                    day: that.days
                            .filter(function(day) {
                                return item.dayId == day.id;
                            })[0],
                    classtype: that.classType.filter(function(ct) {
                        return item.classtypeId == ct.id;
                    })[0],
                    from: item.from,
                    to: item.to
                };
            });

    };



    return {
        activate: activate,
        timetable: timetable,
        days: days,
        classType: classType,
        today: today
    };

});
