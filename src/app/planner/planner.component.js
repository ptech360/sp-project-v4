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
var storage_service_1 = require("../shared/storage.service");
var UTI_service_1 = require("../shared/UTI.service");
var router_1 = require("@angular/router");
var PlannerComponent = (function () {
    function PlannerComponent(stogareService, utiService, router) {
        this.stogareService = stogareService;
        this.utiService = utiService;
        this.router = router;
        this.fetchOrganizationInfo();
        // this.router.navigateByUrl("/planner/home");
    }
    PlannerComponent.prototype.fetchOrganizationInfo = function () {
        var _this = this;
        this.utiService.fetchOrganizationInfo().subscribe(function (res) {
            _this.stogareService.storeData("org_info", res);
        }, function (err) {
        });
    };
    PlannerComponent.prototype.logout = function () {
        localStorage.clear();
    };
    return PlannerComponent;
}());
PlannerComponent = __decorate([
    core_1.Component({
        selector: 'app-planner',
        templateUrl: './planner.component.html',
        styleUrls: ['./planner.component.css']
    }),
    __metadata("design:paramtypes", [storage_service_1.StorageService,
        UTI_service_1.UniversityService,
        router_1.Router])
], PlannerComponent);
exports.PlannerComponent = PlannerComponent;
//# sourceMappingURL=planner.component.js.map