/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/godzilla-back/src/adapters/activateCode.adapter.ts":
/*!*****************************************************************!*\
  !*** ./apps/godzilla-back/src/adapters/activateCode.adapter.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivateCodeAdapter = void 0;
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
class ActivateCodeAdapter {
    async createCode() {
        return {
            codeActivated: (0, uuid_1.v4)(),
            lifeTimeCode: await this.createTime()
        };
    }
    async createTime() {
        return (0, date_fns_1.add)(new Date(), {
            minutes: 15
        }).toString();
    }
}
exports.ActivateCodeAdapter = ActivateCodeAdapter;


/***/ }),

/***/ "./apps/godzilla-back/src/adapters/bcrypt.adapter.ts":
/*!***********************************************************!*\
  !*** ./apps/godzilla-back/src/adapters/bcrypt.adapter.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BcryptAdapter = void 0;
const bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ "bcrypt"));
class BcryptAdapter {
    async hushGenerate(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    async hushCompare(password, hush) {
        return await bcrypt_1.default.compare(password, hush);
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
__exportStar(__webpack_require__(/*! ./activateCode.adapter */ "./apps/godzilla-back/src/adapters/activateCode.adapter.ts"), exports);
__exportStar(__webpack_require__(/*! ./mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts"), exports);


/***/ }),

