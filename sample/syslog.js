/**
 * Created by Administrator on 2017/10/26.
 */
// Copyright 2015 Stephen Vickers

var syslog = require("syslog-client");

if (process.argv.length < 5) {
  console.log ("usage: udp-client <target> <port> <facility> <severity> "
    + "<syslog-hostname> <message>");
  process.exit (1);
}
console.log(process.argv);
var target         = process.argv[3];
var port           = parseInt(process.argv[4]);
var facility       = process.argv[5];
var severity       = process.argv[6];
var syslogHostname = process.argv[7];
var message        = process.argv[8];

var createOptions = {
  syslogHostname: syslogHostname,
  transport: syslog.Transport.Tcp,
  port: port
};
console.log(createOptions)
var client = syslog.createClient(target, createOptions);

client.on("error", function(error) {
  console.error(error);
  client.close();
});

client.on("close", function() {
  console.log("connection closed");
});

var logOptions = {
  facility: syslog.Facility[facility],
  severity: syslog.Severity[severity]
};

for (var i = 0; i < 10; i++) {
  client.log(message, logOptions, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.log("sent message successfully");
    }
  });
}

// node syslog.js udp-client 172.16.0.104 514 Local0 Informational ss {"test":"msg2"}
