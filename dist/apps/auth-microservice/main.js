/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth-microservice/src/adapters/bcrypt.adapter.ts":
/*!***************************************************************!*\
  !*** ./apps/auth-microservice/src/adapters/bcrypt.adapter.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptAdapter = void 0;
const bcrypt_1 = __webpack_require__(/*! bcrypt */ "bcrypt");
class BcryptAdapter {
    async hash(data) {
        return (0, bcrypt_1.hash)(data.password, 8);
    }
    async compare(data) {
        return (0, bcrypt_1.compare)(data.password, data.hash);
    }
}
exports.BcryptAdapter = BcryptAdapter;


/***/ }),

/***/ "./apps/auth-microservice/src/adapters/index.ts":
/*!******************************************************!*\
  !*** ./apps/auth-microservice/src/adapters/index.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./bcrypt.adapter */ "./apps/auth-microservice/src/adapters/bcrypt.adapter.ts"), exports);
__exportStar(__webpack_require__(/*! ./mailer.adapter */ "./apps/auth-microservice/src/adapters/mailer.adapter.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/adapters/mailer.adapter.ts":
/*!***************************************************************!*\
  !*** ./apps/auth-microservice/src/adapters/mailer.adapter.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerAdapter = void 0;
const nodemailer_1 = __webpack_require__(/*! nodemailer */ "nodemailer");
const config_1 = __webpack_require__(/*! ../config */ "./apps/auth-microservice/src/config/index.ts");
class MailerAdapter {
    async options(options) {
        const transport = (0, nodemailer_1.createTransport)({
            service: config_1.CONFIG.NODEMAILER_SERVICE,
            auth: {
                user: config_1.CONFIG.NODEMAILER_USER,
                pass: config_1.CONFIG.NODEMAILER_PASS
            }
        });
        await transport.sendMail(options);
    }
    async sendConfirmCode({ email, code }) {
        return this.options({
            to: email,
            from: "jihnordraven@gmail.com",
            subject: "Email confirmaiton",
            html: `<a href='${config_1.CONFIG.HOST}/api/v1/auth/registration-confirmation?code=${code}'>Confirm email</a>`
        });
    }
    async sendPasswordCode({ email, code }) {
        return this.options({
            to: email,
            from: "jihnordraven@gmail.com",
            subject: "Password recovery",
            html: `<a href='${config_1.CONFIG.HOST}/api/v1/auth/password-recovery-confirmation?code=${code}'>Password recovery</a>`
        });
    }
}
exports.MailerAdapter = MailerAdapter;


/***/ }),

/***/ "./apps/auth-microservice/src/app.controller.ts":
/*!******************************************************!*\
  !*** ./apps/auth-microservice/src/app.controller.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/auth-microservice/src/app.service.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getHello() {
        return "Server works";
    }
    async testingAllDelete() {
        try {
            await this.appService.deleteAll();
        }
        catch (e) {
            console.log(e);
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: "Delete all data in all" }),
    (0, common_1.Delete)("testing/all-data"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testingAllDelete", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)("Testing"),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),

/***/ "./apps/auth-microservice/src/app.module.ts":
/*!**************************************************!*\
  !*** ./apps/auth-microservice/src/app.module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/auth-microservice/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/auth-microservice/src/app.service.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/auth-microservice/src/auth/auth.module.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/auth-microservice/src/prisma/prisma.module.ts");
const strategies_1 = __webpack_require__(/*! ./auth/protection/strategies */ "./apps/auth-microservice/src/auth/protection/strategies/index.ts");
const config_1 = __webpack_require__(/*! ./config/config */ "./apps/auth-microservice/src/config/config.ts");
const strategies = [
    strategies_1.LocalStrategy,
    strategies_1.JwtAccessStrategy,
    strategies_1.JwtRefreshStrategy,
    strategies_1.GoogleStrategy,
    strategies_1.GithubStrategy
];
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.CONFIG.START_MODULE, auth_module_1.AuthModule, prisma_module_1.PrismaModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ...strategies]
    })
], AppModule);


/***/ }),

/***/ "./apps/auth-microservice/src/app.service.ts":
/*!***************************************************!*\
  !*** ./apps/auth-microservice/src/app.service.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/auth-microservice/src/prisma/prisma.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const models_1 = __webpack_require__(/*! ../../../libs/models */ "./libs/models/index.ts");
