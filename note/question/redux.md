# Redux

### 简易Redux实现

```js
// createStore(reducer, preloadState, enhancer)
// 返回store，具有getState(), dispatch, subscribe属性

funnction isPlainObject (obj) {
  if (typeof obj === 'object') {
    let currObjProto = obj
    while (Object.getPrototypeOf(currObjProto) !== null) {
      currObjProto = Object.getPrototypeOf(currObjProto)
    }
    return currObjProto === Object.getPrototypeOf(obj);
  }
  return false
}

// middleware 
function applyMiddleWare (...middleWares) {
  // middleWare的格式: ({getState, dispatch}) => next => action => {}
  // next 表示下一个中间件调用dispatch后的返回
  return (createStore) => (reducer, preloadState) => {
    const store = createStore(reducer, preloadState)
    const middleWareApi = {
      getState: store.getState,
      dispatch: store.dispatch
    }
    const chains = middleWares.map((ware) => ware(middleWraeApi))
    // 从后向前调用
    const dispatch = compose(...chains)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
function compose () {
  return (dispatch) => {
    const chains = [...arguments];
    for (let i = chains.length; i >= 0; i--) {
      dispatch = chains[i](dispacth)
    }
    return dispatch;
  }
}

function createStore (reducer, preloadState, enhancer) {
  // reducer 必须是函数
  if (typeof reducer !== 'function') throw new Error('xx')
  // enhancer 必须是 (createStore) => (reducer, preloadState) => 
  if (enhancer) {
    if (typeof enhancer !== 'function') throw new Error('xx')
    return enhancer(createStore)(reducer, preloadState)
  }
  
  let currentState = preloadState;
  let subcribeList = [];
  function getState () {
    return currentState;
  }
  function dispatch (action) {
    // 判断action是不是对象
    if (!isPlainObject)  throw new Error('')
    // action 必须有type属性
    if (typeof action.type === 'undefined')  throw new Error('')
    currentState = reducer(currentState, action);
    subscribeList.forEach((listener) => {
      listener()
    });
  }
  // 收集订阅的依赖，状态改变更新页面
  function subscribe(listener) {
    subcribeList.push(listener)
  }
  // 默认调用一次 dispatch
  dispatch({type: 'initAction'});
  return {
    getState,
    dispatch,
    subscribe
  }
}

fucntion combineReducers (reducers) {
  // 每个reducer必须是函数
  const reducersKeys = Object.keys(reducers);
  reducersKeys.forEach((reducerKey) => {
    if (typeof reducer[reducerKey] !== 'function') throw new Error('')
  })
  // 遍历reducer，取到每个reducer的子state
  
  
  const rootReducer = (state, action) => {
    const combineState = {};
  	reducersKeys.forEach((reducerKey) => {
      combineState[reducerKey] = reducers[reducerKey](state[reducerKey], action)
    })
    return combineState
  }
  return rootReducer
}

```

#### redux-thunk 与redux-saga的差异？为什么用saga？

- 处理异步任务的时机不一样，对于thunk，相当于等异步任务执行完之后再调用dispatch，去store调用reducers，saga的流程则是dispatch一个action，如果这个action没在reducers里处理，会用takeEvery监听这个action，调用设置的处理函数，等待异步处理结果，结果返回之后再重新用put发起action改变state，所以saga相当于再redux的基础上，重新开启了单独的async action 的分支；
- saga有自己的专门的事件监听机制，相比thunk，Saga流程控制都有对应的[api](https://link.juejin.cn/?target=https%3A%2F%2Fredux-saga.js.org%2Fdocs%2Fapi%2F),这些api保证了更简便的流程控制和易于测试等好处(不用再调用promise.then等进行后续处理)，而且有一些现成的take（takeEvery takeLast）等函数封装，可以自动取消一些发起的action
- ~~**对于redux-thunk的整个流程来说，它是等异步任务执行完成之后，我们再去调用dispatch，然后去store去调用reduces**~~

