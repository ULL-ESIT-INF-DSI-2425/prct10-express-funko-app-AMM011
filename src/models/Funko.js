"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funko = void 0;
/**
 * Clase que representa un Funko Pop coleccionable.
 */
var Funko = /** @class */ (function () {
    /**
     * Constructor de un Funko.
     * @param id - Identificador único del Funko.
     * @param name - Nombre del Funko.
     * @param description - Descripción del Funko.
     * @param type - Tipo de Funko.
     * @param genre - Género del Funko.
     * @param franchise - Franquicia a la que pertenece el Funko.
     * @param number - Número del Funko dentro de la franquicia.
     * @param exclusive - Si es exclusivo o no.
     * @param specialFeatures - Característica especiales del Funko.
     * @param marketValue - Valor de mercado en euros.
     */
    function Funko(id, name, description, type, genre, franchise, number, exclusive, specialFeatures, marketValue) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.genre = genre;
        this.franchise = franchise;
        this.number = number;
        this.exclusive = exclusive;
        this.specialFeatures = specialFeatures;
        this.marketValue = marketValue;
        if (marketValue < 0) {
            throw new Error("El valor de mercado no puede ser negativo.");
        }
    }
    return Funko;
}());
exports.Funko = Funko;
