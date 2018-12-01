
// var enlarge = (function () {
//     return {
//         init(x) {
//             this.Multiple = x || 2;
//             this.$smallimgAll = $('.small-img').querySelectorAll('img');
//             this.index=0;
//             for (var i = 0; i < this.$smallimgAll.length; i++) {
//                 this.$smallimgAll[i].index = i;
//             }
//             this.event()
//         },
//         event() {
//             var _this = this;
//             $('.small-img').onclick = function (ev) {
//                 ev = ev || window.event;
//                 var target = ev.target || ev.srcElement;
//                 if (target.nodeName === 'IMG') {
//                     _this.showImage(target.index)
//                 }
//             }
//             $('.mid-img').onmouseenter = function (ev) {
//                 ev = ev || window.event;
//                 $('.magnifier').style.display = 'block';
//                 $('.area').style.display = 'block';
//                 //设置放大镜大小;
//                 $('.magnifier').style.width = $('.area').offsetWidth / _this.Multiple + 'px';
//                 $('.magnifier').style.height = $('.area').offsetHeight / _this.Multiple + 'px';
//                 //设置放大图片的大小:
//                 $('.big').style.width = this.offsetWidth * _this.Multiple + 'px';
//                 $('.big').style.height = this.offsetHeight * _this.Multiple + 'px';

//             }
//             $('.mid-img').onmouseleave = function (ev) {
//                 ev = ev || window.event;
//                 $('.magnifier').style.display = 'none';
//                 $('.area').style.display = 'none';
//             }
//             $('.mid-img').onmousemove = function (ev) {
//                 ev = ev || window.event;
//                 //获取放大镜最大位移:
//                 var mx = $('.show-img').clientWidth - $('.magnifier').offsetWidth;
//                 var my = $('.show-img').clientHeight - $('.magnifier').offsetHeight;
//                 //获取偏移量:
//                 var x = ev.pageX - $('.show-img').offsetLeft - ($('.magnifier').offsetWidth / 2)-152;
//                 var y = ev.pageY - $('.show-img').offsetTop - ($('.magnifier').offsetHeight / 2)-255;
//                 console.log(x,y)
//                 if (x <= 0) {
//                     x = 0
//                 } else if (x >= mx) {
//                     x = mx;
//                 }
//                 if (y <= 0) {
//                     y = 0;
//                 } else if (y >= my) {
//                     y = my
//                 }
//                 $('.magnifier').style.left = x + 'px';
//                 $('.magnifier').style.top = y + 'px';
//                 $('.add').style.left = -x * _this.Multiple + 'px';
//                 $('.add').style.top = -y * _this.Multiple + 'px';
//             }
//             $('.left').onclick = function (x) {       
//                if($('.small-img').offsetLeft>=0){
//                    x=0
//                }else{
//                    x=82
//                }
//                _this.smallMove(x)
//             }
//             $('.right').onclick = function (x) {
                
//                 if($('.small-img').offsetLeft<=-240){
//                     x=0
//                 }else{
//                     x=-82
//                 }
//                 _this.smallMove(x)
//             }

//         },
//         showImage(index) {
//             console.log(index)
//             this.index=index;            
//             $('.mid').src = `img/swiper${index + 1}.jpg`
//             $('.big').src = `img/swiper${index + 1}.jpg`
//         },
//         smallMove(x){          
//             var leftval=$('.small-img').offsetLeft+x;
//             // $('.small-img').style.left=leftval+x+'px';
//             move($('.small-img'),'left',leftval)
//        }       
//     }
// }())

// function $(ele) {
//     if (typeof ele === 'string') {
//         return document.querySelector(ele);
//     }
// } 
var enlarge=(function(){
    return{
        init(x){
            this.Multiple=x||2; 
            this.event()          
        },
        event(){
            var _this=this;
            $('.small-img li').click(function(){
                var index=$('.small-img li').index(this);
                // $('.show-img').css({'left':index*-500})
                $('.mid').attr('src',`img/swiper${index+1}.jpg`)
                $('.big').attr('src',`img/swiper${index+1}.jpg`)
            })
            $('.btn-left').click(function () {
                $('.small-img').css({'left':0})
            })
            $('.btn-right').click(function () {
                $('.small-img').css({'left':-120})
            })
            $('.mid-img').mouseenter(function(ev){
                ev=ev||window.event;
                console.log(1)
                $('.magnifier').css({'display':'block'})
                $('.area').css({'display':'block'})
                $('.magnifier').css({'width':$('.area').width()/_this.Multiple,'height':$('.area').height()/_this.Multiple,});
                $('.big').css({width:$('.mid-img').width()*_this.Multiple,height:$('.mid-img').height()*_this.Multiple});         
            }).mousemove(function(ev){
                ev=ev||window.event;
                var mx=$('.show-img').width()-$('.magnifier').width();
                var my=$('.show-img').height()-$('.magnifier').height();
                var x=ev.pageX-$('.show-img').offset().left-$('.magnifier').width()/2-4;
                var y=ev.pageY-$('.show-img').offset().top-$('.magnifier').height()/2-4;
                // console.log(x,y)
                if (x <= 0) {
                    x = 0
                } else if (x >= mx) {
                    x = mx;
                }
                if (y <= 0) {
                    y = 0;
                } else if (y >= my) {
                    y = my
                }
                $('.magnifier').css({left:x,top:y});
                $('.add').css({left:-x*_this.Multiple,top:-y*_this.Multiple})
            }) .mouseleave(function(ev){
                ev=ev||window.event;
                $('.magnifier').css({'display':'none'})
                $('.area').css({'display':'none'}) 
            })  
            $('.left').click(function(x){
                if($('.small-img').position().left>=0){
                    x=0
                }else{
                    x=82
                }
                _this.smallMove(x)
            })   
           
             $('.right').click(function (x) {
                 
                 if($('.small-img').position().left<=-240){
                     x=0
                 }else{
                     x=-82
                 }
                 _this.smallMove(x)
             })

        },
        smallMove(x){          
            var leftval=$('.small-img').position().left+x;
            console.log(leftval)
            $('.small-img').animate({left:leftval},1000,'linear')
       }       
    }
}())
enlarge.init(4)


