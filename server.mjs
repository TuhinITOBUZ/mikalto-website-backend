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
      homestay1: data.homestay1,
      homestay2: data.homestay2,
      homestay3: data.homestay3,
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
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const data = Buffer.concat(chunks).toString();
      console.log(data);
      // if (data.length > 0) {
      //   let list = [];
      //   async function readFile() {
      //     const data = await fs.readFile("./formData.txt", "utf8");
      //     list.push(JSON.parse(data));
      //     console.log(list);
      //   }
      //   readFile();
      //   list.push(data)
      //   console.log(list);
      //   async function writeFile() {
      //     await fs.writeFile("./formData.txt", list);
      //   }
      //   writeFile();
      // }
    });
    res.end(getRequestData(req));
  } catch (err) {
    console.log(err);
  }
});

server.listen(port, () => {
  console.log("Server started ... ");
});
