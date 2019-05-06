var Helper = require('../Helper.js'),
    assert = require('assert')

describe('Helper Test', () => {
    it('isFunction Test', () => {
        var demo1 = function demo1() {}
        var notFunction = 'str'
        var obj = {}
        var isFunction = Helper.isFunction
        assert(isFunction(demo1), 'demo1 is function should be pass')
        assert(false === isFunction(notFunction), 'notFunction should be equal with false')
        assert(false === isFunction(obj), 'notFunction should be equal with false even it is object')
    })
    it('isArray Test', () => {
        var demo2 = [1,2,3,4]
        var notArray = 'str'
        var obj = {}
        var isArray = Helper.isArray
        assert(isArray(demo2), 'demo2 is array should be pass')
        assert(false === isArray(notArray), 'notArray should be equal with false')
        assert(false === isArray(obj), 'notFunction should be equal with false even it is object')
    })
    it('isBoolean Test', () => {
        var demo3 = Boolean(false)
        var notBoolean = 'str'
        var obj = {}
        var isBoolean = Helper.isBoolean
        assert(isBoolean(demo3), 'demo3 is boolean should be pass')
    })
    it('isNull', () => {
        var demo4 = null
        var notNull = 'str'
        var isNull = Helper.isNull
        assert(isNull(demo4), 'demo4 is null should be pass')
        assert(false === isNull(notNull), 'demo4 is not null should not be pass')
    })
    it('isNullOrUndefined, Test', () => {
        var demo5 = void 'zwkang'
        var Null = null
        var notNullAndUndefined = 'str'
        var isNullOrUndefined = Helper.isNullOrUndefined
        assert(isNullOrUndefined(demo5) && isNullOrUndefined(Null), 'null and undefined should be pass')
        assert(false === isNullOrUndefined(notNullAndUndefined), 'if not undefined and null should not be pass')
    })
    it('isNumber Test', () => {
        var demo6 = Number(666)
        var notNumber = {}
        var isNumber = Helper.isNumber
        assert(isNumber(demo6), 'demo6 is number should be pass')
        assert(false === isNumber(notNumber), 'notNumber is not number should not be pass')
    })
    it('isString Test', () => {
        var demo7 = String('zwkang')
        var notString = {}
        var isString = Helper.isString
        assert(isString(demo7), 'demo7 is string should be pass')
        assert(false === isString(notString), 'notString is not string should not be pass')
    })
    it('isSymbol Test', () => {
        var demo8 = Symbol('test')
        var notSymbol = Number(66)
        var isSymbol = Helper.isSymbol
        assert(isSymbol(demo8), 'demo8 is Symbol should be pass')
        assert(false === isSymbol(notSymbol), 'notSymbol is not symbol should not be pass')
    })
    it('isUndefined Test', () => {
        var demo9 = void 666
        var notUndefined = {}
        var isUndefined = Helper.isUndefined
        assert(isUndefined(demo9), 'demo9 is string should be pass')
        assert(false === isUndefined(notUndefined), 'notUndefined is not Undefined should not be pass')
    })
    it('isPrimitive Test', () => {
        var demo10 = String('zwkang')
        var notPrimitive = {}
        var isPrimitive = Helper.isPrimitive
        assert(isPrimitive(demo10), 'demo10 is Primitive should be pass')
        assert(false === isPrimitive(notPrimitive), 'notString is not Primitive should not be pass')
    })
    it('objectToString Test', () => {
        var demo11 = { name: 'kang' }
        var objectToString = Helper.objectToString
        assert(/\[object/.test(objectToString(demo11)), 'demo11 is object should be toString and pass')
    })
    it('isError Test', () => {
        var demo12 = new Error('isError test')
        var notError = {}
        var isError = Helper.isError
        assert(isError(demo12), 'demo12 is error should be pass')
        assert(false === isError(notError), 'notError is not error should not be pass')
    })
    it('isDate Test', () => {
        var demo13 = new Date()
        var notDate = {}
        var isDate = Helper.isDate
        assert(isDate(demo13), 'demo13 is Date should be pass')
        assert(false === isDate(notDate), 'notDate is not Date Object should not be pass')
    })
    it('isPromise Test', () => {
        var demo14 = Promise.resolve()
        var notPromise = 'str'
        var likePromise = {
            then: function (){}
        }
        var isPromise = Helper.isPromise
        assert(isPromise(demo14), 'demo14 is promise should be pass')
        assert(false === isPromise(notPromise), 'notPromise is not promise should not be pass')
        assert(false === isPromise(likePromise), 'like promise should not pass')
    })
    it('isRegExp Test', () => {
        var demo15 = new RegExp('test')
        var notRegExp = String('zwkang')
        var isRegExp = Helper.isRegExp
        assert(isRegExp(demo15), 'demo15 is regexp object should be pass')
        assert(false === isRegExp(notRegExp), 'notRegExp is not regexp object should not be pass')
    })
    it('isObject Test', () => {
        var demo16 = {}
        var notObject = String('zwkang')
        var Null = null
        var isObject = Helper.isObject
        assert(isObject(demo16), 'demo16 is object should be pass')
        assert(false === isObject(notObject), 'notObject is not object should not be pass')
        assert(false === isObject(Null), 'null should be return false')
    })
})