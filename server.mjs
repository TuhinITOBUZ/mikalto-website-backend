import http from "http";
import * as data from "./data.mjs";
import * as fs from "fs/promises";

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
    });
  } else {
    return JSON.stringify("Page not available.");
  }
}

const server = http.createServer((req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    const formData = [];
    req.on("data", (formDataPeices) => {
      formData.push(formDataPeices);
    });
    req.on("end", () => {
      let totalFormData = Buffer.concat(formData).toString();
      if (totalFormData.length > 0) {
        (async function () {
          const dataFromFile = await fs.readFile("./formData.txt", "utf8");
          totalFormData += ";" + dataFromFile;
          await fs.writeFile("./formData.txt", totalFormData);
        })();
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
