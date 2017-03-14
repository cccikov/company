// 判断ie版本
function ieVersion() {
    var reg = /msie\s(\d+)\.0/i;
    var agent = navigator.userAgent.toLowerCase();
    var bodyClass = document.body.className;
    if (reg.test(agent)) { //是ie10及以下
        var num = agent.match(reg)[1];
        if (bodyClass == "") {
            document.body.className = "ie" + num;
        } else {
            document.body.className = bodyClass + " ie" + num;
        }
    };
}
// iframe高度;
function frameHeight(){
    ifrMinH = $(window).height()-350-30-30-50;
    var ifr = document.getElementById("ifr");
    if(ifr){
        ifr.style.minHeight=ifrMinH+"px";
        ifr.onload = function(){
            resetFrameH(this);
        }
    }
}
function resetFrameH(frame){
    frame.height = frame.contentDocument.body.offsetHeight;//跨域会不行
}

$(function() {
    ieVersion();
    if($("iframe").size()>0){
        frameHeight();
    }
});
