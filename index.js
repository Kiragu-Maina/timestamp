// index.js
// where your node app starts

// init project
var express = require('express');

const { format } = require('date-fns');

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const { unix } = require('moment');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});
// your first API endpoint...
// app.get("/api/:date", function (req, res) {
//   // const datestampParam = req.params.date;

//   // Assuming datestampParam is in the format "YYYY-MM-DD"
//   const unixTime = Math.floor(new Date("2015-12-25").getTime() / 1000);

//   const datenow = new Date(unixTime * 1000); // Convert seconds to milliseconds

//   const customFormat = format(datenow, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", { timeZone: 'GMT' });

//   console.log(datenow.toISOString());
//   res.json({ unix: unixTime, utc: customFormat });
// });

app.get("/api/:timestamp?", function (req, res) {
  if (!req.params.timestamp) {
    const now = new Date(); 
    const unixTime = Math.floor(now.getTime() / 1000);
    const customFormat = format(now, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", { timeZone: 'GMT' });

    return res.json({ unix: unixTime, utc: customFormat });

  }
  const timestampParam = req.params.timestamp;
  // Check if the parameter is a valid number
  try {
    if (isNaN(timestampParam)) {
      const unixTimes = Math.floor(new Date(timestampParam).getTime() / 1000);
      const unixTime = parseInt(`${unixTimes}000`);  // Append three zeros to the Unix timestamp
      console.log(unixTime);
      const datenow = new Date(unixTime);
      // Format the date using date-fns
      const customFormat = format(datenow, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", { timeZone: 'GMT' });
      return res.json({ unix: unixTime, utc: customFormat });
    }
  }
  catch {
    return res.json({ error: "Invalid Date" })
  }

  const unixTime = parseInt(timestampParam);
  const datenow = new Date(unixTime);

  // Format the date using date-fns
  const customFormat = format(datenow, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", { timeZone: 'GMT' });

  console.log(datenow.toISOString());
  res.json({ unix: unixTime, utc: customFormat });
});
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
