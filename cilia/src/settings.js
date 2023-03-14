import { getSync, getFrom, postSync, postTo } from "./req.js";

var user = USER;

function Setting(a, opts){
  this.name = a;
  if(opts) this.options = opts;
}

Setting.prototype = {
  prevVal: null,
  name: null,
  init(){
    if(this.get()) return;
    this.set('default');
  },
  set(val){
    var ths = this;
    var data = {};
    data[ths.name] = val;
    if(this.options && !this.options.find(f => f == val)){
      val = this.options[val];
      if(!val) return null;
    }
    return postSync('self/settings', data) && $(window).trigger('settings:'+ths.name, val);
  },
  get(){
    var ths = this;
    var data = getSync('self/settings');
    return data ? data[ths.name] : null;
  }
}

export default Setting;