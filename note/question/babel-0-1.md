### Babel 是什么？

  Babel 是 JavaScript 编译器，更确切地说是源码到源码的编译器。 意思是说你为 Babel 提供一些 JavaScript 代码，Babel 更改这些代码，然后返回给你新生成的代码。

### 实现Babel的几大步骤 & 涉及的重要概念

`解析`（parse），`转换`（transform），`生成`（generate）

### `抽象语法树`（ASTs）

贯穿Babel整个处理过程，每一步都涉及到创建或是操作抽象语法树，亦称 AST。

```
- FunctionDeclaration:
  - id:
    - Identifier:
      - name: square
  - params [1]
    - Identifier
      - name: n
  - body:
    - BlockStatement
      - body [1]
        - ReturnStatement
          - argument
            - BinaryExpression
              - operator: *
              - left
                - Identifier
                  - name: n
              - right
                - Identifier
                  - name: n
```


### 解析

解析步骤接收代码并输出 AST。 这个步骤分为两个阶段：**词法分析（Lexical Analysis） **和 语法分析（Syntactic Analysis）。.

#### 词法分析
词法分析阶段把字符串形式的代码转换为 令牌（tokens） 流。.

#### 语法分析
语法分析阶段会把一个令牌流转换成 AST 的形式。 这个阶段会使用令牌中的信息把它们转换成一个 AST 的表述结构，这样更易于后续的操作。

### 转换
转换步骤接收 AST 并对其进行遍历，在此过程中对节点进行添加、更新及移除等操作。 这是 Babel 或是其他编译器中最复杂的过程 同时也是插件将要介入工作的部分，这将是本手册的主要内容， 因此让我们慢慢来。

### 生成
代码生成步骤把最终（经过一系列转换之后）的 AST转换成字符串形式的代码，同时创建源码映射（source maps）。.

代码生成其实很简单：深度优先遍历整个 AST，然后构建可以表示转换后代码的字符串。

### 遍历
想要转换 AST 你需要进行递归的树形遍历。

比方说我们有一个 FunctionDeclaration 类型。它有几个属性：id，params，和 body，每一个都有一些内嵌节点。

{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  params: [{
    type: "Identifier",
    name: "n"
  }],
  body: {
    type: "BlockStatement",
    body: [{
      type: "ReturnStatement",
      argument: {
        type: "BinaryExpression",
        operator: "*",
        left: {
          type: "Identifier",
          name: "n"
        },
        right: {
          type: "Identifier",
          name: "n"
        }
      }
    }]
  }
}
于是我们从 FunctionDeclaration 开始并且我们知道它的内部属性（即：id，params，body），所以我们依次访问每一个属性及它们的子节点。

接着我们来到 id，它是一个 Identifier。Identifier 没有任何子节点属性，所以我们继续。

之后是 params，由于它是一个数组节点所以我们访问其中的每一个，它们都是 Identifier 类型的单一节点，然后我们继续。

此时我们来到了 body，这是一个 BlockStatement 并且也有一个 body节点，而且也是一个数组节点，我们继续访问其中的每一个。

这里唯一的一个属性是 ReturnStatement 节点，它有一个 argument，我们访问 argument 就找到了 BinaryExpression。.

BinaryExpression 有一个 operator，一个 left，和一个 right。 Operator 不是一个节点，它只是一个值因此我们不用继续向内遍历，我们只需要访问 left 和 right。.

Babel 的转换步骤全都是这样的遍历过程。

### Visitors（访问者）
当我们谈及“进入”一个节点，实际上是说我们在访问它们， 之所以使用这样的术语是因为有一个访问者模式（visitor）的概念。.

访问者是一个用于 AST 遍历的跨语言的模式。 简单的说它们就是一个对象，定义了用于在一个树状结构中获取具体节点的方法。 这么说有些抽象所以让我们来看一个例子。

```
const MyVisitor = {
  Identifier() {
    console.log("Called!");
  }
};
```

这是一个简单的访问者，把它用于遍历中时，每当在树中遇见一个 Identifier 的时候会调用 Identifier() 方法。

所以在下面的代码中 Identifier() 方法会被调用四次（包括 square 在内，总共有四个 Identifier）。).

```
function square(n) {
  return n * n;
}
Called!
Called!
Called!
Called!
```
这些调用都发生在进入节点时，不过有时候我们也可以在退出时调用访问者方法。.



### Paths（路径）
AST 通常会有许多节点，那么节点直接如何相互关联？ 我们可以用一个巨大的可变对象让你来操作以及完全访问（节点的关系），或者我们可以用**Paths（路径）**来简化这件事情。.

Path 是一个对象，它表示两个节点之间的连接。

举例来说如果我们有以下的节点和它的子节点：

