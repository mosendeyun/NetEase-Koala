function sendAjax(url,opations){
    var _defalut={
        method:'GET',
        data:null
    }
    if(typeof opations==='object'){
        for(let key in _defalut){
            if(opations[key]){
                _defalut[key]=opations[key];
            }
        }
    }
    _defalut.method=_defalut.method.toUpperCase();
    if(_defalut.method==='GET'){
        url+=url.indexOf('?')===-1 ? '?':'&';
        for(let i in _defalut.data){
            url+=`${i}=${_defalut.data[i]}&`;
        }
        url+=`_=${Date.now()}`;
        _defalut.data=null;
    }else if(_defalut.method==='POST'){
        _defalut.data=JSON.stringify(_defalut.data);
    }else{
        return;
    }
    const xhr=new XMLHttpRequest();
    xhr.open(_defalut.method,url,true);
    xhr.send(_defalut.data);
    return new Promise((resolve,reject)=>{
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status===200){
                    resolve(xhr.responseText);
                }else{
                    reject(xhr.responseText);
                }
            }
        }
    })
}

//jsonp只适用于GET请求;
function sendJsonp(url,data,callback){
    var $script=document.createElement('script');
    var flag=url.indexOf('?') ? "?" : "&";
    url+=flag;
    if(typeof data==='object'){
        for(var i in data){
            url+=`${i}=${data[i]}&`
        }
    }
    url+=`_=${Date.now()}`;
    $script.src=url;
    document.body.appendChild($script);
}

//cookie封装;
var cookie=(function(){
    return {
        getItemh(key){
            return this.getObject()[key];
        },
        getObject(){
            var obj={};
            var cookie=document.cookie.split('; ');
            cookieAll.forEach(item => {
                var _item=item.split('=');
                obj[_item[0]]=_item[1];
            })
            return obj;
        },
        setItem(key,value,day){
            var sec=day*24*3600;
            document.cookie=`${key}=${value};max-age=${sec}`;
        },
        removeItem(key){
            this.setItem(key,'',-1);
        },
        clear(){
            var obj=this.getObject();
            for(var i in obj){
                this.removeItem(i);
            }
        }
    }
}())
