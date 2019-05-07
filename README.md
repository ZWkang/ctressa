# ctressa

> simple chinese assert ^_^ (gagaga)

<p align="center">
    <a href="https://travis-ci.com/ZWkang/ctressa">
        <img src="https://api.travis-ci.com/ZWkang/ctressa.svg?branch=master" alt="Build Status">
    </a>
</p>

# Usage

```shell
    npm install ctressa
    var hope = require('ctressa')
```

getter ok

HOPE({}).ok

==> {} === true

getter ok

just a word no meaning

getter object

HOPE({}).is.object

{} is object ?

getter match

HOPE('string word').and(/string/).match

/string/ match string 'string word' ??

HOPE({name: 'zwkang'}).strict

strict set isStrict be true

HOPE({}).not

make this.negate != this.negate

HOPE({name: 'zwkang', child: {index: null}}).strict.deepEql

HOPE([1,3,4,5]).length

will set this.ctress get length property

HOPE(3).and(3).equal

HOPE(void 'zwkang').and(null).abstractEqual

HOPE([]).enpty

HOPE({name: 'zwkang'}).and({names: 'zhou'}).PropertyLength.equal

HOPE({name: 'zwkang'}).haveKey('name')

HOPE({name: 'zwkang'}).ownProperty('name')

HOPE({}).type('object')

HOPE(
    fucntion(){throw new Error('test')}
).toThrow()

HOPE(
    fucntion(){throw new Error('test')}
).toThrow('test')

HOPE(
    fucntion(){throw new Error('test')}
).toThrow(/te/)

HOPE({}).instanceof(Object)


HOPE([1,2,3,4]).contain(2)

HOPE(3).eq(3)

## License

[MIT](LICENSE)