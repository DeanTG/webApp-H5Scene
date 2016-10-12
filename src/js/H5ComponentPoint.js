/* 散点图表组件对象 */
/**
* 创建散点图图文组件的构造函数
* cfg参数设置
* 组件绑定load 和leave 事件
*
*
*/
var H5ComponentPoint = function ( name, cfg ) {
    var component = new H5ComponentBase( name, cfg ),
        base = cfg.data[0][1]; //以第一个数据的大小为100%

    $.each( cfg.data, function(index, val) {
        var point = $('<div class="point"></div>'),
            per = (val[1]/base)*100 + "%",
            pointName = $('<div class="pointName">'+val[0]+'</div>'),
            pointRate = $('<div class="pointRate">'+(val[1])*100+'%</div>');
        pointName.append(pointRate)
        point.append(pointName);
        point.css({
            "width": per,
            "height": per,
            "backgroundColor": val[2] ? val[2]: "initial",
            "left": val[3] !== undefined && val[4] !== undefined ? val[3] : "initial",
            "top": val[3] !== undefined && val[4] !== undefined ? val[4] : "initial"
        });
        point.css('transition','all 1s '+index*.5+'s')
        component.append(point);
    }); 

    return component;
}
