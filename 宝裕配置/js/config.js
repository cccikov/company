$(function(){

    /**/
    $(".select").on("click",function(e){
        e.stopPropagation();
        var that = $(this);
        if(!that.is(".active")){
            $(".select").removeClass("active");
            that.addClass("active");
            $(window).on("click.select",function(){
                console.log("win");
                var that = $(this);
                $(".select").removeClass("active");
                that.off("click.select");
            });
        }else{
            that.removeClass("active");
            $(window).off("click.select");
        }
    }).each(function(item,key){//记住 全部XX 如果写html的时候,在.select写上data-html就可以不要这个each这个方法
        var that = $(key);
        var html = that.find("p").html();
        that.attr("data-html",html);
    });
    $(".select li").on("click",function(e){
        e.stopPropagation();
        var that = $(this);
        var thisVal = that.attr("data-val");
        var parent = that.parents(".select");
        var html = parent.attr("data-html");
        var p = parent.find("p");
        var val = (parent.attr("data-val") != undefined && parent.attr("data-val") != "") ? JSON.parse(parent.attr("data-val")) : [];
        if(!that.is(".active")){
            that.addClass("active");
            val.push(thisVal);
        }else{//如果取消active,则在val数组中删除
            val.splice(val.indexOf(thisVal),1);
            that.removeClass("active");
        }
        if(val.length!=0){
            p.html("已选择");
        }else{
            p.html(html);
        }
        parent.attr("data-val",JSON.stringify(val));
    });


    /*清空操作*/
    $(".del").on("click",function(){
        $(".select").attr("data-val","").find("li").removeClass("active").end().each(function(){
            var that = $(this);
            var html = that.attr("data-html");
            that.find("p").html(html);
        });
    });
});
