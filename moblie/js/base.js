function baseFontSize() {
    var rootfontsize = $(window).width() / 20;
    rootfontsize = rootfontsize > 20 ? 20 : rootfontsize;
    $("html").css("fontSize", rootfontsize + "px");
    return rootfontsize;
}
var rem = baseFontSize();
$(window).on("resize", function() {
    rem = baseFontSize();
});
