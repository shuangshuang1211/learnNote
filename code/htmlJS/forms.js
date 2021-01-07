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
            return event ? event: window.event;
        },
        getTarget:function(event){
            return event.target || event.srcElement;
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
function formsSubmit(){
    var myForm = document.getElementById("myForm");
    var form3 = myForm.elements[3];
 /*   var form0_0 = myForm.elements["form1"];
    console.log(form0);
    console.log(form0_0);
    console.log(form0 == form0_0);
    var firstField = form0_0[0];
    console.log(form0 == firstField);
    form0.value = "redchange";
    console.log(form0.value); */
    console.log(form3);
    var formAll = document.forms[0];
//    console.log(formAll);
/*    EventUtil.addHandler(formAll,"submit",function(event){
        var event0 = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event0);
        console.log(target);
        var  btn = target.elements["submit_btn"];
        console.log(btn);
        btn.disabled=true;

    }); */
    var mytext = formAll.elements[3];
 //   console.log(mytext);
    EventUtil.addHandler(mytext,"select",function(event){
        var mytextValue = mytext.value;
        console.log(mytextValue);
    });
    var mybuton = formAll.elements["submit_btn"];
    EventUtil.addHandler(mybuton,"click",function(event){
        var event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        mytext.select();
    });
}

function setRules(){
    var textbox = document.forms[1].elements[0];
//    console.log(textbox);
    EventUtil.addHandler(textbox,"focus",function(event){
        var event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        target.style.backgroundColor = "";
    });
    EventUtil.addHandler(textbox,"blur",function(event){
        var event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if((/[^\d]/).test(target.value)){
            target.style.backgroundColor = "red";
        }else{
            target.style.backgroundColor = "green";
        }
    });
}

function setAutofocus(){
    function tabNext(event){
        var event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);   //取得目标事件；
        if(target.value.length==target.maxLength){ //如果目标区域的值的最大长度已经达到规定的最大的长度，就读取目标区域的表单
            var form = target.form;                //并在表单的elements内长度内循环；
            for(var i=0; i<form.elements.length;i++){
                if(form.elements[i]==target){
                    if(form.elements[i+1]){      //当表单元素与target目标相等且下个表单元素存在时，就把焦点赋值给下一个表单元素。
                        form.elements[i+1].focus();
                    }
                   return;                  //要有返回值；
                }
            }
        }
    }

    var textbox1 = document.forms[2].elements[0];
    var textbox2 = document.forms[2].elements[1];
    var textbox3 = document.forms[2].elements[2];
    EventUtil.addHandler(textbox1,"keyup", tabNext);   //注意此时调用方法函数时，不能用tabNext(event)，而用函数名；
    EventUtil.addHandler(textbox2,"keyup", tabNext);
    EventUtil.addHandler(textbox3,"keyup", tabNext);
}