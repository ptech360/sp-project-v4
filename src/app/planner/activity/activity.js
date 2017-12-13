"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var UTI_service_1 = require("../../shared/UTI.service");
var forms_1 = require("@angular/forms");
var storage_service_1 = require("../../shared/storage.service");
var filters_1 = require("../../shared/filters");
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
            "cycleId": ['', [forms_1.Validators.required]],
            "objectiveId": ['', [forms_1.Validators.required]],
            "initiativeId": ['', [forms_1.Validators.required]],
            "activity": ['', [forms_1.Validators.required]],
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
}(filters_1.Filters));
ActivityComponent = __decorate([
    core_1.Component({
        selector: 'activities',
        templateUrl: './activity.html',
        styleUrls: ['./activity.css', './../planner.component.css']
    }),
    __metadata("design:paramtypes", [UTI_service_1.UniversityService,
        forms_1.FormBuilder,
        storage_service_1.StorageService])
], ActivityComponent);
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.js.map