/***/ "./apps/godzilla-back/src/adapters/mailer.adapter.ts":
/*!***********************************************************!*\
  !*** ./apps/godzilla-back/src/adapters/mailer.adapter.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailerAdapter = void 0;
const nodemailer_1 = __webpack_require__(/*! nodemailer */ "nodemailer");
class MailerAdapter {
    async options(options) {
        const transport = (0, nodemailer_1.createTransport)({
            service: 'gmail',
            auth: {
                user: 'jihnordraven@gmail.com',
                pass: 'htsubscpzoymrwce'
            }
        });
        await transport.sendMail(options);
    }
    async sendConfirmCode({ email, code }) {
        return this.options({
            to: email,
            from: 'jihnordraven@gmail.com',
            subject: 'Email confirmaiton',
            html: `<a href='http://localhost:5000/api/v1/auth/registration-confirmaiton?code=${code}'>Confirm email</a>`
        });
    }
    async sendPasswordCode({ email, code }) {
        return this.options({
            to: email,
            from: 'jihnordraven@gmail.com',
            subject: 'Password recovery',
            html: `<a href='http://localhost:5000/api/v1/auth/password-recovery-confirm?activateCode?${code}'>Password recovery</a>`
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
        return await this.appService.getHello();
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
    (0, swagger_1.ApiOperation)({ summary: 'Delete all data in all' }),
    (0, common_1.Delete)('testing/all-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "testingAllDelete", null);
exports.AppController = AppController = __decorate([
    (0, swagger_1.ApiTags)('Testing'),
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
const config_1 = __webpack_require__(/*! ./config/config */ "./apps/godzilla-back/src/config/config.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/godzilla-back/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/godzilla-back/src/app.service.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/godzilla-back/src/auth/auth.module.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/godzilla-back/src/prisma/prisma.module.ts");
const strategies_1 = __webpack_require__(/*! ./auth/guards-handlers/strategies */ "./apps/godzilla-back/src/auth/guards-handlers/strategies/index.ts");
const strategies = [strategies_1.LocalStrategy, strategies_1.JwtAccessStrategy, strategies_1.JwtRefreshStrategy];
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! ./config/config */ "./apps/godzilla-back/src/config/config.ts");
const models_1 = __webpack_require__(/*! ../../../library/models */ "./library/models/index.ts");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/godzilla-back/src/prisma/prisma.service.ts");
let AppService = exports.AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getHello() {
        return await `Start server on ${config_1.CONFIG.PORT} port`;
    }
    async deleteAll() {
        if (config_1.CONFIG.DEPLOY === 'TEST') {
            for (const table of Object.values(models_1.AllTablesEnum)) {
                if (this.prisma[table]) {
                    await this.prisma[table].deleteMany();
                }
            }
        }
        else {
            throw new common_1.ForbiddenException('This endpoint is closed for prodaction');
        }
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
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
        const user = await this.authRepository.findUserToEmail(email);
        if (!user || user.isBlocked === true) {
            return null;
        }
        const validatePassword = await this.bcrypt.hushCompare(password, user.hashPassword);
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
        const lastActiveToSecond = Number(Date.parse(activeSession.sessionExpired).toString().slice(0, 10));
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
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _b : Object, typeof (_c = typeof adapters_1.BcryptAdapter !== "undefined" && adapters_1.BcryptAdapter) === "function" ? _c : Object])
], AuthService);


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
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/godzilla-back/src/adapters/index.ts");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts");
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
        const hashPassword = await this.bcryptAdapter.hushGenerate(password);
        const user = await this.authRepository.localRegister({
            email,
            username,
            hashPassword
        });
        const emailCode = await this.authRepository.createEmailCode({
            userId: user.id
        });
        await this.mailerAdapter.sendConfirmCode({ email, code: emailCode.codeActivated });
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUseCase = exports.LoginCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const date_fns_1 = __webpack_require__(/*! date-fns */ "date-fns");
const config_1 = __webpack_require__(/*! ../../../config/config */ "./apps/godzilla-back/src/config/config.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
class LoginCommand {
    constructor(authObject) {
        this.authObject = authObject;
    }
}
exports.LoginCommand = LoginCommand;
let LoginUseCase = exports.LoginUseCase = class LoginUseCase {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    async execute(command) {
        const { authObject } = command;
        const expiresTime = (0, date_fns_1.add)(new Date(), {
            seconds: +config_1.CONFIG.EXPIRES_REFRESH,
        }).toString();
        const newSession = await this.authRepository.addNewSession(authObject, expiresTime);
        const refreshToken = this.jwtService.sign({ sessionId: newSession.id, userId: newSession.userOwnerId }, { secret: config_1.CONFIG.JWT_REFRESH_SECRET, expiresIn: +config_1.CONFIG.EXPIRES_REFRESH });
        const accessToken = this.jwtService.sign({ userId: newSession.userOwnerId }, { secret: config_1.CONFIG.JWT_ACCESS_SECRET, expiresIn: +config_1.CONFIG.EXPIRES_ACCESS });
        return {
            refreshToken: refreshToken,
            accessToken: accessToken,
        };
    }
};
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, cqrs_1.CommandHandler)(LoginCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
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
        const code = await this.authRepository.findOneCodeByCode({
            code: recoveryCode
        });
        if (!code)
            throw new common_1.BadRequestException('Invalid token');
        const isCodeExpired = new Date(code.codeActivatedExpired) < new Date();
        if (isCodeExpired)
            throw new common_1.ForbiddenException('Code has expired');
        const hashPassword = await this.bcryptAdapter.hushGenerate(newPassword);
        await this.authRepository.createNewPassword({
            userId: code.userOwnerId,
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryResendHandler = exports.PasswordRecoveryResendCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/godzilla-back/src/adapters/index.ts");
class PasswordRecoveryResendCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.PasswordRecoveryResendCommand = PasswordRecoveryResendCommand;
let PasswordRecoveryResendHandler = exports.PasswordRecoveryResendHandler = class PasswordRecoveryResendHandler {
    constructor(authRepository, mailerAdapter, activateCodeAdapter) {
        this.authRepository = authRepository;
        this.mailerAdapter = mailerAdapter;
        this.activateCodeAdapter = activateCodeAdapter;
    }
    async execute({ data: { email } }) {
        const user = await this.authRepository.findUserToEmail(email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.authRepository.deactivateAllEmailCodes({ userId: user.id });
        const passwordCode = await this.activateCodeAdapter.createCode();
        await this.mailerAdapter.sendPasswordCode({
            email,
            code: passwordCode.codeActivated
        });
    }
};
exports.PasswordRecoveryResendHandler = PasswordRecoveryResendHandler = __decorate([
    (0, cqrs_1.CommandHandler)(PasswordRecoveryResendCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _b : Object, typeof (_c = typeof adapters_1.ActivateCodeAdapter !== "undefined" && adapters_1.ActivateCodeAdapter) === "function" ? _c : Object])
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordRecoveryHandler = exports.PasswordRecoveryCommand = void 0;
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const auth_repository_1 = __webpack_require__(/*! ../../repository/auth.repository */ "./apps/godzilla-back/src/auth/repository/auth.repository.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapters_1 = __webpack_require__(/*! ../../../adapters */ "./apps/godzilla-back/src/adapters/index.ts");
const mailer_adapter_1 = __webpack_require__(/*! ../../../adapters/mailer.adapter */ "./apps/godzilla-back/src/adapters/mailer.adapter.ts");
class PasswordRecoveryCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.PasswordRecoveryCommand = PasswordRecoveryCommand;
let PasswordRecoveryHandler = exports.PasswordRecoveryHandler = class PasswordRecoveryHandler {
    constructor(authRepository, activateCodeAdapter, mailerAdapter) {
        this.authRepository = authRepository;
        this.activateCodeAdapter = activateCodeAdapter;
        this.mailerAdapter = mailerAdapter;
    }
    async execute({ data: { email } }) {
        const user = await this.authRepository.findUserToEmail(email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const passwordCode = await this.activateCodeAdapter.createCode();
        await this.mailerAdapter.sendPasswordCode({
            email,
            code: passwordCode.codeActivated
        });
    }
};
exports.PasswordRecoveryHandler = PasswordRecoveryHandler = __decorate([
    (0, cqrs_1.CommandHandler)(PasswordRecoveryCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _a : Object, typeof (_b = typeof adapters_1.ActivateCodeAdapter !== "undefined" && adapters_1.ActivateCodeAdapter) === "function" ? _b : Object, typeof (_c = typeof mailer_adapter_1.MailerAdapter !== "undefined" && mailer_adapter_1.MailerAdapter) === "function" ? _c : Object])
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
        const user = await this.authRepository.findUserToEmail(data.email);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await this.authRepository.deactivateAllEmailCodes({ userId: user.id });
        const emailCode = await this.authRepository.createEmailCode({
            userId: user.id
        });
        await this.mailerAdapter.sendConfirmCode({
            email: user.email,
            code: emailCode.codeActivated
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const cqrs_1 = __webpack_require__(/*! @nestjs/cqrs */ "@nestjs/cqrs");
const express_1 = __webpack_require__(/*! express */ "express");
const dto_1 = __webpack_require__(/*! ./core/dto */ "./apps/godzilla-back/src/auth/core/dto/index.ts");
const guards_1 = __webpack_require__(/*! ./guards-handlers/guards */ "./apps/godzilla-back/src/auth/guards-handlers/guards/index.ts");
const auth_1 = __webpack_require__(/*! ../../../../library/swagger/auth */ "./library/swagger/auth/index.ts");
const helpers_1 = __webpack_require__(/*! ../../../../library/helpers */ "./library/helpers/index.ts");
const commands_1 = __webpack_require__(/*! ./application/commands */ "./apps/godzilla-back/src/auth/application/commands/index.ts");
const auth_service_1 = __webpack_require__(/*! ./application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
let AuthController = exports.AuthController = class AuthController {
    constructor(commandBus, authService) {
        this.commandBus = commandBus;
        this.authService = authService;
    }
    async localRegister(createUser) {
        await this.commandBus.execute(new commands_1.LocalRegisterCommand(createUser));
    }
    async userRegistrationResending({ email }) {
        await this.commandBus.execute(new commands_1.ResendEmailCodeCommand({ email }));
    }
    async userRegistrationConfirm(code, res) { }
    async userCreateNewPass({ email }) {
        await this.commandBus.execute(new commands_1.PasswordRecoveryCommand({ email }));
    }
    async passwordEmailResending({ email }) {
        await this.commandBus.execute(new commands_1.PasswordRecoveryResendCommand({ email }));
    }
    async newPasswordConfirm(code) {
        console.log(code);
    }
    async userUpdateNewPass({ newPassword, recoveryCode }) {
        await this.commandBus.execute(new commands_1.NewPasswordCommand({ recoveryCode, newPassword }));
    }
    async userAuthorization(body, jwtPayload, userIP, nameDevice, response) {
        const authObjectDTO = {
            ip: userIP,
            nameDevice: nameDevice,
            userID: jwtPayload.userId
        };
        const tokensObject = await this.commandBus.execute(new commands_1.LoginCommand(authObjectDTO));
        response.cookie('refreshToken', tokensObject.refreshToken, {
            httpOnly: true,
            secure: true
        });
        return {
            accessToken: tokensObject.accessToken
        };
    }
    async userRefreshToken(jwtPayload, userIP, nameDevice, response) {
        const authObjectDTO = {
            ip: userIP,
            nameDevice: nameDevice,
            userID: jwtPayload.userId
        };
        const tokensObject = await this.authService.refreshFlow(authObjectDTO, jwtPayload.userId, jwtPayload.sessionId);
        response.cookie('refreshToken', tokensObject.refreshToken, {
            httpOnly: true,
            secure: true
        });
        return {
            accessToken: tokensObject.accessToken
        };
    }
    async userLogout(jwtPayload, response) {
        await this.commandBus.execute(new commands_1.LogoutCommand(jwtPayload.userId, jwtPayload.sessionId));
        response.clearCookie('refreshToken');
    }
    async meInfo(jwtPayload) {
        return await this.commandBus.execute(new commands_1.MeInfoCommand(jwtPayload.userId));
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToRegistration)(),
    (0, common_1.Post)('registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof dto_1.CreateUserDto !== "undefined" && dto_1.CreateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuthController.prototype, "localRegister", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToRegistrationEmailResending)(),
    (0, common_1.Post)('registration-email-resending'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "userRegistrationResending", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('registration-confirmation'),
    __param(0, (0, common_1.Query)('code', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRegistrationConfirm", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToPasswordRecovery)(),
    (0, common_1.Post)('password-recovery'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof dto_1.PassRecoveryDto !== "undefined" && dto_1.PassRecoveryDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userCreateNewPass", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToPasswordEmailResending)(),
    (0, common_1.Post)('password-email-resending'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "passwordEmailResending", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiExcludeEndpoint)(),
    (0, common_1.Get)('new-password-confirmation/:codeActivate'),
    __param(0, (0, common_1.Param)('codeActivate', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "newPasswordConfirm", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, auth_1.SwaggerToNewPassword)(),
    (0, common_1.Post)('new-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof dto_1.NewPassUpdateDto !== "undefined" && dto_1.NewPassUpdateDto) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userUpdateNewPass", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.LocalAuthGuard),
    (0, auth_1.SwaggerToAuthorization)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, helpers_1.JwtPayloadDecorator)()),
    __param(2, (0, common_1.Ip)()),
    __param(3, (0, common_1.Headers)('user-agent')),
    __param(4, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof auth_1.LoginReqDto !== "undefined" && auth_1.LoginReqDto) === "function" ? _j : Object, typeof (_k = typeof helpers_1.JwtAccessPayload !== "undefined" && helpers_1.JwtAccessPayload) === "function" ? _k : Object, String, String, typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "userAuthorization", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtRefreshGuard),
    (0, auth_1.SwaggerToRefreshToken)(),
    (0, common_1.Get)('refresh-token'),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Headers)('user-agent')),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof helpers_1.JwtRefreshPayload !== "undefined" && helpers_1.JwtRefreshPayload) === "function" ? _o : Object, String, String, typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userRefreshToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.UseGuards)(guards_1.JwtRefreshGuard),
    (0, auth_1.SwaggerToLogout)(),
    (0, common_1.Post)('logout'),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof helpers_1.JwtRefreshPayload !== "undefined" && helpers_1.JwtRefreshPayload) === "function" ? _q : Object, typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userLogout", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(guards_1.JwtAccessGuard),
    (0, auth_1.SwaggerToMeInfo)(),
    (0, common_1.Get)('me'),
    __param(0, (0, helpers_1.JwtPayloadDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof helpers_1.JwtAccessPayload !== "undefined" && helpers_1.JwtAccessPayload) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], AuthController.prototype, "meInfo", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
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
    commands_1.LogoutUseCase
];
const adapters = [adapters_1.BcryptAdapter, adapters_1.MailerAdapter, adapters_1.ActivateCodeAdapter];
const modules = [cqrs_1.CqrsModule, prisma_module_1.PrismaModule, passport_1.PassportModule, jwt_1.JwtModule];
let AuthModule = exports.AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [...modules],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            auth_repository_1.AuthRepository,
            ...validators,
            ...adapters,
            ...commandHandlers
        ],
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
        return 'Code $value is not valid';
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
        return 'User with this email $value does not exist';
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
        return 'Mail $value is already in use';
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
        return 'Username $value is already in use';
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
const helpers_1 = __webpack_require__(/*! ../../../../../../library/helpers */ "./library/helpers/index.ts");
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
        description: 'User username',
        type: String,
        minLength: 6,
        maxLength: 30,
        pattern: '^[0-9A-Za-z.\\-_]+$',
        nullable: false,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d-\.]+@([\w-]+.)+[\w-]{2,4}$/),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        type: String,
        pattern: '^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$',
        nullable: false,
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
        description: 'User password',
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]+$',
        nullable: false,
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
const helpers_1 = __webpack_require__(/*! ../../../../../../library/helpers */ "./library/helpers/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class EmailResendingDto {
}
exports.EmailResendingDto = EmailResendingDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Identifier of an inactive user',
        type: String,
        nullable: false,
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
const helpers_1 = __webpack_require__(/*! ../../../../../../library/helpers */ "./library/helpers/index.ts");
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
        description: 'New user password',
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]+$',
        nullable: false,
    }),
    __metadata("design:type", String)
], NewPassUpdateDto.prototype, "newPassword", void 0);
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        description: 'Activation code sent to email',
        type: String,
        nullable: false,
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
const helpers_1 = __webpack_require__(/*! ../../../../../../library/helpers */ "./library/helpers/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class PassRecoveryDto {
}
exports.PassRecoveryDto = PassRecoveryDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d-\.]+@([\w-]+.)+[\w-]{2,4}$/),
    (0, swagger_1.ApiProperty)({
        description: 'Email of registered user useremail@company.com',
        type: String,
        pattern: '^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$',
        nullable: false,
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
const helpers_1 = __webpack_require__(/*! ../../../../../../library/helpers */ "./library/helpers/index.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class PasswordEmailResendingDto {
}
exports.PasswordEmailResendingDto = PasswordEmailResendingDto;
__decorate([
    (0, helpers_1.TrimDecorator)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the user who requested the new password',
        type: String,
        nullable: false,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PasswordEmailResendingDto.prototype, "userId", void 0);


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
let JwtAccessGuard = exports.JwtAccessGuard = class JwtAccessGuard extends (0, passport_1.AuthGuard)('jwt') {
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
let JwtRefreshGuard = exports.JwtRefreshGuard = class JwtRefreshGuard extends (0, passport_1.AuthGuard)('refreshToken') {
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
let LocalAuthGuard = exports.LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAccessStrategy = exports.AccessCookieExtractor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! ../../../config/config */ "./apps/godzilla-back/src/config/config.ts");
const AccessCookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies['refreshToken']) {
        token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    }
    return token;
};
exports.AccessCookieExtractor = AccessCookieExtractor;
let JwtAccessStrategy = exports.JwtAccessStrategy = class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: exports.AccessCookieExtractor,
            ignoreExpiration: false,
            secretOrKey: config_1.CONFIG.JWT_ACCESS_SECRET,
        });
    }
    async validate(payload) {
        return { userId: payload.userId };
    }
};
exports.JwtAccessStrategy = JwtAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshStrategy = void 0;
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../../application/auth.service */ "./apps/godzilla-back/src/auth/application/auth.service.ts");
const helpers_1 = __webpack_require__(/*! ../../../../../../library/helpers */ "./library/helpers/index.ts");
const config_1 = __webpack_require__(/*! ../../../config/config */ "./apps/godzilla-back/src/config/config.ts");
let JwtRefreshStrategy = exports.JwtRefreshStrategy = class JwtRefreshStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'refreshToken') {
    constructor(authService) {
        super({
            jwtFromRequest: helpers_1.RefreshCookieExtractor,
            ignoreExpiration: false,
            secretOrKey: config_1.CONFIG.JWT_REFRESH_SECRET,
        });
        this.authService = authService;
    }
    async validate(payload) {
        const validateSession = await this.authService.checkedActiveSession(payload.sessionId, payload.iat);
        if (!validateSession) {
            throw new common_1.UnauthorizedException('Session expired');
        }
        return { userId: payload.userId, sessionId: payload.sessionId };
    }
};
exports.JwtRefreshStrategy = JwtRefreshStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
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
            usernameField: 'email',
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
                hashPassword: data.hashPassword
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!user)
            throw new common_1.InternalServerErrorException('Unable to create user');
        return user;
    }
    async createEmailCode(data) {
        const emailCode = await this.prisma.confirmUser
            .create({
            data: {
                codeActivated: (0, uuid_1.v4)(),
                codeActivatedExpired: (0, date_fns_1.add)(new Date(), { minutes: 10 }).toString(),
                userOwnerId: data.userId
            }
        })
            .catch((err) => this.logger.error((0, colorette_1.red)(err)));
        if (!emailCode)
            throw new common_1.InternalServerErrorException('Unable to create email code');
        return emailCode;
    }
    async findOneCodeByCode({ code }) {
        return this.prisma.confirmUser.findUnique({ where: { codeActivated: code } });
    }
    async findUniqueUserById({ userId }) {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }
    async deactivateAllEmailCodes({ userId }) {
        await this.prisma.confirmUser.updateMany({
            where: { userOwnerId: userId },
            data: { isActive: false }
        });
    }
    async findUserToEmail(email) {
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
        return await this.prisma.sessions.create({
            data: {
                ip: authObject.ip,
                title: authObject.nameDevice,
                sessionExpired: expiresTime,
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
};
exports.AuthRepository = AuthRepository = AuthRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AuthRepository);


/***/ }),

