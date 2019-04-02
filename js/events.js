var EventUtil = {       
        addHandler: function(element, type, handler){         
            if (element.addEventListener){             
                element.addEventListener(type, handler, false);         
            } 
            else if (element.attachEvent){            
                 element.attachEvent("on" + type, handler);         
             } 
             else {             
                element["on" + type] = handler;         
            }     
        },
        getEvent:function(event){
            return event ?event: window.event;
        },
        preventDefault:function(event){
            if(event.preventDefault){
                event.preventDefault();
            }
            else {
                event.returnValue = false;
            }
        },     
        removeHandler: function(element, type, handler){         
            if (element.removeEventListener){             
                element.removeEventListener(type, handler, false);         
            } 
            else if (element.detachEvent){             
                element.detachEvent("on" + type, handler);         
            } 
            else {             
                element["on" + type] = null;         
            }     
        } 
 };

function addEvents() {
    var btn = document.getElementById("dianji2");
    var hander = function(){
        document.getElementById("text2").value = this.id;
    }; 
  btn.onclick = hander;
 /*     btn.addEventListener("click",function(){console.log(this.id);},false);
    btn.addEventListener("click",function(){console.log("hello")},false);
 //   btn.addEventListener("click",hander,false);
//    btn.removeEventListener("click",funciton(){console.log(this.id);},false);   //不能删除addEventlistenet添加的this.id事件；
//    btn.removeEventListener("click",hander,false);  //删除hander事件处理程序；
    btn.onclick=function(){
        alert(event.currentTarget === this); //事件处理程序与当前事件处理程序作用点是同一个元素；
        alert(event.target === this);       //目标事件就是作用的元素; 
    };   
    var hander=function(event){
        if(event.type=="click"){
            document.getElementById("text2").value = this.id;
        }
        if(event.type == "mouseover"){
            event.target.style.backgroundColor="red";
        }
        if(event.type == "mouseout"){
            event.target.style.backgroundColor="";
        }
    };
    btn.onclick = hander; // hander函数处理多个事件；此时处理onclick
    btn.onmouseover=hander; //hander此时处理鼠标
    btn.onmouseout = hander;
*/
    var isSuppport1 = document.implementation.hasFeature("HTMLEvents","2.0");
    var isSuppport2 = document.implementation.hasFeature("UIEvent","3.0");
    console.log(isSuppport1);
    console.log(isSuppport2);
    eventOclick = EventUtil.getEvent(event);
    console.log(eventOclick.clientX);
    console.log(eventOclick.clientY);
    console.log(eventOclick.screenX);
    var keys = new Array();
    if(event.shiftKey){
        keys.push("shift");
    }
    if(event.ctrlKey){
        keys.push("ctrl");
    }
    console.log(keys.join(","));

}

function eventOnload(){
    var hander=function(event){
//        alert("load over!");

    };
    EventUtil.addHandler(window,"load",hander);
}
function eventResize(){
    EventUtil.addHandler(window,"resize",function(event){
        alert("resize!");
        });
}

function eventKey(){
    var text3 = document.getElementById("text3");
    text3.onkeyup = function(){
        console.log("keyup起作用");
    };
    EventUtil.getEvent(event);
    alert(event.keyCode);
}

function eventContext() {
    EventUtil.addHandler(window,"load",function(event){
        var mydiv = document.getElementById("div1");
        EventUtil.addHandler(mydiv,"contextmenu",function(event){
        event= EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
        var myul = document.getElementById("myul");
        myul.style.left = event.clientX + "px";
        myul.style.top = event.clientY + "px";
        myul.style.visbility = "visible";
    });

        EventUtil.addHandler(document,"click",function(event){
        document.getElementById("myul").style.visbility = "hidden";
    });
    });

}