function setDom(){
    var iframe=document.getElementById("iframe1");
    var iframeDoc = iframe.contentDocument;//获得框架iframe1的文件属性；
    console.log(iframeDoc);
    var divRed=document.getElementById("divRed");
   divRed.style.backgroundColor="red";
    var styleName=iframe.style;
    for (var i=0; i<styleName.length;i++){
        if(styleName[i]=="background-color"){
            var styleValue = styleName.getPropertyValue(styleName[i]);
            var valueType = styleValue.cssValueType
 //           alert(valueType);
            document.getElementById("getStyle").value=styleName[i] +":"+styleValue;
            
        }
    }
}

function setStyle(){
    var sheet = document.styleSheets[0];
    var rules = sheet.cssRules || sheet.rules;
    var rule = rules[0];
    console.log(rule.selectorText);
    console.log(rule.style.cssText);
    console.log(rule.style.backgroundColor);
}

function changeStyle() {
    var sheet = document.styleSheets[1];
    var rules = sheet.cssRules || sheet.rules;
    var rule = rules[0];
    rule.style.backgroundColor = "black";
}

function range() {
    var pTitle=document.getElementById("title");
    var pName = pTitle.firstChild.firstChild;
    var pNumber = pTitle.lastChild;
//    console.log(pName);
    var range=document.createRange();
    range.setStart(pName,2);
    range.setEnd(pNumber,4);
    var h1=document.createElement("h1");
    h1.id="insert1"
    h1.appendChild(document.createTextNode("charu"));
    range.insertNode(h1);
    console.log(document.getElementById("insert1"));
}