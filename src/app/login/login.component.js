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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var login_service_1 = require("./login.service");
// import { CommonService } from '../../providers/common.service';
var storage_service_1 = require("../shared/storage.service");
var LoginComponent = (function () {
    function LoginComponent(formBuilder, router, commonService, credentialService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.commonService = commonService;
        this.credentialService = credentialService;
        this.loginStart = false;
        this.error = false;
        this.loginForm = this.formBuilder.group({
            username: ['', forms_1.Validators.required],
            password: ['', [forms_1.Validators.required]]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('user_roleInfo')) {
        }
    };
    LoginComponent.prototype.ngAfterViewChecked = function () {
        $("#login-button").click(function (event) {
            event.preventDefault();
            $('form').fadeOut(500);
            $('.wrapper').addClass('form-success');
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loginStart = true;
        this.credentialService.verifyUser(this.loginForm.value).subscribe(function (res) {
            _this.commonService.storeData("access_token", res.access_token);
            _this.commonService.storeData("role", res.userDetails.roleInfo[0].role);
            _this.commonService.storeData("userDetails", res.userDetails);
            _this.commonService.storeData("user_roleInfo", res.userDetails.roleInfo);
            _this.role = res.userDetails.roleInfo[0].role;
            if (_this.role == "planner" || _this.role == "admin") {
                _this.fetchOrganizationInfo(res);
            }
            else {
                _this.onSuccess();
            }
            _this.onSuccess();
        }, function (err) {
            _this.onError();
        });
    };
    LoginComponent.prototype.fetchOrganizationInfo = function (user_info) {
        // this.org_ser.fetchOrganizationInfo().subscribe((res:any) => {
        //   this.commonService.storeData("org_info", res);
        //   this.onSuccess();    
        // }, (err:any) => {
        //   this.onError();
        // });
    };
    LoginComponent.prototype.onSuccess = function () {
        this.loginStart = false;
        this.router.navigateByUrl("/" + this.role);
    };
    LoginComponent.prototype.onError = function () {
        this.loginStart = false;
        this.error = true;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        storage_service_1.StorageService,
        login_service_1.CredentialService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map