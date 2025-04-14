"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunkoCollection = void 0;
/**
 * Clase que gestiona una colección de Funkos.
 */
var FunkoCollection = /** @class */ (function () {
    /**
     * Constructor para crear un colección de Funkos
     * @param initialFunkos - Lista de Funko
     */
    function FunkoCollection(initialFunkos) {
        if (initialFunkos === void 0) { initialFunkos = []; }
        this.funkos = [];
        this.funkos = initialFunkos;
    }
    /**
     * Añade un Funko a la colección, si el ID no esta dentro de la colección
     * @param funko - Funko para añadir a la lista
     * @return `true` si se logro añadir `false` si no se logro añadir.
     */
    FunkoCollection.prototype.addFunko = function (funko) {
        if (this.funkos.find(function (f) { return f.id === funko.id; })) {
            return false;
        }
        this.funkos.push(funko);
        return true;
    };
    /**
     * Modifica un Funko existe por ID.
     * @param funko - Funko para modificar
     * @param `true` si se modifico y `false` si no se modifico.
     */
    FunkoCollection.prototype.updateFunko = function (funko) {
        var index = this.funkos.findIndex(function (f) { return f.id === funko.id; });
        if (index === -1) {
            return false;
        }
        this.funkos[index] = funko;
        return true;
    };
    /**
     * Elimina un Funko de la colección por su ID.
     * @param id - ID del Funko a eliminar.
     * @returns `true`si se eliminó, `false` si no se encontró.
     */
    FunkoCollection.prototype.removeFunko = function (id) {
        var index = this.funkos.findIndex(function (f) { return f.id === id; });
        if (index === -1) {
            return false;
        }
        this.funkos.splice(index, 1);
        return true;
    };
    /**
     * Devuelve un Funko concreto de la colección por su ID.
     * @param id - ID del Funko buscado.
     * @return El Funko encontrado o `undefined` si no existe.
     */
    FunkoCollection.prototype.getFunko = function (id) {
        return this.funkos.find(function (f) { return f.id === id; });
    };
    /**
     * Lista todos los Funkos de la colección
     * @return Array con todos los Funkos.
     */
    FunkoCollection.prototype.listFunkos = function () {
        return __spreadArray([], this.funkos, true);
    };
    return FunkoCollection;
}());
exports.FunkoCollection = FunkoCollection;
