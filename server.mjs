import http from "http";
import * as data from "./data.mjs";
import * as fs from "fs/promises";
import { parse } from "querystring";

const port = 5000;

function getRequestData(req) {
  if (req.url === "/") {
    let status = 200;
    return JSON.stringify({
      status,
      pageBanner: data.pageBanner,
      homestays: data.homestays,
      locationSection: data.locationSection,
      activities: data.activities,
      servicesBanner: data.servicesBanner,
      wellnessService: data.wellnessService,
      giftCardService: data.giftCardService,
      spaService: data.spaService,
      adventureService: data.adventureService,
      showRooms: data.showRooms,
      text: data.text,
    });
  } else {
    return JSON.stringify("Page not available.");
  }
}

async function writeFormData(formData) {
  const dataFromFile = await fs.readFile("./formData.txt", "utf8");
  const fileData = JSON.parse(dataFromFile)
  fileData.push(formData)
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
        writeFormData(parse(formData))
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
