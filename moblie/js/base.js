function baseFontSize(){
    $("html").css("fontSize",$(window).width()/20+"px");
    return ($(window).width()/20);
}
var rem = baseFontSize();
$(window).on("resize",function(){
    rem = baseFontSize();
});