webpackJsonp(["goal.module"],{

/***/ "../../../../../src/app/planner/goal/goal.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/goal/goal.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <!-- <div class=\"panel-group\" id=\"accordion\"> -->\r\n    <div class=\"text-center\" style=\"color: red;\"><h1>Strategic Goal</h1></div>\r\n    <div class=\"panel\">\r\n      <div class=\"panel-heading background-3\">\r\n        <span style=\"cursor:pointer;\" data-toggle=\"collapse\" href=\"#collapse1\">Edit Section</span> \r\n        <span class=\"pull-right\" style=\"cursor:pointer\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"collapse\">\r\n            <i class=\"glyphicon glyphicon-collapse-up\" data-toggle=\"collapse\" href=\"#collapse1\"></i>\r\n        </span>\r\n      </div>\r\n      \r\n      <div id=\"collapse1\" class=\"panel-collapse collapse\">\r\n        <div class=\"panel-body\">\r\n          <form [formGroup]=\"goalForm\" (submit)=\"onSubmit()\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-6 col-xs-12 col-sm-6\">                    \r\n                <div class=\"form-group\">\r\n                  <label class=\"control-label\" for=\"year\">Strategic Plan:</label>\r\n                  <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\">\r\n                      <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n                <div class=\"form-group\">\r\n                  <label class=\"control-label\">Goal</label>\r\n                  <textarea class=\"form-control\" rows=\"3\" formControlName=\"goal\"></textarea>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"goalForm.invalid\">Submit</button>\r\n            <button type=\"button\" class=\"btn btn-default btn-danger\" (click)=\"goalForm.reset();isUpdating=false;\">Clear</button>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"panel\">\r\n      <div class=\"panel-heading background-4\"><span style=\"cursor:pointer; color:white\" data-toggle=\"collapse\"  href=\"#collapse2\">Strategic Goals</span>\r\n        <select id=\"year\" name=\"year\" class=\"form-control pull-right\" [(ngModel)]=\"defaultCycle\" \r\n          (ngModelChange)=\"getGoals()\" style=\"width:auto;height: auto;padding: 0px;\">\r\n          <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\" [attr.selected]=\"c.defaultCycle\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}]</option>\r\n        </select>\r\n      </div>\r\n      \r\n      <div id=\"collapse2\" class=\"panel-collapse collapse in\">\r\n        <table class=\"table table-hover table-bordered\" *ngIf=\"goals.length\">\r\n          <thead class=\"header-background\">\r\n            <tr>\r\n              <th>Goal\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchGoal($event,goals)\" placeholder=\"Search..\">\r\n                </span>\r\n              </th>\r\n              <th></th>     \r\n              <th></th>   \r\n              <th></th>                         \r\n            </tr>\r\n          </thead>\r\n          <tbody class=\"body-background\">\r\n            <tr *ngFor=\"let goal of goals;let i = index;\">\r\n              <td style=\"vertical-align: middle;\">{{goal.goal}}</td>\r\n              <td style=\"vertical-align: middle;\"><i class=\"glyphicon glyphicon-edit\" style=\"cursor:pointer;\"(click)=\"updateGoal(goal)\"  data-toggle=\"collapse\" href=\"#collapse1\"></i></td>\r\n              <td style=\"vertical-align: middle;\"><i class=\"glyphicon glyphicon-remove\" style=\"cursor:pointer;\" (click)=\"deleteGoal(goal.goalId,goals,i)\"></i></td>\r\n              <td><input type=\"checkbox\" [(ngModel)]=\"check[i]\" (change)=\"disable(check[i],goal.goalId)\"></td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <p class=\"text-center\" *ngIf=\"!goals.length\" style=\"padding-top: 5px;\">No Goals Added Yet...</p>  \r\n      </div>\r\n    </div>\r\n  <!-- </div> -->\r\n\r\n  <!--popup model-->\r\n<div class=\"modal fade\" id=\"objectModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\">Confirm</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <p>You have successfully added a new Goal.</p>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" data-toggle=\"collapse\"  href=\"#collapse1\">Close</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/goal/goal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalModule", function() { return GoalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goal__ = __webpack_require__("../../../../../src/app/planner/goal/goal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GoalModule = (function () {
    function GoalModule() {
    }
    return GoalModule;
}());
GoalModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__goal__["a" /* GoalComponent */]
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__goal__["a" /* GoalComponent */]],
    })
], GoalModule);

//# sourceMappingURL=goal.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/goal/goal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalComponent; });
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
            "cycleId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "goal": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
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
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
GoalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'strategic-goal',
        template: __webpack_require__("../../../../../src/app/planner/goal/goal.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/goal/goal.css"), __webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], GoalComponent);

var _a, _b, _c;
//# sourceMappingURL=goal.js.map

/***/ })

});
//# sourceMappingURL=goal.module.chunk.js.map