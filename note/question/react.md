# React



1. React的优势是什么？

     React是一个js库,  一切皆是组件，声明式范式可以轻松描述应用，让业务逻辑与DOM操作进行很好的分离

     为什么选择JSX？模板分散了技术栈和关注点，模板也引入了其他的概念(模板的语法)

## VirtualDOM 和 Diff 算法

- virtualDom(babel只是把jsx转成React.createElement的调用,虚拟DOM是createElement的返回值)是真实DOM的一个副本，是描述真实DOM的js对象，包含type：html标签名，props： 元素的属性，children： 元素的子元素等

- diff：在 React 第一次创建 DOM 对象后，会为每个 DOM 对象创建其对应的 Virtual DOM 对象，在 DOM 对象发生更新之前，React 会先更新所有的 Virtual DOM 对象，然后 React 会将更新后的 Virtual DOM 和 更新前的 Virtual DOM 进行比较，从而找出发生变化的部分，React 会将发生变化的部分更新到真实的 DOM 对象中，React 仅更新必要更新的部分。

  Virtual DOM 对象的更新和比较仅发生在内存中，不会在视图中渲染任何内容，所以这一部分的性能损耗成本是微不足道的。

  - 判断virtualDOM类型是否相同，相同再判断是否是元素节点，是元素节点就判断属性是否变化，如果是文本节点则看文本节点内容发生变化；再循环未更新前的 Virtual DOM 对象，通过对比看看新的 Virtual DOM 中是否有被删除的属性，如果存在删除的属性 需要将 DOM 对象中对应的属性也删除掉
  - 为减少更新对比开销，会为同级节点增加key属性，在类型相同时，循环旧的VirtualDom的key并保存key与真实DOM，然后通过遍历新的vDom拿到key去旧的map，如果有，说明元素已经存在，不需要重新创建，
  - 当虚拟DOM类型不同时(且不是组件时)，直接使用新的virtualDOM创建DOM对象，用新的DOM替换旧的，是同一个组件则调用相应的生命周期函数并传入新的props得到新的vdom，对比
  - 继续对子节点进行递归


##  React 中初始渲染的流程

