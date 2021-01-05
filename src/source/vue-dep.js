/*eslint-disable*/
//Dep构造函数
var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};
//向dep的观察者列表subs添加观察者
Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};
//从dep的观察者列表subs移除观察者
Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};
Dep.prototype.depend = function depend() {
  //依赖收集：如果当前有观察者，将该dep放进当前观察者的deps中
  //同时，将当前观察者放入观察者列表subs中
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};
Dep.prototype.notify = function notify() {
  // 循环处理，运行每个观察者的update接口
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

//Dep.target是观察者，这是全局唯一的，因为在任何时候只有一个观察者被处理。
Dep.target = null;
//待处理的观察者队列
var targetStack = [];

function pushTarget(_target) {
  //如果当前有正在处理的观察者，将他压入待处理队列
  if (Dep.target) {
    targetStack.push(Dep.target);
  }
  //将Dep.target指向需要处理的观察者
  Dep.target = _target;
}

function popTarget() {
  //将Dep.target指向栈顶的观察者，并将他移除队列
  Dep.target = targetStack.pop();
}
