'use strict';

define(['knockout', 'durandal/app', 'durandal/system','moment','plugins/observable'], function (ko, app, system, moment, observable) {
    var title = 'Timetable';

    // Does the UI show the options to edit the TimeTable list?
    var inEditorMode = false;
    // Current Search Results. Default to today's classes
    var today = [];

    // Filter Results: Sunday is day 0, but to keep me sane I am doing 1 for Sunday!
    var todayNum = (new Date()).getDay() + 1;
    // Filter for class types
    var classType = null;

    var classTypes = [
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
        {'id':1,'dayId':2,'classtypeId':1,'from':{'hour':6,'mins':30},'to':{'hour':7,'mins':0},'duration':30},
        {'id':2,'dayId':2,'classtypeId':5,'from':{'hour':7,'mins':0},'to':{'hour':7,'mins':45},'duration':45},
        {'id':3,'dayId':2,'classtypeId':11,'from':{'hour':8,'mins':0},'to':{'hour':9,'mins':0},'duration':60},
        {'id':4,'dayId':2,'classtypeId':8,'from':{'hour':9,'mins':0},'to':{'hour':10,'mins':0},'duration':60},
        {'id':5,'dayId':2,'classtypeId':11,'from':{'hour':14,'mins':0},'to':{'hour':17,'mins':0},'duration':180},
        {'id':6,'dayId':3,'classtypeId':2,'from':{'hour':6,'mins':15},'to':{'hour':7,'mins':0},'duration':45},
        {'id':7,'dayId':3,'classtypeId':6,'from':{'hour':7,'mins':15},'to':{'hour':7,'mins':45},'duration':45},
        {'id':8,'dayId':3,'classtypeId':12,'from':{'hour':8,'mins':0},'to':{'hour':9,'mins':30},'duration':90},
        {'id':9,'dayId':3,'classtypeId':1,'from':{'hour':9,'mins':30},'to':{'hour':10,'mins':0},'duration':30},
        {'id':10,'dayId':3,'classtypeId':12,'from':{'hour':14,'mins':0},'to':{'hour':17,'mins':0},'duration':30},
        {'id':11,'dayId':3,'classtypeId':8,'from':{'hour':17,'mins':0},'to':{'hour':18,'mins':0},'duration':60},
        {'id':12,'dayId':3,'classtypeId':3,'from':{'hour':18,'mins':0},'to':{'hour':18,'mins':30},'duration':30},
        {'id':13,'dayId':3,'classtypeId':11,'from':{'hour':18,'mins':30},'to':{'hour':19,'mins':0},'duration':30},
        {'id':13,'dayId':3,'classtypeId':5,'from':{'hour':19,'mins':0},'to':{'hour':19,'mins':45},'duration':45},
        {'id':14,'dayId':3,'classtypeId':1,'from':{'hour':20,'mins':0},'to':{'hour':20,'mins':30},'duration':30},
        {'id':15,'dayId':4,'classtypeId':3,'from':{'hour':6,'mins':30},'to':{'hour':7,'mins':0},'duration':30},
        {'id':16,'dayId':4,'classtypeId':7,'from':{'hour':7,'mins':0},'to':{'hour':7,'mins':30},'duration':30},
        {'id':17,'dayId':4,'classtypeId':12,'from':{'hour':8,'mins':0},'to':{'hour':9,'mins':15},'duration':75},
        {'id':18,'dayId':4,'classtypeId':12,'from':{'hour':14,'mins':0},'to':{'hour':17,'mins':0},'duration':180},
        {'id':19,'dayId':4,'classtypeId':1,'from':{'hour':17,'mins':0},'to':{'hour':17,'mins':30},'duration':30},
        {'id':20,'dayId':4,'classtypeId':2,'from':{'hour':17,'mins':30},'to':{'hour':18,'mins':30},'duration':60},
        {'id':21,'dayId':4,'classtypeId':10,'from':{'hour':18,'mins':45},'to':{'hour':19,'mins':30},'duration':45},
        {'id':22,'dayId':4,'classtypeId':4,'from':{'hour':19,'mins':45},'to':{'hour':20,'mins':30},'duration':45},
        {'id':23,'dayId':5,'classtypeId':4,'from':{'hour':6,'mins':30},'to':{'hour':7,'mins':15},'duration':45},
        {'id':24,'dayId':5,'classtypeId':1,'from':{'hour':7,'mins':30},'to':{'hour':8,'mins':0},'duration':30},
        {'id':25,'dayId':5,'classtypeId':12,'from':{'hour':8,'mins':0},'to':{'hour':9,'mins':0},'duration':60},
        {'id':26,'dayId':5,'classtypeId':3,'from':{'hour':9,'mins':15},'to':{'hour':10,'mins':0},'duration':45},
        {'id':27,'dayId':5,'classtypeId':12,'from':{'hour':14,'mins':0},'to':{'hour':17,'mins':0},'duration':180},
        {'id':28,'dayId':5,'classtypeId':5,'from':{'hour':17,'mins':15},'to':{'hour':18,'mins':0},'duration':60},
        {'id':29,'dayId':5,'classtypeId':6,'from':{'hour':18,'mins':15},'to':{'hour':19,'mins':0},'duration':45},
        {'id':30,'dayId':5,'classtypeId':3,'from':{'hour':19,'mins':0},'to':{'hour':19,'mins':30},'duration':30},
        {'id':31,'dayId':5,'classtypeId':1,'from':{'hour':20,'mins':0},'to':{'hour':20,'mins':30},'duration':30},
        {'id':32,'dayId':6,'classtypeId':5,'from':{'hour':6,'mins':30},'to':{'hour':7,'mins':15},'duration':45},
        {'id':33,'dayId':6,'classtypeId':3,'from':{'hour':7,'mins':15},'to':{'hour':7,'mins':45},'duration':30},
        {'id':34,'dayId':6,'classtypeId':12,'from':{'hour':8,'mins':0},'to':{'hour':9,'mins':0},'duration':60},
        {'id':35,'dayId':6,'classtypeId':11,'from':{'hour':9,'mins':30},'to':{'hour':10,'mins':0},'duration':60},
        {'id':36,'dayId':6,'classtypeId':12,'from':{'hour':14,'mins':0},'to':{'hour':16,'mins':30},'duration':180},
        {'id':37,'dayId':6,'classtypeId':4,'from':{'hour':16,'mins':30},'to':{'hour':17,'mins':15},'duration':45},
        {'id':38,'dayId':6,'classtypeId':8,'from':{'hour':17,'mins':30},'to':{'hour':18,'mins':30},'duration':60},
        {'id':39,'dayId':6,'classtypeId':11,'from':{'hour':18,'mins':30},'to':{'hour':19,'mins':0},'duration':30},
        {'id':40,'dayId':6,'classtypeId':12,'from':{'hour':19,'mins':0},'to':{'hour':20,'mins':30},'duration':150},
        {'id':41,'dayId':7,'classtypeId':1,'from':{'hour':8,'mins':0},'to':{'hour':8,'mins':30},'duration':30},
        {'id':42,'dayId':7,'classtypeId':9,'from':{'hour':9,'mins':0},'to':{'hour':10,'mins':0},'duration':60},
        {'id':43,'dayId':7,'classtypeId':10,'from':{'hour':10,'mins':0},'to':{'hour':11,'mins':0},'duration':60},
        {'id':44,'dayId':7,'classtypeId':2,'from':{'hour':11,'mins':0},'to':{'hour':12,'mins':0},'duration':60},
        {'id':45,'dayId':7,'classtypeId':12,'from':{'hour':12,'mins':0},'to':{'hour':14,'mins':0},'duration':120},
        {'id':46,'dayId':1,'classtypeId':1,'from':{'hour':10,'mins':0},'to':{'hour':10,'mins':30},'duration':30},
        {'id':47,'dayId':1,'classtypeId':4,'from':{'hour':11,'mins':0},'to':{'hour':11,'mins':45},'duration':45},
        {'id':48,'dayId':1,'classtypeId':11,'from':{'hour':12,'mins':0},'to':{'hour':12,'mins':30},'duration':30},
        {'id':49,'dayId':1,'classtypeId':12,'from':{'hour':12,'mins':30},'to':{'hour':14,'mins':0},'duration':150}
    ];

    var activate = function() {
        this.search();
    };

    var search = function() {
        var that = this;

        // Get today items
        var query = that.timetable.filter(function(tt) { return tt.dayId == that.todayNum || that.todayNum === null; });

        // Filter based on the class type
        if(that.classType != undefined) {
            query = query.filter(function (tt) {
                return tt.classtypeId == that.classType.id
            });
        }

        // Link up data
        query = query
            .map(function(item) {
                return {
                    day: that.days
                            .filter(function(day) {
                                return item.dayId == day.id;
                            })[0],
                    classtype: that.classTypes
                            .filter(function(ct) {
                                return item.classtypeId == ct.id;
                            })[0],
                    from: item.from,
                    to: item.to
                };
            });

        that.today = query;
    };

    // Add a new time to the Time Table. Used in editor mode.
    var addTimetableItem = function() {
        this.timetable.push({id: this.timetable.length, dayId: 3, classtypeId: 1, from: { hour: 20, mins: 0}, to: { hour: 20, mins: 30 }, duration: 30 });
    };

    return {
        activate: activate,
        search: search,
        timetable: timetable,
        days: days,
        classTypes: classTypes,
        today: today,
        addTimetableItem: addTimetableItem,
        inEditorMode: inEditorMode,
        todayNum: todayNum,
        classType: classType
    };

});