/***/ "./apps/godzilla-back/src/config/config.ts":
/*!*************************************************!*\
  !*** ./apps/godzilla-back/src/config/config.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONFIG = void 0;
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports.CONFIG = {
    START_MODULE: config_1.ConfigModule.forRoot({ isGlobal: true }),
    DEPLOY: process.env.DEPLOY,
    PORT: process.env.PORT,
    MAIL_URL_USER: process.env.MAIL_URL_USER,
    MAIL_URL_PASS: process.env.MAIL_URL_PASS,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    EXPIRES_ACCESS: process.env.EXPIRES_ACCESS,
    EXPIRES_REFRESH: process.env.EXPIRES_REFRESH,
};


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
exports.prisma = void 0;
const config_1 = __webpack_require__(/*! ./config/config */ "./apps/godzilla-back/src/config/config.ts");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/godzilla-back/src/app.module.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const config_swagger_1 = __webpack_require__(/*! ../../../library/swagger/config.swagger */ "./library/swagger/config.swagger.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const validatePipeOptions_1 = __webpack_require__(/*! ../../../library/errors-handlers/validatePipeOptions */ "./library/errors-handlers/validatePipeOptions.ts");
const http_exception_filter_1 = __webpack_require__(/*! ../../../library/errors-handlers/http-exception.filter */ "./library/errors-handlers/http-exception.filter.ts");
const cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ "cookie-parser"));
exports.prisma = new client_1.PrismaClient();
async function appLoader() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://godzilla-front.vercel.app/',
            'https://godzillagram.com/',
        ],
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
    });
    app.use((0, cookie_parser_1.default)());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe(validatePipeOptions_1.validatePipeOptions));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.setGlobalPrefix('api/v1');
    if (config_1.CONFIG.DEPLOY === 'TEST') {
        const options = config_swagger_1.swaggerConfig.development;
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api/v1/testing', app, document, {
            customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            customJs: [
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
                'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
            ],
        });
    }
    await app.listen(config_1.CONFIG.PORT || 3000);
}
async function bootstrap() {
    try {
        await appLoader();
        await exports.prisma.$connect();
        console.log(`Start server on ${config_1.CONFIG.PORT} port`);
    }
    catch (e) {
        throw e;
    }
    finally {
        await exports.prisma.$disconnect();
    }
}
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

