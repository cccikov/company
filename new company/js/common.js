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
    if($("#ifr").size()>0){
        $("#ifr").css({
            "min-height":ifrMinH,
            "opacity":"0"
        });//最小高度
    }
    $("#ifr").on("load", function() {
        var that = $(this).css("opacity","1");
        var ifrH = $(window.frames['ifr'].document.body)[0].scrollHeight;//跨域会不行
        that.height(ifrH);
    });
}

$(function() {
    ieVersion();
    frameHeight();
});
