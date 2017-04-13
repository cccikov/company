$(function(){
    // 轮播
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000, //可选选项，自动滑动
        loop: true, //可选选项，开启循环
        pagination : '.pagination',
        paginationClickable :true,
    });

    $(".main-business a").on("mouseenter",function(){
        var that = $(this);
        var _index = that.index();
        console.log(_index);
        $(".product-list").eq(_index).show().siblings().hide();
        productList();//为隐藏元素重设高度
    });
});