<h1>Extract cxserver configuration and export to CSV</h1>


## About The Project

This program is a straightforward tool that enables the parsing of Wikimedia YAML config files. The config files are taken from [Wikimedia-services-cxserver](https://github.com/wikimedia/mediawiki-services-cxserver/tree/master/config). The resulting data is exported as a CSV file that includes information such as the source language, target language, translation engine, and whether it is the preferred engine.

The tool functions by parsing these files and consolidating all of the supported pairs into a single flat, in-memory structure. It then exports the resulting data in the form of a CSV file containing all languages pairs.

The configuration files have different structures, but most have the source language as the top-level key and target languages as a list of values under that key. It is important to watch out for the "handler" key, which indicates a non-standard interpretation for the file. Some YAML files, such as MWPageLoader.yaml, languages.yaml, JsonDict.yaml, Dictd.yaml, and mt-defaults.wikimedia.yaml, should be ignored.

The mt-defaults.wikimedia.yaml file is particularly important because it sets the default translation engine for each language pair. This file lists each supported source language and its associated default translation engine.

Overall, the app involves parsing and organizing data from multiple YAML configuration files to create a comprehensive list of supported language pairs for machine translation, along with associated translation engines and default preferences.


## Installation/Usage <br>
  1. clone repository
  ```sh
   git clone https://github.com/leilakaltouma/cxserver.git
  ```
  2. npm install
  3. node app.js




