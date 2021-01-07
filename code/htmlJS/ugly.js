 function nthUglyNumber(n) {
    
        var p2=0,p3=0,p5=0;
        var number=Array(n);
            number[0]=1;
        for (i=1;i<n;i++){
            var min1=Math.min(number[p2]*2,number[p3]*3);
            var min2=Math.min(number[p2]*2,number[p5]*5);
            number[i]=Math.min(min1,min2);
            if(number[i]==number[p2]*2){
                p2+=1;
            }
            if(number[i]==number[p3]*3){
                p3+=1;
            }
            if(number[i]==number[p5]*5){
                p5+=1;
            }
        }
        return number[n-1];

}
