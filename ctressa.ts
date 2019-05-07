declare namespace ctressa {
    type Inspect = (val: any) => string
    enum showDiff { undefined, false, true}
    interface AssertionErrorOptions {
        message?: String,
        name?: String,
        actual?: any,
        expected?: any,
        showDiff: showDiff,
        stackStartFn?: Function
    }
}