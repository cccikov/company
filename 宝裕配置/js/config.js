$(function() {

    /**/
    $(".select").on("click", function(e) {
        e.stopPropagation();
        var that = $(this);
        if (!that.is(".active")) {
            $(".select").removeClass("active");
            that.addClass("active");

            $("iframe").css("pointer-events","none");
            $(window).on("click.select", function() {
                var that = $(this);
                $(".select").removeClass("active");
                that.off("click.select");
                $("iframe").css("pointer-events","auto");
            });
        } else {
            that.removeClass("active");
            $(window).off("click.select");
            $("iframe").css("pointer-events","auto");
        }
    }).each(function(item, key) { //记住 全部XX 如果写html的时候,在.select写上data-html就可以不要这个each这个方法
        var that = $(key);
        var html = that.find("p").html();
        that.attr("data-html", html);
    });
    $.fn.extend({ //给jq对象添加一个getval方法
        "getval": function() {
            var that = $(this);
            return (that.attr("data-val") == undefined || that.attr("data-val") == "") ? [] : JSON.parse(that.attr("data-val"));
        },
        "setval":function(val){
            val = typeof val == "string" ? JSON.parse(val) : val;
            var that = $(this);
            that.attr("data-val",JSON.stringify(val));
            if(that.attr("class").indexOf("select")>-1){
                var p = that.find("p");
                var len = val.length;
                var html = that.attr("data-html");
                var li = that.find("li").removeClass("active");
                for(var i=0;i<len;i++){
                    that.find("li[data-val="+val[i]+"]").addClass("active");
                }
                if (li.is(".active")) {
                    p.html("已选择");
                } else {
                    p.html(html);
                }
            }
            return val;
        }
    });
    $(".select li").on("click", function(e) {
        e.stopPropagation();
        var that = $(this);
        var thisVal = that.attr("data-val");
        var parent = that.parents(".select");
        var html = parent.attr("data-html");
        var p = parent.find("p");
        var val = (parent.attr("data-val") != undefined && parent.attr("data-val") != "") ? JSON.parse(parent.attr("data-val")) : [];
        if (!that.is(".active")) {
            that.addClass("active");
            val.push(thisVal);
        } else { //如果取消active,则在val数组中删除
            val.splice(val.indexOf(thisVal), 1);
            that.removeClass("active");
        }
        if (val.length != 0) {
            p.html("已选择");
        } else {
            p.html(html);
        }
        parent.attr("data-val", JSON.stringify(val));
    });


    /*清空操作*/
    $(".del").on("click", function() {
        $(".select").attr("data-val", "").find("li").removeClass("active").end().each(function() {
            var that = $(this);
            var html = that.attr("data-html");
            that.find("p").html(html);
        });
    });
});

function formsearch() {
    var data = {};
    $(".select").each(function(item, key) {
        var that = $(key);
        if (that.getval().length != 0) {
            data[that[0].id] = that.getval();
        }
    });
    console.log(data);
    // frmAction.submit();
}
