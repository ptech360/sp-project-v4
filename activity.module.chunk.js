webpackJsonp(["activity.module"],{

/***/ "../../../../../src/app/planner/activity/activity.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/activity/activity.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n    <div class=\"text-center\" style=\"color: red;\"><h1>Proposed Activity</h1></div>    \r\n  <div class=\"panel\">\r\n    <div class=\"panel-heading background-3\"><span data-toggle=\"collapse\" href=\"#collapse1\">Edit Section</span>\r\n      <span class=\"pull-right\" style=\"cursor:pointer\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"collapse\">\r\n          <i class=\"glyphicon glyphicon-collapse-up\" data-toggle=\"collapse\" href=\"#collapse1\"></i>\r\n      </span>\r\n    </div>\r\n    <div id=\"collapse1\" class=\"panel-collapse collapse\">\r\n      <div class=\"panel-body\">\r\n        <form [formGroup]=\"activityForm\" (submit)=\"submitActivity()\">\r\n          <div class=\"row\">\r\n          <div class=\"col-lg-6 col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label for=\"year\">Plan Year:</label>\r\n              <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\" (ngModelChange)=\"getObjective($event)\">\r\n                  <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label for=\"sel1\">Select Goal:</label>\r\n              <select class=\"form-control\" id=\"sel1\" formControlName=\"objectiveId\" (ngModelChange)=\"getInitiative($event)\">\r\n                <option *ngFor=\"let objective of objectives;let i=index;\" [value]=\"objective.goalId\">{{i+1}}.{{objective.goal}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label for=\"sel1\">Select Initiative:</label>\r\n              <select class=\"form-control\" id=\"sel1\" formControlName=\"initiativeId\">\r\n                <option *ngFor=\"let initiative of initiatives;let j=index;\" [value]=\"initiative.initiativeId\">{{j+1}}.{{initiative.initiative}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label>Activity</label>\r\n              <textarea class=\"form-control\" rows=\"5\" formControlName=\"activity\"></textarea>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-12 col-sm-12\">\r\n            <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"activityForm.invalid\">Submit</button>\r\n            <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"enableFields(); isUpdating = false\">Clear</button>\r\n          </div>\r\n        </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"panel\">\r\n    <div class=\"panel-heading background-4\">Proposed Activities\r\n      <!-- <span class=\"pull-right\" style=\"cursor:pointer\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Add New Activity\">\r\n        <i class=\"glyphicon glyphicon-plus\" (click)=\"activityForm.reset(); isUpdating = false\" data-toggle=\"collapse\" href=\"#collapse1\"></i>\r\n      </span> -->\r\n      <select id=\"year\" name=\"year\" class=\"form-control pull-right\" [(ngModel)]=\"defaultCycle\" \r\n      (ngModelChange)=\"getActivities()\" style=\"width:auto;height: auto;padding: 0px;\" >\r\n          <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\" [attr.selected]=\"c.defaultCycle\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}]</option>\r\n      </select>\r\n    </div>\r\n    <div class=\"background-2\" *ngIf=\"goals.length\">\r\n      <div class=\"d-flex text-center margin flex-header border\">\r\n        <div class=\"p-2 w-50\">\r\n          <b>Goals</b>\r\n          <span class=\"search\">\r\n            <input type=\"text\" name=\"search\" (keyup)=\"searchGoal($event)\"  placeholder=\"Search..\">\r\n          </span>\r\n        </div>\r\n        <div class=\"p-2 w-50\">\r\n          <b>Initiatives</b>\r\n          <span class=\"search\">\r\n            <input type=\"text\" name=\"search\" (keyup)=\"searchInitiative($event)\"  placeholder=\"Search..\">\r\n          </span>\r\n        </div>\r\n        <div class=\"p-2 w-75\">\r\n          <b>Activities</b>\r\n          <span class=\"search\">\r\n            <input type=\"text\" name=\"search\" (keyup)=\"searchActivity($event)\"  placeholder=\"Search..\">\r\n          </span>\r\n        </div>\r\n      </div>\r\n      <div class=\"d-flex padding border\" *ngFor=\"let goal of goals;let i = index;\">\r\n        <div class=\"p-2 w-30\">\r\n          {{ goal.goal }}\r\n        </div>\r\n        <div class=\"p-3\">\r\n          <div *ngFor=\"let initiate of goal.initiatives;let j=index;\">\r\n            <div class=\"d-flex innerFlex border\">\r\n              <div class=\"p-2 w-50 border-right\">\r\n                <span>{{initiate.initiative}}</span>\r\n              </div>\r\n              <div class=\"p-3 border-left\">\r\n                <div class=\"initiative\" *ngFor=\"let activit of initiate.activities;let k=index;\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-lg-10 col-sm-10\">\r\n                      {{activit.activity}}\r\n                    </div>\r\n                    <div class=\"col-lg-1 col-xs-1\">\r\n                      <span data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Edit\">\r\n                        <i class=\"glyphicon glyphicon-edit btn-edit\" style=\"cursor:pointer;\"(click)=\"updateActivity(goal,initiate,activit)\" ></i>\r\n                      </span>\r\n                    </div>\r\n                    <div class=\"col-lg-1 col-xs-1\">\r\n                      <span data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Delete\">\r\n                        <i style=\"cursor:pointer;\" class=\"glyphicon glyphicon-remove btn-del\" (click)=\"deleteActivity(activit.activityId,initiate.activities,k)\"></i>    \r\n                      </span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <p class=\"text-center\" *ngIf=\"!goals.length\" style=\"padding-top: 5px;\">No Activities Added Yet...</p>\r\n  </div>\r\n  <!--popup model-->\r\n  <div class=\"modal fade\" id=\"activityModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <!-- <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n          <h4 class=\"modal-title\">Confirm</h4>\r\n        </div> -->\r\n        <div class=\"modal-body\">\r\n          <p>Saved successfully .,.</p>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" data-toggle=\"collapse\" href=\"#collapse1\">Close</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/activity/activity.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityModule", function() { return ActivityModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activity__ = __webpack_require__("../../../../../src/app/planner/activity/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActivityModule = (function () {
    function ActivityModule() {
    }
    return ActivityModule;
}());
ActivityModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__activity__["a" /* ActivityComponent */]
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__activity__["a" /* ActivityComponent */]],
    })
], ActivityModule);

