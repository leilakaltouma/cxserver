// const fs = require('fs')
import fs from "fs";
import YAML from "js-yaml";
import { createObjectCsvWriter } from "csv-writer";
import { TransformLanguages } from "./config/transform.js";

const csvWriter = createObjectCsvWriter({
  path: "langs.csv",
  header: [
    { id: "sourceLanguage", title: "source language" },
    { id: "targetLanguage", title: "target language" },
    { id: "engineName", title: "translation engine is" },
    { id: "preferedEngine", title: "preferred engine" },
  ],
});

const result = [];
//list of all files that need to be parsed
const files = [
  "Apertium",
  "Elia",
  "Flores",
  "Google",
  "LingoCloud",
  "OpusMT",
  "TestClient",
  "Yandex",
  "Youdao",
];
//load default engine list
const mtDefaults = YAML.load(
  fs.readFileSync(`./config/mt-defaults.wikimedia.yaml`, "utf8")
);

//loop trough each file
for (let i = 0; i < files.length; i++) {
  const file = fs.readFileSync(`./config/${files[i]}.yaml`, "utf8");
  let doc = YAML.load(file);

  //check if 'transform.js' needs to be used
  if (doc["handler"] === "transform.js") {
    const langs = new TransformLanguages(doc);
    doc = langs.languages;
  }

  //loop through the values
  for (const [key, value] of Object.entries(doc)) {
    value.forEach((x) => {
      result.push({
        sourceLanguage: key,
        targetLanguage: x,
        engineName: files[i],

        //check if the engine is the default engine for that lnaguage pair
        preferedEngine:
          mtDefaults[`${key}-${x}`] === files[i] ? "true" : "false",
      });
    });
  }
}

//output as CSV
csvWriter.writeRecords(result).then(() => {
  console.log("...Done");
});



