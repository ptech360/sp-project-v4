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
var UTI_service_1 = require("../../shared/UTI.service");
var forms_1 = require("@angular/forms");
var storage_service_1 = require("../../shared/storage.service");
var MeasureComponent = (function () {
    function MeasureComponent(orgService, zone, formBuilder, commonService) {
        var _this = this;
        this.orgService = orgService;
        this.zone = zone;
        this.formBuilder = formBuilder;
        this.commonService = commonService;
        this.objectives = [];
        this.initiatives = [];
        this.activities = [];
        this.departments = [];
        this.departmentsCopy = [];
        this.evidenceForms = [];
        this.isUpdating = false;
        this.cycles = [];
        this.goals = [];
        this.goalsCopy = [];
        this.direction = {
            true: 'Upward',
            false: 'Downward'
        };
        this.prev = true;
        this.next = false;
        this.quarter = ["Q1", "Q2", "Q3", "Q4"];
        this.quarters = [
            {
                "id": 1,
                "endDate": "31/03/",
                "startDate": "01/01/",
                "quarter": "q1"
            },
            {
                "id": 2,
                "endDate": "31/06/",
                "startDate": "01/04/",
                "quarter": "q2"
            },
            {
                "id": 3,
                "endDate": "31/09/",
                "startDate": "01/07/",
                "quarter": "q3"
            },
            {
                "id": 4,
                "endDate": "31/12/",
                "startDate": "01/10/",
                "quarter": "q4"
            }
        ];
        this.selectedQuarter = 0;
        // assignDepartment() {
        //   this.orgService.assignMeasure(this.selectedMeasureId, this.departmentIds).subscribe((res: any) => {
        //     this.getMeasure();
        //     $('#myModal').modal('hide');
        //   })
        // }
        // public departmentIds: any[] = [];
        this.selectedDepartments = [];
        this.measureForm = this.setMeasure();
        this.orgService.getCycleWithChildren().subscribe(function (response) {
            _this.cycles = response;
            _this.cycles.forEach(function (element) {
                if (element.defaultCycle)
                    _this.defaultCycle = element.cycleId;
            });
            _this.getMeasure();
            _this.getEvidenceForms();
        });
    }
    MeasureComponent.prototype.ngOnInit = function () {
        // this.getQuarter();
        this.getDepartments();
    };
    MeasureComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        // $("#myModal").on('hidden.bs.modal', function (e: any) {
        //   $(this).find("input[type=checkbox], input[type=radio]")
        //     .prop("checked", "")
        //     .end();
        // });
    };
    MeasureComponent.prototype.getObjective = function (cycleId) {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (element.cycleId == cycleId) {
                _this.objectives = element.goals;
                return;
            }
        });
    };
    MeasureComponent.prototype.search = function (key) {
        this.goals = JSON.parse(JSON.stringify(this.goalsCopy));
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goalsCopy.filter(function (item) {
                return (item.goal.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            this.filteredGoals = this.goals;
        }
    };
    MeasureComponent.prototype.searchInitiative = function (key) {
        var _this = this;
        this.goals = JSON.parse(JSON.stringify(this.filteredGoals));
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goals.filter(function (outerItem) {
                outerItem.initiatives = outerItem.initiatives.filter(function (item) {
                    return (item.initiative.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
                _this.filteredInitiatives = _this.goals;
                return outerItem.initiatives.length;
            });
        }
    };
    MeasureComponent.prototype.searchActivity = function (key) {
        var _this = this;
        this.goals = JSON.parse(JSON.stringify(this.filteredInitiatives));
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goals.filter(function (outerItem) {
                outerItem.initiatives = outerItem.initiatives.filter(function (innerItem) {
                    innerItem.activities = innerItem.activities.filter(function (item) {
                        return (item.activity.toLowerCase().indexOf(val.toLowerCase()) > -1);
                    });
                    return innerItem.activities.length;
                });
                _this.filteredActivities = _this.goals;
                return outerItem.initiatives.length;
            });
        }
    };
    MeasureComponent.prototype.searchOpi = function (key) {
        this.goals = JSON.parse(JSON.stringify(this.filteredActivities));
        var val = key.target.value;
        if (val && val.trim() != '') {
            this.goals = this.goals.filter(function (outerItem) {
                outerItem.initiatives = outerItem.initiatives.filter(function (innerItem) {
                    innerItem.activities = innerItem.activities.filter(function (item) {
                        item.opis = item.opis.filter(function (inItem) {
                            return (inItem.opi.toLowerCase().indexOf(val.toLowerCase()) > -1);
                        });
                        return item.opis.length;
                    });
                    return innerItem.activities.length;
                });
                return outerItem.initiatives.length;
            });
        }
    };
    MeasureComponent.prototype.getInitiative = function (objId) {
        var _this = this;
        if (objId) {
            this.objectives.forEach(function (element) {
                if (element.goalId == objId) {
                    _this.initiatives = element.initiatives;
                    return;
                }
            });
        }
        else {
            this.objectives = [];
        }
    };
    MeasureComponent.prototype.getActivities = function (initId) {
        var _this = this;
        if (initId) {
            this.initiatives.forEach(function (element) {
                if (element.initiativeId == initId) {
                    _this.activities = element.activities;
                    return;
                }
            });
        }
        else {
            this.objectives = [];
        }
    };
    MeasureComponent.prototype.getMeasure = function () {
        var _this = this;
        this.orgService.getMeasuresByCycleId(this.defaultCycle).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.filteredActivities = response;
                _this.filteredGoals = response;
                _this.filteredInitiatives = response;
                _this.filteredOpis = response;
            }
        });
    };
    MeasureComponent.prototype.getQuarter = function () {
        var _this = this;
        this.orgService.getQuarter().subscribe(function (res) {
            _this.quarters = res;
        });
    };
    MeasureComponent.prototype.getDepartments = function () {
        var _this = this;
        // this.departmentIds = [];
        this.orgService.getDepartments().subscribe(function (res) {
            _this.departments = res;
            _this.departmentsCopy = res;
        });
    };
    MeasureComponent.prototype.department = function (event) {
        this.travers(event, event.my);
    };
    MeasureComponent.prototype.checkAssignDept = function (assignedDepartments) {
        var _this = this;
        this.selectedDepartments = [];
        this.departments = JSON.parse(JSON.stringify(this.departmentsCopy));
        assignedDepartments.forEach(function (outerElement) {
            _this.departments.forEach(function (innerElement) {
                _this.searchDepartment(innerElement, outerElement);
            });
        });
    };
    MeasureComponent.prototype.searchDepartment = function (department, assigneddepartment) {
        var _this = this;
        if (!department) {
            return;
        }
        else {
            if (department.departmentId == assigneddepartment.departmentId) {
                department.baseline = assigneddepartment.baseline;
                department.opiAnnualTargets = assigneddepartment.opiAnnualTargets;
                department.my = true;
                department.isUpdating = true;
                console.log(department);
                this.selectedDepartments.push(department);
            }
            else {
                if (department.reporteeDepartments)
                    department.reporteeDepartments.forEach(function (element) {
                        _this.searchDepartment(element, assigneddepartment);
                    });
            }
        }
    };
    MeasureComponent.prototype.travers = function (department, checked) {
        var _this = this;
        if (!department) {
            return;
        }
        else {
            if (checked) {
                department.my = true;
                this.selectedDepartments.push(department);
            }
            else {
                department.my = false;
                this.selectedDepartments.splice(this.selectedDepartments.indexOf(department), 1);
            }
            if (department.reporteeDepartments)
                department.reporteeDepartments.forEach(function (element) {
                    _this.travers(element, checked);
                });
        }
    };
    MeasureComponent.prototype.assignDepartment = function () {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (_this.defaultCycle == element.cycleId)
                _this.cycle = element.cycle;
        });
        this.departmentForm = this.formBuilder.group({
            departmentsArray: this.formBuilder.array(this.getDepartmentFormArray())
        });
    };
    MeasureComponent.prototype.assign = function () {
        var _this = this;
        var departmentsArray = this.departmentForm.controls["departmentsArray"].value;
        departmentsArray.forEach(function (element) {
            delete element["departmentName"];
        });
        if (confirm("Do you really want to assign this OPI"))
            this.orgService.assignOpi(this.selectedMeasure.opiId, departmentsArray).subscribe(function (response) {
                departmentsArray.forEach(function (element) {
                    _this.selectedMeasure.assignedDepartments.push(departmentsArray);
                });
                $('#myModal').modal('hide');
            });
    };
    MeasureComponent.prototype.getDepartmentFormArray = function () {
        var _this = this;
        var departmentsFormArray = [];
        this.selectedDepartments.forEach(function (element) {
            departmentsFormArray.push(_this.formBuilder.group({
                baseline: [element.baseline],
                departmentId: [element.departmentId],
                departmentName: [element.department],
                opiAnnualTargets: _this.formBuilder.array(_this.setAnnualTarget(element.opiAnnualTargets))
            }));
        });
        return departmentsFormArray;
    };
    MeasureComponent.prototype.setAnnualTarget = function (opiAnnualTargets) {
        var _this = this;
        var annualTarget = [];
        if (opiAnnualTargets)
            opiAnnualTargets.forEach(function (element) {
                annualTarget.push(_this.inItTargetWithLevels(element));
            });
        else
            this.cycle.forEach(function (element) {
                annualTarget.push(_this.inItTargetIn(element));
            });
        return annualTarget;
    };
    MeasureComponent.prototype.inItTargetIn = function (year) {
        return this.formBuilder.group({
            "year": [year, [forms_1.Validators.required]],
            "levels": this.formBuilder.array(this.setLevels(this.selectedMeasure.frequencyId)),
            "estimatedCost": ['', [forms_1.Validators.required]]
        });
    };
    MeasureComponent.prototype.inItTargetWithLevels = function (annualTarget) {
        return this.formBuilder.group({
            "year": [annualTarget.year, [forms_1.Validators.required]],
            "levels": this.formBuilder.array(this.setLevelsWithValue(annualTarget.levels)),
            "estimatedCost": [annualTarget.estimatedCost, [forms_1.Validators.required]]
        });
    };
    MeasureComponent.prototype.setLevelsWithValue = function (levels) {
        var _this = this;
        var quarterLevel = [];
        levels.forEach(function (element) {
            quarterLevel.push(_this.formBuilder.group({
                quarterId: element.quarterId,
                estimatedTargetLevel: element.estimatedTargetLevel
            }));
        });
        return quarterLevel;
    };
    MeasureComponent.prototype.setLevels = function (count) {
        var levels = [];
        if (count == 3)
            count++;
        for (var i = 0; i < count; i++) {
            if (count == 2)
                levels.push(this.getLevel(2 * i + 1));
            else if (count == 1)
                levels.push(this.getLevel(3));
            else
                levels.push(this.getLevel(i));
        }
        return levels;
    };
    MeasureComponent.prototype.getLevel = function (q) {
        return this.formBuilder.group({
            quarterId: this.quarters[q].id,
            estimatedTargetLevel: [0]
        });
    };
    MeasureComponent.prototype.setMeasure = function () {
        return this.formBuilder.group({
            "cycleId": [{ value: '', disabled: false }, [forms_1.Validators.required]],
            "objectiveId": [{ value: '', disabled: false }, [forms_1.Validators.required]],
            "initiativeId": [{ value: '', disabled: false }, [forms_1.Validators.required]],
            "activityId": [{ value: '', disabled: false }, [forms_1.Validators.required]],
            "opi": [{ value: '' }, [forms_1.Validators.required]],
            "frequencyId": [1, [forms_1.Validators.required]],
            "measureUnit": ['', [forms_1.Validators.required]],
            "evidanceFormId": ['', []],
            "direction": [false, [forms_1.Validators.required]],
            "approvalRequired": [false, [forms_1.Validators.required]],
            "remarks": ['', [forms_1.Validators.required]],
            "helpText": ['', [forms_1.Validators.required]]
        });
    };
    MeasureComponent.prototype.submitMeasure = function () {
        var _this = this;
        var formChanges = {};
        var msg = "";
        delete this.measureForm.value["cycleId"];
        delete this.measureForm.value["objectiveId"];
        delete this.measureForm.value["initiativeId"];
        if (!this.isUpdating) {
            this.orgService.saveMeasure(this.measureForm.value).subscribe(function (response) {
                _this.getMeasure();
                $('#measureModal').modal('show');
                _this.measureForm.reset({
                    opi: '',
                    measureUnit: '', frequencyId: 1, baseline: '', direction: '', remarks: '', helpText: '', approvalRequired: ''
                });
            }, function (error) {
                console.log(error);
            });
        }
        else {
            Object.keys(this.measureForm.value).forEach(function (key) {
                if (_this.selectedMeasure[key] != _this.measureForm.value[key]) {
                    formChanges[key] = _this.measureForm.value[key];
                    msg += "\n" + key + " = " + formChanges[key] + ",";
                }
            });
            if (confirm("Are you sure you want to update this OPI as " + msg)) {
                delete this.measureForm.value["activityId"];
                this.orgService.updateMeasure(this.selectedMeasure.opiId, formChanges).subscribe(function (response) {
                    _this.measureForm.reset();
                    _this.getMeasure();
                });
            }
        }
    };
    MeasureComponent.prototype.updateMeasure = function (objective, initiative, activity, measure) {
        this.measureForm.controls["cycleId"].disable();
        this.measureForm.controls["objectiveId"].disable();
        this.measureForm.controls["initiativeId"].disable();
        this.measureForm.controls["activityId"].disable();
        this.isUpdating = true;
        this.selectedMeasure = measure;
        this.measureForm.patchValue({
            cycleId: this.defaultCycle,
            objectiveId: objective.goalId,
            initiativeId: initiative.initiativeId,
            activityId: activity.activityId,
            opi: measure.opi,
            measureUnit: measure.measureUnit,
            frequencyId: measure.frequencyId,
            baseline: measure.baselineOfOpi,
            evidanceFormId: measure.evidanceFormId,
            direction: measure.direction,
            remarks: measure.remarks,
            helpText: measure.helpText,
            approvalRequired: measure.approvalRequired
        });
        $('#collapse1').collapse('show');
        // this.measureForm.controls["annualTarget"].patchValue(measure.annualTarget);
    };
    MeasureComponent.prototype.enableFields = function () {
        this.measureForm.controls["cycleId"].enable();
        this.measureForm.controls["objectiveId"].enable();
        this.measureForm.controls["initiativeId"].enable();
        this.measureForm.controls["activityId"].enable();
        this.measureForm.reset();
    };
    MeasureComponent.prototype.nextForm = function () {
    };
    MeasureComponent.prototype.deleteMeasure = function (measureId, measures, index) {
        var _this = this;
        if (confirm("Are you sure you want to delete this Measure?"))
            this.orgService.deleteMeasure(measureId).subscribe(function (res) {
                console.log(res);
                // measures.splice(index, 1);
                _this.getMeasure();
            });
    };
    MeasureComponent.prototype.getRowSpan = function (array) {
        var rowSpan = 1;
        rowSpan += array.length;
        array.forEach(function (element) {
            rowSpan += element.activities.length;
            element.activities.forEach(function (innerElement) {
                rowSpan += innerElement.measures.length;
            });
        });
        if (rowSpan == 1)
            return rowSpan + 1;
        return rowSpan;
    };
    MeasureComponent.prototype.getRowSpanOfIni = function (array) {
        var rowSpan = 1;
        rowSpan += array.length * 2;
        array.forEach(function (innerElement) {
            rowSpan += innerElement.measures.length;
        });
        return rowSpan;
    };
    MeasureComponent.prototype.getEvidenceForms = function () {
        var _this = this;
        this.orgService.getEvidenceForms().subscribe(function (response) {
            _this.evidenceForms = response;
        });
    };
    return MeasureComponent;
}());
MeasureComponent = __decorate([
    core_1.Component({
        selector: 'measure',
        templateUrl: './measure.html',
        styleUrls: ['./measure.css', './../planner.component.css']
    }),
    __metadata("design:paramtypes", [UTI_service_1.UniversityService,
        core_1.NgZone,
        forms_1.FormBuilder, storage_service_1.StorageService])
], MeasureComponent);
exports.MeasureComponent = MeasureComponent;
//# sourceMappingURL=measure.js.map