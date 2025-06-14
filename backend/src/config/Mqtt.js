const mqtt = require("mqtt");
require("dotenv").config();

var options = {
  host: process.env.HOST_MQTT,
  port: process.env.PORT_MQTT,
  protocol: "mqtts",
  username: process.env.USERNAME_MQTT,
  password: process.env.PASSWORD_MQTT,
};

const client = mqtt.connect(options);

module.exports = client;
