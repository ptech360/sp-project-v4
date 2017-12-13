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
var storage_service_1 = require("./storage.service");
var default_header_service_1 = require("./default.header.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var UniversityService = (function () {
    function UniversityService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.baseUrl = "";
        this.child = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'child': true
            })
        });
        this.parent = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'parent': true
            })
        });
        this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
    }
    UniversityService.prototype.saveInitialSetup = function (data) {
        return this.http.post(this.baseUrl + "/initialSetup", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.saveCycle = function (cycle) {
        return this.http.post(this.baseUrl + "/cycle", cycle)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.addValue = function (val) {
        return this.http.post(this.baseUrl + "/values", val)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.updateValue = function (val, id) {
        return this.http.put(this.baseUrl + "/values/" + id, val)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.deleteValue = function (id) {
        return this.http.delete(this.baseUrl + "/values/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getUniversities = function () {
        return this.http.get(this.baseUrl + "/university")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.fetchOrganizationInfo = function () {
        return this.http.get(this.baseUrl + "/university")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getCycles = function () {
        return this.http.get(this.baseUrl + "/cycles")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getCycleWithChildren = function () {
        return this.http.get(this.baseUrl + "/cycles", this.child)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.deleteCycle = function (cycleId) {
        return this.http.delete(this.baseUrl + "/cycle/" + cycleId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.fetchObjectives = function (cycleId) {
        return this.http.get(this.baseUrl + "/cycle/" + cycleId + "/objective")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getObjectives = function () {
        return this.http.get(this.baseUrl + "/goals", this.child)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getObjectivesByCycleId = function (cycleId) {
        return this.http.get(this.baseUrl + "/goals?cycleId=" + cycleId, this.child)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getObjectivesWithHierarchy = function () {
        return this.http.get(this.baseUrl + "/objectives/all")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getInitiatives = function () {
        return this.http.get(this.baseUrl + "/initiatives", this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getInitiativesByCycleId = function (cycleId) {
        return this.http.get(this.baseUrl + "/initiatives?cycleId=" + cycleId, this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getActivities = function () {
        return this.http.get(this.baseUrl + "/activities", this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getActivitiesByCycleId = function (cycleId) {
        return this.http.get(this.baseUrl + "/activities?cycleId=" + cycleId, this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getMeasures = function () {
        return this.http.get(this.baseUrl + "/opis", this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getMeasuresByCycleId = function (cycleId) {
        return this.http.get(this.baseUrl + "/opis?cycleId=" + cycleId, this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.addObjective = function (objective) {
        return this.http.post(this.baseUrl + "/goal", objective)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.deleteObjective = function (id) {
        return this.http.delete(this.baseUrl + "/goal/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.updateObjective = function (id, object) {
        return this.http.put(this.baseUrl + "/goal/" + id, object)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.addInitiative = function (initiative) {
        return this.http.post(this.baseUrl + "/initiative", initiative)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.deleteInitiative = function (id) {
        return this.http.delete(this.baseUrl + "/initiative/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.updateInitiative = function (id, object) {
        return this.http.put(this.baseUrl + "/initiative/" + id, object)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.fetchInitiative = function (goalId) {
        return this.http.get(this.baseUrl + "/objective/" + goalId + "/initiative")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.fetchActivities = function (initId) {
        return this.http.get(this.baseUrl + "/initiative/" + initId + "/activity")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.deleteActivity = function (id) {
        return this.http.delete(this.baseUrl + "/activity/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.updateActivity = function (id, object) {
        return this.http.put(this.baseUrl + "/activity/" + id, object)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.fetchAssignedActivity = function (departmentIds) {
        return this.http.get(this.baseUrl + "/department/" + departmentIds + "/result")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.saveQuarteResult = function (data, quarterId) {
        return this.http.post(this.baseUrl + "/result", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.updateQuarteResult = function (data, resultId) {
        return this.http.put(this.baseUrl + "/result/" + resultId, data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.lockResult = function (resultId) {
        return this.http.put(this.baseUrl + "/result/" + resultId, { status: "locked" })
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.saveEvidence = function (data, resultId) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/result/" + resultId + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.saveComment = function (resultId, comment) {
        return this.http.post(this.baseUrl + "/result/" + resultId + "/discussion", comment)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.fetchDepartments = function () {
        return this.http.get(this.baseUrl + "/university/1/department")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.assignActivity = function (actId, departments) {
        return this.http.post(this.baseUrl + "/assign/activity/" + actId + "/departments", { 'departments': departments })
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.saveActivity = function (activity) {
        return this.http.post(this.baseUrl + "/activity", activity)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getSpis = function () {
        return this.http.get(this.baseUrl + "/spis", this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.saveSpi = function (spi) {
        return this.http.post(this.baseUrl + "/spi", spi)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.deleteSpi = function (spiId) {
        return this.http.delete(this.baseUrl + "/spi/" + spiId);
    };
    UniversityService.prototype.saveMeasure = function (measure) {
        return this.http.post(this.baseUrl + "/opi", measure)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.deleteMeasure = function (measureId) {
        return this.http.delete(this.baseUrl + "/opi/" + measureId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.updateMeasure = function (measureId, object) {
        return this.http.put(this.baseUrl + "/opi/" + measureId, object)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.updateMisionVision = function (object) {
        return this.http.put(this.baseUrl + "/university/" + this.con.getData('org_info').universityId, object)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getQuarter = function () {
        return this.http.get(this.baseUrl + "/quarters")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getDepartments = function () {
        return this.http.get(this.baseUrl + "/department")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.assignMeasure = function (measureId, departments) {
        return this.http.post(this.baseUrl + "/assign/opi/" + measureId + "/departments", { 'departments': departments })
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.assignOpi = function (opiId, departments) {
        return this.http.post(this.baseUrl + "/assign/opi/" + opiId + "/departments", departments)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.getEvidenceForms = function () {
        return this.http.get(this.baseUrl + "/evidenceForms")
            .map(this.extractData)
            .catch(this.handleError);
    };
    UniversityService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    UniversityService.prototype.handleError = function (error) {
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
    return UniversityService;
}());
UniversityService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [default_header_service_1.CustomHttpService,
        http_1.Http,
        storage_service_1.StorageService])
], UniversityService);
exports.UniversityService = UniversityService;
//# sourceMappingURL=UTI.service.js.map