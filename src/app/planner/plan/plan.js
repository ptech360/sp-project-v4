"use strict";
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
var forms_1 = require("@angular/forms");
var storage_service_1 = require("../../shared/storage.service");
var UTI_service_1 = require("../../shared/UTI.service");
var PlanComponent = (function () {
    function PlanComponent(ss, orgService) {
        this.ss = ss;
        this.orgService = orgService;
        this.title = "Strategic Plan";
        this.cycles = [];
        this.cycleForm = new forms_1.FormGroup({
            "universityId": new forms_1.FormControl(this.ss.getData('org_info').universityId),
            "description": new forms_1.FormControl('', [forms_1.Validators.required]),
            "planYear": new forms_1.FormControl('', [forms_1.Validators.required]),
            "startYear": new forms_1.FormControl('', [forms_1.Validators.required]),
            "endYear": new forms_1.FormControl('', [forms_1.Validators.required]),
            "active": new forms_1.FormControl('', [forms_1.Validators.required])
        });
        this.getCycles();
    }
    PlanComponent.prototype.getCycles = function () {
        var _this = this;
        this.orgService.getCycles().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
                console.log(_this.cycles);
            }
        });
    };
    PlanComponent.prototype.onSubmit = function () {
        var _this = this;
        this.orgService.saveCycle(this.cycleForm.value).subscribe(function (response) {
            _this.getCycles();
            _this.cycleForm.reset();
        });
    };
    PlanComponent.prototype.deleteCycle = function (cycleId) {
        var _this = this;
        if (confirm("Do you Really want to Delete this Cycle??"))
            this.orgService.deleteCycle(cycleId).subscribe(function (response) {
                _this.getCycles();
            });
    };
    return PlanComponent;
}());
PlanComponent = __decorate([
    core_1.Component({
        selector: 'strategic-plan',
        templateUrl: './plan.html',
        styleUrls: ['./../planner.component.css']
    }),
    __metadata("design:paramtypes", [storage_service_1.StorageService, UTI_service_1.UniversityService])
], PlanComponent);
exports.PlanComponent = PlanComponent;
//# sourceMappingURL=plan.js.map