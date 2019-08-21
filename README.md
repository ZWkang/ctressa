# ctressa

> simple chinese assert \^\_\^ (gagaga)

<p align="center">
    <a href="https://travis-ci.com/ZWkang/ctressa">
        <img src="https://api.travis-ci.com/ZWkang/ctressa.svg?branch=master" alt="Build Status">
    </a>
</p>

## Usage

```shell
npm install ctressa
```

```js
var hope = require("ctressa");
var 希望 = require("ctressa");
```

### getter

- length

```js
var cases = HOPE([1, 2, 3, 4]).and([3, 3, 3]).length;
assert(cases.expected === 3, "a");
```

- equal
- 严格相等

```js
HOPE("test").and("test").equal;
HOPE(4).and([1, 3, 4, 5].length).equal;
```

```js
希望("test").和("test").严格相等;
```

- abstractEqual
- 抽象相等

```js
HOPE(4).and("4").abstractEqual;
希望(4).和("4").抽象相等;
```

- empty
- 长度为空

```js
HOPE([]).empty;
希望([]).长度为空;
```

- PropertyLength

```js
var cases1 = HOPE({ name: "zwkang" }).PropertyLength;
HOPE(cases1.ctressa).eq(1);
```

- match
- 相匹配

```js
HOPE("test case").and(/test/).match;
希望("test case").和(/test/).相匹配;
```

- strict
- 严格

```js
var testcase1 = HOPE({}).strict;
HOPE(testcase1.isStrict).ok;
var testcase1 = 希望({}).严格;
希望(testcase1.isStrict).为真值;
```

- object
- 对象

```js
HOPE({}).is.object;
希望({}).是.对象;
```

- ok
- 为真值

```js
HOPE(true).ok;
希望(true).为真值;
```

### function

- .ownProperty([key])
- 拥有原型属性

```js
HOPE({ name: "zwkang" }).ownProperty("name");
希望({ name: "zwkang" }).拥有原型属性("name");
```

- .type()
- 类型为

```js
HOPE({}).type("object");
希望({}).类型为("object");
```

- .haveProperty
- 拥有属性

```js
HOPE({ name: "zwkang" }).haveProperty("name");
希望({ name: "zwkang" }).拥有属性("name");
```

- toThrow

```js
var cases1 = function cases1() {
  throw new Error("toThrow test case");
};
HOPE(cases1).toThrow();
```

- deepEql
- 严格相等

```js
var obj1 = { name: "zwkang", child: { name: "zhou", index: 1 } };
var obj2 = { name: "zwkang", child: { name: "zhou", index: 1 } };

HOPE(obj1).and(obj2).deepEql;
希望(obj1).和(obj2).不是.严格相等;
```

- instanceof
- 原型上存在

```js
HOPE({}).instanceof(Object);
希望({}).原型上存在(Object);
```

- contain
- 包含

```js
var obj1 = { name: "zwkang" };
var cases1 = [obj1, 2, 3, 4, 5];
HOPE(cases1).contain(obj1);
希望(cases1).包含(obj1);
```

- eq
- 相等于数字

```js
HOPE(3).eq(3);
希望(3).相等于数字(3);
```

## author

[@zwkang](https://github.com/ZWKang)

## License

[MIT](LICENSE)
