/*
    # 按照宽高比例设定html字体, width=device-width initial-scale=1版
    # @pargam win 窗口window对象
    # @pargam option{
      designWidth: 设计稿宽度，必须
      designHeight: 设计稿高度，不传的话则比例按照宽度来计算，可选
      designFontSize: 设计稿宽高下用于计算的字体大小，默认20，可选
      callback: 字体计算之后的回调函数，可选
    }
    # return Boolean;
    # xiaoweili@tencent.com
    # ps:请尽量第一时间运行此js计算字体
*/
var moduleExports = {
  fontInit(option) {
    var designWidth = option.designWidth;
//  var designHeight = option.designHeight;
    var designFontSize = option.designFontSize || 10;
    var callback = option.callback || null;
    var root = document.documentElement;
    var newSize;
    root.style.width = '100%';

    function _getNewFontSize() {
//    var scale = Math.max(window.screen.width / designWidth, window.screen.height / designHeight);
      var scale = window.screen.width / designWidth;
      return parseInt(scale * 10000 * designFontSize) / 10000;
    }
    newSize = _getNewFontSize();

    if (newSize + 'px' !== getComputedStyle(root)['font-size']) {
      root.style.fontSize = newSize + 'px';
      return callback && callback(newSize);
    };
  },
};

module.exports = moduleExports;
