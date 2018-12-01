var register = (function () {

    return {
        init: function (ele) {            
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['register-btn'];
            this.$usernameInp = this.$ele['username'];
            this.$passwordInp = this.$ele['password'];
            this.event();
        },
        event: function () {
            var _this = this;
            // 提交按钮
            this.$loginBtn.onclick = function () {
                    // 发送ajax，验证用户名和密码
                    //把要发送的数据写成对象
                    if (_this.$usernameInp.value == "" && _this.$passwordInp.value == "") {
                        alert("用户名或密码不能为空")
                    } else {
                        var params = {
                            method: 'post',
                            data: {
                                username: _this.$usernameInp.value,
                                password: _this.$passwordInp.value
                            },
                            success: function (data) {
                                //JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象
                                data = JSON.parse(data);
                                //register是寄存的意思????
                                //执行register函数,传值??
                                _this.register(data);
                            }
                        }
                        sendAjax('http://localhost/wangyikaola/php/register.php', params);
                    }
                },
                // 判断用户名称是否存在
                this.$usernameInp.addEventListener('change', function () {
                    var namestr = _this.$usernameInp.value;
                    //用户名正则，4到16位（字母，数字，下划线，减号）
                    var regstr = /^[a-zA-Z0-9_-]{4,16}$/;
                    var $hint =document.querySelector('#hint');
                    if (!regstr.test(namestr)) {
                        $hint.innerHTML="用户名正则，4到16位（字母，数字，下划线，减号)";
                        // alert("用户名正则，4到16位（字母，数字，下划线，减号）");
                        return false;
                    } else {
                        $hint.innerHTML="";
                        var params = {
                            method: 'post',
                            data: {
                                username: _this.$usernameInp.value
                            },
                            success: function (data) {
                                data = JSON.parse(data);
                                _this.checkUsername(data);
                            }
                        }
                        sendAjax('http://localhost/wangyikaola/php/check_username.php', params);
                    }
                }, false); //可选。布尔值，指定事件是否在捕获或冒泡阶段执行。
            //false- false- 默认。事件句柄在冒泡阶段执行
        },
        //后两部都是判断http请求的返回值
        checkUsername: function (data) {
            //http网络请求 statusCode(状态码)
            //200（成功）  服务器已成功处理了请求。通常，这表示服务器提供了请求的网页。
            if (data.code == 200) {
                //设置属性值：HTMLElementObject.className=classname
                //设置正确的边框
                this.$usernameInp.className = 'inp success';
                //disabled 禁用属性是一个 boolean(布尔) 属性。
                this.$loginBtn.disabled = '';
            } else {
                //弹出提示信息?
                alert(data.msg);
                this.$usernameInp.className = 'inp error';
                this.$loginBtn.disabled = 'true';
            }
        },
        register: function (data) {
            if (data.code == 200) {
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        }
    }

}())