/***/ "./library/errors-handlers/http-exception.filter.ts":
/*!**********************************************************!*\
  !*** ./library/errors-handlers/http-exception.filter.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let HttpExceptionFilter = exports.HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        if (status === 500) {
            response.status(status).json(exception);
        }
        if (status === 400) {
            const errors = exception.getResponse();
            if (typeof errors.message === 'string') {
                response.status(status).json({
                    errorsMessages: [
                        { message: errors.message, field: 'Data is not valid' },
                    ],
                });
                return;
            }
            response.status(status).json({
                errorsMessages: errors.message.map((x) => {
                    return { message: x.message, field: x.field };
                }),
            });
        }
        else {
            response.status(status).json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
        }
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);


/***/ }),

/***/ "./library/errors-handlers/validatePipeOptions.ts":
/*!********************************************************!*\
  !*** ./library/errors-handlers/validatePipeOptions.ts ***!
  \********************************************************/
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
                    field: e.property,
                });
            });
        });
        throw new common_1.BadRequestException(errorsForResponse);
    },
};


/***/ }),

/***/ "./library/helpers/index.ts":
/*!**********************************!*\
  !*** ./library/helpers/index.ts ***!
  \**********************************/
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
__exportStar(__webpack_require__(/*! ./trimDecorator */ "./library/helpers/trimDecorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./payloadDecorator */ "./library/helpers/payloadDecorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./refreshCookieExtractor */ "./library/helpers/refreshCookieExtractor.ts"), exports);


