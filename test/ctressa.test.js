var HOPE = require('../ctressa')
var version  = require('../package.json').version
var assert = require('assert')
var errorCallback = function (fn, message) {
    try{
        fn()
        assert.fail('hope would be fail')
    }catch(err) {
        assert.equal(message, err.message);
    }
}

describe('HOPE #Test', () => {
    // it('test HOPE object property', () => {
    //     // HOPE(HOPE('test')).拥有属性('ctressa')
    //     // HOPE(HOPE('test')).拥有属性('language')
    //     // HOPE(HOPE('test')).拥有属性('isStrict')
    //     // HOPE(HOPE('test')).拥有属性('expected')
    //     // HOPE(HOPE.version).与(version).严格相等
    // })
    // it('test HOPE object and function work', () => {
    //     // HOPE(HOPE('arr')).拥有属性('ctressa')
    //     // var instance = HOPE({
    //     //     name: 'zwkang'
    //     // })
    //     // var arr = []
    //     // instance = HOPE(instance).与数组(arr)


    // })
    // console.log(HOPE.version)
    it('assert function test', () => {

        errorCallback(function () {
            HOPE().assert(false, 'test assert case')
        }, 'test assert case')
        errorCallback(function () {
            HOPE().not.assert(true, 'test assert case', 'test assert negate case')
        }, 'test assert negate case')
    })
    it('assert function notUseNegate', () => {
        errorCallback(function () {
            HOPE().assert(false, 'test assert case', 'test assert negate case', true)
        }, 'test assert case')
        errorCallback(function () {
            HOPE().not.assert(false, 'test assert case', 'test assert negate case', true)
        }, 'test assert case')
    })
    it('haveKey function test', () => {
        // var TEST = HOPE({name: "zwkang"})
        HOPE({name: "zwkang"}).haveKey('name')
        HOPE({name: "zwkang"}).not.haveKey('names')
    })
    it('and functions test', () => {
        // HOPE({})
        var cases = HOPE({}).and([])
        HOPE(cases.expected).type('array')
        HOPE(cases.ctressa).type('object')
    })
    it('length getter test', () => {
        var cases = HOPE([1,2,3,4]).and([3,3,3]).length
        // HOPE(cases.expected).eq(3)
        // HOPE(cases.ctressa).eq(4)
        assert(cases.expected === 3, 'a')
        assert(cases.ctressa === 4, 'b')
    })
    it('equal getter test', () => {
        HOPE('test').and('test').equal
        HOPE(4).and([1,3,4,5].length).equal
        HOPE(4).and('4').not.equal
    })
    it('abstractEqual getter test', () => {
        HOPE(4).and('4').abstractEqual
        HOPE(void 'zwkang').and(null).abstractEqual
        HOPE(666).and(666).abstractEqual
    })
    it('ownProperty function test', () => {
        HOPE({name: 'zwkang'}).ownProperty('name')
        HOPE({name: 'zwkang'}).not.ownProperty('voidName')
    })
    it('type function test', () => {
        HOPE({}).type('object')
        HOPE({}).not.type('number')
    })
    it('haveProperty', () => {
        HOPE({name: 'zwkang'}).haveProperty('name')
        HOPE({name: 'zwkang'}).haveProperty('name', 'zwkang')
        HOPE({name: 'zwkang'}).not.haveProperty('voidName')
        HOPE({name: 'zwkang'}).not.haveProperty('voidName', 'zwkang')
    })
    it('empty getter', () => {
        // var emptyCaseArr = []
        HOPE([]).empty
        // HOPE(0).type(0)
        HOPE(0).empty
        HOPE([1,2,3,4]).not.empty
    })
    it('PropertyLength getter test', () => {
        var cases1 = HOPE({name: 'zwkang'}).PropertyLength
        HOPE(cases1.ctressa).eq(1)
        HOPE(cases1.ctressa).not.eq(3)
        var cases2 = HOPE({name: 'zwkang'}).and({test: true}).PropertyLength
        HOPE(cases2.ctressa).eq(1)
        HOPE(cases2.expected).eq(1)
    })
    it('toThrow function test', () => {
        var cases1 = function cases1() {
            throw new Error('toThrow test case')
        }
        var cases2 = function cases2() {}
        HOPE(cases1).toThrow()
        HOPE(cases2).not.toThrow()
        HOPE(cases1).toThrow(/toThrow/)
        HOPE(cases1).toThrow('toThrow test case')
    })
    it('match getter test', () => {
        // var cases1 = function cases1() {
        //     try {
        //         HOPE({}).match
        //     }catch(e) {
        //         throw e
        //     }
            
        // }
        // HOPE(cases1).toThrow()
        HOPE('test case').and(/test/).match
        HOPE('test case').and(/notthings/).not.match
    })
    it('strict getter test', () => {
        var testcase1 = HOPE({}).strict
        HOPE(testcase1.isStrict).ok
    })
    it('deepEql function test', () => {
        var obj1 = {name: 'zwkang', child: {name: 'zhou', index: 1}}
        var obj2 = {name: 'zwkang', child: {name: 'zhou', index: 1}}
        var obj3 = {}
        var obj4 = {name: 'zwkang', child: {name: 'zhou', index: '1'}}
        HOPE(obj1).and(obj2).not.equal
        HOPE(obj1).and(obj2).deepEql
        HOPE(obj1).and(obj4).deepEql
        HOPE(obj1).and(obj4).not.strict.deepEql
        HOPE(obj1).and(obj3).not.deepEql
    })
    it('instanceof function test', () => {
        var cases1 = function(){
            try{
                HOPE({}).instanceof('')
            }catch(e){
                throw e
            }
        }
        HOPE(cases1).toThrow('希望 instanceof 传递 constructor必须为函数')
        HOPE({}).instanceof(Object)
        HOPE({}).not.instanceof(Object, true)
        HOPE({}).not.instanceof(String)
        HOPE({}).instanceof(Object, false)
    })
    it('contain function test', () => {
        var obj1 = {name: 'zwkang'}
        var obj2 = {name: 'zhou'}

        var cases1 = [obj1, 2,3,4,5]
        HOPE(cases1).contain(obj1)
        
        HOPE(function (){ HOPE('').contain([])}).toThrow()
        HOPE(cases1).contain(obj1)
        HOPE(cases1).not.contain(obj2)
    })
    it('is getter function test', () => {
        var cases1 = HOPE({})
        HOPE(cases1.is).and(cases1).equal
        HOPE(cases1.is).and(cases1).strict.deepEql
    })
    it('object getter function tset', () => {
        HOPE({}).is.object
        HOPE('').is.not.object
    })
    it('eq function test', () => {
        HOPE(3).eq(3)
        HOPE(3).not.eq(2)
        HOPE(1).not.not.eq(1)
    })
    it('ok getter test', () => {
        HOPE(true).ok
        HOPE(false).not.ok
    })
    // it('')
})