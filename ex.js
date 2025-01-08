const bcrypt = require("bcrypt");

const password = "mySecurePassword";

bcrypt.hash(password, 10, (err, hash) => {
  if (err) console.log(err);

  hashed = hash;
  return hashed;
});
console.log(hashed);

bcrypt.compare(password, hashed, function (err, result) {
  console.log(result);

  if (result) {
    console.log("Password is valid!");
  } else {
    console.log("Password is invalid!");
  }
});