/***/ }),

/***/ "./library/helpers/payloadDecorator.ts":
/*!*********************************************!*\
  !*** ./library/helpers/payloadDecorator.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtPayloadDecorator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.JwtPayloadDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user : {};
});


/***/ }),

/***/ "./library/helpers/refreshCookieExtractor.ts":
/*!***************************************************!*\
  !*** ./library/helpers/refreshCookieExtractor.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshCookieExtractor = void 0;
const RefreshCookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['refreshToken'];
    }
    return token;
};
exports.RefreshCookieExtractor = RefreshCookieExtractor;


/***/ }),

/***/ "./library/helpers/trimDecorator.ts":
/*!******************************************!*\
  !*** ./library/helpers/trimDecorator.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrimDecorator = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
function TrimDecorator() {
    return (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value.trim() : value);
}
exports.TrimDecorator = TrimDecorator;


/***/ }),

/***/ "./library/models/index.ts":
/*!*********************************!*\
  !*** ./library/models/index.ts ***!
  \*********************************/
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
__exportStar(__webpack_require__(/*! ./main.models */ "./library/models/main.models.ts"), exports);


/***/ }),

/***/ "./library/models/main.models.ts":
/*!***************************************!*\
  !*** ./library/models/main.models.ts ***!
  \***************************************/
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

