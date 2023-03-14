$.fn.extend({add: function(classe, name, text){
  if(classe instanceof $.fn.init) return $(this).append(classe);
  var e = elementor(classe, name, this);
  if(text) e.text(text);
  return e;
}});