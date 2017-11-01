/**
 * Created by Administrator on 2017/10/26.
 */
var redis = require("redis");
var config = {host:"172.16.0.104", port: 6370}
var sub = redis.createClient(config), pub = redis.createClient(config);
var msg_count = 0;

// sub.on("subscribe", function (channel, count) {
//   pub.publish("a nice channel", "I am sending a message.");
//   pub.publish("a nice channel", "I am sending a second message.");
//   pub.publish("a nice channel", "I am sending my last message.");
// });

sub.on("message", function (channel, message) {
  console.log("sub channel " + channel + ": " + message);
  msg_count += 1;
  if (msg_count === 3) {
    sub.unsubscribe();
    sub.quit();
    pub.quit();
  }
});

sub.subscribe("a nice channel");
