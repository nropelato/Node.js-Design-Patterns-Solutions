import ticker from "./ticker.js";

ticker(200, (err, ticks) => {
  if (err) console.error(`Error returned on callback: ${err.message}`);
  console.log(`Callback returned ${ticks} ticks.`);
})
  .on("tick", () => console.log("Tick"))
  .on("error", (errorMessage) => console.error(`Error returned on event: ${errorMessage}`));