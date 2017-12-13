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
var storage_service_1 = require("../../../shared/storage.service");
var UTI_service_1 = require("../../../shared/UTI.service");
var InitialSetup = (function () {
    function InitialSetup(fb, st, utiService) {
        this.fb = fb;
        this.st = st;
        this.utiService = utiService;
        this.setupForm = this.fb.group({
            "mission": ['', [forms_1.Validators.required]],
            "vision": ['', [forms_1.Validators.required]],
            "values": this.fb.array([this.fb.group({
                    "title": ['', [forms_1.Validators.required]],
                    "description": ['', [forms_1.Validators.required]]
                })]),
            "universityId": this.st.getData('org_info').universityId
        });
    }
    InitialSetup.prototype.onSubmit = function () {
        this.utiService.saveInitialSetup(this.setupForm.value).subscribe(function (response) {
            console.log("success", response);
        });
    };
    InitialSetup.prototype.inItValue = function () {
        return this.fb.group({
            "title": ['', [forms_1.Validators.required]],
            "description": ['', [forms_1.Validators.required]]
        });
    };
    InitialSetup.prototype.removeValue = function (index) {
        var control = this.setupForm.controls['values'];
        control.removeAt(index);
    };
    InitialSetup.prototype.addValue = function () {
        var control = this.setupForm.controls['values'];
        control.push(this.inItValue());
    };
    return InitialSetup;
}());
InitialSetup = __decorate([
    core_1.Component({
        selector: 'initial-setup',
        templateUrl: './setup.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        storage_service_1.StorageService,
        UTI_service_1.UniversityService])
], InitialSetup);
exports.InitialSetup = InitialSetup;
//# sourceMappingURL=setup.component.js.map