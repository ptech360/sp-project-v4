"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var planner_component_1 = require("./planner.component");
var router_1 = require("@angular/router");
var planner_service_1 = require("./planner.service");
var UTI_service_1 = require("../shared/UTI.service");
var storage_service_1 = require("../shared/storage.service");
var default_header_service_1 = require("../shared/default.header.service");
var shared_module_1 = require("../shared/shared.module");
var PlannerModule = (function () {
    function PlannerModule() {
    }
    return PlannerModule;
}());
PlannerModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                {
                    path: '',
                    component: planner_component_1.PlannerComponent,
                    children: [
                        {
                            path: 'home',
                            loadChildren: 'app/planner/home/home.module#HomeModule'
                        },
                        { path: 'strategic-plan', loadChildren: 'app/planner/plan/plan.module#PlanModule' },
                        { path: 'strategic-goal', loadChildren: 'app/planner/goal/goal.module#GoalModule' },
                        { path: 'initiatives', loadChildren: 'app/planner/initiative/initiative.module#InitiativeModule' },
                        { path: 'activities', loadChildren: 'app/planner/activity/activity.module#ActivityModule' },
                        { path: 'measures', loadChildren: 'app/planner/measure/measure.module#MeasureModule' },
                        { path: 'spi', loadChildren: 'app/planner/spi/spi.module#SPIModule' }
                    ]
                },
            ])],
        providers: [planner_service_1.PlannerService, UTI_service_1.UniversityService, storage_service_1.StorageService, default_header_service_1.CustomHttpService],
        declarations: [planner_component_1.PlannerComponent],
    })
], PlannerModule);
exports.PlannerModule = PlannerModule;
//# sourceMappingURL=planner.module.js.map