1. 常用到的布局？flex布局的特点
  position
  flexbox
  float
  grid
  多列布局
2. 居中，浮动，
3. 三栏布局:左右定宽，中间撑满剩余宽度
4. 有哪些动画的实现机制
5. 前端优化+缓存+渲染优化
6. CSS 读取规则？
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
8. CSS优先级？ 级联 类 > 元素  内联样式 > ID 选择器 > 类选择器\属性选择器\伪类 > 元素选择器
9. 单位 em: 应用在font-size中是父元素字体大小，应用在其他属性中是自身字体大小