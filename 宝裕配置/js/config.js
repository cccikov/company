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
    });
    $(".select li").on("click",function(e){
        e.stopPropagation();
        var that = $(this);
        var thisVal = that.attr("data-val");
        var parent = that.parents(".select");
        var val = (parent.attr("data-val") != undefined && parent.attr("data-val") != "") ? JSON.parse(parent.attr("data-val")) : [];
        if(!that.is(".active")){
            that.addClass("active");
            val.push(thisVal);
        }else{
            val.splice(val.indexOf(thisVal),1);
            that.removeClass("active");
        }
        parent.attr("data-val",JSON.stringify(val));
    });

    $(".del").on("click",function(){
        console.log("del");
    });
});