let AppService = exports.AppService = class AppService {
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
    }
    async getHello() {
        return `Start server on ${this.config.get("PORT")} port`;
    }
    async deleteAll() {
        if (this.config.get("DEPLOY") === "TEST") {
            for (const table of Object.values(models_1.AllTablesEnum)) {
                if (this.prisma[table]) {
                    await this.prisma[table].deleteMany();
                }
            }
        }
        else {
            throw new common_1.ForbiddenException("This endpoint is closed for prodaction");
        }
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object])
], AppService);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/auth.service.ts":
/*!*********************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/auth.service.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const repositories_1 = __webpack_require__(/*! ../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const commands_1 = __webpack_require__(/*! ./commands */ "./apps/auth-microservice/src/auth/application/commands/index.ts");
const adapters_1 = __webpack_require__(/*! ../../adapters */ "./apps/auth-microservice/src/adapters/index.ts");
let AuthService = exports.AuthService = class AuthService {
    constructor(authRepository, authQueryRepository, commandBus, bcrypt) {
        this.authRepository = authRepository;
        this.authQueryRepository = authQueryRepository;
        this.commandBus = commandBus;
        this.bcrypt = bcrypt;
    }
    async validateLogin(email, password) {
        const user = await this.authQueryRepository.findUniqueUserByEmail({ email });
        if (!user || user.isBlocked === true) {
            return null;
        }
        const validatePassword = await this.bcrypt.compare({
            password,
            hash: user.hashPassword
        });
        if (!validatePassword) {
            return null;
        }
        return { userID: user.id };
    }
    async refreshFlow(authObjectDTO, userID, sessionID) {
        await this.commandBus.execute(new commands_1.LogoutCommand({ userID, sessionID }));
        return await this.commandBus.execute(new commands_1.LoginCommand(authObjectDTO));
    }
    async checkedActiveSession(sessionID, expiredSecondsToken) {
        if (!sessionID) {
            return false;
        }
        const activeSession = await this.authQueryRepository.findUniqueSessionByID({ sessionID });
        if (!activeSession) {
            return false;
        }
        const lastActiveToSecond = Number(Date.parse(activeSession.expires).toString().slice(0, 10));
        if (expiredSecondsToken - lastActiveToSecond > 2) {
            return false;
        }
        return true;
    }
    async checkedEmailToBase(email) {
        console.log(email);
        return false;
    }
    async checkedConfirmCode(code) {
        console.log(code);
        return false;
    }
    async checkedUniqueUsername(userName) {
        console.log(userName);
        return false;
    }
    async checkedUniqueEmail(email) {
        console.log(email);
        return false;
    }
    async googleRegister(dto, { userIP, userAgent }) {
        const googleProfile = await this.commandBus.execute(new commands_1.GoogleRegisterCommand(dto));
        return this.commandBus.execute(new commands_1.LoginCommand({ userIP, userAgent, userID: googleProfile.userID }));
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object, typeof (_c = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _c : Object, typeof (_d = typeof adapters_1.BcryptAdapter !== "undefined" && adapters_1.BcryptAdapter) === "function" ? _d : Object])
], AuthService);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/confirm-email.command.ts":
/*!***************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/confirm-email.command.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmEmailHandler = exports.ConfirmEmailCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_command_repository_1 = __webpack_require__(/*! ../../repositories/auth-command.repository */ "./apps/auth-microservice/src/auth/repositories/auth-command.repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const config_2 = __webpack_require__(/*! apps/auth-microservice/src/config */ "./apps/auth-microservice/src/config/index.ts");
class ConfirmEmailCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.ConfirmEmailCommand = ConfirmEmailCommand;
let ConfirmEmailHandler = exports.ConfirmEmailHandler = class ConfirmEmailHandler {
    constructor(config, authCommandRepository, authQueryRepository) {
        this.config = config;
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.FRONTEND_HOST = config_2.CONFIG.FRONTEND_HOST;
    }
    async execute({ dto: { code, res } }) {
        const emailConfirmCode = await this.authQueryRepository.findUniqueEmailCodeByCode({ code });
        if (!emailConfirmCode) {
            res.redirect(`${this.FRONTEND_HOST}/email-code-not-found`);
            throw new common_1.NotFoundException("Code not found");
        }
        if (emailConfirmCode.isUsed === true) {
            res.redirect(`${this.FRONTEND_HOST}/email-code-already-used`);
            throw new common_1.BadRequestException("This code has already been used");
        }
        const isCodeExpired = new Date(emailConfirmCode.exp) <= new Date();
        if (isCodeExpired) {
            await this.authCommandRepository.deactivateAllEmailCodes({
                userID: emailConfirmCode.userID
            });
            res.redirect(`${this.FRONTEND_HOST}/email-code-expired`);
            throw new common_1.BadRequestException("Code has expired");
        }
        await this.authCommandRepository.confirmUserEmail({ userId: emailConfirmCode.userID });
        await this.authCommandRepository.deactivateAllEmailCodes({
            userID: emailConfirmCode.userID
        });
        res.redirect(`${this.FRONTEND_HOST}/email-code-success`);
    }
};
exports.ConfirmEmailHandler = ConfirmEmailHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ConfirmEmailCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_command_repository_1.AuthCommandRepository !== "undefined" && auth_command_repository_1.AuthCommandRepository) === "function" ? _b : Object, typeof (_c = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _c : Object])
], ConfirmEmailHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/confirm-password-recovery.command.ts":
/*!***************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/confirm-password-recovery.command.ts ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmPasswordRecoveryHandler = exports.ConfirmPasswordRecoveryCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_command_repository_1 = __webpack_require__(/*! ../../repositories/auth-command.repository */ "./apps/auth-microservice/src/auth/repositories/auth-command.repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const config_2 = __webpack_require__(/*! apps/auth-microservice/src/config */ "./apps/auth-microservice/src/config/index.ts");
class ConfirmPasswordRecoveryCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.ConfirmPasswordRecoveryCommand = ConfirmPasswordRecoveryCommand;
let ConfirmPasswordRecoveryHandler = exports.ConfirmPasswordRecoveryHandler = class ConfirmPasswordRecoveryHandler {
    constructor(config, authCommandRepository, authQueryRepository) {
        this.config = config;
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.FRONTEND_HOST = config_2.CONFIG.FRONTEND_HOST;
    }
    async execute({ dto: { code, res } }) {
        const isCode = await this.authQueryRepository.findUniquePasswordRecoveryCodeByCode({ code });
        if (!isCode) {
            res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-not-found`);
            throw new common_1.NotFoundException("Code not found");
        }
        if ((isCode.isUsed = true)) {
            await this.authCommandRepository.deactivateAllPasswordRecoveryCodes({
                userID: isCode.userID
            });
            res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-already-used`);
            throw new common_1.ConflictException("This code has already been used");
        }
        const isCodeExpired = new Date(isCode.exp) <= new Date();
        if (isCodeExpired) {
            await this.authCommandRepository.deactivateAllPasswordRecoveryCodes({
                userID: isCode.userID
            });
            res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-expired`);
            throw new common_1.BadRequestException("Code has expired");
        }
        res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-success/code=${isCode.code}`);
    }
};
exports.ConfirmPasswordRecoveryHandler = ConfirmPasswordRecoveryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ConfirmPasswordRecoveryCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_command_repository_1.AuthCommandRepository !== "undefined" && auth_command_repository_1.AuthCommandRepository) === "function" ? _b : Object, typeof (_c = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _c : Object])
], ConfirmPasswordRecoveryHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/google-register.command.ts":
/*!*****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/google-register.command.ts ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleRegisterHandler = exports.GoogleRegisterCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_command_repository_1 = __webpack_require__(/*! ../../repositories/auth-command.repository */ "./apps/auth-microservice/src/auth/repositories/auth-command.repository.ts");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
class GoogleRegisterCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.GoogleRegisterCommand = GoogleRegisterCommand;
let GoogleRegisterHandler = exports.GoogleRegisterHandler = class GoogleRegisterHandler {
    constructor(authRepository, authQueryRepository) {
        this.authRepository = authRepository;
        this.authQueryRepository = authQueryRepository;
    }
    async execute({ dto }) {
        const createGoogleProfileData = ({ userID, username }) => {
            return {
                providerID: dto.providerID,
                email: dto.email,
                username,
                displayName: dto.displayName,
                provider: dto.provider,
                userID
            };
        };
        const googleProfile = await this.authQueryRepository.findUniqueGoogleProfileByProviderID({
            providerID: dto.providerID
        });
        if (googleProfile)
            return googleProfile;
        const user = await this.authQueryRepository.findUniqueUserByEmail({
            email: dto.email
        });
        if (user) {
            const googleProfile = await this.authQueryRepository.findUniqueGoogleProfileByUserID({ userID: user.id });
            if (googleProfile)
                return googleProfile;
            const googleProfileData = createGoogleProfileData({
                userID: user.id,
                username: user.username
            });
            return this.authRepository.createGoogleProfile(googleProfileData);
        }
        if (dto.username) {
            let isUsernameTaken;
            let uniqueUsername = dto.username;
            let suffix = 1;
            do {
                isUsernameTaken = await this.authQueryRepository.checkIsUniqueUsername({
                    username: uniqueUsername
                });
                if (isUsernameTaken) {
                    uniqueUsername = `${dto.username}_${suffix}`;
                    suffix++;
                }
            } while (isUsernameTaken);
            const user = await this.authRepository.localRegister({
                email: dto.email,
                username: uniqueUsername
            });
            const googleProfileData = createGoogleProfileData({
                userID: user.id,
                username: uniqueUsername
            });
            return this.authRepository.createGoogleProfile(googleProfileData);
        }
        else {
            let isUsernameTaken;
            let uniqueUsername = "google-client_1";
            let suffix = 1;
            do {
                isUsernameTaken = await this.authQueryRepository.checkIsUniqueUsername({
                    username: uniqueUsername
                });
                if (isUsernameTaken) {
                    uniqueUsername = `google-client_${suffix}`;
                    suffix++;
                }
            } while (isUsernameTaken);
            const user = await this.authRepository.localRegister({
                email: dto.email,
                username: uniqueUsername
            });
            const googleProfileData = createGoogleProfileData({
                userID: user.id,
                username: uniqueUsername
            });
            return this.authRepository.createGoogleProfile(googleProfileData);
        }
    }
};
exports.GoogleRegisterHandler = GoogleRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(GoogleRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_command_repository_1.AuthCommandRepository !== "undefined" && auth_command_repository_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object])
], GoogleRegisterHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/index.ts":
/*!***********************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/index.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./login.command */ "./apps/auth-microservice/src/auth/application/commands/login.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./local-register.command */ "./apps/auth-microservice/src/auth/application/commands/local-register.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./resend-email-code.command */ "./apps/auth-microservice/src/auth/application/commands/resend-email-code.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery.command */ "./apps/auth-microservice/src/auth/application/commands/password-recovery.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./new-password.command */ "./apps/auth-microservice/src/auth/application/commands/new-password.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery-resend.command */ "./apps/auth-microservice/src/auth/application/commands/password-recovery-resend.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./logout.command */ "./apps/auth-microservice/src/auth/application/commands/logout.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./google-register.command */ "./apps/auth-microservice/src/auth/application/commands/google-register.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./confirm-email.command */ "./apps/auth-microservice/src/auth/application/commands/confirm-email.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./confirm-password-recovery.command */ "./apps/auth-microservice/src/auth/application/commands/confirm-password-recovery.command.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/local-register.command.ts":
/*!****************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/local-register.command.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalRegisterHandler = exports.LocalRegisterCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/auth-microservice/src/adapters/mailer.adapter.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const errors_handlers_1 = __webpack_require__(/*! libs/errors-handlers */ "./libs/errors-handlers/index.ts");
const adapters_1 = __webpack_require__(/*! apps/auth-microservice/src/adapters */ "./apps/auth-microservice/src/adapters/index.ts");
class LocalRegisterCommand {
    constructor(createUser) {
        this.createUser = createUser;
    }
}
exports.LocalRegisterCommand = LocalRegisterCommand;
let LocalRegisterHandler = exports.LocalRegisterHandler = class LocalRegisterHandler {
    constructor(authCommandRepository, authQueryRepository, bcryptAdapter, mailerAdapter) {
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.bcryptAdapter = bcryptAdapter;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ createUser: { email, username, password } }) {
        const isEmail = await this.authQueryRepository.checkIsUniqueEmail({ email });
        if (isEmail)
            (0, errors_handlers_1.HandleException)({
                message: "User with this email is already registered",
                field: "email",
                error: "Conflict",
                statusCode: common_1.HttpStatus.CONFLICT
            });
        const isUsername = await this.authQueryRepository.checkIsUniqueUsername({
            username
        });
        if (isUsername)
            (0, errors_handlers_1.HandleException)({
                message: "User with this username is already registered",
                field: "username",
                error: "Conflict",
                statusCode: common_1.HttpStatus.CONFLICT
            });
        const hashPassword = await this.bcryptAdapter.hash({ password });
        const user = await this.authCommandRepository.localRegister({
            email,
            username,
            hashPassword
        });
        const code = await this.authCommandRepository.createEmailCode({
            userID: user.id
        });
        await this.mailerAdapter.sendConfirmCode({ email, code });
    }
};
exports.LocalRegisterHandler = LocalRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(LocalRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object, typeof (_c = typeof adapters_1.BcryptAdapter !== "undefined" && adapters_1.BcryptAdapter) === "function" ? _c : Object, typeof (_d = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _d : Object])
], LocalRegisterHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/login.command.ts":
/*!*******************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/login.command.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginHandler = exports.LoginCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const config_2 = __webpack_require__(/*! apps/auth-microservice/src/config */ "./apps/auth-microservice/src/config/index.ts");
class LoginCommand {
    constructor(authObject) {
        this.authObject = authObject;
    }
}
exports.LoginCommand = LoginCommand;
let LoginHandler = exports.LoginHandler = class LoginHandler {
    constructor(config, authCommandRepository, authQueryRepository, jwtService) {
        this.config = config;
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.jwtService = jwtService;
    }
    async execute({ authObject }) {
        const expiresTime = (0, date_fns_1.add)(new Date(), {
            seconds: Number(config_2.CONFIG.JWT_ACCESS_EXPIRES)
        }).toString();
        const newSession = await this.authCommandRepository.addNewSession(authObject, expiresTime);
        const refreshToken = this.jwtService.sign({ sessionId: newSession.id, userID: newSession.userID }, {
            secret: config_2.CONFIG.JWT_REFRESH_SECRET,
            expiresIn: Number(config_2.CONFIG.JWT_REFRESH_EXPIRES)
        });
        const accessToken = this.jwtService.sign({ userID: newSession.userID }, {
            secret: config_2.CONFIG.JWT_ACCESS_SECRET,
            expiresIn: Number(config_2.CONFIG.JWT_ACCESS_EXPIRES)
        });
        return {
            refreshToken: refreshToken,
            accessToken: accessToken
        };
    }
};
exports.LoginHandler = LoginHandler = __decorate([
    (0, cqrs_1.CommandHandler)(LoginCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _b : Object, typeof (_c = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _c : Object, typeof (_d = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _d : Object])
], LoginHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/logout.command.ts":
/*!********************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/logout.command.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutHandler = exports.LogoutCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class LogoutCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.LogoutCommand = LogoutCommand;
let LogoutHandler = exports.LogoutHandler = class LogoutHandler {
    constructor(authCommandRepository, authQueryRepository) {
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
    }
    async execute({ data: { userID, sessionID } }) {
        const session = await this.authQueryRepository.findUniqueSessionByID({
            sessionID
        });
        if (!session) {
            throw new common_1.NotFoundException("Session not found");
        }
        if (session.userID !== userID) {
            throw new common_1.ForbiddenException("Invalid session");
        }
        await this.authCommandRepository.deleteSession({ sessionID });
    }
};
exports.LogoutHandler = LogoutHandler = __decorate([
    (0, cqrs_1.CommandHandler)(LogoutCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object])
], LogoutHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/new-password.command.ts":
/*!**************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/new-password.command.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewPasswordHandler = exports.NewPasswordCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/auth-microservice/src/adapters/index.ts");
class NewPasswordCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.NewPasswordCommand = NewPasswordCommand;
let NewPasswordHandler = exports.NewPasswordHandler = class NewPasswordHandler {
    constructor(authCommandRepository, authQueryRepository, bcryptAdapter) {
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.bcryptAdapter = bcryptAdapter;
    }
    async execute({ data: { newPassword, recoveryCode } }) {
        const passwordRecoveryCode = await this.authQueryRepository.findUniquePasswordRecoveryCodeByCode({
            code: recoveryCode
        });
        if (!passwordRecoveryCode)
            throw new common_1.BadRequestException("Invalid code");
        const user = await this.authQueryRepository.findUniqueUserByID({
            userID: passwordRecoveryCode.userID
        });
        if (!user)
            throw new common_1.BadRequestException("User doesn't exist");
        const hashPassword = await this.bcryptAdapter.hash({
            password: newPassword
        });
        await this.authCommandRepository.createNewPassword({
            userId: user.id,
            hashPassword
        });
    }
};
exports.NewPasswordHandler = NewPasswordHandler = __decorate([
    (0, cqrs_1.CommandHandler)(NewPasswordCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object, typeof (_c = typeof adapters_1.BcryptAdapter !== "undefined" && adapters_1.BcryptAdapter) === "function" ? _c : Object])
], NewPasswordHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/password-recovery-resend.command.ts":
/*!**************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/password-recovery-resend.command.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryResendHandler = exports.PasswordRecoveryResendCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/auth-microservice/src/adapters/mailer.adapter.ts");
class PasswordRecoveryResendCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.PasswordRecoveryResendCommand = PasswordRecoveryResendCommand;
let PasswordRecoveryResendHandler = exports.PasswordRecoveryResendHandler = class PasswordRecoveryResendHandler {
    constructor(authCommandRepository, authQueryRepository, mailerAdapter) {
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ data: { email } }) {
        const user = await this.authQueryRepository.findUniqueUserByEmail({ email });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.authCommandRepository.deactivateAllPasswordRecoveryCodes({ userID: user.id });
        const passwordRecoveryCode = await this.authCommandRepository.createPasswordRecoveryCode({ userID: user.id });
        await this.mailerAdapter.sendPasswordCode({ email, code: passwordRecoveryCode.code });
    }
};
exports.PasswordRecoveryResendHandler = PasswordRecoveryResendHandler = __decorate([
    (0, cqrs_1.CommandHandler)(PasswordRecoveryResendCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object, typeof (_c = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _c : Object])
], PasswordRecoveryResendHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/password-recovery.command.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/password-recovery.command.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryHandler = exports.PasswordRecoveryCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/auth-microservice/src/adapters/mailer.adapter.ts");
class PasswordRecoveryCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.PasswordRecoveryCommand = PasswordRecoveryCommand;
let PasswordRecoveryHandler = exports.PasswordRecoveryHandler = class PasswordRecoveryHandler {
    constructor(authCommandRepository, authQueryRepository, mailerAdapter) {
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ data: { email } }) {
        const user = await this.authQueryRepository.findUniqueUserByEmail({ email });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.authCommandRepository.deactivateAllPasswordRecoveryCodes({ userID: user.id });
        const passwordRecoveryCode = await this.authCommandRepository.createPasswordRecoveryCode({ userID: user.id });
        await this.mailerAdapter.sendPasswordCode({ email, code: passwordRecoveryCode.code });
    }
};
exports.PasswordRecoveryHandler = PasswordRecoveryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(PasswordRecoveryCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object, typeof (_c = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _c : Object])
], PasswordRecoveryHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/commands/resend-email-code.command.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/commands/resend-email-code.command.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendEmailCodeHandler = exports.ResendEmailCodeCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/auth-microservice/src/adapters/index.ts");
class ResendEmailCodeCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.ResendEmailCodeCommand = ResendEmailCodeCommand;
let ResendEmailCodeHandler = exports.ResendEmailCodeHandler = class ResendEmailCodeHandler {
    constructor(authCommandRepository, authQueryRepository, mailerAdapter) {
        this.authCommandRepository = authCommandRepository;
        this.authQueryRepository = authQueryRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ data: { email } }) {
        const user = await this.authQueryRepository.findUniqueUserByEmail({ email });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.authCommandRepository.deactivateAllEmailCodes({ userID: user.id });
        const code = await this.authCommandRepository.createEmailCode({
            userID: user.id
        });
        await this.mailerAdapter.sendConfirmCode({ email, code });
    }
};
exports.ResendEmailCodeHandler = ResendEmailCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ResendEmailCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthCommandRepository !== "undefined" && repositories_1.AuthCommandRepository) === "function" ? _a : Object, typeof (_b = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _b : Object, typeof (_c = typeof adapters_1.MailerAdapter !== "undefined" && adapters_1.MailerAdapter) === "function" ? _c : Object])
], ResendEmailCodeHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/queries/index.ts":
/*!**********************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/queries/index.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./me-info.query */ "./apps/auth-microservice/src/auth/application/queries/me-info.query.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/application/queries/me-info.query.ts":
/*!******************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/application/queries/me-info.query.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeInfoHandler = exports.MeInfoQuery = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const repositories_1 = __webpack_require__(/*! ../../repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class MeInfoQuery {
    constructor(data) {
        this.data = data;
    }
}
exports.MeInfoQuery = MeInfoQuery;
let MeInfoHandler = exports.MeInfoHandler = class MeInfoHandler {
    constructor(authQueryRepository) {
        this.authQueryRepository = authQueryRepository;
    }
    async execute({ data: { userID } }) {
        const user = await this.authQueryRepository.findUniqueUserByID({ userID });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        return {
            userId: user.id,
            username: user.username,
            email: user.email
        };
    }
};
exports.MeInfoHandler = MeInfoHandler = __decorate([
    (0, cqrs_1.QueryHandler)(MeInfoQuery),
    __metadata("design:paramtypes", [typeof (_a = typeof repositories_1.AuthQueryRepository !== "undefined" && repositories_1.AuthQueryRepository) === "function" ? _a : Object])
], MeInfoHandler);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/auth.controller.ts":
/*!************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/auth.controller.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const express_1 = __webpack_require__(/*! express */ "express");
const dto_1 = __webpack_require__(/*! ./core/dto */ "./apps/auth-microservice/src/auth/core/dto/index.ts");
const guards_1 = __webpack_require__(/*! ./protection/guards */ "./apps/auth-microservice/src/auth/protection/guards/index.ts");
const auth_1 = __webpack_require__(/*! ../../../../libs/swagger/auth */ "./libs/swagger/auth/index.ts");
const helpers_1 = __webpack_require__(/*! ../../../../libs/helpers */ "./libs/helpers/index.ts");
const commands_1 = __webpack_require__(/*! ./application/commands */ "./apps/auth-microservice/src/auth/application/commands/index.ts");
const auth_service_1 = __webpack_require__(/*! ./application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
const google_guard_1 = __webpack_require__(/*! ./protection/guards/google.guard */ "./apps/auth-microservice/src/auth/protection/guards/google.guard.ts");
const strategies_1 = __webpack_require__(/*! ./protection/strategies */ "./apps/auth-microservice/src/auth/protection/strategies/index.ts");
const decorators_1 = __webpack_require__(/*! ../../../../libs/common/decorators */ "./libs/common/decorators/index.ts");
const enums_1 = __webpack_require__(/*! ../../../../libs/models/enums */ "./libs/models/enums.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const confirm_email_command_1 = __webpack_require__(/*! ./application/commands/confirm-email.command */ "./apps/auth-microservice/src/auth/application/commands/confirm-email.command.ts");
const confirm_password_recovery_command_1 = __webpack_require__(/*! ./application/commands/confirm-password-recovery.command */ "./apps/auth-microservice/src/auth/application/commands/confirm-password-recovery.command.ts");
const github_payload_decorator_1 = __webpack_require__(/*! libs/common/decorators/github-payload.decorator */ "./libs/common/decorators/github-payload.decorator.ts");
const queries_1 = __webpack_require__(/*! ./application/queries */ "./apps/auth-microservice/src/auth/application/queries/index.ts");
let AuthController = exports.AuthController = class AuthController {
    constructor(commandBus, queryBus, authService, config) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.authService = authService;
        this.config = config;
    }
    async localRegister(createUser) {
        await this.commandBus.execute(new commands_1.LocalRegisterCommand(createUser));
    }
    async userRegistrationResending({ email }) {
        await this.commandBus.execute(new commands_1.ResendEmailCodeCommand({ email }));
    }
    async userRegistrationConfirm(code, res) {
        await this.commandBus.execute(new confirm_email_command_1.ConfirmEmailCommand({ code, res }));
    }
    async userCreateNewPass({ email }) {
        await this.commandBus.execute(new commands_1.PasswordRecoveryCommand({ email }));
    }
    async passwordEmailResending({ email }) {
        await this.commandBus.execute(new commands_1.PasswordRecoveryResendCommand({ email }));
    }
    async newPasswordConfirm(code, res) {
        await this.commandBus.execute(new confirm_password_recovery_command_1.ConfirmPasswordRecoveryCommand({ code, res }));
    }
    async userUpdateNewPass({ newPassword, recoveryCode }) {
        await this.commandBus.execute(new commands_1.NewPasswordCommand({ recoveryCode, newPassword }));
    }
    async userAuthorization(jwtPayload, userIP, userAgent, res) {
        const authObjectDTO = {
            userIP,
            userAgent,
            userID: jwtPayload.userID
        };
        const tokens = await this.commandBus.execute(new commands_1.LoginCommand(authObjectDTO));
        return this.setTokensToResponse({ tokens, res });
    }
    async userRefreshToken(jwtPayload, userIP, userAgent, res) {
        const authObjectDTO = {
            userIP,
            userAgent,
            userID: jwtPayload.userID
        };
        const tokens = await this.authService.refreshFlow(authObjectDTO, jwtPayload.userID, jwtPayload.sessionID);
        return this.setTokensToResponse({ tokens, res });
    }
    async userLogout(jwtPayload, response) {
        await this.commandBus.execute(new commands_1.LogoutCommand(jwtPayload));
        response.clearCookie("refreshToken");
    }
    async meInfo({ userID }) {
        return this.queryBus.execute(new queries_1.MeInfoQuery({ userID }));
    }
    async google() { }
    async googleCallback(dto, userIP, userAgent, res) {
        const tokens = await this.authService.googleRegister(dto, {
            userIP,
            userAgent
        });
        return this.setTokensToResponseGoogle({ tokens, res });
    }
    async github() { }
    async githubCallback(dto, userIP, userAgent, res) {
        console.log(dto);
    }
    async setTokensToResponse({ tokens, res }) {
        res.cookie(enums_1.TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            secure: true
        });
        return { accessToken: tokens.accessToken };
    }
    async setTokensToResponseGoogle({ tokens, res }) {
        res.cookie(enums_1.TokensEnum.REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            secure: true
        });
        res.redirect(this.config.get("FRONTEND_HOST"));
        return { accessToken: tokens.accessToken };
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToRegistration)(),
    (0, common_1.Post)("registration"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "localRegister", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToRegistrationEmailResending)(),
    (0, common_1.Post)("registration-email-resending"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "userRegistrationResending", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)("registration-confirmation"),
    __param(0, (0, common_1.Query)("code", new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "userRegistrationConfirm", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToPasswordRecovery)(),
    (0, common_1.Post)("password-recovery"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof dto_1.PassRecoveryDto !== "undefined" && dto_1.PassRecoveryDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthController.prototype, "userCreateNewPass", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToPasswordEmailResending)(),
    (0, common_1.Post)("password-email-resending"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "passwordEmailResending", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)("password-recovery-confirmation"),
    __param(0, (0, common_1.Query)("code")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthController.prototype, "newPasswordConfirm", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToNewPassword)(),
    (0, common_1.Post)("new-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof dto_1.NewPassUpdateDto !== "undefined" && dto_1.NewPassUpdateDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], AuthController.prototype, "userUpdateNewPass", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.LocalAuthGuard),
    (0, auth_1.SwaggerToAuthorization)(),
    (0, common_1.Post)("login"),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, decorators_1.UserAgentDecorator)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof helpers_1.JwtAccessPayload !== "undefined" && helpers_1.JwtAccessPayload) === "function" ? _s : Object, String, String, typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AuthController.prototype, "userAuthorization", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtRefreshGuard),
    (0, auth_1.SwaggerToRefreshToken)(),
    (0, common_1.Post)("new-tokens"),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, decorators_1.UserAgentDecorator)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof helpers_1.JwtRefreshPayload !== "undefined" && helpers_1.JwtRefreshPayload) === "function" ? _v : Object, String, String, typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object]),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], AuthController.prototype, "userRefreshToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(guards_1.JwtRefreshGuard),
    (0, auth_1.SwaggerToLogout)(),
    (0, common_1.Post)("logout"),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof helpers_1.JwtRefreshPayload !== "undefined" && helpers_1.JwtRefreshPayload) === "function" ? _y : Object, typeof (_z = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _z : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogout", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtAccessGuard),
    (0, auth_1.SwaggerToMeInfo)(),
    (0, common_1.Get)("me"),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_0 = typeof helpers_1.JwtAccessPayload !== "undefined" && helpers_1.JwtAccessPayload) === "function" ? _0 : Object]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], AuthController.prototype, "meInfo", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    (0, common_1.Get)("google"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "google", null);
