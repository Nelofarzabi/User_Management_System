"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = void 0;
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
exports.pick = pick;
//# sourceMappingURL=pick.js.map