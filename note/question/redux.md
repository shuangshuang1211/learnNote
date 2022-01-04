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

