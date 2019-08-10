const EventEmitter = require("events");

const emitter = new EventEmitter();

//listen for emit event
emitter.on("logging", eventArg => {
  console.log("Logger called", eventArg);
});

const message = "hello";
//raise logging event
emitter.emit("logging", { data: message });
