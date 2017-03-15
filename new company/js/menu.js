$(function(){
    frameHeight();
    var menu = new Menu($(".menu"));
    var framesrc = getUrlParam("framesrc");
    var whichmenu = getUrlParam("menu");
    if(framesrc && whichmenu){
        $("iframe").attr("src",framesrc);
        menu.clicknoskip(whichmenu);
    }else{
        menu.clickandskip("a:eq(0)");
    }
});
