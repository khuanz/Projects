// 随机生成字符串
//  填充
//  输入验证码 点击提交 判断
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (var i = 65; i < 122; i++) {
    if (i > 90 && i < 97) {
        continue;
    }
    arr.push(String.fromCharCode(i));
}

var value;

function creatCanvas() {
    // 选取要显示的字符
    value = '';
    var canvasStr = '';
    for (var i = 0; i < 6; i++) {
        var a = arr[Math.floor(Math.random() * arr.length)];
        console.log(a)
        canvasStr += a + ' ';
        console.log(a)
        value += a;
        console.log(value);
    }
    console.log(canvasStr);

    // 生成验证码区域
    //  @type {HTMLCanvasElement} 
    var mycanvas = document.getElementById('myCanvas');
    console.log(mycanvas);
    var ctx = mycanvas.getContext('2d')
    var oImg = new Image();
    oImg.src = './24.jpg';
    oImg.onload = function () {
        var pattern = ctx.createPattern(oImg, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, mycanvas.width, mycanvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ddd';
        ctx.font = '46px Roboto Slab';
        ctx.setTransform(1, -0.12, 0.3, 1, 0, 12);
        ctx.fillText(canvasStr, mycanvas.width / 2, 60);
    }
}
creatCanvas();
$('.submit').on('click', function () {
    showResult();
})
$('.refresh').on('click', function () {
    creatCanvas();
})

function showResult() {
    var inputValue = $('.inputBox input').val();
    // console.log(inputValue + '==' + value);
    if (value.toLowerCase() == inputValue.toLowerCase()) {
        $('.inputBox span').css({
            backgroundColor: 'green',
            display: 'inline-block',
            textAlign:'center'
        }).html("√");
        $('.msg').css({
            display: 'block',
            color:'green'
        }).html("验证成功")
        creatCanvas();
    } else {
        $('.inputBox span').css({
            backgroundColor: 'red',
            display: 'inline-block',
            textAlign:'center'
        }).html("×");
        $('.msg').css({
            display: 'block',
            color:'red'
        }).html('验证码错误，请重新输入');
        creatCanvas();
    }

}