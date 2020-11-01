var $li = $('.selector li');
var $sel = $('.selector');
console.log($li)
var len = $li.length;


$('#btn').on('click', function () {
    change();

})

function change() {
    $sel.toggleClass('open');

    var deg = 360 / len;
    for (var i = 0; i < len; i++) {
        var d = deg * i;
        $sel.hasClass('open') ? rotate($li[i], d) : rotate($li[i], -360)
    }

}

function rotate(l, d) {
    $(l).css({
        transform: 'rotate(' + d + 'deg)'
    }).find('label').css({
        transform: 'rotate(' + (-d) + 'deg)'
    })
}
$li.on('click', function (e) {
    // e.preventDefault();
    a = this.children[0];
    e.stopPropagation();
    console.log(this);
    if (a.checked) {
        $(this).find('label').css({
            backgroundColor: 'orange'
        })
    } else {
        $(this).find('label').css({
            backgroundColor: '#fff'
        })
    }


})