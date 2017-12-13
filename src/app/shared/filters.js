"use strict";
var Filters = (function () {
    function Filters() {
        this.goalsCopy = [];
        this.goals = [];
    }
    Filters.prototype.initFilters = function (goalsCopy) {
        // this.filteredGoals = this.filteredActivities = this.filteredInitiatives = this.filteredOpis = goalsCopy;
    };
    Filters.prototype.searchGoal = function (key) {
        this.goals = this.goalsCopy;
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goalsCopy.filter(function (item) {
                return (item.goal.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            this.filteredGoals = this.goals;
        }
    };
    Filters.prototype.searchInitiative = function (key) {
        var _this = this;
        this.goals = JSON.parse(JSON.stringify(this.filteredGoals));
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goals.filter(function (outerItem) {
                outerItem.initiatives = outerItem.initiatives.filter(function (item) {
                    return (item.initiative.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
                _this.filteredInitiatives = _this.goals;
                return outerItem.initiatives.length;
            });
        }
    };
    Filters.prototype.searchActivity = function (key) {
        var _this = this;
        this.goals = JSON.parse(JSON.stringify(this.filteredInitiatives));
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goals.filter(function (outerItem) {
                outerItem.initiatives = outerItem.initiatives.filter(function (innerItem) {
                    innerItem.activities = innerItem.activities.filter(function (item) {
                        return (item.activity.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    });
                    return innerItem.activities.length;
                });
                _this.filteredActivities = _this.goals;
                return outerItem.initiatives.length;
            });
        }
    };
    Filters.prototype.searchOpi = function (key) {
        this.goals = JSON.parse(JSON.stringify(this.filteredActivities));
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goals.filter(function (outerItem) {
                outerItem.initiatives = outerItem.initiatives.filter(function (innerItem) {
                    innerItem.activities = innerItem.activities.filter(function (item) {
                        item.opis = item.opis.filter(function (inItem) {
                            return (inItem.opi.toLowerCase().indexOf(val.toLowerCase()) > -1);
                        });
                        return item.opis.length;
                    });
                    return innerItem.activities.length;
                });
                return outerItem.initiatives.length;
            });
        }
    };
    return Filters;
}());
exports.Filters = Filters;
//# sourceMappingURL=filters.js.map