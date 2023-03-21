import fs from "fs";
import YAML from "js-yaml";
import { createObjectCsvWriter } from "csv-writer";
import { TransformLanguages } from "./config/transform.js";

const csvWriter = createObjectCsvWriter({
  path: "output.csv",
  header: [
    { id: "sourceLanguage", title: "source language" },
    { id: "targetLanguage", title: "target language" },
    { id: "engineName", title: "translation engine" },
    { id: "preferedEngine", title: "is preferred engine?" },
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

//loop trough each fileName
files.forEach(baseName  => {
  const file = fs.readFileSync(`./config/${baseName}.yaml`, "utf8");
  let doc = YAML.load(file);

  //check if 'transform.js' needs to be used
  if (doc["handler"] === "transform.js") {
    const langs = new TransformLanguages(doc);
    doc = langs.languages;
  }

  //loop through the values
  for (const [sourceLanguage, targetLanguages] of Object.entries(doc)) {
    targetLanguages.forEach((targetLanguage) => {
      result.push({
        sourceLanguage: sourceLanguage,
        targetLanguage: targetLanguage,
        engineName: baseName,

        //check if the engine is the default engine for that language pair
        preferedEngine:
          mtDefaults[`${sourceLanguage}-${targetLanguage}`] === baseName  ? true : false,
      });
    });
  }
})

//output as CSV
csvWriter.writeRecords(result).then(() => {
  console.log("...Done");
});



