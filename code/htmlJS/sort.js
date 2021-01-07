
function bubbleSort(){
    var numsStr=document.getElementById("inputarray").value;
    var nums=numsStr.split(",");
    var numsLen=nums.length;
    for (i=0;i<numsLen;i++){
        for(j=0;j<numsLen-i-1;j++){
            if(nums[j]<nums[j+1]){
                var temp=nums[j];
                nums[j]=nums[j+1];
                nums[j+1]=temp;
            }
        }
    }
    document.getElementById("output_sort").value=nums;

}

function choiceSort(){
    var numsStr=document.getElementById("inputarray").value;
    var nums=numsStr.split(",");
    var numsLen=nums.length;
    for (i=0;i<numsLen;i++){
        var m=i;
        for (j=i+1;j<numsLen;j++) {
            if (nums[m]<nums[j]){
                m=j;
            }
        }
       if(i!=m){
        var temp=nums[m];
        nums[m]=nums[i];
        nums[i]=temp;
       } 
    }
    document.getElementById("output_sort").value=nums;    
}


function insertSort(){
    var numsStr=document.getElementById("inputarray").value;
    var nums=numsStr.split(",");
    var numsLen=nums.length;
    for(i=1;i<numsLen+1;i++){
        for(j=i-1;j>-1;j--){
            if(nums[j]<nums[j-1]){
               var temp=nums[j-1];
                nums[j-1]=nums[j];
                nums[j]=temp;
            }
        }

    }
    document.getElementById("output_sort").value=nums;          
}

function fastSort(){
     var numsStr=document.getElementById("inputarray").value;
     var num=numsStr.split(",");
     var quickSort=function(nums){
        if(nums.length<=1){return nums;}

        var  constindex=Math.floor(nums.length / 2);
        var  constbase=nums.splice(constindex,1)[0];
        var left=[];
        var right=[];
            for(i=0;i<nums.length;i++){
                if(nums[i]<constbase){
                    left.push(nums[i]);
                }
                else{
                    right.push(nums[i]);
                }
            }
        return quickSort(left).concat(constbase,quickSort(right));
    };
    alert(quickSort(num)); 
}
 /*   var numsStr=document.getElementById("inputarray").value;
    var nums=numsStr.split(",");
    var numsLen=nums.length;    
    sort(nums,left=0,right=numsLen-1){
        var i=left,j=right;
        var constbase=nums[j];
        if(left>=right){
            return true;
        }
        while(i<j){
            while(nums[i]<=constbase){
                i++;
            }
            nums[j]=nums[i];
            while(nums[j]>=constbase){
                j--;
            }
            nums[i]=nums[j];
        }
        nums[j]=constbase;
        sort(nums,left,j-1);
        sort(nums,j+1,right);
    }
    return nums;
}
*/
