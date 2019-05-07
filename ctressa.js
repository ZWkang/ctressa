var uinspect = require('util').inspect,
    inherits = require('util').inherits,
    deepEql  = require('deep-equal'),
    version  = require('./package.json').version,
    language = require('./local.json'),
    debug    = require('debug')('ctressa'),
    Helper   = require('./Helper.js')

language.default = language.zh

// still "hope" becuase error stack should be show english
exports = module.exports = hope

exports.version = version

function hope(ctressa){
    if(!(this instanceof 希望)) {
        return new 希望(ctressa)
    }
    this.ctressa = ctressa
    this.language = language.default
    this.isStrict = false
}

var inspect = function (val) {
    if (Helper.isFunction(val)) {
        return (val.name || val.toString())
    }
    return uinspect(val)
}

var 希望 = hope

// like node core
var AssertionError = function (options) {
    this.message = options.message || ''
    this.name = options.name || '[HOPE ERROR]',
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    this.showDiff = options.showDiff
    var stackStartFn = options.stackStartFn || global
    if(Error.captureStackTrace) {
        Error.captureStackTrace(this, stackStartFn)
    }
}

inherits(AssertionError, Error)
AssertionError.__proto__ = Error.prototype


function injectExpected (expected) {
    this.expected = expected
    return this
}
hope.prototype = {
    get ok () {
        this.assert(
            true === this.ctressa,
            '希望 '+ inspect(this.ctressa) + '为真值',
            '希望 '+ inspect(this.ctressa) + '不为真值'
        )
    },
    get is() {
        return this
    },
    get object() {
        this.assert(
            Helper.isObject(this.ctressa),
            '希望 ' + inspect(this.ctressa) + ' 是对象',
            '希望 ' + inspect(this.ctressa) + ' 不是对象'  
        )
    },
    get match() {
        this.assert(
            Helper.isRegExp(this.expected),
            'HOPE ' + inspect(this.expected) + '应该为正则对象',
            'HOPE ' + inspect(this.expected) + '不应该为正则对象',
            true
        )

        this.assert(
            this.expected.test(this.ctressa),
            'HOPE  正则对象' + inspect(this.expected) + ' 与 ' + inspect(this.ctressa) + ' 成功匹配',
            'HOPE  正则对象' + inspect(this.expected) + ' 与 ' + inspect(this.ctressa) + ' 成功不匹配'
        )
    },
    get strict() {
        this.isStrict = true
        return this
    },
    get not() {
        this.negate = !this.negate
        return this
    },

    get deepEql(){
        this.assert(
            deepEql(this.ctressa, this.expected, { 
                strict: this.isStrict 
            }),
            'HOPE ' + inspect(this.ctressa) + ' 与 ' + inspect(this.expected) + ' 全相等',
            'HOPE ' + inspect(this.ctressa) + ' 与 ' + inspect(this.expected) + ' 全不相等'
        )
    },
    get length(){
        if(!Helper.isUndefined(this.expected)){
            this.expected = this.expected.length
        }
        if(!Helper.isUndefined(this.ctressa)) {
            this.ctressa = this.ctressa.length
        }
        return this
    },
    get equal() {
        this.assert(
            this.ctressa === this.expected,
            'HOPE ' + inspect(this.ctressa) + ' 与 ' + inspect(this.expected) + "两者严格相等",
            'HOPE ' + inspect(this.ctressa) + ' 与 ' + inspect(this.expected) + "两者不严格相等"
        )
        return this;
    },
    get abstractEqual(){
        this.assert(
            this.ctressa == this.expected,
            "两者非严格相等",
            "两者非严格不相等"
        )
        return this
    },
    get empty() {
        if(Number(this.ctressa) === this.ctressa) {
            this.assert(
                this.ctressa === 0,
                '希望 待测试' + inspect(this.ctressa) + '长度为空',
                '希望 待测试' + inspect(this.ctressa) + '长度不为空',
                false,
                0
            )
            return
        }
        this.assert(
            this.ctressa.length === 0,
            '希望 待测试' + inspect(this.ctressa) + '长度为空',
            '希望 待测试' + inspect(this.ctressa) + '长度不为空',
            false,
            0
        )
    },
    // 过滤属性个数
    get PropertyLength(){
        if(Helper.isObject(this.ctressa)) {
            this.ctressa = Object.keys(this.ctressa).length
        }
        if(Helper.isObject(this.expected)) {
            this.expected = Object.keys(this.expected).length
        }
        return this
    },
    setupLanguage: function (str) {
        if(!!language[str]) {
            this.language = language[str]
        }
        debug('langugu :' , this.language)
    },
    assert: function (expr, message, inverseMessage, notUseNegate, expected) {
        inverseMessage = inverseMessage || message
        expected = Helper.isUndefined(expected) ? inspect(this.expected) : inspect(expected)
        var negate  = notUseNegate ? false : this.negate,
            ok      = negate ? !expr : expr,
            message = negate ? inverseMessage : message
        if(!ok) {
            throw new AssertionError({
                message: message,
                stackStartFn: this.assert,
                actual: inspect(this.ctressa),
                expected: expected,
                showDiff: true
            })
        }

    },
    haveKey (key) {
        var keys = Object.keys(this.ctressa)
        this.assert(
            ~keys.indexOf(key),
            inspect(this.ctressa) + " 应该有key:" + key,
            inspect(this.ctressa) + " 不应该有key:" + key
        )
    },

    ownProperty(name){
        this.assert(
            this.ctressa.hasOwnProperty(name),
            '希望 ' + inspect(this.ctressa) + '拥有属性' + name,
            '希望 ' + inspect(this.ctressa) + '不拥有属性' + name
        )
    },
    type(TYPE) {
        TYPE = Helper.isString(TYPE) ? TYPE.toLowerCase(): String(TYPE).toString()
        var ctressa = /\[object\s(\w+)\]/.exec(Object.prototype.toString.call(this.ctressa).toLowerCase())[1]
        this.assert(
            TYPE === ctressa,
            '希望 ' + inspect(this.ctressa) + ' ' + ctressa + ' 类型与' + TYPE + '一致',
            '希望 ' + inspect(this.ctressa) + ' ' + ctressa +' 类型与' + TYPE + '不一致',
            false,
            TYPE
        )
    },
    haveProperty(name, val) {
        var ok = false
        ok = !Helper.isUndefined(this.ctressa[name])
        if(!Helper.isUndefined(val)) {
            this.assert(
                this.ctressa[name] === val,
                inspect(this.ctressa) + '拥有属性' + name + ' 值为' + val,
                inspect(this.ctressa) + '不拥有属性' + name + ' 值为' + val,
                false
            )
        } else {
            this.assert(
                ok,
                inspect(this.ctressa) + '存在属性' + name,
                inspect(this.ctressa) + '不存在属性' + name
            )
        }
        return this
    },

    toThrow(regexp) {
        var ok = false,
            err
        this.assert(
            Helper.isFunction(this.ctressa),
            '希望 actual 为函数 ' + inspect(this.ctressa),
            '希望 actual 不为函数' + inspect(this.ctressa),
            true
        )
        try{
            this.ctressa()
        }catch(e) {
            ok = true
            err = e
        }
        if(!Helper.isUndefined(regexp) && Helper.isRegExp(regexp)) {
           this.assert(
               regexp.test(err.message),
               '希望 ' + inspect(regexp) + '匹配 错误信息' + inspect(err.message),
               '希望 ' + inspect(regexp) + '不匹配 错误信息' + inspect(err.message)
           )
           return this
        }
        if(!Helper.isUndefined(regexp) && Helper.isString(regexp)) {
            this.assert(
                (new RegExp(regexp)).test(err.message),
                '希望 ' + inspect(regexp) + '匹配 错误信息' + inspect(err.message),
                '希望 ' + inspect(regexp) + '不匹配 错误信息' + inspect(err.message)
            )
            return this
         }
        
        this.assert(
            ok,
            '希望抛出了错误',
            '希望不抛出错误'
        )
        return this
    },
    instanceof (constructor, notUseNegate) {
        notUseNegate = !Helper.isBoolean(notUseNegate) ? false: !!notUseNegate

        this.assert(
            Helper.isFunction(constructor),
            '希望 instanceof 传递 constructor必须为函数',
            '',
            true
        )
        this.assert(
            this.ctressa instanceof constructor,
            '希望 ' + inspect(this.ctressa) + ' 是 ' + (constructor.name || constructor.toString()) + '的实例',
            '希望 ' + inspect(this.ctressa) + ' 不是 ' + (constructor.name || constructor.toString()) + '的实例',
            notUseNegate,
            (constructor.name || constructor.toString())
        )
    },
    contain (obj) {
        this.assert(
            Helper.isArray(this.ctressa),
            'HOPE ' + inspect(this.ctressa) + '  被比对值不是数组',
            '',
            true
        )
        this.assert(
            ~this.ctressa.indexOf(obj),
            'HOPE ' + inspect(this.ctressa) + ' 包含 ' + inspect(obj),
            'HOPE ' + inspect(this.ctressa) + ' 不包含 ' + inspect(obj)
        )
        return this
    },
    eq(num) {
        if(Helper.isUndefined(this.expected)) {
            this.assert(
                this.ctressa === num,
                '希望 '+ inspect(this.ctressa) + ' 相等于数字 ' + inspect(num),
                '希望 '+ inspect(this.ctressa) + ' 不相等于数字 ' + inspect(num)
            )
        }
    },
    and: injectExpected
}


