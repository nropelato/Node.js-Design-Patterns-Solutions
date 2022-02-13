import ticker from "./ticker.js";

ticker(200, (err, ticks) => console.log(`Callback returned ${ticks} ticks.`))
  .on("tick", () => console.log("Tick"));