/***/ "./library/swagger/auth/SwaggerToAuthorization.ts":
/*!********************************************************!*\
  !*** ./library/swagger/auth/SwaggerToAuthorization.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToAuthorization = exports.LoginReqDto = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LoginReqDto {
}
exports.LoginReqDto = LoginReqDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        type: String,
        pattern: '^[A-Za-z\\d-\\.]+@([\\w-]+.)+[\\w-]{2,4}$',
        nullable: false,
    }),
    __metadata("design:type", String)
], LoginReqDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        type: String,
        minLength: 6,
        maxLength: 20,
        pattern: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~])[A-Za-z0-9!\\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~]+$',
        nullable: false,
    }),
    __metadata("design:type", String)
], LoginReqDto.prototype, "password", void 0);
class LoginResDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Access token',
    }),
    __metadata("design:type", String)
], LoginResDto.prototype, "accessToken", void 0);
function SwaggerToAuthorization() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'User authorization' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Returns JWT accessToken in body and JWT refreshToken ' +
            'in cookie (http-only, secure)',
        type: LoginResDto,
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'If the inputModel has incorrect values',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'If the password or login is wrong',
    }));
}
exports.SwaggerToAuthorization = SwaggerToAuthorization;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToLogout.ts":
/*!*************************************************!*\
  !*** ./library/swagger/auth/SwaggerToLogout.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToLogout = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToLogout() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'User is logout' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'User is logout',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'If the JWT refreshToken inside cookie is missing, expired or incorrect',
    }));
}
exports.SwaggerToLogout = SwaggerToLogout;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToMeInfo.ts":
/*!*************************************************!*\
  !*** ./library/swagger/auth/SwaggerToMeInfo.ts ***!
  \*************************************************/
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
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Get information about current user' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'User info',
        type: MeInfoDto,
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'If the JWT accessToken missing, expired or incorrect',
    }));
}
exports.SwaggerToMeInfo = SwaggerToMeInfo;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToNewPassword.ts":
/*!******************************************************!*\
  !*** ./library/swagger/auth/SwaggerToNewPassword.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToNewPassword = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToNewPassword() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Changing the user password to a new password' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'If code is valid and new password is accepted',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'If the inputModel has incorrect value (for incorrect password length) or ' +
            'RecoveryCode is incorrect or expired',
    }));
}
exports.SwaggerToNewPassword = SwaggerToNewPassword;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToPasswordEmailResending.ts":
/*!*****************************************************************!*\
  !*** ./library/swagger/auth/SwaggerToPasswordEmailResending.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToPasswordEmailResending = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToPasswordEmailResending() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Resending an activation code by email' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Input data is accepted.Email with confirmation code will be send to ' +
            'passed email address',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'If the inputModel has incorrect values',
    }));
}
exports.SwaggerToPasswordEmailResending = SwaggerToPasswordEmailResending;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToPasswordRecovery.ts":
/*!***********************************************************!*\
  !*** ./library/swagger/auth/SwaggerToPasswordRecovery.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToPasswordRecovery = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToPasswordRecovery() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Send activation code to change password' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'A new activation code has been successfully sent to your email',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Bad request',
    }));
}
exports.SwaggerToPasswordRecovery = SwaggerToPasswordRecovery;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToRefreshToken.ts":
/*!*******************************************************!*\
  !*** ./library/swagger/auth/SwaggerToRefreshToken.ts ***!
  \*******************************************************/
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
        description: 'Access token',
    }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "accessToken", void 0);