__decorate([
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("google/callback"),
    __param(0, (0, decorators_1.GooglePayloadDecorator)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, decorators_1.UserAgentDecorator)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_2 = typeof strategies_1.IGoogleUser !== "undefined" && strategies_1.IGoogleUser) === "function" ? _2 : Object, String, String, typeof (_3 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _3 : Object]),
    __metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Get)("github"),
    (0, common_1.UseGuards)(guards_1.GithubGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_5 = typeof Promise !== "undefined" && Promise) === "function" ? _5 : Object)
], AuthController.prototype, "github", null);
__decorate([
    (0, common_1.Get)("github/callback"),
    (0, common_1.UseGuards)(guards_1.GithubGuard),
    __param(0, (0, github_payload_decorator_1.GithubPayloadDecorator)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, decorators_1.UserAgentDecorator)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, typeof (_6 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _6 : Object]),
    __metadata("design:returntype", typeof (_7 = typeof Promise !== "undefined" && Promise) === "function" ? _7 : Object)
], AuthController.prototype, "githubCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.QueryBus !== "undefined" && cqrs_1.QueryBus) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], AuthController);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/auth.module.ts":
/*!********************************************************!*\
  !*** ./apps/auth-microservice/src/auth/auth.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/auth-microservice/src/auth/auth.controller.ts");
const class_validators_1 = __webpack_require__(/*! ./class-validators */ "./apps/auth-microservice/src/auth/class-validators/index.ts");
const auth_service_1 = __webpack_require__(/*! ./application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
const prisma_module_1 = __webpack_require__(/*! ../prisma/prisma.module */ "./apps/auth-microservice/src/prisma/prisma.module.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const adapters_1 = __webpack_require__(/*! ../adapters */ "./apps/auth-microservice/src/adapters/index.ts");
const commands_1 = __webpack_require__(/*! ./application/commands */ "./apps/auth-microservice/src/auth/application/commands/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const repositories_1 = __webpack_require__(/*! ./repositories */ "./apps/auth-microservice/src/auth/repositories/index.ts");
const queries_1 = __webpack_require__(/*! ./application/queries */ "./apps/auth-microservice/src/auth/application/queries/index.ts");
const validators = [
    class_validators_1.CheckedEmailToBase,
    class_validators_1.CheckedConfirmCode,
    class_validators_1.CheckedUniqueUsername,
    class_validators_1.CheckedUniqueEmail
];
const commandHandlers = [
    commands_1.LoginHandler,
    commands_1.LocalRegisterHandler,
    commands_1.ResendEmailCodeHandler,
    commands_1.PasswordRecoveryHandler,
    commands_1.PasswordRecoveryResendHandler,
    commands_1.NewPasswordHandler,
    commands_1.LogoutHandler,
    commands_1.GoogleRegisterHandler,
    commands_1.ConfirmPasswordRecoveryHandler,
    commands_1.ConfirmEmailHandler
];
const queryHandlers = [queries_1.MeInfoHandler];
const adapters = [adapters_1.BcryptAdapter, adapters_1.MailerAdapter];
const modules = [cqrs_1.CqrsModule, prisma_module_1.PrismaModule, passport_1.PassportModule, jwt_1.JwtModule];
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [...modules],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            repositories_1.AuthCommandRepository,
            repositories_1.AuthQueryRepository,
            ...validators,
            ...adapters,
            ...commandHandlers,
            ...queryHandlers
        ],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/class-validators/checkedConfirmCode.class-validators.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/class-validators/checkedConfirmCode.class-validators.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckedConfirmCode = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../../auth/application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
let CheckedConfirmCode = exports.CheckedConfirmCode = class CheckedConfirmCode {
    constructor(authService) {
        this.authService = authService;
    }
    async validate(value) {
        return await this.authService.checkedConfirmCode(value);
    }
    defaultMessage() {
        return "Code $value is not valid";
    }
};
exports.CheckedConfirmCode = CheckedConfirmCode = __decorate([
    (0, class_validator_1.ValidatorConstraint)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], CheckedConfirmCode);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/class-validators/checkedEmail.class-validators.ts":
/*!*******************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/class-validators/checkedEmail.class-validators.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckedEmailToBase = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
let CheckedEmailToBase = exports.CheckedEmailToBase = class CheckedEmailToBase {
    constructor(authService) {
        this.authService = authService;
    }
    async validate(value) {
        return await this.authService.checkedEmailToBase(value);
    }
    defaultMessage() {
        return "User with this email $value does not exist";
    }
};
exports.CheckedEmailToBase = CheckedEmailToBase = __decorate([
    (0, class_validator_1.ValidatorConstraint)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], CheckedEmailToBase);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/class-validators/checkedUniqueEmail.class-validators.ts":
/*!*************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/class-validators/checkedUniqueEmail.class-validators.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckedUniqueEmail = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../../auth/application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
let CheckedUniqueEmail = exports.CheckedUniqueEmail = class CheckedUniqueEmail {
    constructor(authService) {
        this.authService = authService;
    }
    async validate(value) {
        return await this.authService.checkedUniqueEmail(value);
    }
    defaultMessage() {
        return "Mail $value is already in use";
    }
};
exports.CheckedUniqueEmail = CheckedUniqueEmail = __decorate([
    (0, class_validator_1.ValidatorConstraint)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], CheckedUniqueEmail);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/class-validators/checkedUniqueUsername.class-validators.ts":
/*!****************************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/class-validators/checkedUniqueUsername.class-validators.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckedUniqueUsername = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../../auth/application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
let CheckedUniqueUsername = exports.CheckedUniqueUsername = class CheckedUniqueUsername {
    constructor(authService) {
        this.authService = authService;
    }
    async validate(value) {
        return await this.authService.checkedUniqueUsername(value);
    }
    defaultMessage() {
        return "Username $value is already in use";
    }
};
exports.CheckedUniqueUsername = CheckedUniqueUsername = __decorate([
    (0, class_validator_1.ValidatorConstraint)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], CheckedUniqueUsername);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/class-validators/index.ts":
/*!*******************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/class-validators/index.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./checkedEmail.class-validators */ "./apps/auth-microservice/src/auth/class-validators/checkedEmail.class-validators.ts"), exports);
__exportStar(__webpack_require__(/*! ./checkedConfirmCode.class-validators */ "./apps/auth-microservice/src/auth/class-validators/checkedConfirmCode.class-validators.ts"), exports);
__exportStar(__webpack_require__(/*! ./checkedUniqueEmail.class-validators */ "./apps/auth-microservice/src/auth/class-validators/checkedUniqueEmail.class-validators.ts"), exports);
__exportStar(__webpack_require__(/*! ./checkedUniqueUsername.class-validators */ "./apps/auth-microservice/src/auth/class-validators/checkedUniqueUsername.class-validators.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/core/dto/createUser.dto.ts":
/*!********************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/core/dto/createUser.dto.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const helpers_1 = __webpack_require__(/*! ../../../../../../libs/helpers */ "./libs/helpers/index.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[0-9A-Za-z.\-_]+$/),
    (0, class_validator_1.Length)(6, 30),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "User username",
        type: String,
        minLength: 6,
        maxLength: 30,
        pattern: "^[0-9A-Za-z.\\-_]+$",
        nullable: false
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d+_.-]+@([\w-]+.)+[A-Za-z]{2,}(?:[\w-]+)*$/),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "User email",
        type: String,
        pattern: "^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$",
        nullable: false
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "User password",
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+$",
        nullable: false
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/core/dto/emailResending.dto.ts":
/*!************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/core/dto/emailResending.dto.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailResendingDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const helpers_1 = __webpack_require__(/*! ../../../../../../libs/helpers */ "./libs/helpers/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class EmailResendingDto {
}
exports.EmailResendingDto = EmailResendingDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "Identifier of an inactive user",
        type: String,
        nullable: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EmailResendingDto.prototype, "userId", void 0);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/core/dto/index.ts":
