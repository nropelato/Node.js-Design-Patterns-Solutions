import { EventEmitter } from "events";
import { readFile } from "fs";

export default class FindRegex extends EventEmitter {
  constructor(regex) {
    super()
    this.regex = regex
    this.files = []
  }

  addFile(file) {
    this.files.push(file)
    return this
  }

  find() {
    process.nextTick(() => this.emit("start", this.files)) // schedules the task in the event queue before any other I/O tasks, runs faster faster but can lead to I/O starvation under certain circunstances
    setImmediate(() => this.emit("start", this.files)) // schedules the task after the other I/O events, slower but won't stop I/O tasks indefinitely
    for (const file of this.files) {
      readFile(file, "utf8", (err, data) => {
        if (err) {
          this.emit("error", err)
        }
        this.emit("fileread", file)
        
        const matches = data.match(this.regex)
        if (matches) {
          matches.forEach(match => this.emit("match", file, match))
        }
      });
    }
    return this
  }
}