#!/usr/bin/env node

const axios = require("axios");

const demoUrl =
  "https://5muwvtgup6.execute-api.us-east-1.amazonaws.com/demo/images/cat.jpeg";

(async () => {
  console.log("===== SENDING REQUEST =====\n");

  try {
    const res = await axios({
      method: "get",
      url: demoUrl,
    });
    console.log("===== RESPONSE =====\n", res);
  } catch (err) {
    console.log(err?.response);
  }
})();
