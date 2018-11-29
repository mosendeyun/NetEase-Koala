var swiper = new Swiper('.qf-banner', {
    autoplay: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<li class="' + className + '">' + (index + "") + '</span>';
        },
    },

});

var $m_shopcartnew = $('.m-shopcartnew');
var getParamsByUrl = (function () {
    /*已对象存储地址栏信息*/
    var params = {};
    var search = location.search;
    if (search) {
        search = search.replace('?', '');
        /*如果有多个键值对*/
        var arr = search.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');
            params[itemArr[0]] = itemArr[1];
        });
    };
    return params;
}());
