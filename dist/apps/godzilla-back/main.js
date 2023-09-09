/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/godzilla-back/config/config.ts":
/*!*********************************************!*\
  !*** ./apps/godzilla-back/config/config.ts ***!
  \*********************************************/
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
    FRONTEND_HOST: process_1.default.env.FRONTEND_HOST
};


/***/ }),

/***/ "./apps/godzilla-back/src/adapters/bcrypt.adapter.ts":
/*!***********************************************************!*\
  !*** ./apps/godzilla-back/src/adapters/bcrypt.adapter.ts ***!
  \***********************************************************/
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

/***/ "./apps/godzilla-back/src/adapters/index.ts":
/*!**************************************************!*\
  !*** ./apps/godzilla-back/src/adapters/index.ts ***!
  \**************************************************/
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
__exportStar(__webpack_require__(/*! ./bcrypt.adapter */ "./apps/godzilla-back/src/adapters/bcrypt.adapter.ts"), exports);
__exportStar(__webpack_require__(/*! ./mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts"), exports);


/***/ }),

/***/ "./apps/godzilla-back/src/adapters/mailer.adapter.ts":
/*!***********************************************************!*\
  !*** ./apps/godzilla-back/src/adapters/mailer.adapter.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerAdapter = void 0;
const config_1 = __webpack_require__(/*! apps/godzilla-back/config/config */ "./apps/godzilla-back/config/config.ts");
const nodemailer_1 = __webpack_require__(/*! nodemailer */ "nodemailer");
class MailerAdapter {
    async options(options) {
        const transport = (0, nodemailer_1.createTransport)({
            service: "gmail",
            auth: {
                user: "jihnordraven@gmail.com",
                pass: "htsubscpzoymrwce"
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

/***/ "./apps/godzilla-back/src/app.controller.ts":
/*!**************************************************!*\
  !*** ./apps/godzilla-back/src/app.controller.ts ***!
  \**************************************************/
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
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/godzilla-back/src/app.service.ts");
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

/***/ "./apps/godzilla-back/src/app.module.ts":
/*!**********************************************!*\
  !*** ./apps/godzilla-back/src/app.module.ts ***!
  \**********************************************/
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
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/godzilla-back/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/godzilla-back/src/app.service.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/godzilla-back/src/auth/auth.module.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/godzilla-back/src/prisma/prisma.module.ts");
const strategies_1 = __webpack_require__(/*! ./auth/guards-handlers/strategies */ "./apps/godzilla-back/src/auth/guards-handlers/strategies/index.ts");
const config_1 = __webpack_require__(/*! ../config/config */ "./apps/godzilla-back/config/config.ts");
const strategies = [strategies_1.LocalStrategy, strategies_1.JwtAccessStrategy, strategies_1.JwtRefreshStrategy, strategies_1.GoogleStrategy];
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

/***/ "./apps/godzilla-back/src/app.service.ts":
/*!***********************************************!*\
  !*** ./apps/godzilla-back/src/app.service.ts ***!
  \***********************************************/
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
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/godzilla-back/src/prisma/prisma.service.ts");
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

/***/ "./apps/godzilla-back/src/auth/application/auth.service.ts":
/*!*****************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/auth.service.ts ***!
  \*****************************************************************/
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
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_repository_1 = __webpack_require__(/*! ../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const commands_1 = __webpack_require__(/*! ./commands */ "./apps/godzilla-back/src/auth/application/commands/index.ts");
const adapters_1 = __webpack_require__(/*! ../../adapters */ "./apps/godzilla-back/src/adapters/index.ts");
let AuthService = exports.AuthService = class AuthService {
    constructor(authRepository, commandBus, bcrypt) {
        this.authRepository = authRepository;
        this.commandBus = commandBus;
        this.bcrypt = bcrypt;
    }
    async validateLogin(email, password) {
        const user = await this.authRepository.findUserToEmail({ email });
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
        return { userId: user.id };
    }
    async refreshFlow(authObjectDTO, userId, sessionId) {
        await this.commandBus.execute(new commands_1.LogoutCommand(userId, sessionId));
        return await this.commandBus.execute(new commands_1.LoginCommand(authObjectDTO));
    }
    async checkedActiveSession(sessionId, expiredSecondsToken) {
        if (!sessionId) {
            return false;
        }
        const activeSession = await this.authRepository.findActiveSession(sessionId);
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
        const user = await this.commandBus.execute(new commands_1.GoogleRegisterCommand(dto));
        return this.commandBus.execute(new commands_1.LoginCommand({ userIP, userAgent, userID: user.userId }));
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof adapters_1.BcryptAdapter !== "undefined" && adapters_1.BcryptAdapter) === "function" ? _c : Object])
], AuthService);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/confirm-email.command.ts":
/*!***********************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/confirm-email.command.ts ***!
  \***********************************************************************************/
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
exports.ConfirmEmailHandler = exports.ConfirmEmailCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class ConfirmEmailCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.ConfirmEmailCommand = ConfirmEmailCommand;
let ConfirmEmailHandler = exports.ConfirmEmailHandler = class ConfirmEmailHandler {
    constructor(config, authRepository) {
        this.config = config;
        this.authRepository = authRepository;
        this.FRONTEND_HOST = this.config.get("FRONTEND_HOST");
    }
    async execute({ dto: { code, res } }) {
        const isCode = await this.authRepository.findOneEmailCodeByCode({ code });
        if (!isCode) {
            res.redirect(`${this.FRONTEND_HOST}/email-code-not-found`);
            throw new common_1.NotFoundException("Code not found");
        }
        if ((isCode.isUsed = true)) {
            res.redirect(`${this.FRONTEND_HOST}/email-code-already-used`);
            throw new common_1.BadRequestException("This code has already been used");
        }
        const isCodeExpired = new Date(isCode.exp) <= new Date();
        if (isCodeExpired) {
            await this.authRepository.deactivateAllEmailCodes({ userID: isCode.userID });
            res.redirect(`${this.FRONTEND_HOST}/email-code-expired`);
            throw new common_1.BadRequestException("Code has expired");
        }
        await this.authRepository.confirmUserEmail({ userId: isCode.userID });
        await this.authRepository.deactivateAllEmailCodes({ userID: isCode.userID });
        res.redirect(`${this.FRONTEND_HOST}/email-code-success`);
    }
};
exports.ConfirmEmailHandler = ConfirmEmailHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ConfirmEmailCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _b : Object])
], ConfirmEmailHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/confirm-password-recovery.command.ts":
/*!***********************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/confirm-password-recovery.command.ts ***!
  \***********************************************************************************************/
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
exports.ConfirmPasswordRecoveryHandler = exports.ConfirmPasswordRecoveryCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class ConfirmPasswordRecoveryCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.ConfirmPasswordRecoveryCommand = ConfirmPasswordRecoveryCommand;
let ConfirmPasswordRecoveryHandler = exports.ConfirmPasswordRecoveryHandler = class ConfirmPasswordRecoveryHandler {
    constructor(config, authRepository) {
        this.config = config;
        this.authRepository = authRepository;
        this.FRONTEND_HOST = this.config.get("FRONTEND_HOST");
    }
    async execute({ dto: { code, res } }) {
        const isCode = await this.authRepository.findOnePasswordRecoveryCodeByCode({ code });
        if (!isCode) {
            res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-not-found`);
            throw new common_1.NotFoundException("Code not found");
        }
        if ((isCode.isUsed = true)) {
            await this.authRepository.deactivateAllPasswordRecoveryCodes({ userID: isCode.userID });
            res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-already-used`);
            throw new common_1.ConflictException("This code has already been used");
        }
        const isCodeExpired = new Date(isCode.exp) <= new Date();
        if (isCodeExpired) {
            await this.authRepository.deactivateAllPasswordRecoveryCodes({ userID: isCode.userID });
            res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-expired`);
            throw new common_1.BadRequestException("Code has expired");
        }
        res.redirect(`${this.FRONTEND_HOST}/password-recovery-code-success/code=${isCode.code}`);
    }
};
exports.ConfirmPasswordRecoveryHandler = ConfirmPasswordRecoveryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ConfirmPasswordRecoveryCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _b : Object])
], ConfirmPasswordRecoveryHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/google-register.command.ts":
/*!*************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/google-register.command.ts ***!
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
exports.GoogleRegisterHandler = exports.GoogleRegisterCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
class GoogleRegisterCommand {
    constructor(dto) {
        this.dto = dto;
    }
}
exports.GoogleRegisterCommand = GoogleRegisterCommand;
let GoogleRegisterHandler = exports.GoogleRegisterHandler = class GoogleRegisterHandler {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute({ dto }) {
        const isGoogleProfile = await this.authRepository.findUniqueGoogleProfileByProviderId({
            providerId: dto.providerId
        });
        if (!isGoogleProfile) {
            const isUser = await this.authRepository.findUserToEmail({
                email: dto.email
            });
            if (!isUser) {
                const isUsernameTaken = await this.authRepository.checkUniqueUsername({
                    username: dto.username || ""
                });
                if (!isUsernameTaken) {
                    const username = dto.username
                        ? dto.username
                        : await this.authRepository.generateClientUsername();
                    const user = await this.authRepository.localRegister({
                        email: dto.email,
                        username
                    });
                    const googleProfile = await this.authRepository.googleRegister({
                        email: dto.email,
                        username,
                        providerId: dto.providerId,
                        provider: dto.provider,
                        displayName: dto.displayName,
                        userId: user.id
                    });
                    return googleProfile;
                }
                else {
                    const username = dto.username
                        ? dto.username
                        : await this.authRepository.generateClientUsername();
                    const user = await this.authRepository.localRegister({
                        email: dto.email,
                        username: username,
                        hashPassword: ""
                    });
                    const googleProfile = await this.authRepository.googleRegister({
                        email: dto.email,
                        username,
                        providerId: dto.providerId,
                        provider: dto.provider,
                        displayName: dto.displayName,
                        userId: user.id
                    });
                    return googleProfile;
                }
            }
            const username = dto.username
                ? dto.username
                : await this.authRepository.generateClientUsername();
            const googleProfile = await this.authRepository.googleRegister({
                email: dto.email,
                username,
                providerId: dto.providerId,
                provider: dto.provider,
                displayName: dto.displayName,
                userId: isUser.id
            });
            return googleProfile;
        }
        return isGoogleProfile;
    }
};
exports.GoogleRegisterHandler = GoogleRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(GoogleRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object])
], GoogleRegisterHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/index.ts":
/*!*******************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./login-command */ "./apps/godzilla-back/src/auth/application/commands/login-command.ts"), exports);
__exportStar(__webpack_require__(/*! ./local-register.command */ "./apps/godzilla-back/src/auth/application/commands/local-register.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./resend-email-code.command */ "./apps/godzilla-back/src/auth/application/commands/resend-email-code.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery.command */ "./apps/godzilla-back/src/auth/application/commands/password-recovery.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./new-password.command */ "./apps/godzilla-back/src/auth/application/commands/new-password.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./password-recovery-resend.command */ "./apps/godzilla-back/src/auth/application/commands/password-recovery-resend.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./logout-command */ "./apps/godzilla-back/src/auth/application/commands/logout-command.ts"), exports);
__exportStar(__webpack_require__(/*! ./meInfo-command */ "./apps/godzilla-back/src/auth/application/commands/meInfo-command.ts"), exports);
__exportStar(__webpack_require__(/*! ./google-register.command */ "./apps/godzilla-back/src/auth/application/commands/google-register.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./confirm-email.command */ "./apps/godzilla-back/src/auth/application/commands/confirm-email.command.ts"), exports);
__exportStar(__webpack_require__(/*! ./confirm-password-recovery.command */ "./apps/godzilla-back/src/auth/application/commands/confirm-password-recovery.command.ts"), exports);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/local-register.command.ts":
/*!************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/local-register.command.ts ***!
  \************************************************************************************/
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
exports.LocalRegisterHandler = exports.LocalRegisterCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts");
const adapters_1 = __webpack_require__(/*! apps/godzilla-back/src/adapters */ "./apps/godzilla-back/src/adapters/index.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class LocalRegisterCommand {
    constructor(createUser) {
        this.createUser = createUser;
    }
}
exports.LocalRegisterCommand = LocalRegisterCommand;
let LocalRegisterHandler = exports.LocalRegisterHandler = class LocalRegisterHandler {
    constructor(authRepository, bcryptAdapter, mailerAdapter) {
        this.authRepository = authRepository;
        this.bcryptAdapter = bcryptAdapter;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ createUser: { email, username, password } }) {
        const isEmail = await this.authRepository.checkUniqueEmail({ email });
        if (isEmail)
            throw new common_1.ConflictException("User with this email is already registered");
        const isUsername = await this.authRepository.checkUniqueUsername({
            username
        });
        if (isUsername)
            throw new common_1.ConflictException("User with this username is already registered");
        const hashPassword = await this.bcryptAdapter.hash({ password });
        const user = await this.authRepository.localRegister({
            email,
            username,
            hashPassword
        });
        const emailCode = await this.authRepository.createEmailCode({
            userID: user.id
        });
        await this.mailerAdapter.sendConfirmCode({ email, code: emailCode.code });
    }
};
exports.LocalRegisterHandler = LocalRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(LocalRegisterCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof adapters_1.BcryptAdapter !== "undefined" && adapters_1.BcryptAdapter) === "function" ? _b : Object, typeof (_c = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _c : Object])
], LocalRegisterHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/login-command.ts":
/*!***************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/login-command.ts ***!
  \***************************************************************************/
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
exports.LoginUseCase = exports.LoginCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
class LoginCommand {
    constructor(authObject) {
        this.authObject = authObject;
    }
}
exports.LoginCommand = LoginCommand;
let LoginUseCase = exports.LoginUseCase = class LoginUseCase {
    constructor(config, authRepository, jwtService) {
        this.config = config;
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    async execute({ authObject }) {
        const expiresTime = (0, date_fns_1.add)(new Date(), {
            seconds: this.config.get("EXPIRES_REFRESH")
        }).toString();
        const newSession = await this.authRepository.addNewSession(authObject, expiresTime);
        const refreshToken = this.jwtService.sign({ sessionId: newSession.id, userId: newSession.userOwnerId }, {
            secret: this.config.get("JWT_REFRESH_SECRET"),
            expiresIn: `${this.config.get("EXPIRES_REFRESH")}s`
        });
        const accessToken = this.jwtService.sign({ userId: newSession.userOwnerId }, {
            secret: this.config.get("JWT_ACCESS_SECRET"),
            expiresIn: `${this.config.get("EXPIRES_ACCESS")}s`
        });
        return {
            refreshToken: refreshToken,
            accessToken: accessToken
        };
    }
};
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(LoginCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], LoginUseCase);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/logout-command.ts":
/*!****************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/logout-command.ts ***!
  \****************************************************************************/
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
exports.LogoutUseCase = exports.LogoutCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class LogoutCommand {
    constructor(userId, sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
    }
}
exports.LogoutCommand = LogoutCommand;
let LogoutUseCase = exports.LogoutUseCase = class LogoutUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(command) {
        const { userId, sessionId } = command;
        const session = await this.authRepository.findActiveSession(sessionId);
        if (!session) {
            throw new common_1.NotFoundException();
        }
        if (session.userOwnerId !== userId) {
            throw new common_1.ForbiddenException();
        }
        await this.authRepository.deleteSession(sessionId);
    }
};
exports.LogoutUseCase = LogoutUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(LogoutCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object])
], LogoutUseCase);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/meInfo-command.ts":
/*!****************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/meInfo-command.ts ***!
  \****************************************************************************/
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
exports.MeInfoUseCase = exports.MeInfoCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class MeInfoCommand {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.MeInfoCommand = MeInfoCommand;
let MeInfoUseCase = exports.MeInfoUseCase = class MeInfoUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async execute(command) {
        const { userId } = command;
        const user = await this.authRepository.findUserToId(userId);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return {
            userId: user.id,
            username: user.username,
            email: user.email
        };
    }
};
exports.MeInfoUseCase = MeInfoUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(MeInfoCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object])
], MeInfoUseCase);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/new-password.command.ts":
/*!**********************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/new-password.command.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewPasswordHandler = exports.NewPasswordCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/godzilla-back/src/adapters/index.ts");
class NewPasswordCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.NewPasswordCommand = NewPasswordCommand;
let NewPasswordHandler = exports.NewPasswordHandler = class NewPasswordHandler {
    constructor(authRepository, bcryptAdapter) {
        this.authRepository = authRepository;
        this.bcryptAdapter = bcryptAdapter;
    }
    async execute({ data: { newPassword, recoveryCode } }) {
        const passwordRecoveryCode = await this.authRepository.findOnePasswordRecoveryCodeByCode({
            code: recoveryCode
        });
        if (!passwordRecoveryCode)
            throw new common_1.BadRequestException("Invalid code");
        const user = await this.authRepository.findUserToId(passwordRecoveryCode.userID);
        if (!user)
            throw new common_1.BadRequestException("User doesn't exist");
        const hashPassword = await this.bcryptAdapter.hash({
            password: newPassword
        });
        await this.authRepository.createNewPassword({
            userId: user.id,
            hashPassword
        });
    }
};
exports.NewPasswordHandler = NewPasswordHandler = __decorate([
    (0, cqrs_1.CommandHandler)(NewPasswordCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof adapters_1.BcryptAdapter !== "undefined" && adapters_1.BcryptAdapter) === "function" ? _b : Object])
], NewPasswordHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/password-recovery-resend.command.ts":
/*!**********************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/password-recovery-resend.command.ts ***!
  \**********************************************************************************************/
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
exports.PasswordRecoveryResendHandler = exports.PasswordRecoveryResendCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts");
class PasswordRecoveryResendCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.PasswordRecoveryResendCommand = PasswordRecoveryResendCommand;
let PasswordRecoveryResendHandler = exports.PasswordRecoveryResendHandler = class PasswordRecoveryResendHandler {
    constructor(authRepository, mailerAdapter) {
        this.authRepository = authRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ data: { email } }) {
        const user = await this.authRepository.findUserToEmail({ email });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.authRepository.deactivateAllPasswordRecoveryCodes({ userID: user.id });
        const passwordRecoveryCode = await this.authRepository.createPasswordRecoveryCode({ userID: user.id });
        await this.mailerAdapter.sendPasswordCode({ email, code: passwordRecoveryCode.code });
    }
};
exports.PasswordRecoveryResendHandler = PasswordRecoveryResendHandler = __decorate([
    (0, cqrs_1.CommandHandler)(PasswordRecoveryResendCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _b : Object])
], PasswordRecoveryResendHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/password-recovery.command.ts":
/*!***************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/password-recovery.command.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryHandler = exports.PasswordRecoveryCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts");
class PasswordRecoveryCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.PasswordRecoveryCommand = PasswordRecoveryCommand;
let PasswordRecoveryHandler = exports.PasswordRecoveryHandler = class PasswordRecoveryHandler {
    constructor(authRepository, mailerAdapter) {
        this.authRepository = authRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ data: { email } }) {
        const user = await this.authRepository.findUserToEmail({ email });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.authRepository.deactivateAllPasswordRecoveryCodes({ userID: user.id });
        const passwordRecoveryCode = await this.authRepository.createPasswordRecoveryCode({ userID: user.id });
        await this.mailerAdapter.sendPasswordCode({ email, code: passwordRecoveryCode.code });
    }
};
exports.PasswordRecoveryHandler = PasswordRecoveryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(PasswordRecoveryCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _b : Object])
], PasswordRecoveryHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/application/commands/resend-email-code.command.ts":
/*!***************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/application/commands/resend-email-code.command.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResendEmailCodeHandler = exports.ResendEmailCodeCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/godzilla-back/src/adapters/index.ts");
class ResendEmailCodeCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.ResendEmailCodeCommand = ResendEmailCodeCommand;
let ResendEmailCodeHandler = exports.ResendEmailCodeHandler = class ResendEmailCodeHandler {
    constructor(authRepository, mailerAdapter) {
        this.authRepository = authRepository;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ data }) {
        const user = await this.authRepository.findUserToEmail({
            email: data.email
        });
        if (!user)
            throw new common_1.NotFoundException("User not found");
        await this.authRepository.deactivateAllEmailCodes({ userID: user.id });
        const emailCode = await this.authRepository.createEmailCode({
            userID: user.id
        });
        await this.mailerAdapter.sendConfirmCode({
            email: user.email,
            code: emailCode.code
        });
    }
};
exports.ResendEmailCodeHandler = ResendEmailCodeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(ResendEmailCodeCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof adapters_1.MailerAdapter !== "undefined" && adapters_1.MailerAdapter) === "function" ? _b : Object])
], ResendEmailCodeHandler);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/auth.controller.ts":
/*!********************************************************!*\
  !*** ./apps/godzilla-back/src/auth/auth.controller.ts ***!
  \********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const express_1 = __webpack_require__(/*! express */ "express");
const dto_1 = __webpack_require__(/*! ./core/dto */ "./apps/godzilla-back/src/auth/core/dto/index.ts");
const guards_1 = __webpack_require__(/*! ./guards-handlers/guards */ "./apps/godzilla-back/src/auth/guards-handlers/guards/index.ts");
const auth_1 = __webpack_require__(/*! ../../../../libs/swagger/auth */ "./libs/swagger/auth/index.ts");
const helpers_1 = __webpack_require__(/*! ../../../../libs/helpers */ "./libs/helpers/index.ts");
const commands_1 = __webpack_require__(/*! ./application/commands */ "./apps/godzilla-back/src/auth/application/commands/index.ts");
const auth_service_1 = __webpack_require__(/*! ./application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
const google_guard_1 = __webpack_require__(/*! ./guards-handlers/guards/google.guard */ "./apps/godzilla-back/src/auth/guards-handlers/guards/google.guard.ts");
const strategies_1 = __webpack_require__(/*! ./guards-handlers/strategies */ "./apps/godzilla-back/src/auth/guards-handlers/strategies/index.ts");
const decorators_1 = __webpack_require__(/*! ../../../../libs/common/decorators */ "./libs/common/decorators/index.ts");
const enums_1 = __webpack_require__(/*! ../../../../libs/models/enums */ "./libs/models/enums.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const confirm_email_command_1 = __webpack_require__(/*! ./application/commands/confirm-email.command */ "./apps/godzilla-back/src/auth/application/commands/confirm-email.command.ts");
const confirm_password_recovery_command_1 = __webpack_require__(/*! ./application/commands/confirm-password-recovery.command */ "./apps/godzilla-back/src/auth/application/commands/confirm-password-recovery.command.ts");
let AuthController = exports.AuthController = class AuthController {
    constructor(commandBus, authService, config) {
        this.commandBus = commandBus;
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
            userID: jwtPayload.userId
        };
        const tokens = await this.commandBus.execute(new commands_1.LoginCommand(authObjectDTO));
        return this.setTokensToResponse({ tokens, res });
    }
    async userRefreshToken(jwtPayload, userIP, userAgent, res) {
        const authObjectDTO = {
            userIP,
            userAgent,
            userID: jwtPayload.userId
        };
        const tokens = await this.authService.refreshFlow(authObjectDTO, jwtPayload.userId, jwtPayload.sessionId);
        return this.setTokensToResponse({ tokens, res });
    }
    async userLogout(jwtPayload, response) {
        await this.commandBus.execute(new commands_1.LogoutCommand(jwtPayload.userId, jwtPayload.sessionId));
        response.clearCookie("refreshToken");
    }
    async meInfo(jwtPayload) {
        return await this.commandBus.execute(new commands_1.MeInfoCommand(jwtPayload.userId));
    }
    async google() { }
    async googleCallback(dto, userIP, userAgent, res) {
        const tokens = await this.authService.googleRegister(dto, {
            userIP,
            userAgent
        });
        return await this.setTokensToResponseGoogle({ tokens, res });
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
        res.redirect(this.config.get("GOOGLE_REDIRECT_URL"));
        return { accessToken: tokens.accessToken };
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToRegistration)(),
    (0, common_1.Post)("registration"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "localRegister", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToRegistrationEmailResending)(),
    (0, common_1.Post)("registration-email-resending"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "userRegistrationResending", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)("registration-confirmation"),
    __param(0, (0, common_1.Query)("code", new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "userRegistrationConfirm", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToPasswordRecovery)(),
    (0, common_1.Post)("password-recovery"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof dto_1.PassRecoveryDto !== "undefined" && dto_1.PassRecoveryDto) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthController.prototype, "userCreateNewPass", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToPasswordEmailResending)(),
    (0, common_1.Post)("password-email-resending"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthController.prototype, "passwordEmailResending", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)("password-recovery-confirmation"),
    __param(0, (0, common_1.Query)("code")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], AuthController.prototype, "newPasswordConfirm", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToNewPassword)(),
    (0, common_1.Post)("new-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof dto_1.NewPassUpdateDto !== "undefined" && dto_1.NewPassUpdateDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
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
    __metadata("design:paramtypes", [typeof (_r = typeof helpers_1.JwtAccessPayload !== "undefined" && helpers_1.JwtAccessPayload) === "function" ? _r : Object, String, String, typeof (_s = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], AuthController.prototype, "userAuthorization", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtRefreshGuard),
    (0, auth_1.SwaggerToRefreshToken)(),
    (0, common_1.Get)("refresh-token"),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, decorators_1.UserAgentDecorator)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof helpers_1.JwtRefreshPayload !== "undefined" && helpers_1.JwtRefreshPayload) === "function" ? _u : Object, String, String, typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRefreshToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(guards_1.JwtRefreshGuard),
    (0, auth_1.SwaggerToLogout)(),
    (0, common_1.Post)("logout"),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof helpers_1.JwtRefreshPayload !== "undefined" && helpers_1.JwtRefreshPayload) === "function" ? _w : Object, typeof (_x = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _x : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogout", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtAccessGuard),
    (0, auth_1.SwaggerToMeInfo)(),
    (0, common_1.Get)("me"),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof helpers_1.JwtAccessPayload !== "undefined" && helpers_1.JwtAccessPayload) === "function" ? _y : Object]),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], AuthController.prototype, "meInfo", null);
__decorate([
    (0, common_1.Get)("google"),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "google", null);
__decorate([
    (0, common_1.Get)("google/callback"),
    (0, common_1.UseGuards)(google_guard_1.GoogleGuard),
    __param(0, (0, decorators_1.GooglePayloadDecorator)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, decorators_1.UserAgentDecorator)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_0 = typeof strategies_1.IGoogleUser !== "undefined" && strategies_1.IGoogleUser) === "function" ? _0 : Object, String, String, typeof (_1 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _1 : Object]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], AuthController.prototype, "googleCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthController);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/auth.module.ts":
/*!****************************************************!*\
  !*** ./apps/godzilla-back/src/auth/auth.module.ts ***!
  \****************************************************/
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
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/godzilla-back/src/auth/auth.controller.ts");
const class_validators_1 = __webpack_require__(/*! ./class-validators */ "./apps/godzilla-back/src/auth/class-validators/index.ts");
const auth_service_1 = __webpack_require__(/*! ./application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
const auth_repository_1 = __webpack_require__(/*! ./repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const prisma_module_1 = __webpack_require__(/*! ../prisma/prisma.module */ "./apps/godzilla-back/src/prisma/prisma.module.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const adapters_1 = __webpack_require__(/*! ../adapters */ "./apps/godzilla-back/src/adapters/index.ts");
const commands_1 = __webpack_require__(/*! ./application/commands */ "./apps/godzilla-back/src/auth/application/commands/index.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const validators = [
    class_validators_1.CheckedEmailToBase,
    class_validators_1.CheckedConfirmCode,
    class_validators_1.CheckedUniqueUsername,
    class_validators_1.CheckedUniqueEmail
];
const commandHandlers = [
    commands_1.LoginUseCase,
    commands_1.LocalRegisterHandler,
    commands_1.ResendEmailCodeHandler,
    commands_1.PasswordRecoveryHandler,
    commands_1.PasswordRecoveryResendHandler,
    commands_1.NewPasswordHandler,
    commands_1.MeInfoUseCase,
    commands_1.LogoutUseCase,
    commands_1.GoogleRegisterHandler,
    commands_1.ConfirmPasswordRecoveryHandler,
    commands_1.ConfirmEmailHandler
];
const adapters = [adapters_1.BcryptAdapter, adapters_1.MailerAdapter];
const modules = [cqrs_1.CqrsModule, prisma_module_1.PrismaModule, passport_1.PassportModule, jwt_1.JwtModule];
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [...modules],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, auth_repository_1.AuthRepository, ...validators, ...adapters, ...commandHandlers],
        exports: [auth_service_1.AuthService]
    })
], AuthModule);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/class-validators/checkedConfirmCode.class-validators.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/class-validators/checkedConfirmCode.class-validators.ts ***!
  \*********************************************************************************************/
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
const auth_service_1 = __webpack_require__(/*! ../../auth/application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
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

/***/ "./apps/godzilla-back/src/auth/class-validators/checkedEmail.class-validators.ts":
/*!***************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/class-validators/checkedEmail.class-validators.ts ***!
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckedEmailToBase = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
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

/***/ "./apps/godzilla-back/src/auth/class-validators/checkedUniqueEmail.class-validators.ts":
/*!*********************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/class-validators/checkedUniqueEmail.class-validators.ts ***!
  \*********************************************************************************************/
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
const auth_service_1 = __webpack_require__(/*! ../../auth/application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
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

/***/ "./apps/godzilla-back/src/auth/class-validators/checkedUniqueUsername.class-validators.ts":
/*!************************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/class-validators/checkedUniqueUsername.class-validators.ts ***!
  \************************************************************************************************/
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
const auth_service_1 = __webpack_require__(/*! ../../auth/application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
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

/***/ "./apps/godzilla-back/src/auth/class-validators/index.ts":
/*!***************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/class-validators/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./checkedEmail.class-validators */ "./apps/godzilla-back/src/auth/class-validators/checkedEmail.class-validators.ts"), exports);
__exportStar(__webpack_require__(/*! ./checkedConfirmCode.class-validators */ "./apps/godzilla-back/src/auth/class-validators/checkedConfirmCode.class-validators.ts"), exports);
__exportStar(__webpack_require__(/*! ./checkedUniqueEmail.class-validators */ "./apps/godzilla-back/src/auth/class-validators/checkedUniqueEmail.class-validators.ts"), exports);
__exportStar(__webpack_require__(/*! ./checkedUniqueUsername.class-validators */ "./apps/godzilla-back/src/auth/class-validators/checkedUniqueUsername.class-validators.ts"), exports);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/core/dto/createUser.dto.ts":
/*!****************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/core/dto/createUser.dto.ts ***!
  \****************************************************************/
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
    (0, class_validator_1.Matches)(/^[A-Za-z\d-\.]+@([\w-]+.)+[\w-]{2,4}$/),
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

/***/ "./apps/godzilla-back/src/auth/core/dto/emailResending.dto.ts":
/*!********************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/core/dto/emailResending.dto.ts ***!
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

/***/ "./apps/godzilla-back/src/auth/core/dto/index.ts":
/*!*******************************************************!*\
  !*** ./apps/godzilla-back/src/auth/core/dto/index.ts ***!
  \*******************************************************/
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
__exportStar(__webpack_require__(/*! ./newPassUpdate.dto */ "./apps/godzilla-back/src/auth/core/dto/newPassUpdate.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./passRecovery.dto */ "./apps/godzilla-back/src/auth/core/dto/passRecovery.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./createUser.dto */ "./apps/godzilla-back/src/auth/core/dto/createUser.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./emailResending.dto */ "./apps/godzilla-back/src/auth/core/dto/emailResending.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./passwordEmailResending.dto */ "./apps/godzilla-back/src/auth/core/dto/passwordEmailResending.dto.ts"), exports);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/core/dto/newPassUpdate.dto.ts":
/*!*******************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/core/dto/newPassUpdate.dto.ts ***!
  \*******************************************************************/
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

/***/ "./apps/godzilla-back/src/auth/core/dto/passRecovery.dto.ts":
/*!******************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/core/dto/passRecovery.dto.ts ***!
  \******************************************************************/
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

/***/ "./apps/godzilla-back/src/auth/core/dto/passwordEmailResending.dto.ts":
/*!****************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/core/dto/passwordEmailResending.dto.ts ***!
  \****************************************************************************/
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

/***/ "./apps/godzilla-back/src/auth/guards-handlers/guards/google.guard.ts":
/*!****************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/guards/google.guard.ts ***!
  \****************************************************************************/
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

/***/ "./apps/godzilla-back/src/auth/guards-handlers/guards/index.ts":
/*!*********************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/guards/index.ts ***!
  \*********************************************************************/
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
__exportStar(__webpack_require__(/*! ./local.guard */ "./apps/godzilla-back/src/auth/guards-handlers/guards/local.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtAccess.guard */ "./apps/godzilla-back/src/auth/guards-handlers/guards/jwtAccess.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtRefresh.guard */ "./apps/godzilla-back/src/auth/guards-handlers/guards/jwtRefresh.guard.ts"), exports);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/guards-handlers/guards/jwtAccess.guard.ts":
/*!*******************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/guards/jwtAccess.guard.ts ***!
  \*******************************************************************************/
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

/***/ "./apps/godzilla-back/src/auth/guards-handlers/guards/jwtRefresh.guard.ts":
/*!********************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/guards/jwtRefresh.guard.ts ***!
  \********************************************************************************/
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

/***/ "./apps/godzilla-back/src/auth/guards-handlers/guards/local.guard.ts":
/*!***************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/guards/local.guard.ts ***!
  \***************************************************************************/
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

/***/ "./apps/godzilla-back/src/auth/guards-handlers/strategies/google.strategy.ts":
/*!***********************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/strategies/google.strategy.ts ***!
  \***********************************************************************************/
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
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
let GoogleStrategy = exports.GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy) {
    constructor(config) {
        super({
            clientID: config.get("GOOGLE_CLIENT_ID"),
            clientSecret: config.get("GOOGLE_CLIENT_SECRET"),
            callbackURL: config.get("GOOGLE_CALLBACK_URL"),
            scope: ["profile", "email"]
        });
        this.config = config;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const user = {
                providerId: profile.id,
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

/***/ "./apps/godzilla-back/src/auth/guards-handlers/strategies/index.ts":
/*!*************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/strategies/index.ts ***!
  \*************************************************************************/
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
__exportStar(__webpack_require__(/*! ./local.strategy */ "./apps/godzilla-back/src/auth/guards-handlers/strategies/local.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtAccess.strategy */ "./apps/godzilla-back/src/auth/guards-handlers/strategies/jwtAccess.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwtRefresh.strategy */ "./apps/godzilla-back/src/auth/guards-handlers/strategies/jwtRefresh.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./google.strategy */ "./apps/godzilla-back/src/auth/guards-handlers/strategies/google.strategy.ts"), exports);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/guards-handlers/strategies/jwtAccess.strategy.ts":
/*!**************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/strategies/jwtAccess.strategy.ts ***!
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
            secretOrKey: config.getOrThrow("JWT_ACCESS_SECRET")
        });
        this.config = config;
    }
    async validate(payload) {
        return { userId: payload.userId };
    }
};
exports.JwtAccessStrategy = JwtAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtAccessStrategy);


/***/ }),

/***/ "./apps/godzilla-back/src/auth/guards-handlers/strategies/jwtRefresh.strategy.ts":
/*!***************************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/strategies/jwtRefresh.strategy.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshStrategy = void 0;
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../../application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
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

/***/ "./apps/godzilla-back/src/auth/guards-handlers/strategies/local.strategy.ts":
/*!**********************************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/guards-handlers/strategies/local.strategy.ts ***!
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
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const auth_service_1 = __webpack_require__(/*! ../../application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
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

/***/ "./apps/godzilla-back/src/auth/repository/auth.repository.ts":
/*!*******************************************************************!*\
  !*** ./apps/godzilla-back/src/auth/repository/auth.repository.ts ***!
  \*******************************************************************/
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
var AuthRepository_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../prisma/prisma.service */ "./apps/godzilla-back/src/prisma/prisma.service.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const colorette_1 = __webpack_require__(/*! colorette */ "colorette");
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
let AuthRepository = exports.AuthRepository = AuthRepository_1 = class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AuthRepository_1.name);
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
            throw new common_1.InternalServerErrorException("Unable to create user");
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
            throw new common_1.InternalServerErrorException("Unable to create email code");
        return emailCode;
    }
    async findOneEmailCodeByCode({ code }) {
        return this.prisma.emailConfirmCode.findUnique({ where: { code } });
    }
    async findUniqueUserById({ userId }) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
    async deactivateAllEmailCodes({ userID }) {
        await this.prisma.emailConfirmCode.updateMany({
            where: { userID },
            data: { isUsed: true }
        });
    }
    async findUserToEmail({ email }) {
        return await this.prisma.user.findUnique({
            where: { email }
        });
    }
    async createNewPassword({ userId, hashPassword }) {
        return Boolean(await this.prisma.user.update({
            where: { id: userId },
            data: { hashPassword }
        }));
    }
    async addNewSession(authObject, expiresTime) {
        const _session = await this.prisma.sessions.findFirst({
            where: {
                userIP: authObject.userIP,
                userAgent: authObject.userAgent,
                userOwnerId: authObject.userID
            }
        });
        const userAgent = _session?.userAgent ?? "";
        return this.prisma.sessions.upsert({
            where: { userAgent },
            update: {
                expires: expiresTime
            },
            create: {
                userIP: authObject.userIP,
                userAgent: authObject.userAgent,
                expires: expiresTime,
                userOwnerId: authObject.userID
            }
        });
    }
    async findUserToId(userId) {
        return await this.prisma.user.findUnique({
            where: { id: userId }
        });
    }
    async findActiveSession(sessionId) {
        return await this.prisma.sessions.findUnique({ where: { id: sessionId } });
    }
    async deleteSession(sessionId) {
        await this.prisma.sessions.delete({ where: { id: sessionId } });
    }
    async generateClientUsername() {
        const id = (0, uuid_1.v4)();
        const username = `client-${id.substring(0, 8)}`;
        const isUsernameUnique = await this.checkUniqueUsername({ username });
        if (isUsernameUnique) {
            return this.generateClientUsername();
        }
        else {
            return username;
        }
    }
    async checkUniqueUsername({ username = "" }) {
        return Boolean(await this.prisma.user.findUnique({ where: { username } }));
    }
    async checkUniqueEmail({ email }) {
        return Boolean(await this.prisma.user.findUnique({ where: { email } }));
    }
    async googleRegister(dto) {
        return this.prisma.googleProfile.create({
            data: {
                providerId: dto.providerId,
                email: dto.email,
                username: dto.username,
                provider: dto.provider,
                displayName: dto.displayName || null,
                userId: dto.userId
            }
        });
    }
    async confirmUserEmail({ userId }) {
        return Boolean(this.prisma.user.update({
            where: { id: userId },
            data: { isConfirmed: client_1.ConfirmEmailStatusEnum.CONFIRMED }
        }));
    }
    async findOneGoogleProfileByUserID({ userID }) {
        return this.prisma.googleProfile.findUnique({ where: { userId: userID } });
    }
    async findUniqueGoogleProfileByProviderId({ providerId }) {
        return this.prisma.googleProfile.findUnique({ where: { providerId } });
    }
    async createPasswordRecoveryCode({ userID }) {
        return this.prisma.passwordRecoveryCode.create({
            data: {
                code: (0, uuid_1.v4)(),
                exp: (0, date_fns_1.add)(new Date(), { minutes: 10 }),
                userID
            }
        });
    }
    async deactivateAllPasswordRecoveryCodes({ userID }) {
        await this.prisma.passwordRecoveryCode.updateMany({
            where: { userID },
            data: { isUsed: true }
        });
    }
    async findOnePasswordRecoveryCodeByCode({ code }) {
        console.log(code);
        return this.prisma.passwordRecoveryCode.findUnique({ where: { code } });
    }
};
exports.AuthRepository = AuthRepository = AuthRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AuthRepository);


/***/ }),

/***/ "./apps/godzilla-back/src/main.ts":
/*!****************************************!*\
  !*** ./apps/godzilla-back/src/main.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/godzilla-back/src/app.module.ts");
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
        const DEPLOY = config.get("DEPLOY");
        const PORT = config.get("PORT");
        if (DEPLOY === "TEST")
            (0, swagger_setup_1.swaggerSetup)(app);
        await app.listen(PORT);
        logger.log((0, colorette_1.blue)(`Server is running on ${PORT} with status: ${DEPLOY}`));
    }
    catch (err) {
        logger.error((0, colorette_1.red)(`Unable to launch server. Learn more at: ${err}`));
        throw new common_1.InternalServerErrorException();
    }
};
bootstrap();


/***/ }),

/***/ "./apps/godzilla-back/src/prisma/prisma.module.ts":
/*!********************************************************!*\
  !*** ./apps/godzilla-back/src/prisma/prisma.module.ts ***!
  \********************************************************/
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
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/godzilla-back/src/prisma/prisma.service.ts");
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

/***/ "./apps/godzilla-back/src/prisma/prisma.service.ts":
/*!*********************************************************!*\
  !*** ./apps/godzilla-back/src/prisma/prisma.service.ts ***!
  \*********************************************************/
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
        description: "If the password or login is wrong"
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
        description: "User is logout"
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
        description: "Input data is accepted. Email with confirmation code will be send to " +
            "passed email address"
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "If the inputModel has incorrect values (in particular if the user with " +
            "the given email or password already exists)"
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
        description: "Input data is accepted.Email with confirmation code will be send to " +
            "passed email address"
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
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/godzilla-back/src/main.ts");
/******/ 	
/******/ })()
;