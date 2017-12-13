"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var coordinator_component_1 = require("./coordinator.component");
var router_1 = require("@angular/router");
var storage_service_1 = require("../shared/storage.service");
var default_header_service_1 = require("../shared/default.header.service");
var shared_module_1 = require("../shared/shared.module");
var CoordinatorModule = (function () {
    function CoordinatorModule() {
    }
    return CoordinatorModule;
}());
CoordinatorModule = __decorate([
    core_1.NgModule({
        imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild([
                {
                    path: '',
                    redirectTo: 'home',
                    pathMatch: 'full'
                },
                {
                    path: '',
                    component: coordinator_component_1.CoordinatorComponent,
                    children: [
                        {
                            path: 'home',
                            loadChildren: 'app/coordinator/home/home.module#HomeModule'
                        }
                    ]
                },
            ])],
        providers: [storage_service_1.StorageService, default_header_service_1.CustomHttpService],
        declarations: [coordinator_component_1.CoordinatorComponent],
    })
], CoordinatorModule);
exports.CoordinatorModule = CoordinatorModule;
//# sourceMappingURL=coordinator.module.js.map