/*!***********************************************************!*\
  !*** ./apps/auth-microservice/src/auth/core/dto/index.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./newPassUpdate.dto */ "./apps/auth-microservice/src/auth/core/dto/newPassUpdate.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./passRecovery.dto */ "./apps/auth-microservice/src/auth/core/dto/passRecovery.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./createUser.dto */ "./apps/auth-microservice/src/auth/core/dto/createUser.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./emailResending.dto */ "./apps/auth-microservice/src/auth/core/dto/emailResending.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./passwordEmailResending.dto */ "./apps/auth-microservice/src/auth/core/dto/passwordEmailResending.dto.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/core/dto/newPassUpdate.dto.ts":
/*!***********************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/core/dto/newPassUpdate.dto.ts ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewPassUpdateDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const helpers_1 = __webpack_require__(/*! ../../../../../../libs/helpers */ "./libs/helpers/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class NewPassUpdateDto {
}
exports.NewPassUpdateDto = NewPassUpdateDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.Length)(6, 20),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "New user password",
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+$",
        nullable: false
    }),
    __metadata("design:type", String)
], NewPassUpdateDto.prototype, "newPassword", void 0);
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: "Activation code sent to email",
        type: String,
        nullable: false
    }),
    __metadata("design:type", String)
], NewPassUpdateDto.prototype, "recoveryCode", void 0);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/core/dto/passRecovery.dto.ts":
/*!**********************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/core/dto/passRecovery.dto.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PassRecoveryDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const helpers_1 = __webpack_require__(/*! ../../../../../../libs/helpers */ "./libs/helpers/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class PassRecoveryDto {
}
exports.PassRecoveryDto = PassRecoveryDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d-\.]+@([\w-]+.)+[\w-]{2,4}$/),
    (0, swagger_1.ApiProperty)({
        description: "Email of registered user useremail@company.com",
        type: String,
        pattern: "^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$",
        nullable: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PassRecoveryDto.prototype, "email", void 0);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/core/dto/passwordEmailResending.dto.ts":
/*!********************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/core/dto/passwordEmailResending.dto.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordEmailResendingDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const helpers_1 = __webpack_require__(/*! ../../../../../../libs/helpers */ "./libs/helpers/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class PasswordEmailResendingDto {
}
exports.PasswordEmailResendingDto = PasswordEmailResendingDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: "The ID of the user who requested the new password",
        type: String,
        nullable: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PasswordEmailResendingDto.prototype, "userId", void 0);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/guards/github.guard.ts":
