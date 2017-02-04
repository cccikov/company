var canGetMore = true;
$(function() {

    var hasSelect = 0;//用来标记有多少个选项被选上了

    /*选择 操作begin*/
    $(".select").on("click", function() {
        var that = $(this);
        var height = that[0].scrollHeight
        if (that.hasClass("active")) {
            that.removeClass("active").height(28);
        } else {
            that.addClass("active").height(height).parent().siblings().find(".select").removeClass("active").height(28);;
        }
    });

    $(".option").on("click", function(e) {
        e.stopPropagation();
        var that = $(this);
        var parent = that.parent();
        var defaultObj = that.siblings(".option-default");
        if(!parent.attr("data-value")){//未选过才标记 +1;
            hasSelect += 1;
        }

        defaultObj.html(that.html())
        parent.removeClass("active").addClass("selected").height(28).attr("data-value",that.attr("data-value"));

        //全部选好,可以发布
        console.log(hasSelect);
        if (hasSelect == 10 && $(".input").val().trim() != "") {
            $(".submit").addClass("canSubmit");
        }
    });
    /*选择 操作end*/

    /*输入价格操作 begin*/
    $(".input").on("focus", function() {
        var that = $(this);
        var iEle = that.siblings("i");
        iEle.addClass("focus");
    }).on("blur", function() {
        var that = $(this);
        var iEle = that.siblings("i");
        if (that.val().trim() != "") {
            that.addClass("focus");
        } else {
            that.add(iEle).removeClass("focus");
        }
    }).on('input propertychange', function() {
        var that = $(this);
        if (hasSelect == 10 && that.val().trim() != "") {
            $(".submit").addClass("canSubmit");
        } else {
            $(".submit").removeClass("canSubmit");
        }
    });
    /*输入价格操作 end*/

    /*发布按钮 begin*/
    $(".submit").on("click", function() {
        var that = $(this);
        if (that.is(".canSubmit")) {
            submit();
            reset();
        } else {
            return;
        }
    });
    /*发布按钮 end*/

    function submit(){
        var data = {};
        $(".select").each(function(item,key){
            var name = $(key).attr("data-name");
            var value = $(key).attr("data-value");

            data[name]=value;
        });
        data["price"]= fixNum($(".input").val());
        data["time"] = new Date().getTime();
        console.log(JSON.stringify(data));
        bulid(data);
    }

    function reset(){
        $(".option-default").html("选择");
        $(".submit").removeClass("canSubmit");
        $(".option-default").parent().removeClass("selected").attr("data-value","");
        var iEle = $(".input").siblings("i");
        $(".input").val("").add(iEle).removeClass("focus");
    }




    // // 滚动加载
    $(window).on("scroll",function(){
        console.log(canGetMore);
        if(canGetMore){//为了避免一直请求
            more();
        }
    });
});

 function bulid(data){
    $(' <li class="content-item">'+
        '<span class="span1">'+data.pinpai+'</span>'+
        '<span class="span2">'+data.pinming+'</span>'+
        '<span class="span3">'+data.caizhi+'/'+data.biaomian+'</span>'+
        '<span class="span4">'+data.houdu+'*'+data.kuandu+'*C</span>'+
        '<span class="span5">'+data.bianbu+'</span>'+
        '<span class="span6">'+data.biaozhun+'</span>'+
        '<span class="span7">'+data.diqu+'</span>'+
        '<span class="span8">'+data.jibie+'</span>'+
        '<span class="span9">'+data.price+'(元/吨)</span>'+
        '<span class="span10">'+formatDate(data.time)+'</span>'+
        '<span class="span11"><a href="javascript:void(0)" onclick="del(this)">删除</a></span>'+
    '</li>').prependTo(".content");
}

// 加载更多
function more(){
    var data = {"pinpai":"山东宏旺6","pinming":"热轧卷材","caizhi":"305","biaomian":"3B","houdu":"0.81","kuandu":"1500","bianbu":"C","biaozhun":"JIS","diqu":"华北","jibie":"三级","price":"123.00","time":1486199539284};
    if(isbottom()){
        canGetMore = false;//一旦请求数据,立即false,避免一直请求
        setTimeout(function(){
            for(var i = 0 ; i<30 ; i++){
                $(' <li class="content-item">'+
                    '<span class="span1">'+data.pinpai+'</span>'+
                    '<span class="span2">'+data.pinming+'</span>'+
                    '<span class="span3">'+data.caizhi+'/'+data.biaomian+'</span>'+
                    '<span class="span4">'+data.houdu+'*'+data.kuandu+'*C</span>'+
                    '<span class="span5">'+data.bianbu+'</span>'+
                    '<span class="span6">'+data.biaozhun+'</span>'+
                    '<span class="span7">'+data.diqu+'</span>'+
                    '<span class="span8">'+data.jibie+'</span>'+
                    '<span class="span9">'+data.price+'(元/吨)</span>'+
                    '<span class="span10">'+formatDate(data.time)+'</span>'+
                    '<span class="span11"><a href="javascript:void(0)" onclick="del(this)">删除</a></span>'+
                '</li>').insertBefore(".waiting");
            }
            canGetMore = true;//当加载出来后,变成true,一旦有了新的内容,就证明是true了;
        },1000);
    }
}

// 是否到底部
function isbottom(){
    var top = $(".waiting").offset().top;
    var h = $(".waiting").outerHeight();
    var winH = $(window).height();
    var scrollTop = $(window).scrollTop();
    // 最低下 top+h = winH+scrollTop
    return top<=winH+scrollTop;
}

function del(el){
    if(confirm("确定删除这条报价?")){
        var that = $(el);
        var parent = that.parents("li");
        parent.height(parent.height());
        setTimeout(function(){
            parent.height(0);
            setTimeout(function(){
                parent.remove();
            },500);
        },16.7);
    }
}