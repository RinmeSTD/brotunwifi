var request = require("request");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function checkInternet(cb) {
  require("dns").lookup("rinme.github.io", function (err) {
    if (err && err.code == "ENOTFOUND") {
      cb(false);
    } else {
      cb(true);
    }
  });
}

function login(pswd, ID) {
  var headers = {
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.9",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie: "Sessionid=2253909350-1",
    Origin: "http://1.1.1.3",
    Referer:
      "http://1.1.1.3/ac_portal/20210224221911/pc.html?template=20210224221911&tabs=pwd&vlanid=0&_ID_=0&switch_url=&url=&controller_type=&mac=48-5f-99-a7-d3-5d",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
  };

  var dataString =
    `opr=pwdLogin&userName=${pswd}&pwd=${ID}&rememberPwd=1`;

  var options = {
    url: "http://1.1.1.3/ac_portal/login.php",
    method: "POST",
    headers: headers,
    body: dataString,
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }

  request(options, callback);
}

rl.question("ID ? ", function (ID) {
  rl.question("Password ? ", function (pswd) {
    console.log(`${ID}, is ID and Password is ${pswd}`);
    console.log("Connecting to internet");
    login(`${ID}`, `${pswd}`);
  });
});
