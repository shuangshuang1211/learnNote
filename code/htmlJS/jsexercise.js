
function seclectCheckbox(){
        var items=document.getElementsByName("item");
 //       alert(items);
        for(var i=0; i<items.length; i++){
            items[i].checked=true;
        }
    }

function seclectChecksllnot(){
    var items=document.getElementsByName("item");
    for(var i=0; i<items.length; i++){
        items[i].checked=false;
    }   
}

function reverse(){
    var items=document.getElementsByName("item");
    for(var i=0; i<items.length; i++){
        if(items[i].checked==true){
        items[i].checked=false;            
        }
        else{
            items[i].checked=true;
        }
    }

}

function send(){
//    var sendBtn = document.getElementById("sendBtn");
    var items=document.getElementsByName("item");
    for(var i=0;i<items.length;i++){
        if(items[i].checked){
            alert(items[i].value);
        }
    }

}