import http from "http";
import * as data from "./data.mjs";
import * as fs from "fs/promises";
import { parse } from "querystring";

const port = 5000;

function getRequestData(req) {
  let status = 200;
  if (req.url === "/") {
    return JSON.stringify({
      status,
      text : "Welcome to Rest API"
    });
  } else if (req.url === "/page-banner") {
    return JSON.stringify({
      status,
      pageBanner: data.pageBanner,
    });
  } else if (req.url === "/homestays") {
    return JSON.stringify({
      status,
      homestays: data.homestays,
    });
  } else if (req.url === "/show-rooms") {
    return JSON.stringify({
      status,
      showRooms: data.showRooms,
    });
  }
  else if (req.url === "/our-hotel-services"){
    return JSON.stringify({
      status,
      ourHostelServices : data.ourHostelServices,
    })
  } 
  else if (req.url === "/services"){
    return JSON.stringify({
      status,
      services : data.services,
    })
  } 
  else if (req.url === "/reviews"){
    return JSON.stringify({
      status,
      reviews : data.reviews,
    })
  } 
  else if (req.url === "/location"){
    return JSON.stringify({
      status,
      location : data.locationSection,
    })
  } 
  else {
    return JSON.stringify("Page not available.");
  }
}

async function writeFormData(formData) {
  const dataFromFile = await fs.readFile("./formData.txt", "utf8");
  const fileData = JSON.parse(dataFromFile);
  fileData.push(formData);
  await fs.writeFile("./formData.txt", JSON.stringify(fileData));
}

const server = http.createServer((req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    let formData = "";
    req.on("data", (formDataPeices) => {
      formData = formDataPeices.toString();
    });
    req.on("end", () => {
      if (Object.keys(formData).length !== 0) {
        writeFormData(parse(formData));
      }
    });
    res.end(getRequestData(req));
  } catch (err) {
    console.log(err);
  }
});

server.listen(port, () => {
  console.log("Server started ... ");
});