function SwaggerToRefreshToken() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({
        summary: 'Generation of a new pair of access and refresh tokens',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Returns JWT accessToken in body and JWT refreshToken ' +
            'in cookie (http-only, secure)',
        type: RefreshTokenDto,
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: 'If the JWT refreshToken inside cookie is missing, expired or incorrect',
    }));
}
exports.SwaggerToRefreshToken = SwaggerToRefreshToken;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToRegistration.ts":
/*!*******************************************************!*\
  !*** ./library/swagger/auth/SwaggerToRegistration.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToRegistration = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToRegistration() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'User registration' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Input data is accepted. Email with confirmation code will be send to ' +
            'passed email address',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'If the inputModel has incorrect values (in particular if the user with ' +
            'the given email or password already exists)',
    }));
}
exports.SwaggerToRegistration = SwaggerToRegistration;


/***/ }),

/***/ "./library/swagger/auth/SwaggerToRegistrationEmailResending.ts":
/*!*********************************************************************!*\
  !*** ./library/swagger/auth/SwaggerToRegistrationEmailResending.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerToRegistrationEmailResending = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
function SwaggerToRegistrationEmailResending() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Resending an activation code by email' }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'Input data is accepted.Email with confirmation code will be send to ' +
            'passed email address',
    }), (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'If the inputModel has incorrect values',
    }));
}
exports.SwaggerToRegistrationEmailResending = SwaggerToRegistrationEmailResending;


/***/ }),

