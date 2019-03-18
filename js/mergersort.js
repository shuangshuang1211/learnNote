function merger(){
    var  arraryAstr=document.getElementById("inputarray").value;
    var arraryBstr=document.getElementById("output_sort").value;
    var arraryA=arraryAstr.split(",");
    var arraryB=arraryBstr.split(",");
    var lengthA=arraryA.length;
    var lengthB=arraryB.length;
    var arraryC=new Array(lengthA+lengthB);
    var i=0,j=0,k=0;
    while(i<lengthA && j<lengthB){
        if(arraryA[i]<arraryB[j]){
            arraryC[k]=arraryA[i];
            i++;
            k++;
        }
        else{
            arraryC[k]=arraryB[j];
            j++;
            k++;
        }
    }
    while(i<lengthA){
        arraryC[k]=arraryA[i];
        i++;
        j++;
    }
    while(j<lengthB){
        arraryC[k]=arraryB[j];
        j++;
        k++;
    }
    alert(arraryC);
}