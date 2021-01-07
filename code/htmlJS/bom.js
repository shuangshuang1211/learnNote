function windowPosition(){
// window对象的位置获取；
var leftPos = (typeof window.screenLeft == "number") ? //学习二元操作符使用
                  window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ?
                  window.screenTop : window.screenY;
var Pos=[];
Pos=Pos.push(leftPos,topPos);
return (Pos);
}

function windowpopUp(){
  //window对象阻止弹窗功能；try {}catch（er）{}语法
  var blocked = false;
  try {
      var wroxWin = window.open("http://www.baidu.com", "_blank");
       if (wroxWin == null){
              blocked = true;
              }
             }
  catch (ex){
        blocked = true;
      }

  if (blocked){
     alert("The popup was blocked!");  //此弹窗被阻止弹出
   }
}

function windowOpen(){
  function openNewWindow(){
    //window.open的用法，传入三个参数
            var win = window.open('http://www.baidu.com/', 'baiduWindow', 'width=300,height=300,left=10,top=10');
            win.resizeTo(500,500);
            win.moveTo(100,100);
        }

        window.open("http://www.baidu.com/");
}

function setTime(){
  //用超时调用替代间歇调用
  var num = 0;
        var max = 100;

        function incrementNumber() {
            num++;

            //延迟100次，没达到此数字继续延迟；
            if (num < max) {
                setTimeout(incrementNumber, 500);
            } else {
                alert("Done");
            }
        }

        setTimeout(incrementNumber, 500);
}

function lookArg(){


            //确定初始字符串
            var qs = (location.search.length > 0 ? location.search.substring(1) : ""),

                //新建一个对象来保存参数
                args = {},

                //用&分割字符串
                items = qs.length ? qs.split("&") : [],
                item = null,
                name = null,
                value = null,

                //初始循环
                i = 0,
                len = items.length;

            //给每个键值对赋值
            for (i=0; i < len; i++){
                item = items[i].split("=");
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);

                if (name.length){
                    args[name] = value;
                }
            }

            return args;
        }
