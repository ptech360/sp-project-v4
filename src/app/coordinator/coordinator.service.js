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
var CoordinatorService = (function () {
    function CoordinatorService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.baseUrl = "";
        this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
    }
    CoordinatorService.prototype.getOpiByDeptId = function (deptId) {
        return this.http.get(this.baseUrl + "/department/" + deptId + "/result")
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterResult = function (data) {
        return this.http.post(this.baseUrl + "/result", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterWithInternship = function (quarterId, data) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/quarter/" + quarterId + "/studentInternshipForm", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateQuarterResult = function (quarterId, data) {
        return this.http.put(this.baseUrl + "/quarter/" + quarterId + "/lock", {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidence = function (data, quarterId) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/quarter/" + quarterId + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidenceForInternshipFile = function (data, id) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/internship/" + id + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteInternshipFile = function (internshipFileId) {
        return this.http.delete(this.baseUrl + "/internship/" + internshipFileId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteInternshipEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/internship/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidenceForMou = function (data, id) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/mous/" + id + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteMou = function (mouResultId) {
        return this.http.delete(this.baseUrl + "/mous/" + mouResultId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteMouEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/mous/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterResultWithMou = function (quarterId, data) {
        return this.http.post(this.baseUrl + "/quarter/" + quarterId + "/mous", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateMou = function (mouId, mou) {
        return this.http.put(this.baseUrl + "/mous/" + mouId, mou)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    CoordinatorService.prototype.handleError = function (error) {
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
    return CoordinatorService;
}());
CoordinatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [default_header_service_1.CustomHttpService, http_1.Http,
        storage_service_1.StorageService])
], CoordinatorService);
exports.CoordinatorService = CoordinatorService;
//# sourceMappingURL=coordinator.service.js.map