/*!***************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/guards/github.guard.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let GithubGuard = exports.GithubGuard = class GithubGuard extends (0, passport_1.AuthGuard)("github") {
};
exports.GithubGuard = GithubGuard = __decorate([
    (0, common_1.Injectable)()
], GithubGuard);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/guards/google.guard.ts":
/*!***************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/guards/google.guard.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let GoogleGuard = exports.GoogleGuard = class GoogleGuard extends (0, passport_1.AuthGuard)("google") {
};
exports.GoogleGuard = GoogleGuard = __decorate([
    (0, common_1.Injectable)()
], GoogleGuard);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/guards/index.ts":
/*!********************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/guards/index.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./local.guard */ "./apps/auth-microservice/src/auth/protection/guards/local.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtAccess.guard */ "./apps/auth-microservice/src/auth/protection/guards/jwtAccess.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtRefresh.guard */ "./apps/auth-microservice/src/auth/protection/guards/jwtRefresh.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./github.guard */ "./apps/auth-microservice/src/auth/protection/guards/github.guard.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/guards/jwtAccess.guard.ts":
/*!******************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/guards/jwtAccess.guard.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAccessGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAccessGuard = exports.JwtAccessGuard = class JwtAccessGuard extends (0, passport_1.AuthGuard)("jwt") {
};
exports.JwtAccessGuard = JwtAccessGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAccessGuard);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/guards/jwtRefresh.guard.ts":
/*!*******************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/guards/jwtRefresh.guard.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtRefreshGuard = exports.JwtRefreshGuard = class JwtRefreshGuard extends (0, passport_1.AuthGuard)("refreshToken") {
};
exports.JwtRefreshGuard = JwtRefreshGuard = __decorate([
    (0, common_1.Injectable)()
], JwtRefreshGuard);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/guards/local.guard.ts":
/*!**************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/guards/local.guard.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let LocalAuthGuard = exports.LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)("local") {
};
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/strategies/github.strategy.ts":
/*!**********************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/strategies/github.strategy.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_2 = __webpack_require__(/*! ../../../config */ "./apps/auth-microservice/src/config/index.ts");
const passport_github2_1 = __webpack_require__(/*! passport-github2 */ "passport-github2");
let GithubStrategy = exports.GithubStrategy = class GithubStrategy extends (0, passport_1.PassportStrategy)(passport_github2_1.Strategy) {
    constructor(config) {
        super({
            clientID: config_2.CONFIG.GITHUB_CLIENT_ID,
            clientSecret: config_2.CONFIG.GITHUB_CLIENT_SECRET,
            callbackURL: `${config_2.CONFIG.HOST}/api/v1/auth/github/callback`,
            scope: ["public_profile", "email"]
        });
        this.config = config;
    }
    async validate(accessToken, refreshToken, profile) {
        return { accessToken, refreshToken, profile };
    }
};
exports.GithubStrategy = GithubStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GithubStrategy);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/strategies/google.strategy.ts":
/*!**********************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/strategies/google.strategy.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_2 = __webpack_require__(/*! ../../../config/config */ "./apps/auth-microservice/src/config/config.ts");
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
let GoogleStrategy = exports.GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy) {
    constructor(config) {
        super({
            clientID: config_2.CONFIG.GOOGLE_CLIENT_ID,
            clientSecret: config_2.CONFIG.GOOGLE_CLIENT_SECRET,
            callbackURL: `${config_2.CONFIG.HOST}/api/v1/auth/google/callback`,
            scope: ["profile", "email"]
        });
        this.config = config;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const user = {
                providerID: profile.id,
                email: profile.emails[0].value,
                username: profile.username,
                displayName: profile.displayName,
                provider: profile.provider,
                photo: profile.photos[0].value,
                accessToken,
                refreshToken
            };
            done(null, user);
        }
        catch (err) {
            done(err);
            throw new common_1.UnauthorizedException(err);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GoogleStrategy);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/strategies/index.ts":
/*!************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/strategies/index.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./local.strategy */ "./apps/auth-microservice/src/auth/protection/strategies/local.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtAccess.strategy */ "./apps/auth-microservice/src/auth/protection/strategies/jwtAccess.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtRefresh.strategy */ "./apps/auth-microservice/src/auth/protection/strategies/jwtRefresh.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./google.strategy */ "./apps/auth-microservice/src/auth/protection/strategies/google.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./github.strategy */ "./apps/auth-microservice/src/auth/protection/strategies/github.strategy.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/strategies/jwtAccess.strategy.ts":
/*!*************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/strategies/jwtAccess.strategy.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAccessStrategy = exports.AccessCookieExtractor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const AccessCookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies["refreshToken"]) {
        token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    }
    return token;
};
exports.AccessCookieExtractor = AccessCookieExtractor;
let JwtAccessStrategy = exports.JwtAccessStrategy = class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_ACCESS_SECRET")
        });
        this.config = config;
    }
    async validate(payload) {
        console.log(payload.userID);
        return { userID: payload.userID };
    }
};
exports.JwtAccessStrategy = JwtAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtAccessStrategy);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/strategies/jwtRefresh.strategy.ts":
/*!**************************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/strategies/jwtRefresh.strategy.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshStrategy = void 0;
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../../application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
const helpers_1 = __webpack_require__(/*! ../../../../../../libs/helpers */ "./libs/helpers/index.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtRefreshStrategy = exports.JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "refreshToken") {
    constructor(config, authService) {
        super({
            jwtFromRequest: helpers_1.RefreshCookieExtractor,
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_REFRESH_SECRET")
        });
        this.config = config;
        this.authService = authService;
    }
    async validate(payload) {
        const validateSession = await this.authService.checkedActiveSession(payload.sessionId, payload.iat);
        if (!validateSession) {
            throw new common_1.UnauthorizedException("Session expired");
        }
        return { userId: payload.userId, sessionId: payload.sessionId };
    }
};
exports.JwtRefreshStrategy = JwtRefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], JwtRefreshStrategy);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/protection/strategies/local.strategy.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/protection/strategies/local.strategy.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const auth_service_1 = __webpack_require__(/*! ../../application/auth.service */ "./apps/auth-microservice/src/auth/application/auth.service.ts");
let LocalStrategy = exports.LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: "email"
        });
        this.authService = authService;
    }
    async validate(email, password) {
        return await this.authService.validateLogin(email, password);
    }
};
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/repositories/auth-command.repository.ts":
/*!*********************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/repositories/auth-command.repository.ts ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthCommandRepository_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthCommandRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../prisma/prisma.service */ "./apps/auth-microservice/src/prisma/prisma.service.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
let AuthCommandRepository = exports.AuthCommandRepository = AuthCommandRepository_1 = class AuthCommandRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AuthCommandRepository_1.name);
    }
    async localRegister(data) {
        const user = await this.prisma.user
            .create({
            data: {
                email: data.email,
                username: data.username,
                hashPassword: data.hashPassword ? data.hashPassword : ""
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!user)
            throw new common_1.InternalServerErrorException("Unable to create new User");
        return user;
    }
    async createEmailCode({ userID }) {
        const emailCode = await this.prisma.emailConfirmCode
            .create({
            data: {
                code: (0, uuid_1.v4)(),
                exp: (0, date_fns_1.add)(new Date(), { minutes: 10 }),
                userID
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!emailCode)
            throw new common_1.InternalServerErrorException("Unable to create new Email Code");
        return emailCode.code;
    }
    async deactivateAllEmailCodes({ userID }) {
        await this.prisma.emailConfirmCode.updateMany({
            where: { userID },
            data: { isUsed: true }
        });
    }
    async createNewPassword({ userId, hashPassword }) {
        return Boolean(await this.prisma.user.update({
            where: { id: userId },
            data: { hashPassword }
        }));
    }
    async addNewSession(authObject, expiresTime) {
        const session = await this.prisma.sessions
            .create({
            data: {
                userIP: authObject.userIP,
                userAgent: authObject.userAgent,
                expires: expiresTime,
                userID: authObject.userID
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!session)
            throw new common_1.InternalServerErrorException("Unable to create new Session");
        return session;
    }
    async deleteSession({ sessionID }) {
        return Boolean(await this.prisma.sessions.delete({ where: { id: sessionID } }));
    }
    async googleRegister(dto) {
        const googleProfile = await this.prisma.googleProfile
            .create({
            data: {
                providerID: dto.providerID,
                email: dto.email,
                username: dto.username,
                provider: dto.provider,
                displayName: dto.displayName || null,
                userID: dto.userID
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!googleProfile)
            throw new common_1.InternalServerErrorException("Unable to create new Google Profile");
        return googleProfile;
    }
    async confirmUserEmail({ userId }) {
        return Boolean(await this.prisma.user.update({
            where: { id: userId },
            data: { isConfirmed: client_1.ConfirmEmailStatusEnum.CONFIRMED }
        }));
    }
    async createGoogleProfile(dto) {
        const googleProfile = await this.prisma.googleProfile
            .create({
            data: dto
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (googleProfile) {
            return googleProfile;
        }
        else {
            throw new common_1.InternalServerErrorException("Unable to create google profile");
        }
    }
    async createPasswordRecoveryCode({ userID }) {
        const passwordRecoveryCode = await this.prisma.passwordRecoveryCode
            .create({
            data: {
                code: (0, uuid_1.v4)(),
                exp: (0, date_fns_1.add)(new Date(), { minutes: 10 }),
                userID
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!passwordRecoveryCode)
            throw new common_1.InternalServerErrorException("Unable to create new Password Recovery Code");
        return passwordRecoveryCode;
    }
    async deactivateAllPasswordRecoveryCodes({ userID }) {
        return Boolean(await this.prisma.passwordRecoveryCode.updateMany({
            where: { userID },
            data: { isUsed: true }
        }));
    }
};
exports.AuthCommandRepository = AuthCommandRepository = AuthCommandRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AuthCommandRepository);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/repositories/auth-query.repository.ts":
/*!*******************************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/repositories/auth-query.repository.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthQueryRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../prisma/prisma.service */ "./apps/auth-microservice/src/prisma/prisma.service.ts");
let AuthQueryRepository = exports.AuthQueryRepository = class AuthQueryRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkIsUniqueUsername({ username }) {
        return Boolean(await this.prisma.user.findUnique({ where: { username } }));
    }
    async checkIsUniqueEmail({ email }) {
        return Boolean(await this.prisma.user.findUnique({ where: { email } }));
    }
    async findUniqueUserByID({ userID }) {
        return this.prisma.user.findUnique({ where: { id: userID } });
    }
    async findUniqueUserByEmail({ email }) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }
    async findUniqueEmailCodeByCode({ code }) {
        return this.prisma.emailConfirmCode.findUnique({ where: { code } });
    }
    async findUniqueSessionByID({ sessionID }) {
        return this.prisma.sessions.findUnique({ where: { id: sessionID } });
    }
    async findUniqueGoogleProfileByProviderID({ providerID }) {
        return this.prisma.googleProfile.findUnique({ where: { providerID } });
    }
    async findUniqueGoogleProfileByUserID({ userID }) {
        return this.prisma.googleProfile.findUnique({ where: { userID } });
    }
    async findUniquePasswordRecoveryCodeByCode({ code }) {
        return this.prisma.passwordRecoveryCode.findUnique({ where: { code } });
    }
};
exports.AuthQueryRepository = AuthQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AuthQueryRepository);


/***/ }),

/***/ "./apps/auth-microservice/src/auth/repositories/index.ts":
/*!***************************************************************!*\
  !*** ./apps/auth-microservice/src/auth/repositories/index.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./auth-command.repository */ "./apps/auth-microservice/src/auth/repositories/auth-command.repository.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth-query.repository */ "./apps/auth-microservice/src/auth/repositories/auth-query.repository.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/config/config.ts":
/*!*****************************************************!*\
  !*** ./apps/auth-microservice/src/config/config.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONFIG = void 0;
const process_1 = __importDefault(__webpack_require__(/*! process */ "process"));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports.CONFIG = {
    START_MODULE: config_1.ConfigModule.forRoot({ isGlobal: true }),
    HOST: process_1.default.env.HOST,
    FRONTEND_HOST: process_1.default.env.FRONTEND_HOST,
    NODEMAILER_SERVICE: process_1.default.env.NODEMAILER_SERVICE,
    NODEMAILER_USER: process_1.default.env.NODEMAILER_USER,
    NODEMAILER_PASS: process_1.default.env.NODEMAILER_PASS,
    JWT_ACCESS_SECRET: process_1.default.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process_1.default.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRES: process_1.default.env.JWT_ACCESS_EXPIRES,
    JWT_REFRESH_EXPIRES: process_1.default.env.JWT_REFRESH_EXPIRES,
    GOOGLE_CLIENT_ID: process_1.default.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process_1.default.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process_1.default.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process_1.default.env.GITHUB_CLIENT_SECRET
};


/***/ }),

