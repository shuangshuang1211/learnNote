function getComment(){
  var div=document.getElementById("fisrtDiv");
  var comment=div.firstChild;//注释在div中属于他的一个子node；
  var commentData=comment.data;
  return commentData;
  console.log(commentData);
}

function addItem(){
  var fragment=document.createDocumentFragment();//创建一个fragment
  var ul=document.getElementById("firstlist");//获取ul
  var li=null;
  for (var i=0;i<4;i++){
    li=document.createElement("li");//创建一个li元素
    li.appendChild(document.createTextNode("选项"+(i+1)));//为li元素append一个文本节点
    fragment.appendChild(li);//把li加入fragment
  }
  ul.appendChild(fragment);//把fragment加入ul元素中；
}

function addWrite(){
  var time=new Date();
  document.write("<strong>"+time.toString()+"</strong>");//会覆盖整个页面；

}

function addScript(){
  var script=document.createElement("script");
  script.type="text/javascript";
  script.text="function SayHi(){console.log('hello world!');}";
  document.body.appendChild(script);
  SayHi();//调用say函数，才能执行此段script
}
function addCss(css){
  var style=document.createElement("style");
  style.type="text/css";
  try{
    style.appendChild(document.createTextNode(css));
  }catch(ex){
    style.styleSheet.cssText = css;//考虑到IE的兼容，没有子节点；
  }
  var head=document.getElementsByTagName("head")[0];//获取第一head标签,注意是get Elements
  head.appendChild(style);//把stlyle标签加进head的子节点；这里成功创建一 个css标签；

}
function addStyle(){
  addCss("p{background-color:green}");
}