/***/ "./library/swagger/auth/index.ts":
/*!***************************************!*\
  !*** ./library/swagger/auth/index.ts ***!
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
__exportStar(__webpack_require__(/*! ./SwaggerToPasswordRecovery */ "./library/swagger/auth/SwaggerToPasswordRecovery.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToNewPassword */ "./library/swagger/auth/SwaggerToNewPassword.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToAuthorization */ "./library/swagger/auth/SwaggerToAuthorization.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToRefreshToken */ "./library/swagger/auth/SwaggerToRefreshToken.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToRegistration */ "./library/swagger/auth/SwaggerToRegistration.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToPasswordEmailResending */ "./library/swagger/auth/SwaggerToPasswordEmailResending.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToRegistrationEmailResending */ "./library/swagger/auth/SwaggerToRegistrationEmailResending.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToLogout */ "./library/swagger/auth/SwaggerToLogout.ts"), exports);
__exportStar(__webpack_require__(/*! ./SwaggerToMeInfo */ "./library/swagger/auth/SwaggerToMeInfo.ts"), exports);


/***/ }),

/***/ "./library/swagger/config.swagger.ts":
/*!*******************************************!*\
  !*** ./library/swagger/config.swagger.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swaggerConfig = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
exports.swaggerConfig = {
    development: new swagger_1.DocumentBuilder()
        .setTitle('Godzilla-back')
        .setDescription('The godzilla-back API description')
        .setVersion('1.0')
        .build(),
};


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