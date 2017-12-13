"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var coordinator_service_1 = require("../coordinator.service");
var storage_service_1 = require("../../shared/storage.service");
var forms_1 = require("@angular/forms");
var filters_1 = require("../../shared/filters");
var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(utServ, storage) {
        var _this = _super.call(this) || this;
        _this.utServ = utServ;
        _this.storage = storage;
        _this.evidences = [];
        _this.isUpdating = false;
        _this.getOpi();
        _this.evidencForm = new forms_1.FormGroup({
            title: new forms_1.FormControl('', [forms_1.Validators.required]),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            files: new forms_1.FormControl('', [forms_1.Validators.required])
        });
        return _this;
    }
    HomeComponent.prototype.getOpi = function () {
        var _this = this;
        this.utServ.getOpiByDeptId(this.storage.getData('user_roleInfo')[0].departmentId).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.initFilters(_this.goalsCopy);
            }
        });
    };
    HomeComponent.prototype.showOpi = function (goal, measure) {
        $('#edit-section').collapse('show');
        console.log(goal);
    };
    HomeComponent.prototype.saveQuarterResult = function (quarter) {
        if (!quarter.isUpdating) {
            var object = {
                'quarterId': quarter.id,
                'currentCost': quarter.currentCost,
                'currentTargetLevel': quarter.currentTargetLevel,
            };
            this.utServ.saveQuarterResult(object).subscribe(function (response) {
                console.log(response);
                quarter.status = 'inprogress';
            });
        }
        else {
            var object_1 = {
                'currentCost': quarter.currentCost,
                'currentTargetLevel': quarter.currentTargetLevel,
            };
            this.utServ.updateQuarterResult(quarter.id, object_1).subscribe(function (response) {
                console.log(response);
            });
        }
    };
    HomeComponent.prototype.saveQuarterResultWithMou = function (lev) {
        var _this = this;
        var object = {
            "currentCost": lev.currentCost,
            "mouType": lev.mouType,
            "organization": lev.organization
        };
        this.utServ.saveQuarterResultWithMou(lev.id, object).subscribe(function (response) {
            _this.getOpi();
        });
    };
    HomeComponent.prototype.updateMou = function (mou) {
        var object = {
            // "mouResultId": mou.id,
            "mouType": mou.mouType,
            "organization": mou.organization
        };
        this.utServ.updateMou(mou.id, object).subscribe(function (response) {
            mou.edit = false;
        });
    };
    HomeComponent.prototype.deleteMou = function (mous, mou, index) {
        if (confirm("Are you sure you want to delete this mou"))
            this.utServ.deleteMou(mou.id).subscribe(function (response) {
                mous.splice(index, 1);
            });
    };
    HomeComponent.prototype.lockQuarterResult = function (quarter) {
        this.utServ.updateQuarterResult(quarter.id, { 'status': 'locked' }).subscribe(function (response) {
            console.log(response);
        });
    };
    HomeComponent.prototype.deleteEvidence = function (evidences, evidence, index) {
        if (confirm("Are you sure you want to delete this evidence"))
            this.utServ.deleteEvidence(evidence.id).subscribe(function (response) {
                evidences.splice(index, 1);
            });
    };
    HomeComponent.prototype.deleteInternshipEvidence = function (evidences, evidence, index) {
        this.utServ.deleteInternshipEvidence(evidence.id).subscribe(function (response) {
            console.log("success");
        });
    };
    HomeComponent.prototype.getFile = function (event) {
        this.file = event.srcElement.files[0];
    };
    HomeComponent.prototype.onEvidenceSubmit = function (evForm) {
        var _this = this;
        console.log(evForm);
        var formData = new FormData();
        formData.append('title', this.evidencForm.value['title']);
        formData.append('description', this.evidencForm.value['description']);
        formData.append('file', this.file);
        switch (evForm) {
            case 0:
                this.utServ.saveEvidence(formData, this.selectedQuarter.id).subscribe(function (res) {
                    if (!_this.selectedQuarter.evidance)
                        _this.selectedQuarter.evidance = [];
                    _this.selectedQuarter.evidance.push(res);
                    $('#evidenceForm').modal('hide');
                });
                break;
            case 1:
                this.utServ.saveEvidenceForInternshipFile(formData, this.selectedInternshipFile.id).subscribe(function (response) {
                    _this.selectedInternshipFile.evidance.push(response);
                    $('#evidenceForm').modal('hide');
                });
                break;
            case 2:
                this.utServ.saveEvidenceForMou(formData, this.selectedMou.id).subscribe(function (response) {
                    _this.selectedMou.evidance.push(response);
                    $('#evidenceForm').modal('hide');
                });
                break;
        }
    };
    HomeComponent.prototype.saveInternshipForm = function (lev) {
        var formData = new FormData();
        // formData.append('internshipEvidance',lev.internshipEvidance);
        formData.append('internshipFile', lev.internshipFile);
        formData.append('currentCost', lev.currentCost);
        console.log(formData);
        this.utServ.saveQuarterWithInternship(lev.id, formData).subscribe(function (response) {
            lev.internshipDetails = response.internshipDetails;
        });
    };
    HomeComponent.prototype.deleteInternshipFile = function (files, file, index) {
        if (confirm("Are you sure you want to delete this file"))
            this.utServ.deleteInternshipFile(file.id).subscribe(function (response) {
                files.splice(index, 1);
            });
    };
    return HomeComponent;
}(filters_1.Filters));
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css'],
        providers: [coordinator_service_1.CoordinatorService]
    }),
    __metadata("design:paramtypes", [coordinator_service_1.CoordinatorService,
        storage_service_1.StorageService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map