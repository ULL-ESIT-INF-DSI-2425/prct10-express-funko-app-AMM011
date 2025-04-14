"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFunkoManager = void 0;
var FunkoCollection_js_1 = require("../models/FunkoCollection.js");
var fs = require("fs/promises");
var path = require("path");
/**
 * Clase que gestiona la colección de Funkos de un usuario, con persistencia en el sistema de ficheros.
 */
var UserFunkoManager = /** @class */ (function () {
    /**
     * Constructor del gestor de Funkos de un usuario.
     * @param username - Nombre del usuario.
     */
    function UserFunkoManager(username) {
        this.username = username;
        this.userDir = path.join("db", username);
        this.collection = new FunkoCollection_js_1.FunkoCollection();
    }
    /**
     * Carga los Funkos del usuario desde el sistema de archivos.
     */
    UserFunkoManager.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, funkos, _i, files_1, file, data, funko, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, fs.mkdir(this.userDir, { recursive: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs.readdir(this.userDir)];
                    case 2:
                        files = _a.sent();
                        funkos = [];
                        _i = 0, files_1 = files;
                        _a.label = 3;
                    case 3:
                        if (!(_i < files_1.length)) return [3 /*break*/, 6];
                        file = files_1[_i];
                        if (!file.endsWith(".json")) return [3 /*break*/, 5];
                        return [4 /*yield*/, fs.readFile(path.join(this.userDir, file), "utf-8")];
                    case 4:
                        data = _a.sent();
                        funko = JSON.parse(data);
                        funkos.push(funko);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.collection = new FunkoCollection_js_1.FunkoCollection(funkos);
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        console.error("\u274C Error cargando los Funkos de ".concat(this.username, ":"), err_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Guarda un Funko individual en el sistema de archivos.
     * @param funko - Funko a guardar.
     */
    UserFunkoManager.prototype.saveFunko = function (funko) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = path.join(this.userDir, "".concat(funko.id, ".json"));
                        return [4 /*yield*/, fs.writeFile(filePath, JSON.stringify(funko, null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Elimina un Funko del sistema de archivos.
     * @param id - ID del Funko.
     */
    UserFunkoManager.prototype.deleteFunkoFile = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = path.join(this.userDir, "".concat(id, ".json"));
                        return [4 /*yield*/, fs.unlink(filePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Añade un Funko a la colección del usuario.
     */
    UserFunkoManager.prototype.add = function (funko) {
        return __awaiter(this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = this.collection.addFunko(funko);
                        if (!success) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.saveFunko(funko)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, success];
                }
            });
        });
    };
    /**
     * Actualiza un Funko existente.
     */
    UserFunkoManager.prototype.update = function (funko) {
        return __awaiter(this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = this.collection.updateFunko(funko);
                        if (!success) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.saveFunko(funko)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, success];
                }
            });
        });
    };
    /**
     * Elimina un Funko por ID.
     */
    UserFunkoManager.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        success = this.collection.removeFunko(id);
                        if (!success) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deleteFunkoFile(id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, success];
                }
            });
        });
    };
    /**
     * Lista todos los Funkos.
     */
    UserFunkoManager.prototype.list = function () {
        return this.collection.listFunkos();
    };
    /**
     * Devuelve un Funko por ID.
     */
    UserFunkoManager.prototype.get = function (id) {
        return this.collection.getFunko(id);
    };
    return UserFunkoManager;
}());
exports.UserFunkoManager = UserFunkoManager;
