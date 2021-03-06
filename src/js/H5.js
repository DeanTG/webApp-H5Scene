/* 内容管理对象 */
/**
* 创建h5场景构造函数
* 添加addpage 方法和 addcomponent方法,return this 实现链式调用
*
*
*
*/
// var jdata = [] //JSON.stringify[jdata]
var H5 = function () {
    this.id = ('h5_' + Math.random()).replace('.', '_');
    this.page = []; //用于添加创建的page页
    this.el = $('<div class="h5" id="'+this.id+'"></div>').hide();

    $('body').append(this.el);

    // 新增页
    this.addPage = function ( className ) {
        // jdata.push({isPage : true, className : className});
        var page = $('<div class="h5_page section"></div>');
        if (name != undefined) {
            page.addClass('h5_page_' + className);
        }
        // if (text != undefined) {
        //     page.text(text);
        // }
        this.el.append(page);
        this.page.push(page);//js push方法后原来的jq对象被转换
        if (typeof this.whenAddPage === 'function') {
            this.whenAddPage();
        };
        return this;
    }

    // 新增组件
    this.addComponent = function (name, cfg) {
        // jdata.push({isPage : false, name : name, cfg : cfg});
        var cfg = cfg || {};
        cfg = $.extend( {type: "base"}, cfg ); //合并cfg参数

        var component,
            page = this.page.slice(-1)[0];//选取数组中最后一个添加的page通过［0］转为标准的jq对象

        // 判断type类型实例化不同的组件对象
        switch( cfg.type ){
            case "base":
                component = new H5ComponentBase(name, cfg);
            break;
            case "point":
                component = new H5ComponentPoint(name, cfg);
            break;
            case "bar":
                component = new H5ComponentBar(name, cfg);
            break;
            default:
        }
        
        page.append(component);
        return this;
    }

    // h5对象初始化呈现
    this.loader = function ( imgs, movePage ) {
        this.el.fullpage({
            onLeave: function (index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function (anchorLink, index) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show(); //控制资源加载完成之后展示页面

        movePage ? this.el.fullpage.moveTo( movePage ) : function(){return true};
    }
    this.loader = typeof loading === 'function' ? loading : this.loader;
    return this;
}