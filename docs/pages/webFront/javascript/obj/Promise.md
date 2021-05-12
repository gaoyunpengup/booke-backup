## Promise概念
1. 它是异步操作的一个解决方案, 简单说它就是一个异步操作的容器, 在未来某一个时刻会完成的操作, 并且返回成功/失败的值.
2. Promise是一个构造函数, 关键有resolve和reject方法, 原型上有then和catch方法

## Promise.all()
用于把多个Promise对象, 合并成一个大的Promise对象, 如果有一个失败, 直接进入catch, 如果子Promise自己实现了catch, 则合并的Promise对象不会进入catch, 进入then <br>
``Promise.all([p1, p2, p3])``; <br>
[示例代码](https://codepen.io/lidongxuwork126com/pen/pojoyQx?editors=1111)

## Promise.resolve()
用于将值转成Promise对象
``` js
Promise.resolve('foo') // 返回一个Promise对象
// 等价于
new Promise(resolve => resolve('foo'))
```

## 手写Promise实现
[完整源码和测试用例](https://codepen.io/lidongxuwork126com/pen/bGVGeex?editors=1111) <br>
::: tip 1.Promise构造函数 和 resolve方法
:::
定义MyPromise构造函数, fn就相当于6行传进来的回调函数
``` js
function MyPromise(fn){
  const resolve = (value) => {
    console.log(value);
  }
  fn(resolve); // (重要), resolve函数是内部传给外部使用的
}
let pro = new MyPromise(resolve => {
  resolve(123);
}); 
```
::: tip 2.Promise.prototype.then
:::
``` js
function MyPromise(fn){ 
  this.callBackFnArr = []; // 2. 用来装then里的回调函数
  const resolve = (value) => {
    this.callBackFnArr.map(v => v(value)); // 5. 遍历数组里then里的回调函数执行(注意代码执行顺序, 这时候pro.then()还没执行呢)
  }
  fn(resolve); 
}
MyPromise.prototype.then = function(thenFn){ // 1. 定义then方法, 把then里要执行的函数加入到数组中
  this.callBackFnArr.push(thenFn);
}
let pro = new MyPromise(resolve => { // 3. 这里的回调函数马上执行
  resolve(123); // 4. 调用4行内部resolve触发
});
pro.then(result => { // ? 此时还没有添加then函数, 上面就走完了
  console.log(result);
})
```
::: danger resolve比then先执行了
:::
> 所以resolve执行时, 数组里并没有then里的回调函数, 这里为了让resolve最后执行(利用setTimeout, 让resolve在主线程后执行, 确保then里的回调函数已经加入到数组中)
解决此问题, 下面只给出核心代码
``` js
function MyPromise(fn) {
  this.callBackFnArr = [];
  const resolve = (value) => {
    setTimeout(() => { // 6. 在这里改装, 确保在then调用后, 再执行这里
      this.callBackFnArr.forEach((v) => v(value));
    });
  };
  fn(resolve);
}
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/GRpapyM?editors=0011)
> 接下来模拟then的链式调用
::: tip 3. then的链式调用
:::
只贴出核心代码, 完整代码看下面链接
``` js
MyPromise.prototype.then = function (thenFn) { // 1. 这里改装
  return new MyPromise(resolve => { // 2. 你会发现, 好像就是把外面的拿进来了啊(对的)
    this.callBackFnArr.push(thenFn);
    resolve(456); // so 后面每个then都是由每个新的Promise进行管理
  })
};
let pro = new MyPromise((resolve) => {
  resolve(122);
});
pro.then(result => {
  console.log(result);
}).then(result2 => {
  console.log(result2); // 456
})
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/yLYWYQW?editors=0011)
> 但是如果在then里return 一个数据, 返回给下一个then怎么传参呢?
::: tip 4. then的自定义返回值
:::
只贴出核心代码, 完整代码看下面链接
``` js
MyPromise.prototype.then = function (thenFn) {
  return new MyPromise((reso) => {
    // 1. 这里用变量result接收then回调函数里return结果, 再决定reso()触发时, 传递给下一个then函数里的参数值
    // 但是调用thenFn, 触发then后回调函数, 得把上一个resolve()传入的参数传进去, 所以在push时封装一层函数, 接收参数, 再传给then里的回调函数
    this.callBackFnArr.push((rv) => {
      let result = thenFn(rv);
      reso(result); // 2. 把上一个then里return的结果, 传给下一个then里参数
    });
  });
};
let pro = new MyPromise((resolve) => {
  resolve(122);
});
pro
  .then((result) => {
    console.log(result);
  })
  .then((result2) => {
    console.log(result2);
    return 1000;
  })
  .then((result3) => {
    console.log(result3);
  });
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/ZEbNbwz?editors=0011)
> 那在then里的return 返回的是个自定义的Promise对象呢? (返回具体的值情况也需要考虑保留)
::: tip 5. then里返回自定义Promise (递归调用then)
:::
只贴出核心代码, 完整代码看下面链接
``` js
MyPromise.prototype.then = function (thenFn) {
  return new MyPromise((reso) => { // 这个return是给then方法的
    this.callBackFnArr.push((rv) => {
      // then后要执行的代码(在上一个resolve执行触发)
      let result = thenFn(rv); // 接收then里的return(实际接收的是上面return的那个Promise对象)
      if (result instanceof MyPromise) {  // 2. 这里判断
        result.then((rrr) => {
          reso(rrr); // 3. 这里自己实现then, 用外部then的Promise的reso, 把结果返回给外部的下一个then函数
        });
      } else {
        reso(result); // 如果不是Promise就正常调用下个then, 传参
      }
    });
  });
};
let pro = new MyPromise((resolve) => {
  resolve();
});
pro.then((result) => {
    return new MyPromise((re) => {
      re(10); // 1. 想return 给下个then的值
    });
}).then((result2) => {
    console.log(result2); // 10
    return 1000;
}).then((result3) => {
    console.log(result3); // 1000
});
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/ExVzVMP?editors=0011)
::: tip 6. Promise.resolve()
:::
只贴出核心代码, 完整代码看下面链接 <br>
此方法就是把值转成Promise对象返回
``` js
MyPromise.resolve = function (val) {
  if (val instanceof MyPromise) return val; // 如果传入的是Promise对象直接返回(根据规范, 不能递归传入自己)
  return new MyPromise((resolve) => resolve(val));
};
let pro = new MyPromise((resolve) => {
  resolve(122);
});
pro.then((result) => {
    console.log(result); // 122
    return new MyPromise((re) => re(10));
}).then((result2) => {
    console.log(result2); // 10
    return MyPromise.resolve(100);
}).then((result3) => {
    console.log(result3); // 100
});
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/ExVzVzK?editors=0011)

## Promise报错相关仿写
::: tip 1. reject方法定义+then的第二个参数增加
:::
reject调用, 一般会触发then里第二个参数执行, 这里先准备reject相关的源码, 下一个例子再更改then里相关
``` js
function MyPromise(fn) {
  this.resolveFnArr = [];
  this.rejectFnArr = []; // 1. 装载reject()调用要执行的函数
  this.status = "pendding"; // 2. 设置Promise状态(有pendding(准备), fullfilled(成功), rejected(失败), 为了后续调用then/catch等方法)
  this.value = null; // 3. 保存当前Promise的结果值(可能是成功/失败的)
  const resolve = (value) => {
    this.status = "fullfilled"; // 4. 调用resolve()代表成功状态
    this.value = value;
    setTimeout(() => {
      this.resolveFnArr.forEach((v) => v(value));
    });
  };
  const reject = (val) => {
    this.status = "rejected"; // 5. 调用reject() 代表失败状态
    this.value = val;
    setTimeout(() => {
      this.rejectFnArr.forEach((v) => v(val));
    });
  };
  fn(resolve, reject); // 6. 把resolve和reject方法传给newPromise里回调函数的参数等待去调用
}
MyPromise.prototype.then = function (thenFn, errFn) { // 参数2来了
    // 1. 保护判断, 根据规范, then里参数不是函数的则跳过忽略
  typeof thenFn !== "function" ? (thenFn = (value) => value) : null;
  typeof errFn !== "function" ? (errFn = (value) => value) : null;
  return new MyPromise((reso, rejec) => { // 2. 带上参数reject函数
    const fullfilledFn = (rv) => { // 3. 准备成功要执行的函数(一会儿要加到上面的数组中, 等resolve调用, 此函数才执行)
      let result = thenFn(rv);
      result instanceof MyPromise ? result.then((reso, rejec)) : reso(result);
    };
    const rejectedFn = (errValue) => { // 4. 准备失败要执行的函数, 等reject调用则执行此函数
      let errorResult = errFn(errValue); // 5. 这里调用参数2(外部的then里的参数2被执行)
      errorResult instanceof MyPromise
        ? errorResult.then((reso, rejec))
        : rejec(errorResult);
    };
    switch (this.status) { // 6. 判断当前Promise状态
      case "pendding": // 准备工作就把方法都加入到数组中
        this.resolveFnArr.push(fullfilledFn);
        this.rejectFnArr.push(rejectedFn);
        break;
      case "fullfilled": // 成功, 调用成功函数执行一次
        fullfilledFn(this.value);
        break;
      case "rejected": // 失败, 则调用失败函数执行一次(注意, 这里是正常调用, 而不是外部调用resolve/reject时触发的)
        rejectedFn(this.value);
        break;
    }
  });
};
let pro = new MyPromise((resolve, reject) => {
  reject(33333);
});
pro.then(res => console.log(res), err => console.error(err));
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/abvrvgZ?editors=0012)
::: tip 2. Promise.prototype.catch实现
:::
实际上, catch方法就是then方法的语法糖, 在catch内部还是调用一下then方法, 传入参数2即可 <br>
只贴出核心代码, 完整代码看下面链接
``` js
MyPromise.prototype.catch = function (errFn) {
  // 1. 添加catch方法, 其实就是调用下then函数执行
  return this.then(undefined, errFn);
};
let pro = new MyPromise((resolve, reject) => {
  reject(33333);
});
let a = pro
  .then((res) => console.log("成功" + res))
  .catch((err) => {
    console.error(err);
  });
``` 
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/OJyYMJo?editors=0011)
::: tip 3. Promise.reject() 类方法
:::
强制把值, 转换为Promise的错误对象 <br>
只贴出核心代码, 完整代码看下面链接
``` js
MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) => reject(val));
};
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/BaoejNG?editors=0011)
::: tip 4. Promise.prototype.finally()
:::
只贴出核心代码, 完整代码看下面链接
``` js
MyPromise.prototype.finally = function (callback) {
  return this.then(
    (value) => MyPromise.resolve(callback()).then(() => value), // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
    (reason) =>
      MyPromise.resolve(callback()).then(() => {
        throw reason;
      }) // reject同理
  );
};
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/gOaJPrd?editors=0011)
::: tip 5. Promise.all()
:::
把多个Promise合并成一个大的, 如果有一个报错, 直接接入catch <br>
只贴出核心代码, 完整代码看下面链接
``` js
MyPromise.all = function (promiseArr) {
  let index = 0;
  let result = [];
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach((p, i) => {
      //Promise.resolve(p)用于处理传入值不为Promise的情况
      MyPromise.resolve(p).then(
        (val) => {
          index++;
          result[i] = val;
          //所有then执行后, resolve结果
          if (index === promiseArr.length) {
            resolve(result);
          }
        },
        (err) => {
          //有一个Promise被reject时，MyPromise的状态变为reject
          reject(err);
        }
      );
    });
  });
};
```
[此步骤代码](https://codepen.io/lidongxuwork126com/pen/zYvQrKo?editors=0011)