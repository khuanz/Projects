$(function () {
    banner();
    initMobileTab();
});
var banner = function () {
    // 动态轮播图 ajax
    // 1获取数据动态渲染 获取当前设备
    // 2根据数据动态渲染 当前设备 屏幕宽度 判断 
    // 2.1准备数据
    // 2.2吧数据转为html格式的字符串
    // （动态创建元素，字符串【拼接 模板引擎 {artemplate} ）
    // 2.3把字符渲染页面当中

    // 3测试功能 监听页面尺寸
    //移动端手势切换
    console.log('dd')
    // 数据缓存
    var getData = function (callback) {
        // 判断是否缓存数据
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                // 数据方式
                type: 'get',
                // 数据来源
                url: 'js/data.json',
                // 数据类型
                dataType: 'json',
                data: '',
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }

    }
    var render = function () {
        // 根据数据动态渲染       
        console.log('ddd');
        getData(function (data) {

            // 判断宽度
            var isMobile = $(window).width() < 768 ? true : false;
            console.log(isMobile)
            var pointHtml = template("pointtemplate", {
                list: data
            });
            var imageHtml = template("imagetemplate", {
                list: data,
                isM: isMobile
            })
            console.log(pointHtml);
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);

        });
    }


    $(window).on('resize', function () {
        render();
    }).trigger('resize');

    // 移动手势判断
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        if (Math.abs(distanceX > 50 && isMove)) {
            if (distanceX < 0) {
                $('.caroousel').carousel('next');
            } else {
                $('.caroousel').carousel('prev');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    });

}
var initMobileTab = function () {
    // 解决换行问题
    var $navTabs = $('.wjs_product .nav-tabs');
    var width = 0;
    console.log(width)
    $navTabs.find('li').each(function (i, item) {
        var $currLi = $(this); //$(item)
        // width()内容
        // innerwidth()  内容+内边距 
        // outwidth() 内容+内边距+边框
        // outwidth(true) 内容+内边距+边框+外边距
        var liWidth = $currLi.outerWidth(true);
        width += liWidth;
    });
    console.log(width);
    $navTabs.width(width);
    // 修改结构是滑动
    new IScroll($('.nav-tabs-parent')[0], {
        scrollX: true,
        scrollY: false,
        click: true
    });
}

