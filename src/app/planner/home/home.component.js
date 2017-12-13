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
var HomeComponent = (function () {
    function HomeComponent(commonService, orgSer) {
        this.commonService = commonService;
        this.orgSer = orgSer;
        this.valueForm = new forms_1.FormGroup({
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            description: new forms_1.FormControl('', forms_1.Validators.required),
        });
        this.missionVisionForm = new forms_1.FormGroup({
            description: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.organizationInfo = this.commonService.getData('org_info');
    };
    HomeComponent.prototype.onValueSubmit = function () {
        var _this = this;
        if (this.selectedValue) {
            this.orgSer.updateValue(this.valueForm.value, this.selectedValue.valueId)
                .subscribe(function (res) {
                _this.valueForm.value["id"] = _this.selectedValue.valueId;
                _this.organizationInfo.values[_this.selectedValueIndex] = _this.valueForm.value;
                _this.commonService.storeData('org_info', _this.organizationInfo);
                $('#valueForm').modal('hide');
                _this.valueForm.reset();
            });
        }
        else {
            this.valueForm.value["universityId"] = this.organizationInfo.universityId;
            this.orgSer.addValue([this.valueForm.value]).subscribe(function (res) {
                _this.organizationInfo.values.push(_this.valueForm.value);
                $('#valueForm').modal('hide');
                _this.valueForm.reset();
            });
        }
    };
    HomeComponent.prototype.deleteValue = function (val, index) {
        var _this = this;
        console.log("asddfadsfdsfds adsf ");
        this.orgSer.deleteValue(val.valueId).subscribe(function (res) {
            _this.organizationInfo.values.splice(index, 1);
        });
    };
    HomeComponent.prototype.onValueSelected = function (val, index) {
        this.valueForm.controls["title"].patchValue(val.title);
        this.valueForm.controls["description"].patchValue(val.description);
        this.selectedValue = val;
        this.selectedValueIndex = index;
    };
    HomeComponent.prototype.editMisionVision = function (title, mvDesc) {
        this.missionVision = title;
        this.missionVisionForm.controls["description"].patchValue(mvDesc);
    };
    HomeComponent.prototype.onMissionVisionSubmit = function () {
        var _this = this;
        var org_info = this.commonService.getData('org_info');
        var object = {};
        object[this.missionVision] = this.missionVisionForm.value['description'];
        console.log(object);
        this.orgSer.updateMisionVision(object).subscribe(function (res) {
            _this.organizationInfo[_this.missionVision] = _this.missionVisionForm.value['description'];
            org_info[_this.missionVision] = _this.missionVisionForm.value['description'];
            _this.commonService.storeData('org_info', org_info);
            $('#missionVisionForm').modal('hide');
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'planner-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [storage_service_1.StorageService, UTI_service_1.UniversityService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map