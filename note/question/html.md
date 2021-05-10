1. 什么是BFC？哪些元素会创建BFC？ 定位absolute(离最近的非static祖先元素) 和relative(相对自身原本位置)相对于那个元素定位？fixed: 相对于浏览器视口固定，sticky: 类似于static，当相对视口位置达到预设值时，按照fixed定位
2. 垂直居中，水平居中方法，四种？
  水平居中： *. {margin: 0 auto} *. 父元素 {display: flex; justify-content: center;}
  *. 子元素设置成inline-block行内元素，父元素设置：text-align: center
  *. 绝对定位法：{position: absolute; left: 50%; transform: translateX(-50%)}
  垂直居中： *.绝对定位： {position: absolute; top: 50%; translateY(-50%)}
  *. flex: 父元素{display: flex; height: 100vh; align-items: center}
  *.相对定位
3. 浏览器从读取网址到渲染页面流程？
4. 回流和重绘？浏览器渲染页面优化措施？
5. 三栏布局:左右定宽，中间撑满剩余宽度?
 * .father {
    display: 'flex';
    height: 100px;
  }
  .left {
    width: 100px;
    height: inherit;
  }
  .middle {
    flex-grow: 1; // 或 flex: 1; 这里要知道flex具体代表什么值
  }
  .right {
    width: 100px;
    height: inherit
  }
*. left 和 right 元素设置 {float: left / right} 但是元素节点要把middle放在最后
*. left right 元素设置 {position: absolute ; top: xxpx;} .left {left: xxpx} .right {right: xxpx}
   middle 设置 margin-left margin-right ,值分别为left right元素的宽度（如果middle有定宽元素缩小屏幕时则会重叠）
*.浮动 + 绝对定位 left 和 right 元素设置 {float: left / right} .middle {position : absolute; left: xxpx; right: xxpx;}

6. 什么是flex布局？
  flex弹性布局，一般分为主轴和交叉轴，主轴是排列方向，flex-direction 可以设置主轴方向，row， column；如果主轴排列不下，是否换行就考虑到 flex-wrap: wrap or noWrap;flex-flow是flex-direction和wrap的缩写；item项可以设置flex 值，给每个item设置剩余空间等分，flex是flex-grow(无单位比例值);flex-shrink: 溢出时需要去除多少溢出量以免溢出屏幕；flex-basis: 给每个item设置最小占比值（200px 等）;
7. <head> 下的字段，自适应设置那个？
8. **行内元素块元素的区别？**
   inline:
    盒子不会产生换行。
    width 和 height 属性将不起作用。
    垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
    水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。
  block:
    盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
    每个盒子都会换行
    width 和 height 属性可以发挥作用
    内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”
9. 为什么css可以放在头部，js放在尾部，如果css和js必须要在头部最好把js放在css前？