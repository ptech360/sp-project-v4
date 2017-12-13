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
var InitiativeComponent = (function (_super) {
    __extends(InitiativeComponent, _super);
    function InitiativeComponent(orgService, formBuilder, commonService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
        _this.cycles = [];
        // public goals:any[]=[];
        // public goalsCopy:any[]=[];
        _this.objectives = [];
        _this.isUpdating = false;
        _this.quarter = ["Q1", "Q2", "Q3", "Q4"];
        // this.orgService.getObjectives().subscribe((response:any)=>{
        //   this.objectives = response;
        // });
        _this.getCycleWithChildren();
        _this.initiativeForm = _this.initForm();
        return _this;
    }
    // emptySearchResult:any;
    // copyOfGoals:any[];
    // search(key:any){
    //   this.goals = this.goalsCopy;
    //   this.copyOfGoals = this.goals;
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
    // searchInitiative(key:any,searchFrom:any[]){
    //   this.goals = this.copyOfGoals;
    //   let val = key.target.value;
    //   if (val && val.trim() != '') {
    //     this.goals = this.copyOfGoals.filter((item: any) => {
    //       var exist:boolean = false;
    //       item.initiatives = item.initiatives.filter((innerItem:any)=>{
    //         exist = (innerItem.initiative.toLowerCase().indexOf(val.toLowerCase())>-1);
    //       });
    //       return exist;
    //     })
    //   }
    // }
    InitiativeComponent.prototype.getCycleWithChildren = function () {
        var _this = this;
        this.orgService.getCycleWithChildren().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
                _this.cycles.forEach(function (element) {
                    if (element.defaultCycle)
                        _this.defaultCycle = element.cycleId;
                });
                _this.getInitiative();
            }
        });
    };
    InitiativeComponent.prototype.getObjective = function (cycleId) {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (element.cycleId == cycleId) {
                _this.objectives = element.goals;
                return;
            }
        });
    };
    InitiativeComponent.prototype.getInitiative = function () {
        var _this = this;
        this.orgService.getInitiativesByCycleId(this.defaultCycle).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                // this.copyOfGoals = response;
                _this.initFilters(response);
            }
        });
    };
    InitiativeComponent.prototype.initForm = function () {
        return this.formBuilder.group({
            "cycleId": ['', [forms_1.Validators.required]],
            "goalId": ['', [forms_1.Validators.required]],
            "initiative": ['', [forms_1.Validators.required]],
        });
    };
    // setActivity() {
    //   return this.formBuilder.group({
    //     "activity": ['', [Validators.required]],
    //     "measures": this.formBuilder.array([this.setMeasure()])
    //   });
    // }
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
    // addActivity(form:any) {
    //   const control = <FormArray>form.controls['activities'];
    //   control.push(this.setActivity());
    // }
    // removeActivity(form:any, i:any) {
    //   const control = <FormArray>form.controls['activities'];
    //   control.removeAt(i);
    // }
    // addMeasure(form:any) {
    //   const control = <FormArray>form.controls['measures'];
    //   control.push(this.setMeasure());
    // }
    // removeMeasure(form:any, j:any) {
    //   const control = <FormArray>form.controls['measures'];
    //   control.removeAt(j);
    // }
    // setTargetTable(form:any, e:any) {
    //   for (var index = 0; index < this.commonService.getData('org_info').cycle.length; index++) {
    //     form[index].controls['levels'] = this.formBuilder.array([]);
    //     const levels = <FormArray>form[index].controls['levels'];
    //     for (var i = 0; i < e; i++) {
    //       levels.push(this.inItLevels(this.quarter[i]));
    //     }
    //   }
    // }
    InitiativeComponent.prototype.submitInitiative = function () {
        var _this = this;
        delete this.initiativeForm.value["cycleId"];
        if (!this.isUpdating)
            this.orgService.addInitiative(this.initiativeForm.value).subscribe(function (res) {
                _this.getInitiative();
                $('#initiativeModal').modal('show');
                // this.initForm();
                _this.initiativeForm.controls["initiative"].reset();
            }, function (err) {
                console.log(err);
            });
        if (this.isUpdating)
            if (confirm("Are you sure you want to update this Initiative?"))
                this.orgService.updateInitiative(this.selectedInitiative.initiativeId, this.initiativeForm.value).subscribe(function (res) {
                    console.log(res);
                    _this.getInitiative();
                    $('#initiativeModal').modal('show');
                    _this.isUpdating = false;
                });
    };
    InitiativeComponent.prototype.deleteInitiative = function (initiativeId, initiatives, index) {
        var _this = this;
        if (confirm("Are you sure you want to delete this Initiative?"))
            this.orgService.deleteInitiative(initiativeId).subscribe(function (res) {
                console.log(res);
                initiatives.splice(index, 1);
                _this.getInitiative();
            });
    };
    InitiativeComponent.prototype.updateInitiative = function (goalId, initiative) {
        this.isUpdating = true;
        this.initiativeForm.controls["cycleId"].disable();
        this.initiativeForm.controls["goalId"].disable();
        this.selectedInitiative = initiative;
        this.initiativeForm.patchValue({ cycleId: this.defaultCycle,
            goalId: goalId,
            initiative: initiative.initiative });
    };
    InitiativeComponent.prototype.enableFields = function () {
        this.initiativeForm.controls["cycleId"].enable();
        this.initiativeForm.controls["goalId"].enable();
        this.initiativeForm.reset();
    };
    return InitiativeComponent;
}(filters_1.Filters));
InitiativeComponent = __decorate([
    core_1.Component({
        selector: 'initiatives',
        templateUrl: './initiative.html',
        styleUrls: ['./initiative.css', './../planner.component.css']
    }),
    __metadata("design:paramtypes", [UTI_service_1.UniversityService,
        forms_1.FormBuilder,
        storage_service_1.StorageService])
], InitiativeComponent);
exports.InitiativeComponent = InitiativeComponent;
//# sourceMappingURL=initiative.js.map