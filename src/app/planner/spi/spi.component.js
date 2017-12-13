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
var UTI_service_1 = require("../../shared/UTI.service");
var forms_1 = require("@angular/forms");
var storage_service_1 = require("../../shared/storage.service");
var SPIComponent = (function () {
    function SPIComponent(orgService, formBuilder, commonService) {
        this.orgService = orgService;
        this.formBuilder = formBuilder;
        this.commonService = commonService;
        this.cycles = [];
        this.spis = [];
        // this.orgService.getObjectives().subscribe((response: any) => {
        //   this.objectives = response;
        // });
        this.getCycles();
        this.getSpis();
        this.spiForm = this.inItSpi();
    }
    SPIComponent.prototype.ngAfterViewInit = function () {
    };
    SPIComponent.prototype.getCycles = function () {
        var _this = this;
        this.orgService.getCycleWithChildren().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
            }
        });
    };
    SPIComponent.prototype.getObjective = function (cycleId) {
        if (cycleId)
            this.objectives = this.cycles[cycleId].goals;
    };
    SPIComponent.prototype.getSpis = function () {
        var _this = this;
        this.orgService.getSpis().subscribe(function (res) {
            if (res.status == 204) {
                _this.spis = [];
            }
            else {
                _this.spis = res;
            }
        });
    };
    SPIComponent.prototype.inItSpi = function () {
        return this.formBuilder.group({
            "cycleId": ['', [forms_1.Validators.required]],
            "goalId": ['', [forms_1.Validators.required]],
            "spi": ['', [forms_1.Validators.required]],
            "measureUnit": ['', [forms_1.Validators.required]],
            "direction": [false, [forms_1.Validators.required]],
            "baseline": ['', [forms_1.Validators.required]],
            "approvalRequired": [false, [forms_1.Validators.required]],
            "remarks": [''],
            "helpText": ['']
        });
    };
    SPIComponent.prototype.updateSpi = function (goalId, spi) {
        this.spiForm.patchValue({
            "goalId": goalId,
            "spi": spi.spi,
            "measureUnit": spi.measureUnit,
            "direction": spi.direction,
            "baseline": spi.baseline,
            "approvalRequired": spi.approvalRequired,
            "remarks": spi.remarks,
            "helpText": spi.helpText
        });
    };
    SPIComponent.prototype.deleteSpi = function (spiId, spis, index) {
        if (confirm("SPi will be deleted permanently.."))
            this.orgService.deleteSpi(spiId).subscribe(function (response) {
                spis.splice(index, 1);
                console.log("success");
            });
    };
    SPIComponent.prototype.inItTarget = function () {
        var _this = this;
        var fa = [];
        this.commonService.getData('org_info').cycle.forEach(function (element) {
            fa.push(_this.inItTargetDigital(element));
        });
        return fa;
    };
    SPIComponent.prototype.inItTargetDigital = function (year) {
        return this.formBuilder.group({
            "year": [year, [forms_1.Validators.required]],
            "expectedLevel": ['', [forms_1.Validators.required]],
        });
    };
    SPIComponent.prototype.onSubmit = function () {
        var _this = this;
        delete this.spiForm.value["cycleId"];
        this.orgService.saveSpi(this.spiForm.value).subscribe(function (res) {
            _this.spiForm.reset();
            _this.getSpis();
        });
    };
    return SPIComponent;
}());
SPIComponent = __decorate([
    core_1.Component({
        selector: 'spi',
        templateUrl: './spi.component.html',
        styleUrls: ['./../planner.component.css']
    }),
    __metadata("design:paramtypes", [UTI_service_1.UniversityService,
        forms_1.FormBuilder,
        storage_service_1.StorageService])
], SPIComponent);
exports.SPIComponent = SPIComponent;
//# sourceMappingURL=spi.component.js.map