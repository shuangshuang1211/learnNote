function computeFactorial() {
    var number=document.getElementById("inputnumber").value;
    var numberFactorial=1,count=0;
    var muti_five;
    if (!isNaN(number) && number!=""){
        for (i=1;i<=number;i++) {
            numberFactorial = numberFactorial * i;
        }
         document.getElementById("output").value=numberFactorial;
         muti_five=parseInt(number/5);
         while(muti_five!=0){
            count+=muti_five;
            muti_five=parseInt(muti_five/5);
         }
         document.getElementById("output_zeros").value=count;
    }
    else{
         alert("请输入数字");       
    }


}

function computeNumk(){
    var n=document.getElementById("inputn").value;
    var k=document.getElementById("inputk").value;
    var count=0;
    for(i=0;i<=n;i++){
        var k_string=k.toString();
        var k_length=k_string.length;
        if(k_length==1){
            var n_array=i.toString().split("");
            for(j=0;j<n_array.length;j++){
                if(n_array[j]==k_string){
                    count++;
                }
            }
        }
    }
    document.getElementById("output_k").value=count;
}