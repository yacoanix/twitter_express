const sendmail = require("sendmail")();

sendmail({
  from: "petazetamaxi@gmail.com",
  to: "aymedeyacoan@gmail.com",
  subject: "test sendmail",
  html: "Mail of test sendmail",
}, function (err, reply) {
  console.log(err && err.stack);
  console.dir(reply);
});