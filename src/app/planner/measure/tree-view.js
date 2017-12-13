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
var TreeView = (function () {
    function TreeView() {
        this.onSelected = new core_1.EventEmitter();
    }
    TreeView.prototype.ngAfterViewInit = function () {
    };
    TreeView.prototype.department = function (event) {
        this.onSelected.emit(event);
    };
    return TreeView;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TreeView.prototype, "treeData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TreeView.prototype, "assignedDepartment", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TreeView.prototype, "onSelected", void 0);
TreeView = __decorate([
    core_1.Component({
        selector: 'tree-view',
        template: "\n  <ul style=\"list-style:none;\">\n    <li *ngFor=\"let node of treeData;let i=index;\">\n      <div class=\"checkbox\">\n        <label><input type=\"checkbox\" [(ngModel)]=\"node.my\" (change)=\"department(node)\">{{node.department}}</label>\n      </div>      \n      <tree-view [assignedDepartment]=\"assignedDepartment\" [treeData]=\"node.reporteeDepartments\" (onSelected)=\"department($event)\"></tree-view>\n    </li>\n  </ul>\n  "
    }),
    __metadata("design:paramtypes", [])
], TreeView);
exports.TreeView = TreeView;
//# sourceMappingURL=tree-view.js.map