const { transform } = require("@svgr/core");

const fs = require("fs");

function replaceInSvg(svgCode) {
  return svgCode
    .replaceAll('fill="red"', 'fill="currentColor"')
    .replaceAll('fill="#ff0000"', 'fill="currentColor"')
    .replaceAll('stroke="red"', 'stroke="currentColor"')
    .replaceAll('stroke="#ff0000"', 'stroke="currentColor"');
}

const OUT_DIR = "../../projects/cue-ui/src/lib/components/icons/";
const JSON_FILE = OUT_DIR + "svg.json";
const TYPE_FILE = OUT_DIR + "types.ts";

function processSvg(filePath) {
  const svgCode = replaceInSvg(fs.readFileSync(filePath, "utf8"));
  return svgCode;
}

function processDirectory(dir) {
  const icons = {};
  fs.readdirSync(dir).forEach((filename) => {
    if (!filename.endsWith(".svg")) return;
    const svg = processSvg(dir + "/" + filename);
    icons[filename.split(".")[0]] = svg;
  });
  return icons;
}

const icons = processDirectory("icons");
fs.writeFileSync(JSON_FILE, JSON.stringify(icons, null, 2));
fs.writeFileSync(
  TYPE_FILE,
  "export type IconName = '" + Object.keys(icons).join("'|'") + "'"
);