/***/ "./apps/auth-microservice/src/config/index.ts":
/*!****************************************************!*\
  !*** ./apps/auth-microservice/src/config/index.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./config */ "./apps/auth-microservice/src/config/config.ts"), exports);


/***/ }),

/***/ "./apps/auth-microservice/src/main.ts":
/*!********************************************!*\
  !*** ./apps/auth-microservice/src/main.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/auth-microservice/src/app.module.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ "cookie-parser"));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const errors_handlers_1 = __webpack_require__(/*! ../../../libs/errors-handlers */ "./libs/errors-handlers/index.ts");
const swagger_setup_1 = __webpack_require__(/*! ../../../libs/swagger/swagger.setup */ "./libs/swagger/swagger.setup.ts");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const bootstrap = async () => {
    const logger = new common_1.Logger("bootstrap");
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({
            origin: [
                "http://localhost:3000",
                "https://godzilla-front.vercel.app",
                "https://godzillagram.com"
            ],
            credentials: true,
            methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
        });
        app.use((0, cookie_parser_1.default)());
        (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
        app.useGlobalPipes(new common_1.ValidationPipe(errors_handlers_1.validatePipeOptions));
        app.setGlobalPrefix("api/v1");
        const config = app.get(config_1.ConfigService);
        const STATUS = config.get("STATUS");
        const PORT = config.get("PORT");
        if (STATUS === "development" || "stage")
            (0, swagger_setup_1.swaggerSetup)(app);
        await app.listen(PORT);
        logger.log((0, colorette_1.blue)(`Server is running on ${PORT} with status: ${STATUS}`));
    }
    catch (err) {
        logger.error((0, colorette_1.red)(`Unable to launch server. Learn more at: ${err}`));
        throw new common_1.InternalServerErrorException();
    }
};
bootstrap();


