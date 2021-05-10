#!/usr/bin/env node

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const demoUrl =
  "https://5muwvtgup6.execute-api.us-east-1.amazonaws.com/demo/images";

(async () => {
  const data = new FormData();
  data.append(
    "cat2.jpeg",
    fs.createReadStream("./cat2.jpeg", { encoding: "base64" })
  );

  console.log(data.getHeaders());

  const req = axios({
    method: "post",
    url: demoUrl,
    headers: data.getHeaders(),
    data,
  });

  console.log(
    "===== SENDING REQUEST =====\n",
    req.headers,
    req.data,
    "\n\n\n\n"
  );

  const res = await req;

  console.log("===== RESPONSE =====\n", res.headers, res.data);
})();
