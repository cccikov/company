var canGetMore = true;//标记滚动加载
var end = false;//标记是否全部数据加载完毕
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

    // submit
    function submit(){
        var data = {};
        $(".select").each(function(item,key){
            var name = $(key).attr("data-name");
            var value = $(key).attr("data-value");

            data[name]=value;
        });
        data["price"]= fixNum($(".input").val());
        data["time"] = new Date().getTime();
        bulid(data);
    }

    //重置
    function reset(){
        $(".option-default").html("选择");
        $(".submit").removeClass("canSubmit");
        $(".option-default").parent().removeClass("selected").attr("data-value","");
        var iEle = $(".input").siblings("i");
        $(".input").val("").add(iEle).removeClass("focus");
        hasSelect=0;
    }

    // 滚动加载
    $(window).on("scroll",function(){
        if(canGetMore){//为了避免一直请求
            more();
        }
    });
});

// 从列表顶部添加新内容
function bulid(data){
    var that = $(' <li class="content-item" style="height:0;transition:height 0.3s,opacity 0.3s;">'+
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
    setTimeout(function(){
        that.css({
            "opacity":1,
            "height":"45px"
        });
    },16.7);
}

// 从列表底部添加新内容
function footerBuild(data){
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

var n = 0;//用来模拟数据加载完毕 正式可删除
// 加载更多
function more(){
    if(isbottom()){

        if(n==2){//假设3次就把数据加载完
            end = true;//加载完毕后,end为true;
        }
        n++;

        canGetMore = false;//一旦请求数据,立即false,避免一直请求
        setTimeout(function(){//模拟ajax请求
            var data = moreData;//ajax获取数据;
            for(var i=0,len=data.length;i<len;i++){
                footerBuild(data[i])
            }
            if(end){
                $(".content-item").last().addClass("last-item");
                $(".waiting").hide();
            }else{
                canGetMore = true;//当加载出来后,变成true(一旦有了新的内容,就证明是true了);
            }
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

// 列表删除操作
function del(el){
    if(confirm("确定删除这条报价?")){
        var that = $(el);
        var parent = that.parents("li");
        parent.height(parent.height()).css("transition","height 0.5s");//如果是css本来就有transition的话，height加上去是需要时间的，所以会造成有时没有过渡效果
        var timer = setTimeout(function(){
            parent.height(0);
            setTimeout(function(){
                parent.remove();
            },500);
        },16.7);
    }
}
