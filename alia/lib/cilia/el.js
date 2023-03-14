var $app = $("#app-root");
var _app = $app[0];

function el(classe, name, container){
    if(!name) name = 'div';
    if(!container) container = $app; 
    var el = $('<'+name+' />');
    el.addClass(classe);
    el.appendTo(container);
    return el;
}

export { el, $app, _app };