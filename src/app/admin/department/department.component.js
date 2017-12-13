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
var admin_service_1 = require("../admin.service");
var storage_service_1 = require("../../shared/storage.service");
var DeparmtmentComponent = (function () {
    function DeparmtmentComponent(formBuilder, adminService, cs) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.adminService = adminService;
        this.cs = cs;
        this.departments = [];
        adminService.getDepartments().subscribe(function (response) {
            if (response.status === 204) {
                _this.departments = [];
            }
            else {
                console.log(response);
                _this.departments = response;
            }
        }, function (err) {
            _this.departments = [];
            console.log(err);
        });
        adminService.getUniversity().subscribe(function (response) {
            if (response.status === 204) {
                _this.university = [];
                alert("There is not university Entry yet.\nFirst Feed the entries of University");
            }
            else {
                console.log(response);
                _this.university = response;
            }
        }, function (err) {
            _this.university = [];
            console.log(err);
        });
        this.newDepartment = this.formBuilder.group({
            "department": ['', [forms_1.Validators.required]],
            "parentDepartmentId": [-1, [forms_1.Validators.required]]
        });
    }
    DeparmtmentComponent.prototype.onSubmit = function () {
        var _this = this;
        this.newDepartment.value['universityId'] = this.cs.getData('org_info').id;
        if (this.newDepartment.value['parentDepartmentId'] == -1) {
            delete this.newDepartment.value['parentDepartmentId'];
        }
        this.adminService.addDepartment(this.newDepartment.value).subscribe(function (res) {
            _this.departments.push(res);
            $('#deptModal').modal('show');
            _this.newDepartment.reset();
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    return DeparmtmentComponent;
}());
DeparmtmentComponent = __decorate([
    core_1.Component({
        selector: 'department',
        templateUrl: './department.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        admin_service_1.AdminService,
        storage_service_1.StorageService])
], DeparmtmentComponent);
exports.DeparmtmentComponent = DeparmtmentComponent;
//# sourceMappingURL=department.component.js.map