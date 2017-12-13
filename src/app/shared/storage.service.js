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
var StorageService = (function () {
    function StorageService() {
        // private url:string = "http://localhost:8080/strategyPlanningV3";
        this.baseUrl = "https://strategic-plannning.cloud.cms500.com/apiv2/";
    }
    StorageService.prototype.storeData = function (field_name, data) {
        if (field_name === "access_token")
            localStorage.setItem(field_name, data);
        else {
            localStorage.setItem(field_name, JSON.stringify(data));
        }
    };
    StorageService.prototype.getData = function (field_name) {
        var data = JSON.parse(localStorage.getItem(field_name));
        if (data) {
            return data;
        }
    };
    return StorageService;
}());
StorageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map