/***/ }),

/***/ "./apps/auth-microservice/src/prisma/prisma.module.ts":
/*!************************************************************!*\
  !*** ./apps/auth-microservice/src/prisma/prisma.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/auth-microservice/src/prisma/prisma.service.ts");
let PrismaModule = exports.PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService]
    })
], PrismaModule);


/***/ }),

/***/ "./apps/auth-microservice/src/prisma/prisma.service.ts":
/*!*************************************************************!*\
  !*** ./apps/auth-microservice/src/prisma/prisma.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = exports.PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./libs/common/decorators/github-payload.decorator.ts":
/*!************************************************************!*\
  !*** ./libs/common/decorators/github-payload.decorator.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GithubPayloadDecorator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.GithubPayloadDecorator = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
});


/***/ }),

/***/ "./libs/common/decorators/google-payload.decorator.ts":
/*!************************************************************!*\
  !*** ./libs/common/decorators/google-payload.decorator.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GooglePayloadDecorator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.GooglePayloadDecorator = (0, common_1.createParamDecorator)((key, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
});


/***/ }),

/***/ "./libs/common/decorators/index.ts":
/*!*****************************************!*\
  !*** ./libs/common/decorators/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./google-payload.decorator */ "./libs/common/decorators/google-payload.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./user-agent.decorator */ "./libs/common/decorators/user-agent.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./github-payload.decorator */ "./libs/common/decorators/github-payload.decorator.ts"), exports);


/***/ }),

/***/ "./libs/common/decorators/user-agent.decorator.ts":
/*!********************************************************!*\
  !*** ./libs/common/decorators/user-agent.decorator.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAgentDecorator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.UserAgentDecorator = (0, common_1.createParamDecorator)((_, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers["user-agent"];
});


/***/ }),

/***/ "./libs/errors-handlers/handle-exception.util.ts":
/*!*******************************************************!*\
  !*** ./libs/errors-handlers/handle-exception.util.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HandleException = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const HandleException = (data) => {
    throw new common_1.HttpException({
        message: data.message,
        field: data.field,
        error: data.error,
        statusCode: data.statusCode
    }, data.statusCode);
};
exports.HandleException = HandleException;


/***/ }),

/***/ "./libs/errors-handlers/index.ts":
/*!***************************************!*\
  !*** ./libs/errors-handlers/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./validatePipeOptions */ "./libs/errors-handlers/validatePipeOptions.ts"), exports);
__exportStar(__webpack_require__(/*! ./handle-exception.util */ "./libs/errors-handlers/handle-exception.util.ts"), exports);


/***/ }),

/***/ "./libs/errors-handlers/validatePipeOptions.ts":
/*!*****************************************************!*\
  !*** ./libs/errors-handlers/validatePipeOptions.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validatePipeOptions = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.validatePipeOptions = {
    transform: true,
    stopAtFirstError: true,
    exceptionFactory: (errors) => {
        const errorsForResponse = [];
        errors.forEach((e) => {
            const constraintsKey = Object.keys(e.constraints);
            constraintsKey.forEach((key) => {
                errorsForResponse.push({
                    message: e.constraints[key],
                    field: e.property
                });
            });
        });
        throw new common_1.BadRequestException(errorsForResponse);
    }
};


/***/ }),

/***/ "./libs/helpers/index.ts":
/*!*******************************!*\
  !*** ./libs/helpers/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./trimDecorator */ "./libs/helpers/trimDecorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./payloadDecorator */ "./libs/helpers/payloadDecorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./refreshCookieExtractor */ "./libs/helpers/refreshCookieExtractor.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-password-recovery.extractor */ "./libs/helpers/jwt-password-recovery.extractor.ts"), exports);


/***/ }),

/***/ "./libs/helpers/jwt-password-recovery.extractor.ts":
/*!*********************************************************!*\
  !*** ./libs/helpers/jwt-password-recovery.extractor.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtPasswordRecoveryExtractor = void 0;
const JwtPasswordRecoveryExtractor = (req) => {
    let code = null;
    if (req && req.params) {
        code = req.params["code"];
    }
    return code;
};
exports.JwtPasswordRecoveryExtractor = JwtPasswordRecoveryExtractor;


/***/ }),

