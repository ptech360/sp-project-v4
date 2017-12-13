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
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var default_header_service_1 = require("../shared/default.header.service");
var storage_service_1 = require("../shared/storage.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var AdminService = (function () {
    function AdminService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.baseUrl = "";
        this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
    }
    AdminService.prototype.getDepartments = function () {
        return this.http.get(this.baseUrl + "/department")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.getRoles = function () {
        return this.http.get(this.baseUrl + "/role")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.getUniversity = function () {
        return this.http.get(this.baseUrl + "/university")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addUniversity = function (data) {
        return this.http.post(this.baseUrl + "/university", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addDepartment = function (department) {
        return this.http.post(this.baseUrl + "/department", department)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addEmployee = function (employee) {
        return this.http.post(this.baseUrl + "/employee", employee)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.getEmployee = function () {
        return this.http.get(this.baseUrl + "/employee")
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.addRole = function (role) {
        return this.http.post(this.baseUrl + "/role", role)
            .map(this.extractData)
            .catch(this.handleError);
    };
    AdminService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    AdminService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            if (error.status === 0) {
                errMsg = error.status + " - \"Something is wrong..\"";
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    return AdminService;
}());
AdminService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
        http_1.Http,
        storage_service_1.StorageService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map