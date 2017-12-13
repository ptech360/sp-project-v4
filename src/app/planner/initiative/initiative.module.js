"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var initiative_1 = require("./initiative");
var router_1 = require("@angular/router");
var shared_module_1 = require("../../shared/shared.module");
var my_filter_pipe_1 = require("./my-filter.pipe");
var InitiativeModule = (function () {
    function InitiativeModule() {
    }
    return InitiativeModule;
}());
InitiativeModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([{
                    path: '', component: initiative_1.InitiativeComponent
                }])],
        providers: [],
        declarations: [initiative_1.InitiativeComponent, my_filter_pipe_1.MyFilterPipe],
    })
], InitiativeModule);
exports.InitiativeModule = InitiativeModule;
//# sourceMappingURL=initiative.module.js.map