// 实现插件--》扩展插件+插件功能
// 扩展插件 $.fn.extend()
// 插件功能 实现方法（点击，动态渲染）
(function ($) {
    function init(dom, args) {
        console.log(dom, args);
        //选中的数字在范围内
        if (args.current <= args.pageCount) {
            fillHtml(dom, args);
            binEvent(dom, args);
        } else {
            alert('错误')
        }
    };

    function fillHtml(dom, args) {
        dom.html('');
        // 上一页
        if (args.current > 1) {
            dom.append('<a href="#" class="prevPage">上一页</a>')
        } else {
            dom.remove('.prevPage')
            dom.append('<span href="#" class="disabled">上一页</span>')
        }
        // 第一页
        if (args.current !== 1 && args.current >= 4 && args.pageCount !== 4) {
            dom.append('<a href="#" class="num">1</a>')

        }
        if (args.current - 2 > 2 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }
        // 中间页
        var start = args.current - 2;
        var end = args.current + 2;
        console.log(start + '-' + end);
        for (; start <= end; start++) {
            if (start <= args.pageCount && start >= 1 && start) {
                if (start == args.current) {
                    dom.append('<span class="current">' + start + '</span>')
                } else if (args.pageCount - start > 0) {
                    dom.append('<a href="#" class="num">' + start + '</a>')
                }
            }
        }


        if (args.current + 2 < args.pageCount - 1 && args.pageCount > 5) {
            dom.append('<span>...</span>')
        }
        // 最后一页
        if (args.current !== args.pageCount && args.current <= args.pageCount - 1 && args.pageCount !== 4) {
            dom.append('<a href="#" class="num">' + args.pageCount + '</a>')
        }



        // 下一页
        if (args.current < args.pageCount) {
            dom.append('<a href="#" class="nextPage">下一页</a>')
        } else {
            dom.remove('.nextPage')
            dom.append('<span href="#" class="disabled">下一页</span>')

        }
    };

    function binEvent(dom, args) {
        dom.on('click', '.num', function () {
            var cur = parseInt($(this).text());
            changePage(dom, args, cur);
        });
        dom.on('click', '.prevPage', function () {
            var cur = parseInt(dom.find('.current').text());
            changePage(dom, args, cur - 1);
        });
        dom.on('click', '.nextPage', function () {
            var cur = parseInt(dom.find('.current').text());
            changePage(dom, args, cur + 1);
        });
    }

    function changePage(dom, args, page) {
        fillHtml(dom, {
            current: page,
            pageCount: args.pageCount
        });
        args.backFn(page);
    }
    $.fn.extend({
        createPage: function (options) {
            var args = $.extend({
                pageCount: 5,
                current: 1,
                backFn: function () {}
            }, options);
            init(this, args);
        }
    })
})(jQuery)