;(function alias (keyMap) {
    Object.keys(keyMap).forEach(key => {
        if(Object.getOwnPropertyDescriptor(hope.prototype, key) && Object.getOwnPropertyDescriptor(hope.prototype, key).get){
            Object.defineProperty(hope.prototype, keyMap[key], {
                get: Object.getOwnPropertyDescriptor(hope.prototype, key).get
            })
        } else {
            hope.prototype[keyMap[key]] = hope.prototype[key]
        }
    })
})({
    "and": "和",
    "not": "不是",
    "type": "类型为",
    "haveName": "拥有name属性为",
    "haveKey": "拥有键",
    "length": "过滤length属性",
    "functionnameEqual": "的函数名相等",
    "equal": "严格相等",
    "abstractEqual": "抽象相等",
    "haveProperty": "拥有属性",
    "empty": "长度为空",
    "PropertyLength": "过滤对象属性长度",
    "toThrow": "抛出错误",
    "match": "相匹配",
    "strict": "严格",
    "deepEql": "深比对相等",
    "instanceof": "原型上存在",
    "contain": "包含",
    "object": "对象",
    "is": "是",
    'assert': "断言",
    'ownProperty': "拥有原型属性",
    'eq': "相等于数字",
    'ok': "为真值"
})


// 前置词语 + (actual) + 后置断言类型 + (expected) + 具体词语 + 判断方式[自定义词]

// 前置词语 希望
// 后置断言类型 与[类型]
// 词语/虚词/过滤词
    // 不
    // 长度
    // 键数量

// 判断方式
    // 抽象相等
    // 严格相等
    // 抛出错误
    // 拥有属性
    // 拥有原形属性
    // 浅相等
    // 深相等
    // 正则匹配
    // 大于
    // 小于
    // 包含关系
    // 深层包含
// 自定义词
    // false
    // true
    // undefined
