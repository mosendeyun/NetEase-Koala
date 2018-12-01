var shop_js = (function () {
    //展示数据的盒子
    var $ul = $('.m-goods');
    //获取删除选择按钮
    var $deleteAll = $('.opt');
    //获取全选按钮
    var $selectAll = $('#selectAll');
    var shopList = localStorage.shopList || '[]';
    shopList = JSON.parse(shopList);

    return {
        //初始化函数
        init() {
            this.events();

            this.insertData(shopList);
        },
        insertData(data) {
            var str = ''
            for (var i = 0; i < data.length; i++) {
                var li = ` <li class="gooditm z-selected" id="${data[i].id}">
                                <div class="col0"><input type="checkbox" class="u-chk" name="selectGood" checked="checked"></div>
                                <div class="col1"><a class="imgwrap"><img src="img/minprod (${data[i].id}).png"></a></div>
                                <div class="col2"><span class="name">${data[i].name}</span></div>
                                <div id="price" class="col3">${data[i].price}</div>
                                <div class="col4"><input id="shu" type='number' value='${data[i].count}'></div>
                                <div id="num" class="col5"></div>
                                <div class="col6"><button class="del-btn">删除</button></div>
                            </li>`
                str += li;
            }
            $ul.html(str);


        },
        addShop(obj) {
            var add = true;
            //没有产品的时候,获取的是undifinde
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for (var i = 0; i < shopList.length; i++) {
                if (obj.id == shopList[i].id) {
                    add = false
                    shopList[i].count += obj.count;
                    break;
                }
            }
            if (add) {
                shopList.push(obj);
            }
            localStorage.shopList = JSON.stringify(shopList);
            console.log(localStorage.shopList)

        },
        //事件函数
        events() {
            var _this = this;
            $ul.on('change', '#shu', function () {
                //获取li
                var $li = $(this).closest('li');
                //获取文本值(商品更新后的数据)
                var val = $(this).val();
                //修改对应数据
                shopList[$li.index()].count = val;
                //存入本地数据库
                localStorage.shopList = JSON.stringify(shopList);
            })
            $ul.on('click', 'li', function (event) {
                console.log(event);



            })
            $ul.on('click', '.del-btn', function () {
                //
                var $li = $(this).closest('li');
                //删除数组中对应的数据
                //splice() 方法用于插入、删除或替换数组的元素
                shopList.splice($li.index(), 1);
                //存入到本地数据库
                localStorage.shopList = JSON.stringify(shopList);
                //移除dom元素
                $li.remove();
                if (shopList.length == 0) {
                    // alert(0);
                    $('.mainWrap').css("display", "none");
                    $('.m_nocart').css("display", "block");
                }
            })
            $selectAll.on('click', function () {
                //is() 方法用于查看选择的元素是否匹配选择器。
                //each() 方法为每个匹配元素规定要运行的函数。
                //prop() 方法设置或返回被选元素的属性和值。
                if ($(this).is(':checked')) {
                    $('input[name="selectGood"]').each(function () {
                        $(this).prop("checked", true);
                    });
                } else {
                    $('input[name="selectGood"]').each(function () {
                        $(this).prop("checked", false);
                    });
                }

                // 计算功能
                // var goodsCount = _this.$ul.find(".");
                // var

            })
            //删除勾选商品
            $deleteAll.on('click', function () {
                var items = $(".u-chk:checked");
                var len = items.length;
                for (var i = 0; i < len; i++) {
                    $(items[i]).parents(".gooditm").remove();
                }

            })

        }


    }
})()
shop_js.init();

$('.header').load('common.html #topNav');
$('.footer').load('common.html #docFoot');