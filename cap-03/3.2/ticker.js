import { EventEmitter } from "events";

export default (time, callback) => {
  const emitter = new EventEmitter();
  const timeInterval = 50;
  let counter = 0;
  
  const tick = () => {
    if ((counter * timeInterval) >= time) {
      return callback(null, counter);
    }
    emitter.emit("tick");
    counter++;
    setTimeout(tick, timeInterval);
  }
  
  setTimeout(tick, timeInterval);

  return emitter;
}