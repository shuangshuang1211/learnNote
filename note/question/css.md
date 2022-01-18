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

- 元素的absolute或fixed 
  - absolute: 离最近的非static祖先元素;
  - relative: 相对自身原本位置;
  - fixed: 相对于浏览器视口固定;
  - sticky: 类似于static，当相对视口位置达到预设值时，按照fixed定位
- float 不为 none的元素
- html标签
- display flex table-flex

#### css中有哪些单位？

- 相对单位: em  % vh vw rem
  - em: 应用在font-size中按照父元素字体大小font-size来计算，应用在其他属性中是用自身字体大小的font-size来计算，若自身没有设置则用父元素的字体大小计算，再是浏览器默认的font-size
  - rem: 根元素字体大小
- 固定单位：px cm mm pt



1. 常用到的布局？flex布局的特点
    position
    flexbox
    float
    grid
    多列布局
  
2. 居中，浮动，

3. 三栏布局:左右定宽，中间撑满剩余宽度

4. 有哪些动画的实现机制
   js + setInterval \ CSS3 animation + @keyframes \ transition + transform \
   canvas(fillRect) + setInterval \ SVG和animation标签 \ 浏览器接(requestAnimationFrame)

5. 前端优化+缓存+渲染优化 (https://segmentfault.com/a/1190000022205291)

6. CSS 读取规则？ 从选择器的右边到左边依次读取

7. 设定样式 几种方式 (元素名、.class 、#id、伪类)
   li em => li元素的所有em后代元素；
   ul > li => ul直系后代元素第一层后代(初代子元素)
   li, ul => li和ul元素
   h1 + p => h1相邻的p
   a:hover => hover a时的样式（元素名: 伪类）
   article p:first-child => article后代第一个p元素
   article p::first-line => article后代p中第一行的元素
   p ~ span => p元素之后的span元素，p和span是兄弟关系
   a[href="https://example.com"]  标签属性选择器
   *  jss-nested： &表示选择根样式，$选择自定义的一个样式类名

8. CSS优先级？ 级联 类 > 元素  内联样式 > ID 选择器 > 类选择器\属性选择器\伪类 > 元素选择器

10. 伪元素和伪类的区别？有哪些？

     []: https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements	"伪类和伪元素"

11. link和@import的区别？加载顺序，一些加载设置等
        https://segmentfault.com/a/1190000015950516

12. 前面两个元素不知道宽度(可以换行显示)，最后一个元素占据剩余宽度？
      flex布局实现，父： flex， flex-wrap: wrap; 子(lastchild): flex-grow: 1
      file:///Users/test/learn/myGitHub/learnJS/note/question/jsLoadedOrder/page.html

13. 什么是盒模型？理解
      css在布局分配的空间时，一般把元素分为块元素和内联元素，
      阐明块元素和内联元素的区别，会根据 contentBox(width,height) + padding + border + margin

      box-sizing: border-box
