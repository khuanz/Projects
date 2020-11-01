 //操作每一列 $('.colnum')
 function Index() {
     //指向Index对象（new）
     this.colnum = Array.from($('.colnum')); //变成数组
     this.use24Hours = true;
     var This = this;
     this.classList = ['visible', 'close', 'far', 'far', 'dis', 'dis'];
     $('.trigger').on('click', function () {
         This.use24Hours = !This.use24Hours;
         if(This.use24Hours){
             console.log(this)
             this.textContent="12小时制";
         }else{
             this.textContent="24小时制";
         }
         This.start();
     });
     this.start();
 }
 Index.prototype.start = function () { //this 指向window
     var self = this; //获取其他函数，可定义 this指向index
     setInterval(function () {
         var clock = self.getClock();
         //   console.log(self.colnum);//六列
         self.colnum.forEach(function (ele1, index1) {
             var num = +clock[index1]; //+ 类型转换 将字符串转换为数字 显式转换
             var offset = num * 86;
             $(ele1).css({
                 transform: 'translateY(calc(50vh - ' + offset + 'px - 43px))'
             });
             //给每一列的div添加不同class名 显示不同透明度
             Array.from(ele1.children).forEach(function (ele2, index2) {
                 var className = self.getClass(num, index2);
                 $(ele2).attr('class', className);
             }) //foreach遍历 ele1指向数组中每一列  index1指向每一列的index1
         });

     }, 200);
 }

 //获取时间 处理时间格式
 Index.prototype.getClock = function () {
     var date = new Date();
     // p 上一次的结果 n 参与这一次的运算的元素
     var str = [this.use24Hours ? date.getHours() : date.getHours() % 12 || 12, date.getMinutes(), date.getSeconds()]
         .reduce(function (p, n) {
             return p + ('0' + n).slice(-2);
         }, ''); //''p的初始值       
    //  console.log(str);
     return str;
 }

 Index.prototype.getClass = function (num, i) {
     var c = this.classList.find(function (ele, index) { //find 可传入function ele数组中每一位，index数组当前对应索引
         return i - index === num || i + index === num; //c 返回满足的值
     });
    // console.log(c)
     return c || 'n';
 }

 new Index();