#### 什么是flex布局？

- flex弹性布局，一般分为主轴和交叉轴，主轴是排列方向
  - flex-direction： 可以设置主轴方向，row， column；
  - flex-wrap: wrap or noWrap(如果主轴排列不下，是否换行);
  - flex-flow: flex-direction和 flex-wrap的缩写；
  - flex: auto（1 1 auto） initial(0 1 auto) none(0 0 auto) <positive-numner>(number number 0)
      item项可以设置flex 值，给每个item设置剩余空间等分, flex是以下几项的简写
    - flex-grow(无单位比例值): 分配父元素剩余宽度，子元素总共为几就分成几份（子元素的宽度的总和超过父容器，flex-grow 将不生效）
    - flex-shrink: 溢出时需要去除多少溢出量以免溢出屏幕(总溢出量 / 子元素总份额 * shrink值，有在flex元素总和超出主轴才会生效)；
    - flex-basis: 给每个item设置主轴方向最小占比值（200px 等, 宽或高等，如果一个子元素同时设置了宽或高和basis值，则basis 权重高于设置的宽或高）

#### 什么是BFC？哪些元素会创建BFC？

- **什么是BFC？** 是独立的区域，且在区域内的布局不会受外部布局影响

- float 不为 none的元素

- 根元素html标签

- 绝对定位元素：元素设置为absolute或fixed 

  position值具体相对于那些元素定位：

  - absolute: 离最近的非static祖先元素;

  - relative: 相对自身原本位置;

  - fixed: 相对于浏览器视口固定;

  - sticky: 类似于static，当相对视口位置达到预设值时，按照fixed定位

- overflow计算值不为visible的块元素
- 网格元素grid、inline-grid
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content `或 paint 的元素
- 行内块元素(display: inline-block)、弹性元素(display： flex 、inline-flex)、表格单元格table-cell、表格标题table-caption
- 多列容器(元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) 不为 `auto，包括 `column-count` 为 `1)、
- display: flow-root
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table、``table-row`、 `table-row-group、``table-header-group、``table-footer-group`（分别是HTML table、row、tbody、thead、tfoot 的默认属性）或 `inline-table`）

#### css中有哪些单位？

- 相对单位: em  % vh vw rem ex
  - em: 应用在font-size中按照父元素字体大小font-size来计算，应用在其他属性中是用自身字体大小的font-size来计算，若自身没有设置则用父元素的字体大小计算，再是浏览器默认的font-size
  - rem: 根元素字体大小???dpi
- 固定单位：px cm mm pt

#### 一些元素(比如line-height、margin、font-size)百分比是相对哪一个的元素的百分比

- line-height:设置百分比 = 给定的百分比值乘以元素计算出的字体大小
- margin： 相对于[包含块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block)(大多数情况下，包含块是这个元素最近的祖先[块元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Block-level_elements)的[内容区](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model#content-area))的*宽度*，以百分比值为外边距
  - 要计算 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) [`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top) 及 [`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom) 中的百分值，是通过包含块的 `height` 的值。如果包含块的 `height` 值会根据它的内容变化，而且包含块的 `position` 属性的值被赋予 `relative` 或 `static` ，那么，这些值的计算值为 auto。
  - 要计算 [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width), [`left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left), [`right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right), [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding), [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin) 这些属性由包含块的 `width` 属性的值来计算它的百分值。
- font-size: 父元素字体大小的正数[百分比](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage)

#### 实现三角形

用伪元素实现，width height为0，border值

clip

#### css一些属性的性能优化

- contain
  - 允许开发者声明当前元素和它的内容尽可能的独立于 DOM 树的其他部分
  - 主要目的是隔离指定内容的样式、布局和渲染
  - 跟 iframe 很相似，它能建立起一个边界，产生一个新的根布局
  - 保证了它和它的子元素的 DOM 变化不会触发父元素重新布局、渲染等
- transform和transform3d
- content-visibility: auto
  - 告诉浏览器暂时跳过该元素的布局和渲染工作，直到这个元素滚动到当前视口，从而可以加快整个页面的初始渲染，并且缩短用户和页面可交互需要花费的时间
- will-change
  - 分层绘制在合成阶段改变
- 用css能实现的动画尽量用css

#### 常用到的布局

- 双飞燕升杯布局：见code/layout.html 
-  grid布局
- position
- flexbox
- float
- 多列布局

#### CSS动画的实现机制

- js + setInterval 
- CSS3 animation + @keyframes 
- transition + transform
- canvas(fillRect) + setInterval
- SVG和animation标签
- 浏览器接(requestAnimationFrame)

#### 什么是盒模型

- 在布局时为每个元素分配的区域
- 块元素和内联元素（[区别](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)）
- 标准盒模型：width+padding*2+ border * 2（margin不计入盒模型的大小）
- 替代盒模型：

#### 常见css实现code：

- 三栏布局:左右定宽，中间撑满剩余宽度
- 前面两个元素不知道宽度(可以换行显示)，最后一个元素占据剩余宽度？
  -  ./jsLoadedOrder/page.html
  - flex布局实现，父： flex， flex-wrap: wrap; 子(lastchild): flex-grow: 1

#### CSS资源加载

- style 内嵌样式，GUI线程执行同步渲染行为

- link 外链样式，异步操作

  1. 开启 HTTP 网络请求线程

  2. 异步操作不会等到资源完全获取，GUI 线程会继续向下渲染 
  3. GUI 线程将同步操作执行完成之后再处理基于 HTTP 网络请求回来的资源

- @import 导入样式（同步操作）
  1. 和 link 相同点是它也会开启 HTTP请求去下载资源 
  2. 和 link 不同点是它会阻塞 GUI 线程渲染，在资源回来之前渲染不会继续

#### 伪元素和伪类的区别？有哪些？



#### CSS优先级

级联 类 > 元素  内联样式 > ID 选择器 > 类选择器\属性选择器\伪类 > 元素选择器

#### css选择器

- **li em** ： li元素的所有em后代元素
- **ul > li** ： ul直系后代元素第一层后代(初代子元素)
- **li, ul** ： li和ul元素
- **h1 + p** ： h1相邻的p
- **a:hover** ： hover a时的样式（元素名: 伪类）
- **article p:first-child** ： article后代第一个p元素
- **article p::first-line** ： article后代p中第一行的元素
- **p ~ span** ： p元素之后的span元素，p和span是兄弟关系
- a[href="https://example.com"]  标签属性选择器
- jss-nested： &表示选择根样式，$选择自定义的一个样式类名
- CSS 读取规则？ 从选择器的右边到左边依次读取

新趋势css：shape-outside（定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装）
