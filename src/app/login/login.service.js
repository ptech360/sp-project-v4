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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var storage_service_1 = require("../shared/storage.service");
var CredentialService = (function () {
    function CredentialService(http, storageService) {
        this.http = http;
        this.storageService = storageService;
        this.baseUrl = "https://strategic-plannning.cloud.cms500.com/apiv2";
        this.login = false;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('access_token');
    }
    CredentialService.prototype.resetLoginStatus = function () {
        this.login = false;
    };
    CredentialService.prototype.isLoggedIn = function () {
        var access_token = localStorage.getItem("access_token");
        if (access_token) {
            return !this.login;
        }
        else {
            return this.login;
        }
    };
    CredentialService.prototype.verifyUser = function (data) {
        return this.http.post(this.baseUrl + "/login", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CredentialService.prototype.logOut = function () {
        localStorage.clear();
    };
    CredentialService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    CredentialService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.status);
    };
    return CredentialService;
}());
CredentialService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, storage_service_1.StorageService])
], CredentialService);
exports.CredentialService = CredentialService;
//# sourceMappingURL=login.service.js.map