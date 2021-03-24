function checkLongitudeData() {
    var data, dataSplit, data_change,data_changesplit;

    // 获取 id="longitude" 的值
    data = document.getElementById("longitude").value;
    dataSplit = data.toString().split(".");
    data_change = parseFloat(data).toFixed(4);
    // 如果输入的值 x 不是数字
    if (isNaN(data)) {
        alert("必须输入数字");
    } 
    if (dataSplit[0].length==1){
         data_change = "00"+ data_change.toString();
    }
    if (dataSplit[0].length==2){
         data_change = "0"+ data_change.toString();
    }
    if (dataSplit[0].length>=3){
         data_change = data_change.toString();
         data_changesplit = data_change.split(".");
         if (data_changesplit[0].length==1){
            data_change = "00"+ data_change;
         }
         if (data_changesplit[0].length==2){
            data_change = "0"+ data_change;
         }
         if (data_changesplit[0].length==3){
            data_change = data_change;
         }

    }
    document.getElementById("longitude").value = data_change;
}

function checkLatitudeData() {
    var data, dataSplit, data_change,data_changesplit;

    // 获取 id="latitude" 的值
    data = document.getElementById("latitude").value;
    dataSplit = data.toString().split(".");
    data_change = parseFloat(data).toFixed(4);
    // 如果输入的值 x 不是数字
    if (isNaN(data)) {
        alert("必须输入数字");
    } 
    if (dataSplit[0].length==1){
         data_change = "00"+ data_change.toString();
    }
    if (dataSplit[0].length==2){
         data_change = "0"+ data_change.toString();
    }
    if (dataSplit[0].length>=3){
         data_change = data_change.toString();
         data_changesplit = data_change.split(".");
         if (data_changesplit[0].length==1){
            data_change = "00"+ data_change;
         }
         if (data_changesplit[0].length==2){
            data_change = "0"+ data_change;
         }
         if (data_changesplit[0].length==3){
            data_change = data_change;
         }
    }
    document.getElementById("latitude").value = data_change;
}

function checkHeightData() {
    var data, dataSplit, data_change;
    data = document.getElementById("height").value;
    data_change = parseFloat(data).toFixed(4);
    document.getElementById("height").value = data_change;
}

function checkGravityData() {
    var data, dataSplit, data_change;
    data = document.getElementById("gravity").value;
    data_change = parseFloat(data).toFixed(4);
    document.getElementById("gravity").value = data_change;
}