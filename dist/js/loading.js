var loading = function (imgs, movePage) {
    var id = this.id;
    if (this.imgs === undefined) {

        this.imgs = (imgs || []).length;
        this.loadNum = 0;
        window[id] = this;

        for(s in imgs){
            var item = imgs[s],
                img = new Image;
            img.src = item; 
            img.onload = function (argument) {
                window[id].loader();
            }
        }

        $('.loadRate').text('0%');
        return this;

    }else{
        this.loadNum ++;
        $('.loadRate').text(((this.loadNum / this.imgs)*100 >> 0) +'%');
        if (this.loadNum < this.imgs) {
            return this;
        }    
    }
    window[id] = null;
    
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