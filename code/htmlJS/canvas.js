function drawing(){
    window.onload =function(){                      // 页面加载完毕时，执行以下操作；
    var draw = document.getElementById("drawing");  //获取元素信息；
    var btn = document.getElementById("export_btn"); 
    if(draw.getContext){                            //判断是否支持canvas；
        var context = draw.getContext("2d");        //设置一个红色的矩形；
        context.shadowOffsetX=5;                    //设置阴影；
        context.shadowOffsetY=5;
        context.shadowBlur=4;
        context.shadowColor="rgba(0,0,0,0.5)";
        var gradient = context.createLinearGradient(10,10,50,50);
        gradient.addColorStop(0,"green");
        gradient.addColorStop(1,"red");

        context.strokeStyle="green";
        context.fillStyle = "#ff0000";

        context.fillRect(10,10,50,50);
        context.strokeRect(10,10,50,50);

        context.fillStyle = gradient;
        context.fillRect(10,10,50,50);
//        context.lineWidth ="100px";


        context.fillStyle = "rgba(0,0,255,0.5)";   //设置一个蓝色的矩形
        context.fillRect(30,30,50,50);
        context.clearRect(30,30,10,10);
    } 
/*       context.beginPath();
        context.arc(100,100,99,0,2*Math.PI,false);
        context.moveTo(194,100);
        context.arc(100,100,94,0,2*Math.PI,false);
        context.moveTo(100,100);
        context.lineTo(100,15);
        context.moveTo(100,100);
        context.lineTo(35,100);
        context.stroke();

        context.font = "bold 14px Arial";
        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.fillText("12",100,15);
     } */
    btn.onclick = function(){                     //给btn添加onclick事件；
        var imgURL = draw.toDataURL();            //调用canvas的图像url；
        var image = document.createElement("img"); //创建一个image元素放img并展示；
        image.src = imgURL;
        document.body.appendChild(image);//把元素image链接到body内；
    };
   };


}