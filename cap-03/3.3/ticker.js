import { EventEmitter } from "events";

export default (time, callback) => {
  const emitter = new EventEmitter();
  const timeInterval = 50;
  const startDate = Date.now();
  let counter = 0;
  
  const tick = () => {
    if ((Date.now() - startDate) >= time) {
      return callback(null, counter);
    }
    // need to fire tick event in the next tick to prevent the unleashing Zalgo effect, since the emit function is synchronous
    process.nextTick(() => {
      emitter.emit("tick")
      counter++
    });
    setTimeout(tick, timeInterval);
  }
  
  tick();

  return emitter;
}