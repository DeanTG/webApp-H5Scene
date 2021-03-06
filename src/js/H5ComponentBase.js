/* 基本图文组件对象 */
/**
* 创建基础图文组件的构造函数
* cfg参数设置
* 组件绑定load 和leave 事件
*
*
*/
var H5ComponentBase = function ( name, cfg ) {
    var cfg = cfg || {},
        id = ( "h5_c_"+Math.random() ).replace('.', '_'),
        cls = " h5_component_" + cfg.type,
        component = $('<div class="h5_component h5_component_name_'+name+cls+'" id="'+id+'"></div>');

    //cfg 设置各个参数
    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.bg && component.css("backgroundImage", "url("+cfg.bg+")");
    cfg.css && component.css(cfg.css);
    if( cfg.center === true ){
        component.css({
            "marginLeft": -cfg.width/4 + 'px',
            "left": "50%"
        });
    }

    component.on('onLeave', function() {
        var timer = setTimeout(function(){
            clearTimeout(timer);
            component.addClass(cls + '_leave').removeClass(cls + '_load');
            cfg.animateIn && component.animate( cfg.animateOut );
        }, cfg.delay || 0);
        return false;      
    });
    component.on('onLoad', function() {
        component.addClass(cls + '_load').removeClass(cls + '_leave');
        cfg.animateIn && component.animate( cfg.animateIn );
        return false;  
    });

    return component;
}