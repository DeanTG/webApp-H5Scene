/* 柱图组件对象 */
/**
* 创建基础图文组件的构造函数
* cfg参数设置
* 组件绑定load 和leave 事件
*
*
*/
var H5ComponentBar = function ( name, cfg ) {
    var component = new H5ComponentBase( name, cfg );

    $.each( cfg.data, function(index, val) {
        var line = $('<div class="line"></div>'),
            name = $('<div class="name"></div>'),
            rate = $('<div class="rate"></div>'),
            per = $('<div class="per"></div>'),
            width = (val[1])*100 + "%";

        name.text(val[0]);
        rate.css("width", width).html('<div class="bg"></div>');
        per.text(width)
        line.append(name).append(rate).append(per);
        component.append(line);
    });

    return component;
}
