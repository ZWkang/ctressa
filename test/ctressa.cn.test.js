var 希望 = require('../ctressa')
var version  = require('../package.json').version
var assert = require('assert')


var errorCallback = function (fn, message) {
    try{
        fn()
        assert.fail('希望 would be fail')
    }catch(err) {
        assert.equal(message, err.message);
    }
}

describe('HOPE #Test', () => {
    it('test 希望 object property', () => {
        希望(希望('test')).拥有属性('ctressa')
        希望(希望('test')).拥有属性('language')
        希望(希望('test')).拥有属性('isStrict')
        希望(希望.version).和(version).严格相等
    })
    it('assert function test', () => {
        errorCallback(function () {
            希望().断言(false, 'test assert case')
        }, 'test assert case')
        errorCallback(function () {
            希望().不是.断言(true, 'test assert case', 'test assert negate case')
        }, 'test assert negate case')
    })
    it('assert function 不是UseNegate', () => {
        errorCallback(function () {
            希望().断言(false, 'test assert case', 'test assert negate case', true)
        }, 'test assert case')
        errorCallback(function () {
            希望().不是.断言(false, 'test assert case', 'test assert negate case', true)
        }, 'test assert case')
    })
    it('haveKey function test', () => {
        希望({name: "zwkang"}).拥有属性('name')
        希望({name: "zwkang"}).不是.拥有属性('names')
    })
    it('和 functions test', () => {
        var cases = 希望({}).和([])
        希望(cases.expected).类型为('array')
        希望(cases.ctressa).类型为('object')
    })
    it('length getter test', () => {
        var cases = 希望([1,2,3,4]).和([3,3,3]).过滤length属性
        assert(cases.expected === 3, 'a')
        assert(cases.ctressa === 4, 'b')
    })
    it('equal getter test', () => {
        希望('test').和('test').严格相等
        希望(4).和([1,3,4,5].length).严格相等
        希望(4).和('4').不是.严格相等
    })
    it('abstractEqual getter test', () => {
        希望(4).和('4').抽象相等
        希望(void 'zwkang').和(null).抽象相等
        希望(666).和(666).抽象相等
    })
    it('ownProperty function test', () => {
        希望({name: 'zwkang'}).拥有原型属性('name')
        希望({name: 'zwkang'}).不是.拥有原型属性('voidName')
    })
    it('type function test', () => {
        希望({}).类型为('object')
        希望({}).不是.类型为('number')
    })
    it('haveProperty', () => {
        希望({name: 'zwkang'}).拥有属性('name')
        希望({name: 'zwkang'}).拥有属性('name', 'zwkang')
        希望({name: 'zwkang'}).不是.拥有属性('voidName')
        希望({name: 'zwkang'}).不是.拥有属性('voidName', 'zwkang')
    })
    it('empty getter', () => {
        
        希望([]).长度为空
        
        希望(0).长度为空
        希望([1,2,3,4]).不是.长度为空
    })
    it('PropertyLength getter test', () => {
        var cases1 = 希望({name: 'zwkang'}).PropertyLength
        希望(cases1.ctressa).相等于数字(1)
        希望(cases1.ctressa).不是.相等于数字(3)
        var cases2 = 希望({name: 'zwkang'}).和({test: true}).PropertyLength
        希望(cases2.ctressa).相等于数字(1)
        希望(cases2.expected).相等于数字(1)
    })
    it('抛出错误 function test', () => {
        var cases1 = function cases1() {
            throw new Error('抛出错误 test case')
        }
        var cases2 = function cases2() {}
        希望(cases1).抛出错误()
        希望(cases2).不是.抛出错误()
        希望(cases1).抛出错误(/抛出错误/)
        希望(cases1).抛出错误('抛出错误 test case')
    })
    it('match getter test', () => {
        
        
        
        
        
        
            
        
        
        希望('test case').和(/test/).相匹配
        希望('test case').和(/不是things/).不是.相匹配
    })
    it('strict getter test', () => {
        var testcase1 = 希望({}).严格
        希望(testcase1.isStrict).为真值
    })
    it('deepEql function test', () => {
        var obj1 = {name: 'zwkang', child: {name: 'zhou', index: 1}}
        var obj2 = {name: 'zwkang', child: {name: 'zhou', index: 1}}
        var obj3 = {}
        var obj4 = {name: 'zwkang', child: {name: 'zhou', index: '1'}}
        希望(obj1).和(obj2).不是.严格相等
        希望(obj1).和(obj2).深比对相等
        希望(obj1).和(obj4).深比对相等
        希望(obj1).和(obj4).不是.严格.深比对相等
        希望(obj1).和(obj3).不是.深比对相等
    })
    it('instanceof function test', () => {
        var cases1 = function(){
            try{
                希望({}).原型上存在('')
            }catch(e){
                throw e
            }
        }
        希望(cases1).抛出错误('希望 instanceof 传递 constructor必须为函数')
        希望({}).原型上存在(Object)
        希望({}).不是.原型上存在(Object, true)
        希望({}).不是.原型上存在(String)
        希望({}).原型上存在(Object, false)
    })
    it('contain function test', () => {
        var obj1 = {name: 'zwkang'}
        var obj2 = {name: 'zhou'}

        var cases1 = [obj1, 2,3,4,5]
        希望(cases1).包含(obj1)
        
        希望(function (){ 希望('').包含([])}).抛出错误()
        希望(cases1).包含(obj1)
        希望(cases1).不是.包含(obj2)
    })
    it('is getter function test', () => {
        var cases1 = 希望({})
        希望(cases1.是).和(cases1).严格相等
        希望(cases1.是).和(cases1).严格.深比对相等
    })
    it('object getter function tset', () => {
        希望({}).是.对象
        希望('').是.不是.对象
    })
    it('eq function test', () => {
        希望(3).相等于数字(3)
        希望(3).不是.相等于数字(2)
        希望(1).不是.不是.相等于数字(1)
    })
    it('ok getter test', () => {
        希望(true).为真值
        希望(false).不是.为真值
    })
})