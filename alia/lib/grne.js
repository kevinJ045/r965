

import { pickRandom, randFrom } from '../misc/rand.js';

var a_z = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var A_Z = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var toArray = function(list) {
  return Array.prototype.slice.call(list || [], 0);
};

function rand(count, nonum, onlynum){
  if(typeof count != "number" || count <= 0) count = 48;
  var time = new Date().getTime().toString();
  var rnd = new String();
  for (var i = 0; i < count; i++) {
    var args = [];
    if(!nonum) args.push(randFrom(0,9));
    if(!onlynum) args.push(A_Z[randFrom(0,A_Z.length-1)]);
    if(!nonum) args.push(randFrom(i,randFrom(i*2,i*4)));
    if(!nonum) args.push(time[randFrom(0,time.length-1)]);
    if(!onlynum) args.push(a_z[randFrom(0,a_z.length-1)]);
    if(onlynum && nonum) args.push(randFrom(randFrom(randFrom(0,9),randFrom(0,9)),randFrom(randFrom(0,9),randFrom(0,9))));
    var r = pickRandom.apply(null, args);
    rnd += r;
  }
  return rnd;
}

export default function grne (times, nonum, onlynum) {
  return rand(times, nonum, onlynum);
};