/***/ "./libs/helpers/payloadDecorator.ts":
/*!******************************************!*\
  !*** ./libs/helpers/payloadDecorator.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtPayloadDecorator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.JwtPayloadDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user : {};
});


/***/ }),

/***/ "./libs/helpers/refreshCookieExtractor.ts":
/*!************************************************!*\
  !*** ./libs/helpers/refreshCookieExtractor.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshCookieExtractor = void 0;
const RefreshCookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["refreshToken"];
    }
    return token;
};
exports.RefreshCookieExtractor = RefreshCookieExtractor;


/***/ }),

/***/ "./libs/helpers/trimDecorator.ts":
/*!***************************************!*\
  !*** ./libs/helpers/trimDecorator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrimDecorator = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
function TrimDecorator() {
    return (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? value.trim() : value));
}
exports.TrimDecorator = TrimDecorator;


/***/ }),

/***/ "./libs/models/enums.ts":
/*!******************************!*\
  !*** ./libs/models/enums.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokensEnum = void 0;
var TokensEnum;
(function (TokensEnum) {
    TokensEnum["REFRESH_TOKEN"] = "refreshToken";
    TokensEnum["ACCESS_TOKEN"] = "accessToken";
})(TokensEnum || (exports.TokensEnum = TokensEnum = {}));


/***/ }),

/***/ "./libs/models/index.ts":
/*!******************************!*\
  !*** ./libs/models/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./main.models */ "./libs/models/main.models.ts"), exports);


/***/ }),

/***/ "./libs/models/main.models.ts":
/*!************************************!*\
  !*** ./libs/models/main.models.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllTablesEnum = void 0;
var AllTablesEnum;
(function (AllTablesEnum) {
    AllTablesEnum["User"] = "User";
    AllTablesEnum["ConfirmUser"] = "ConfirmUser";
    AllTablesEnum["Profile"] = "Profile";
    AllTablesEnum["Post"] = "Post";
    AllTablesEnum["Comment"] = "Comment";
    AllTablesEnum["Sessions"] = "Sessions";
    AllTablesEnum["LikesInfoPost"] = "LikesInfoPost";
    AllTablesEnum["LikesInfoComment"] = "LikesInfoComment";
})(AllTablesEnum || (exports.AllTablesEnum = AllTablesEnum = {}));


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToAuthorization.ts":
/*!*****************************************************!*\
  !*** ./libs/swagger/auth/SwaggerToAuthorization.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToAuthorization = exports.LoginReqDto = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LoginReqDto {
}
exports.LoginReqDto = LoginReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User email",
        type: String,
        pattern: "^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$",
        nullable: false
    }),
    __metadata("design:type", String)
], LoginReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User password",
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: "^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+$",
        nullable: false
    }),
    __metadata("design:type", String)
], LoginReqDto.prototype, "password", void 0);
class LoginResDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Access token"
    }),
    __metadata("design:type", String)
], LoginResDto.prototype, "accessToken", void 0);
function SwaggerToAuthorization() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "User authorization" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns JWT accessToken in body and JWT refreshToken " +
            "in cookie (http-only, secure)",
        type: LoginResDto
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "If the inputModel has incorrect values"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Invalid user's credentials"
    }));
}
exports.SwaggerToAuthorization = SwaggerToAuthorization;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToLogout.ts":
/*!**********************************************!*\
  !*** ./libs/swagger/auth/SwaggerToLogout.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToLogout = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToLogout() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "User is logout" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "User is logout successfully"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "If the JWT refreshToken inside cookie is missing, expired or incorrect"
    }));
}
exports.SwaggerToLogout = SwaggerToLogout;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToMeInfo.ts":
/*!**********************************************!*\
  !*** ./libs/swagger/auth/SwaggerToMeInfo.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToMeInfo = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class MeInfoDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MeInfoDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MeInfoDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MeInfoDto.prototype, "email", void 0);
function SwaggerToMeInfo() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "Get information about current user" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "User info",
        type: MeInfoDto
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "If the JWT accessToken missing, expired or incorrect"
    }));
}
exports.SwaggerToMeInfo = SwaggerToMeInfo;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToNewPassword.ts":
/*!***************************************************!*\
  !*** ./libs/swagger/auth/SwaggerToNewPassword.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToNewPassword = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToNewPassword() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "Changing the user password to a new password" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "If code is valid and new password is accepted"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "If the inputModel has incorrect value (for incorrect password length) or " +
            "RecoveryCode is incorrect or expired"
    }));
}
exports.SwaggerToNewPassword = SwaggerToNewPassword;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToPasswordEmailResending.ts":
/*!**************************************************************!*\
  !*** ./libs/swagger/auth/SwaggerToPasswordEmailResending.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToPasswordEmailResending = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToPasswordEmailResending() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "Resending an activation code by email" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "Input data is accepted.Email with confirmation code will be send to " +
            "passed email address"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "If the inputModel has incorrect values"
    }));
}
exports.SwaggerToPasswordEmailResending = SwaggerToPasswordEmailResending;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToPasswordRecovery.ts":
/*!********************************************************!*\
  !*** ./libs/swagger/auth/SwaggerToPasswordRecovery.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToPasswordRecovery = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToPasswordRecovery() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "Send activation code to change password" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "A new activation code has been successfully sent to your email"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Bad request"
    }));
}
exports.SwaggerToPasswordRecovery = SwaggerToPasswordRecovery;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToRefreshToken.ts":
/*!****************************************************!*\
  !*** ./libs/swagger/auth/SwaggerToRefreshToken.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToRefreshToken = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class RefreshTokenDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Access token"
    }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "accessToken", void 0);
function SwaggerToRefreshToken() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: "Generation of a new pair of access and refresh tokens"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Returns JWT accessToken in body and JWT refreshToken " +
            "in cookie (http-only, secure)",
        type: RefreshTokenDto
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "If the JWT refreshToken inside cookie is missing, expired or incorrect"
    }));
}
exports.SwaggerToRefreshToken = SwaggerToRefreshToken;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToRegistration.ts":
/*!****************************************************!*\
  !*** ./libs/swagger/auth/SwaggerToRegistration.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToRegistration = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToRegistration() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "User registration" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "User created successfully, sent an confirmation code to user's email"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: "Email or username is already existing"
    }));
}
exports.SwaggerToRegistration = SwaggerToRegistration;


/***/ }),

/***/ "./libs/swagger/auth/SwaggerToRegistrationEmailResending.ts":
/*!******************************************************************!*\
  !*** ./libs/swagger/auth/SwaggerToRegistrationEmailResending.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToRegistrationEmailResending = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToRegistrationEmailResending() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "Resending an activation code by email" }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: "New confirmation code was sent to user's email"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "If the inputModel has incorrect values"
    }));
}
exports.SwaggerToRegistrationEmailResending = SwaggerToRegistrationEmailResending;


/***/ }),

/***/ "./libs/swagger/auth/index.ts":
/*!************************************!*\
  !*** ./libs/swagger/auth/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./SwaggerToPasswordRecovery */ "./libs/swagger/auth/SwaggerToPasswordRecovery.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToNewPassword */ "./libs/swagger/auth/SwaggerToNewPassword.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToAuthorization */ "./libs/swagger/auth/SwaggerToAuthorization.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToRefreshToken */ "./libs/swagger/auth/SwaggerToRefreshToken.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToRegistration */ "./libs/swagger/auth/SwaggerToRegistration.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToPasswordEmailResending */ "./libs/swagger/auth/SwaggerToPasswordEmailResending.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToRegistrationEmailResending */ "./libs/swagger/auth/SwaggerToRegistrationEmailResending.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToLogout */ "./libs/swagger/auth/SwaggerToLogout.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToMeInfo */ "./libs/swagger/auth/SwaggerToMeInfo.ts"), exports);


/***/ }),

/***/ "./libs/swagger/config.swagger.ts":
/*!****************************************!*\
  !*** ./libs/swagger/config.swagger.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swaggerConfig = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
exports.swaggerConfig = {
    development: new swagger_1.DocumentBuilder()
        .setTitle("Godzilla-back")
        .setDescription("The godzilla-back API description")
        .setVersion("1.0")
        .build()
};


/***/ }),

/***/ "./libs/swagger/swagger.setup.ts":
/*!***************************************!*\
  !*** ./libs/swagger/swagger.setup.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swaggerSetup = void 0;
const config_swagger_1 = __webpack_require__(/*! ./config.swagger */ "./libs/swagger/config.swagger.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const swaggerSetup = (app) => {
    const options = config_swagger_1.swaggerConfig.development;
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api/v1/testing", app, document, {
        customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
        customJs: [
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js"
        ]
    });
};
exports.swaggerSetup = swaggerSetup;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/cqrs":
/*!*******************************!*\
  !*** external "@nestjs/cqrs" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/cqrs");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "colorette":
/*!****************************!*\
  !*** external "colorette" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("colorette");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "passport-github2":
/*!***********************************!*\
  !*** external "passport-github2" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("passport-github2");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/auth-microservice/src/main.ts");
/******/ 	
/******/ })()
;