import { EventEmitter } from "events";

export default (time, callback) => {
  const emitter = new EventEmitter();
  const timeInterval = 50;
  const startDate = Date.now();
  let error = null;
  let counter = 0;
  
  const tick = () => {
    const currentDate = Date.now();
    if (currentDate - startDate >= time) {
      return callback(error, counter);
    }
    process.nextTick(() => {
      if (currentDate % 5) {
        error = new Error("The timestamp is divisible by 5.");
        return emitter.emit("error", "The timestamp is divisible by 5.");
      }
      emitter.emit("tick");
      counter++;
    });
    setTimeout(tick, timeInterval);
  }
  
  tick();

  return emitter;
}