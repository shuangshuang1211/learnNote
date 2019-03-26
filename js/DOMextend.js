function selectElement(){
    if (document.querySelector){  //如果支持document.querySelector则执行

        var body=document.querySelector("body"); //获取body元素；
        document.getElementById("writebody").value=body.tagName;//元素有tagName和innerHTML属性
        body.focus();
        console.log(document.hasFocus());//判断文档是否获取焦点；

        var myUl=document.querySelector("#Myul");//获取id为Myul的元素；
        console.log(myUl);
       // var myul = document.getElementById("Myul");
        var appId=myUl.dataset.appid;//获取<ul id="Myul" data-appid="123">中自定义的appid数据；
        console.log(appId);
        var myul = document.getElementById("Myul");
        document.getElementById("writeHtml").innerHTML=myul.outerHTML;
        console.log(myul.innerText);

        var select=document.querySelector(".select");//获取第一个类为select的元素；
        console.log(select.innerHTML);

        var img=document.querySelector("img.button");//获取第一个类为button的img元素；
        console.log(img);

        var lis=document.getElementById("Myul").querySelectorAll("li");
        document.getElementById("writeid").value=lis.length;//元素有tagName和innerHTML属性;

        var pText=document.getElementById("writeText");
        pText.innerText="hello world!";

    }
    else {
        console.log("不支持此浏览器");
    }
}