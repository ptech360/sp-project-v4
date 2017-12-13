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
var GoalComponent = (function (_super) {
    __extends(GoalComponent, _super);
    function GoalComponent(orgService, formBuilder, commonService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
        _this.isUpdating = false;
        // public goals:any[]=[];
        // public goalsCopy:any[]=[];
        _this.cycles = [];
        _this.check = [];
        _this.getCycles();
        _this.initObjectiveForm();
        return _this;
    }
    GoalComponent.prototype.ngAfterViewInit = function () {
    };
    GoalComponent.prototype.getCycles = function () {
        var _this = this;
        this.orgService.getCycles().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
                _this.cycles.forEach(function (element) {
                    if (element.defaultCycle)
                        _this.defaultCycle = element.cycleId;
                });
                _this.getGoals();
            }
        });
    };
    GoalComponent.prototype.getGoals = function () {
        var _this = this;
        this.orgService.getObjectivesByCycleId(this.defaultCycle).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
            }
        });
    };
    GoalComponent.prototype.initObjectiveForm = function () {
        this.goalForm = this.formBuilder.group({
            "cycleId": ['', [forms_1.Validators.required]],
            "goal": ['', [forms_1.Validators.required]],
        });
    };
    // inItSpi() {
    //   return this.formBuilder.group({
    //     "spi": ['', [Validators.required]],
    //     "measureUnit": ['', [Validators.required]],
    //     "currentLevel": ['', [Validators.required]],
    //     "frequencyId":[1],
    //     "targetDigital": this.formBuilder.array(this.inItTarget())
    //   });
    // }  
    // inItTarget() {
    //   const fa:any[] = [];
    //   this.commonService.getData('org_info').cycle.forEach((element:any) => {
    //     fa.push(this.inItTargetDigital(element));
    //   });
    //   return fa;
    // }
    // inItTargetDigital(year:any) {
    //   return this.formBuilder.group({
    //     "year": [year, [Validators.required]],
    //     "expectedLevel": ['', [Validators.required]],
    //   });
    // }
    // addSpi(form:any) {
    //   const control = <FormArray>form.controls['spis'];
    //   control.push(this.inItSpi());
    // }
    // removeSpi(form:any, index:any) {
    //   const control = <FormArray>form.controls['spis'];
    //   control.removeAt(index);
    // }
    GoalComponent.prototype.disable = function (event, e2) {
    };
    GoalComponent.prototype.onSubmit = function () {
        var _this = this;
        // this.goalForm.value["cycleId"] = this.commonService.getData('org_info').cycles[0].cycleId;/
        console.log(this.goalForm.value);
        if (!this.isUpdating) {
            this.orgService.addObjective(this.goalForm.value).subscribe(function (response) {
                $('#objectModal').modal('show');
                // this.returnedObject = response;
                // this.goals.push(this.returnedObject);
                // this.initObjectiveForm();
                _this.goalForm.controls["goal"].reset();
                _this.getGoals();
            }, function (error) {
                console.log(error);
            });
        }
        if (this.isUpdating) {
            if (confirm("Are you sure you want to Update this Goal?"))
                this.orgService.updateObjective(this.selectedObjective.goalId, this.goalForm.value).subscribe(function (res) {
                    console.log(res);
                    $('#objectModal').modal('show');
                    _this.goalForm.reset();
                    _this.getGoals();
                    _this.isUpdating = false;
                });
        }
    };
    GoalComponent.prototype.deleteGoal = function (goalId, goals, index) {
        if (confirm("Are you sure you want to delete this Goal?"))
            this.orgService.deleteObjective(goalId).subscribe(function (res) {
                console.log(res);
                goals.splice(index, 1);
            });
    };
    GoalComponent.prototype.updateGoal = function (goal) {
        this.selectedObjective = goal;
        this.isUpdating = true;
        this.goalForm.patchValue({ goal: goal.goal, cycleId: this.defaultCycle });
    };
    return GoalComponent;
}(filters_1.Filters));
GoalComponent = __decorate([
    core_1.Component({
        selector: 'strategic-goal',
        templateUrl: './goal.html',
        styleUrls: ['./goal.css', './../planner.component.css']
    }),
    __metadata("design:paramtypes", [UTI_service_1.UniversityService,
        forms_1.FormBuilder,
        storage_service_1.StorageService])
], GoalComponent);
exports.GoalComponent = GoalComponent;
//# sourceMappingURL=goal.js.map