{
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: "square"
  },
  ...
}

将子节点 Identifier 表示为路径的话，看起来是这样的：

{
  "parent": {
    "type": "FunctionDeclaration",
    "id": {...},
    ....
  },
  "node": {
    "type": "Identifier",
    "name": "square"
  }
}
同时它还有关于该路径的附加元数据：

{
  "parent": {...},
  "node": {...},
  "hub": {...},
  "contexts": [],
  "data": {},
  "shouldSkip": false,
  "shouldStop": false,
  "removed": false,
  "state": null,
  "opts": null,
  "skipKeys": null,
  "parentPath": null,
  "context": null,
  "container": null,
  "listKey": null,
  "inList": false,
  "parentKey": null,
  "key": null,
  "scope": null,
  "type": null,
  "typeAnnotation": null
}
当然还有成堆的方法，它们和添加、更新、移动和删除节点有关。

可以这么说，路径是对于节点在数中的位置以及其他各种信息的响应式表述。 当你调用一个方法更改了树的时候，这些信息也会更新。 Babel 帮你管理着这一切从而让你能更轻松的操作节点并且尽量保证无状态化。（译注：意即尽可能少的让你来维护状态）

### Paths in Visitors（存在于访问者中的路径）
当你有一个拥有 Identifier() 方法的访问者时，你实际上是在访问路径而不是节点。 如此一来你可以操作节点的响应式表述（译注：即路径）而不是节点本身。

const MyVisitor = {
  Identifier(path) {
    console.log("Visiting: " + path.node.name);
  }
};
a + b + c;
Visiting: a
Visiting: b
Visiting: c


### State（状态）

状态是 AST 转换的敌人。状态会不停的找你麻烦，你对状态的预估到最后几乎总是错的，因为你无法预先考虑到所有的语法。

中心： 把一个访问者放进另外一个访问者里面

### Scopes（作用域）

接下来让我们引入作用域（scope）的概念。 JavaScript 拥有词法作用域，代码块创建新的作用域并形成一个树状结构。

// global scope

function scopeOne() {
  // scope 1

  function scopeTwo() {
    // scope 2
  }
}
在 JavaScript 中，每当你创建了一个引用，不管是通过变量（variable）、函数（function）、类型（class）、参数（params）、模块导入（import）、标签（label）等等，它都属于当前作用域。

var global = "I am in the global scope";

function scopeOne() {
  var one = "I am in the scope created by `scopeOne()`";

  function scopeTwo() {
    var two = "I am in the scope created by `scopeTwo()`";
  }
}
处于深层作用域代码可以使用高（外）层作用域的引用。

function scopeOne() {
  var one = "I am in the scope created by `scopeOne()`";

  function scopeTwo() {
    one = "I am updating the reference in `scopeOne` inside `scopeTwo`";
  }
}
低（内）层作用域也可以创建（和外层）同名的引用而无须更改它。

function scopeOne() {
  var one = "I am in the scope created by `scopeOne()`";

  function scopeTwo() {
    var one = "I am creating a new `one` but leaving reference in `scopeOne()` alone.";
  }
}
当编写一个转换器时，我们须要小心作用域。我们得确保在改变代码的各个部分时不会破坏它。

我们会想要添加新的引用并且保证它们不会和已经存在的引用冲突。 又或者我们只是想要找出变量在哪里被引用的。 我们需要能在给定作用域内跟踪这些引用。

作用域可以表述为：

{
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
}
当你创建一个新的作用域时需要给它一个路径及父级作用域。之后在遍历过程中它会在改作用于内收集所有的引用（“绑定”）。


### Bindings（绑定）
引用从属于特定的作用域；这种关系被称作：绑定（binding）。.

function scopeOnce() {
  var ref = "This is a binding";

  ref; // This is a reference to a binding

  function scopeTwo() {
    ref; // This is a reference to a binding from a lower scope
  }
}
一个绑定看起来如下：

{
  identifier: node,
  scope: scope,
  path: path,
  kind: 'var',

  referenced: true,
  references: 3,
  referencePaths: [path, path, path],

  constant: false,
  constantViolations: [path]
}
有了这些信息你就可以查找一个绑定的所有引用，并且知道绑定的类型是什么（参数，定义等等），寻找到它所属的作用域，或者得到它的标识符的拷贝。 你甚至可以知道它是否是一个常量，并查看是哪个路径让它不是一个常量。

知道绑定是否为常量在很多情况下都会很有用，最大的用处就是代码压缩。

function scopeOne() {
  var ref1 = "This is a constant binding";

  becauseNothingEverChangesTheValueOf(ref1);

  function scopeTwo() {
    var ref2 = "This is *not* a constant binding";
    ref2 = "Because this changes the value";
  }
}