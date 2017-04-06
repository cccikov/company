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
function frameHeight() {
    ifrMinH = $(window).height() - 350 - 30 - 30 - 40;
    var ifr = document.getElementById("ifr");
    if (ifr) {
        ifr.style.minHeight = ifrMinH + "px";
        ifr.onload = function() {
            resetFrameH(this);
        }
    }
}

function resetFrameH(frame) {
    frame.height = frame.contentDocument.body.offsetHeight; //跨域会不行
}

function getUrlParam (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //以 name 开头或者以 "&"+name 开头，中间是 "=" + 若干个非&的字符 ,后面是结尾 或者 以 "&"结尾
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
// 菜单
function Menu(obj) {
    Menu.prototype.init = function() {
        var menu = this.menu;
        menu.find("a").on("click",function(){
            menu.find("a.active").removeClass("active");
            $(this).addClass("active");
        });
        menu.find(".first").on("click",function(){
            var that = $(this).addClass("active");
            that.siblings(".first").removeClass("active").find(".second").height(0);
            if(that.attr("data-h")){
                that.find(".second").height(that.attr("data-h"));
            }
        });
        menu.find(".second").each(function(){
            var that = $(this);
            var parent = that.parents(".first");
            var h = that[0].scrollHeight;
            parent.attr("data-h",h);
        });
    }
    Menu.prototype.clickandskip = function(str){
        this.menu.find(str)[0].click();
    }
    Menu.prototype.clicknoskip = function(str){
        var that = this.menu.find(str);
        this.menu.find(".active").removeClass("active");
        that.addClass("active").parents(".first").addClass("active");
    }
    this.menu = obj;
    this.init();
}

/*产品列表左右高度不一致时*/
function productList(){
    $(".product-item").each(function(index,key){
        var that = $(this);
        var thatHeight = that.height();
        if(thatHeight>200 && !that.attr("data-change-height")){//高度大于200 且 没有标记的元素
            if(index%2){//右边
                var sibling = that.prev();
            }else{//左边
                var sibling = that.next();
            }
            var sibHeight = sibling.height();
            if(sibHeight>thatHeight){
                that.height(sibHeight);
            }else{
                sibling.height(thatHeight);
            }
            that.add(sibling).attr("data-change-height",true);//增加一个标记，标记已经改变高度了。
        }
    });
}

$(function() {
    ieVersion();
    productList();
});
