var product_js = (function () {
    var $ul = $('.tbox');
    var shopList = localStorage.shopList || '[]';
    shopList = JSON.parse(shopList);
    
    return {
        init() {
            this.events();
            //第一步获取商品内容
            this.getData()
           
        },
        //获取商品内容
        getData() {
            $.get('json/productInfor.json', this.insertData, "json");
        },
        //商品添加dom中
        insertData(data) {
            //使用数组,优化性能,
            var str = []
            for (var i = 0; i < data.length; i++) {
                var li = `<li class="goods" id="${data[i].id}">
                                    <div class="img"><a href="product.html"><img src="img/product (${data[i].id}).jpg" alt=""></a></div>
                                    <div class="prices"><i>￥</i><span class="cur">${data[i].price}</span><span class="marketprice">￥<del>${data[i].del}</del></span></div>
                                    <div class="title">${data[i].name}</div>
                                    <div class="saelsinfo"><span class="activity z-self">自营</span><span class="activity z-benefit">${data[i].type}</span></div>
                                    <div class="inp"><input id="shu" type='number' value='1'/></div> 
                                    <div class="btn"><button class='btn btn-danger'>添加购物车</button></div>
                                    <div class="goodsinfo clearfix"><span class="comments">网易考拉自营</span><span class="proPlace">${data[i].proPlace}</span></div>
                            </li>`
                str.push(li);
            }
            $ul.html(str.join(''));
            
        },
        addShop(obj) {


            // 从本地数据库获取数据， 查看商品是否已拥有。
            // -> 拥有 在原来的基础上累加数量
            // -> 未拥有 新增一条新的数据
            // 假设把商品存到了shopList属性里

            // 在没有添加数据时，字段值为undefined，给一个默认数组
            // var shopList = localStorage.shopList || '[]'
            // shopList = JSON.parse(shopList);
            // 添加一个锁
            var add = true;
            for (var i = 0; i < shopList.length; i++) {
                //判断已添加商品列表中是否有现在添加的商品
                if (obj.id == shopList[i].id) {
                    //如果函数能进来的话,证明添加的商品,已经存在购物车内,不需要添加新的数据
                    add = false;
                    //商品数量进行累计
                    shopList[i].count += obj.count;
                    //找到商品以后,终止循环
                    break;
                }
            }
            if (add) {
                // 如果没找到， 把当前商品数据添加到本地数据库
                shopList.push(obj);
            }
            //真正意义把数据库存储到本地数据库
            localStorage.shopList = JSON.stringify(shopList);

            console.log(localStorage.shopList);
        },
        events() {
            var _this = this;
            $ul.on('click', '.btn', function () {
                //目的:获取商品信息,存到本地数据库
                var li = $(this).closest('li');
                var divAll = li.children('div');

                var obj = {
                    //再次添加商品时,通过id判断是否已拥有
                    id: li.attr('id'),
                    //获取购买数量
                    count: Number(divAll.find("input").val()),
                    //获取商品名称
                    name: divAll.eq(2).html(),
                    //获取商品价格
                    price: Number(divAll.find(".cur").html())
                }
                _this.addShop(obj);
                $("#rightBarNew").show().animate({
                    width: '250px'
                }, 200).fadeOut(1000);
            })
        }

    }

})()
product_js.init();



$('.header').load('common.html .top');
$('.footer').load('common.html #docFoot');