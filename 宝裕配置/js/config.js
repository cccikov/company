$(function(){
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
    }).each(function(item,key){
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
        }else{
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

    $(".del").on("click",function(){
        console.log("del");
    });
});