//# sourceMappingURL=activity.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/activity/activity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__ = __webpack_require__("../../../../../src/app/shared/UTI.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_filters__ = __webpack_require__("../../../../../src/app/shared/filters.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ActivityComponent = (function (_super) {
    __extends(ActivityComponent, _super);
    function ActivityComponent(orgService, formBuilder, commonService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
        // [x: string]: any;
        _this.cycles = [];
        _this.goals = [];
        _this.goalsCopy = [];
        _this.quarter = ["Q1", "Q2", "Q3", "Q4"];
        _this.objectiveIndex = [];
        _this.isUpdating = false;
        _this.orgService.getCycleWithChildren().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
                _this.objectives = [];
            }
            else {
                _this.cycles = response;
                _this.cycles.forEach(function (element) {
                    if (element.defaultCycle) {
                        _this.defaultCycle = element.cycleId;
                    }
                });
                _this.getActivities();
            }
        });
        _this.activityForm = _this.setActivity();
        return _this;
    }
    ActivityComponent.prototype.ngOnInit = function () {
        // this.getActivities();
    };
    ActivityComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    ActivityComponent.prototype.getObjective = function (cycleId) {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (element.cycleId == cycleId) {
                _this.objectives = element.goals;
                return;
            }
        });
    };
    ActivityComponent.prototype.getActivities = function () {
        var _this = this;
        this.orgService.getActivitiesByCycleId(this.defaultCycle).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.initFilters(response);
            }
        });
    };
    // emptySearchResult:any;
    // search(key:any){
    //   this.goals = this.goalsCopy;
    //   let val = key.target.value;
    //   if (val && val.trim() != '') {
    //     this.emptySearchResult = false;
    //     this.goals = this.goalsCopy.filter((item: any) => {
    //       return (item.goal.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //     })
    //     if (this.goals.length === 0)
    //       this.emptySearchResult = true;
    //     else
    //       this.emptySearchResult = false;
    //   }
    // }
    ActivityComponent.prototype.getInitiative = function (objId) {
        var _this = this;
        if (objId) {
            this.objectives.forEach(function (element) {
                if (element.goalId == objId) {
                    _this.initiatives = element.initiatives;
                    return;
                }
            });
        }
        else {
            this.initiatives = [];
        }
    };
    // this.orgService.fetchInitiative(objId).subscribe((res:any)=>{
    //   if(res.status === 204){
    //     this.initiatives = [];
    //     alert("There is no initiatives of corresponding Goal");
    //   }else{
    //     this.initiatives = res;        
    //   }
    // });
    ActivityComponent.prototype.setActivity = function () {
        return this.formBuilder.group({
            "cycleId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "objectiveId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "initiativeId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "activity": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
    };
    // setMeasure() {
    //   return this.formBuilder.group({
    //     "measure": ['', [Validators.required]],
    //     "frequencyId": [1, [Validators.required]],
    //     "measureUnit": ['', [Validators.required]],
    //     "currentLevel": ['', [Validators.required]],
    //     "direction": ['', [Validators.required]],
    //     "annualTarget": this.formBuilder.array(this.setAnnualTarget())
    //   });
    // }
    // setAnnualTarget() {
    //   const annualTarget:any[] = [];
    //   this.commonService.getData('org_info').cycle.forEach((element:any) => {
    //     annualTarget.push(this.inItTargetIn(element));
    //   });
    //   return annualTarget;
    // }
    // inItTargetIn(year:any) {
    //   return this.formBuilder.group({
    //     "year": [year, [Validators.required]],
    //     "levels": this.formBuilder.array([this.inItLevels(this.quarter[0])]),
    //     "estimatedCost": ['', [Validators.required]]
    //   });
    // }
    // inItLevels(q:any) {
    //   return this.formBuilder.group({
    //     "quarter": [q],
    //     "startDate": ["2017-04-01"],
    //     "endDate":["2018-04-15"],
    //     "estimatedTargetLevel": ['', [Validators.required]]
    //   });
    // }
    ActivityComponent.prototype.submitActivity = function () {
        var _this = this;
        delete this.activityForm.value["cycleId"];
        delete this.activityForm.value["objectiveId"];
        if (!this.isUpdating) {
            this.orgService.saveActivity(this.activityForm.value)
                .subscribe(function (response) {
                $('#activityModal').modal('show');
                _this.getActivities();
                _this.activityForm.controls["activity"].reset();
            });
        }
        else if (confirm("Are you sure you want to Update this Activity?")) {
            delete this.activityForm.value["initiativeId"];
            this.orgService.updateActivity(this.seletedActivity.activityId, this.activityForm.value).subscribe(function (res) {
                _this.getActivities();
                $('#activityModal').modal('show');
                _this.isUpdating = false;
                _this.activityForm.reset();
            });
        }
    };
    ActivityComponent.prototype.deleteActivity = function (activityId, activities, index) {
        if (confirm("Are you sure you want to delete this Activity?"))
            this.orgService.deleteActivity(activityId).subscribe(function (res) {
                console.log(res);
                activities.splice(index, 1);
            });
    };
    ActivityComponent.prototype.updateActivity = function (objective, initiative, activity) {
        $("#collapse1").collapse('show');
        this.isUpdating = true;
        this.seletedActivity = activity;
        this.activityForm.controls["cycleId"].disable();
        this.activityForm.controls["objectiveId"].disable();
        this.activityForm.controls["initiativeId"].disable();
        this.activityForm.patchValue({
            cycleId: this.defaultCycle,
            objectiveId: objective.goalId,
            initiativeId: initiative.initiativeId,
            activity: activity.activity
        });
    };
    ActivityComponent.prototype.enableFields = function () {
        this.activityForm.controls["cycleId"].enable();
        this.activityForm.controls["objectiveId"].enable();
        this.activityForm.controls["initiativeId"].enable();
        this.activityForm.reset();
    };
    ActivityComponent.prototype.getRowSpan = function (array) {
        var rowSpan = 1;
        rowSpan += array.length;
        array.forEach(function (element) {
            rowSpan += element.activities.length;
            // element.activities.forEach((innerElement:any) => {
            //   rowSpan += innerElement.measures.length;
            // });
        });
        if (rowSpan == 1)
            return rowSpan + 1;
        return rowSpan;
    };
    ActivityComponent.prototype.getRowSpanOfIni = function (array) {
        var rowSpan = 1;
        rowSpan += array.length * 2;
        // array.forEach((innerElement:any) => {
        //   rowSpan += innerElement.measures.length;
        // });
        return rowSpan;
    };
    return ActivityComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
ActivityComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'activities',
        template: __webpack_require__("../../../../../src/app/planner/activity/activity.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/activity/activity.css"), __webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], ActivityComponent);

var _a, _b, _c;
//# sourceMappingURL=activity.js.map

/***/ })

});
//# sourceMappingURL=activity.module.chunk.js.map