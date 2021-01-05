/* eslint-disable */
// defineReactive函数，Observe的核心，劫持数据，在getter中向Dep（调度中心）添加观察者，在setter中通知观察者更新。
function defineReactive(obj, key, val, customSetter, shallow) {
  //监听属性key
  //关键点：在闭包中声明一个Dep实例，用于保存watcher实例
  var dep = new Dep();

  var getter = property && property.get;
  var setter = property && property.set;

  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  //执行observe，监听属性key所代表的值val的子属性
  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      //获取值
      var value = getter ? getter.call(obj) : val;
      //依赖收集：如果当前有活动的Dep.target(观察者--watcher实例)
      if (Dep.target) {
        //将dep放进当前观察者的deps中，同时，将该观察者放入dep中，等待变更通知
        dep.depend();
        if (childOb) {
          //为子属性进行依赖收集
          //其实就是将同一个watcher观察者实例放进了两个dep中
          //一个是正在本身闭包中的dep，另一个是子属性的dep
          childOb.dep.depend();
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      //获取value
      var value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      //新的值需要重新进行observe，保证数据响应式
      childOb = observe(newVal);
      //关键点：遍历dep.subs，通知所有的观察者
      dep.notify();
    }
  });
}
