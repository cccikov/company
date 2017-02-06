$(function() {
    /*初始化地图*/
    var map = new BMap.Map("map"); // 创建地图实例 map为地图所在div 的 id
    // var firstPoint = new BMap.Point(113.116093,23.017925);//初始点
    map.disablePinchToZoom() //禁止双指缩放
    map.disableDoubleClickZoom() //禁用双击缩放

    /*地图样式*/
    var styleJson = [{
        "featureType": "land",
        "elementType": "all",
        "stylers": {
            "color": "#fcf9f2"
        }
    }, {
        "featureType": "green",
        "elementType": "all",
        "stylers": {
            "color": "#cfe7b4"
        }
    }, {
        "featureType": "manmade",
        "elementType": "all",
        "stylers": {
            "color": "#f8efe2"
        }
    }, {
        "featureType": "local",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#f5e6d3"
        }
    }, {
        "featureType": "local",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#ffffff"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#fbefd5"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#f6d19e"
        }
    }];
    map.setMapStyle({ styleJson: styleJson });

    /*自定义图标样式*/
    var myIcon = new BMap.Icon("img/map/ding.png", new BMap.Size(20, 20), {
        imageSize: new BMap.Size(20, 20) //设置缩放大小
    });
    var marker // 创建标注

    /*批量自定义图标*/
    function makeIcon(url){
        return new BMap.Icon(url, new BMap.Size(50, 60), {
            imageSize: new BMap.Size(50, 60) //设置缩放大小
        });
    }
    // var icon2 = makeIcon("img/map/m1.png");

    /*定位*/
    var yourPoint;//你的位置
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            /*将地图的中心点设置为定位点*/
            yourPoint = r.point;
            marker = new BMap.Marker(yourPoint, { icon: myIcon });
            map.centerAndZoom(yourPoint, 15); // 初始化地图，设置中心点坐标和地图级别
            map.addOverlay(marker);
            map.setCenter(yourPoint);



            // 编写自定义函数,创建标注
            function addMarker(point,url) {
                var marker = new BMap.Marker(point,{icon:makeIcon(url)});
                map.addOverlay(marker);
            }
            // 随机向地图添加7个标注
            var bounds = map.getBounds();
            var sw = bounds.getSouthWest();
            var ne = bounds.getNorthEast();
            var lngSpan = Math.abs(sw.lng - ne.lng); //纬度范围
            var latSpan = Math.abs(ne.lat - sw.lat); //经度范围
            for (var i = 0; i < 7; i++) {
                var point = new BMap.Point(sw.lng + lngSpan * (Math.random()*0.8 +0.1), ne.lat - latSpan * (Math.random()*0.8 +0.1));
                addMarker(point,"img/map/m"+(i+1)+".png");
            }

            // alert('您的位置：'+r.point.lng+','+r.point.lat);
        } else {
            alert('failed' + this.getStatus());
        }
    }, { enableHighAccuracy: true });


    /*定位控件*/
    // 定义一个控件类,即function
    function ZoomControl() {
        // 默认停靠位置和偏移量
        this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
        this.defaultOffset = new BMap.Size(10, 10);
    }
    // 通过JavaScript的prototype属性继承于BMap.Control
    ZoomControl.prototype = new BMap.Control();
    // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
    // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
    ZoomControl.prototype.initialize = function(map) {
            // 创建一个DOM元素
            var div = document.createElement("div");
            // 添加文字说明
            // div.appendChild(document.createTextNode("放大2级"));
            // 设置样式
            $.extend(div.style, {
                    "cursor": "pointer",
                    "width": "40px",
                    "height": "40px",
                    "border": "1px solid #eaeaea",
                    "borderRadius": "5px",
                    "background": " #fff url(img/gps_fix_done.png) center/30px no-repeat",
                })
                // 绑定事件,点击一次放大两级
            div.onclick = function(e) {
                    map.setCenter(yourPoint);
                    map.removeOverlay(marker);
                    map.addOverlay(marker);
                }
                // 添加DOM元素到地图中
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        }
        // 创建控件
    var myZoomCtrl = new ZoomControl();
    // 添加到地图当中
    map.addControl(myZoomCtrl);




});