- 执行React.render, 清除根节点下的所有子元素, 创建 ReactRoot,开始创建FiberRoot
- enqueueUpdate 将当前更新压入队列，后执行scheduleUpdateOnFiber
- workLoop, 循环更新，没更新一个Fiber节点就判断下是否有更优先级的任务要执行
- 执行performUnitOfWork，beginWork,开始为节点构建stateNode(真实DOM),构建Fiber树，深度优先遍历，构建当前Fiber节点的子级FIber，确立子级fiber的同级fiber关系(sibling: 下一个兄弟节点,return： workInProgress),第一个子节点是workInProggress节点的子级。当前节点有子级返回子级重复上述步骤，当workInProgress没有子节点，开始构建的向上阶段，并开始构建Fiber链表。当前workInprogress存在(while)，则执行compeleteUnitofWork构建Fiber链表，用当前Fiber的父Fiber保存firstEffect和lastEffect，当前Fiber的first和last先赋给父Fiber，有EffectTag则进行链表lastEffect.nextEffect的赋值，并把父FIber的lastEffect指向当前Fiber，执行完成后，有同级则返回同级执行performUnitOfWork，没有同级workInProgress 则指向父级，找父级的同级执行completeUnitOfWork
- 以上整个过程完成，则进行commitRoot阶段，这个阶段不能中断，遍历Fiber链表，从firstFiber开始挂载DOm
  - 第一次遍历 effects list（commitBeforeMutationEffects）：在更改前读取 DOM 上的 state，这里是 getSnapshotBeforeUpdate [生命周期](https://www.zhihu.com/search?q=生命周期&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A103506207})调用的地方；
  - 第二次遍历 effects list（commitMutationEffects）：此阶段是真正更改 DOM 的阶段；
  - 第三次遍历 effects list（commitLayoutEffects）：执行[生命周期函数](https://www.zhihu.com/search?q=生命周期函数&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A103506207}) componentDidMount（首次渲染）、componentDidUpdate(更新阶段).

1. 函数组件和类组件的区别？
2. 组件间的数据传递？
3. 组件优化？
4. key 的作用？key为什么最好不要用index？
5. 受控组件？非受控组件
6. useCallback 与 useMemo 有什么不一样？useEffect传入[]的时候为什么只执行一次？
7. React性能优化？ React.lazy原理
     懒加载？ https://juejin.cn/post/6844904191853494280
8. React Router 的实现原理?
9. React 事件委托
10. 怎么实现一个自定义hook？

------

## Fiber

#### 什么是Fiber?

- Fiber 是一个执行单元

  在 React 15 中，将 VirtualDOM 树整体看成一个任务进行递归处理，任务整体庞大执行耗时且不能中断。

  在 React 16 中，将整个任务拆分成了一个一个小的任务进行处理，每一个小的任务指的就是一个 Fiber 节点的构建。

  任务会在浏览器的空闲时间被执行，每个单元执行完成后，React 都会检查是否还有空余时间，如果有就交还主线程的控制权。

- Fiber 是一种数据结构

  支撑 Fiber 构建任务的运转,通过链表找到找到下一个要执行的单元，Fiber中第一个子节点是child，return表示父节点，sibling表示下一个兄弟节点

  ```tsx
    {
      type         节点类型 (元素, 文本, 组件)(具体的类型)
      props        节点属性
      stateNode    节点 DOM 对象 | 组件实例对象 | rootFiber 是整个FiberRoot数据
      tag          节点标记 (对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent)
      effects      数组, 存储需要更改的 fiber 对象
      effectTag    当前 Fiber 要被执行的操作 (新增, 删除, 修改)
      parent       当前 Fiber 的父级 Fiber
      child        当前 Fiber 的子级 Fiber
      sibling      当前 Fiber 的下一个兄弟 Fiber
      alternate    Fiber 备份 fiber 比对时使用
    }
  ```

#### Fiber工作方式？

- render阶段：构建 Fiber 对象，构建链表，在链表中标记要执行的 DOM 操作 ，可中断。
  - 深度遍历优先，从上向下走，构建节点对应的 Fiber 对象，然后再从下向上走，构建 Fiber 对象及链表。

- commit：根据构建好的链表进行 DOM 操作，不可中断(分为三个子阶段)
  - 第一个子阶段：循环Fiber effect链，执行commitBeforeMutationEffects (类： getSnapshotBeforeUpdate，函数组件调用useEffect)，返回值用于componentDidUpdate的地三个参数
  - 第二个子阶段：commitMutationEffects，插入节点commitPlacement(找到父级原生DOM插入)，更新节点commitWork(updatePayload对属性进行处理，针对HostComponent和HostText处理)，删除节点commitDeletion(非原生节点需要遍历子树，调用componentWillUnmount)，循环整个Fiber链表(firstEffet => nextEffect =>  ... => nextEffect = null, firstEffect)，根据EffectTag (Placement、Update、PlacementAndUpdate等)执行上述的DOm操作
  - 第三个子阶段： 循环nextEffect，commitLayoutEffects，如果类组件或函数组件有对应的生命周期函数或钩子函数
    - 类组件： 获取组件实例，首次渲染执行componentDidMount，更新阶段就会获取旧的props和state执行componentDidUpdate，如果有任务队列执行任务队列函数
    - 函数组件：获取updateQueue，依次执行函数组件中的副作用effect

  > [参考1_知乎](https://zhuanlan.zhihu.com/p/103506207)
  
- workInProgress Fiber 树存在的意义：

  - react采用双缓存机制，来完成Fiber树的构建和替换，实现DOM的快速更新；

    其中当前显示的是currentFiber ， 需要更新时，再重新产生一个新的Fiber树，这里的Fiber就是workInProgress Fiber ，新的Fiber构建完成会进行替换，他们身上有一个alternate属性互相指向对方；

  - workInProgress 的构建过程是在内存中完成的，所以构建过程非常快，从而达到页面的快速更新
  - Fiber中每一个节点就是一个渲染任务，从而将整个页面拆分成更小的执行任务单元，从而在每次执行前可以检查是否执行其他高优先级的任务

```react
// 获取最外层container
const container = document.getElementById('root');
// 构建最外层rootFiber
const rootWorkInProgress = {
  stateNode: container,
  props: {
    children: [...] // React.CreateElement('typeName', {}, ...children)
  }
}

// 空闲时间执行Fiber对象的构建
requestIdleCallback(workLoop);


let nextUnitOfWork = rootWorkInProgress;

function workLoop (deadline) {
  // 构建Fiber，深度遍历优先
  while (nextUnitOfWork && deadline.timeRemaing() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // nextUnitOfWork 为null的时候则构建Fiber完成，进行Dom操作，即提交阶段
  if (!nextUnitOfWork) {
    commitRoot()
  }
}

function performUnitOfWork(workInProgress) {
  // 创建当前Fiber节点的DOM对象并保存在stateNode中
  // 构建子级Fiber对象
  // 构建向下阶段
  beginWork(workInProgress)
  if (workInProgress.child) {
    return workInProgress.child
  }

  // 构建向上阶段
  while (workInProgress) {
    // 构建Fiber链表
    commpleteUnitOfWork(workInProgress);

    // 有同级返回同级，没有同级则退回到父级，找父级的同级，...
    if (workInProgress.sibling) {
      return workInProgress.sibling;
    }
    workInProgress = workInProgress.return
}

function beginWork(workInProgress) {
  // 当前Fiber没有statNode则创建DOm节点
  if (!workInProgress.stateNode) {
    workInProgress.stateNode = document.createElement(workInProgress.type);
    for (let attr of props) {
      if (attr !== 'children') {
        workInProgress.stateNode[attr] = props[attr]
      }
    }
  }
  // 构建子级Fiber
  const workInProgressChildren = workInProgress.props.children
  if (Array.isArray(workInProgressChildren)) {
    let prevFiber = null;
    workInProgressChildren.forEach((child, index) => {
      const currChildFiber = {
        type: child.type,
        props: child.props,
        effectTag: 'PLACEMENT',
        return: workInProgress, // 当前子级的父级
      }
      if (index === 0) { // 第一个子是父的子
        workInProgress.child = currChildFiber;
      } else {
        prevFiber.sibling = currChildFiber;
      }
      prevFiber = currChildFiber;
    })
  }
}

function commpleteUnitOfWork(workInProgress) {
  // 开始创建Fiber链表
  let workParentFiber = workInProgress.return;
  if (workParentFiber) {
    // 链头上移
    if (!workParentFiber.firstEffect) {
      workParentFiber.firstEffect = workInProgress.firstEffect;
    }
    // lastEffect上移
    if (!workParentFiber.lastEffect) {
      workParentFiber.lastEffect = workInProgress.lastEffect;
    }

    // 构建链表
    if (workInProgress.effectTag) {
      if (workParentFiber.lastEffect) {
        workParentFiber.lastEffect.nextEffect = workInProgress;
      } else {
        // 第一次操作，即Fiber是在最左下的节点(c1)才执行这里
        workParentFiber.firstEffect = workInProgress;
      }
      workParentFiber.lastEffect = workInProgress;
    }
  }

}

function commitRoot() {
  // Fiber的工作的第二阶段，执行真实DOM操作
  let currFiberNode = rootWorkInProgress.firstEffect;
  while (currFiberNode) {
    currFiberNode.return.stateNode.appendChild(currFiberNode.stateNode)
    currFiberNode = currFiberNode.nextEffect
  }
}
```

#### React Suspense

- 是一种在等待组件渲染前进行其他操作的同时渲染预先准备的内容的机制
- Suspense的child必须是一个promise，需要promise的状态来触发suspense
- 一般使用结合lazyload
- 自己实现的话要对子组件实现专门的wrapped处理，保证不会重复加载

#### React setState同步异步？

- 进入了 `react` 的调度流程，那就是异步的。没有进入 `react` 的调度流程，那就是同步的。`setTimeout` `setInterval` ，直接在 `DOM` 上绑定原生事件等都不会走React的调度流程，就是同步，其他的都是异步

  `调用 `setState` 其实是异步的 —— 不要指望在调用 `setState` 之后，`this.state` 会立即映射为新的值`

  `事件处理函数内部的setState是异步的，如果 Parent 和 Child 在同一个 click 事件中都调用了 setState ，这样就可以确保 Child 不会被重新渲染两次`

- scheduleUpdateOnFiber
