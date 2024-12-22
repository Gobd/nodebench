import {
  readdir,
  readFile,
  writeFile,
  stat,
  mkdir,
  rmdir,
} from "node:fs/promises";
import { parse } from "node:path";
import { Chart } from "chart.js/auto";
import { createCanvas } from "canvas";

const dirs = ["charts", "tables"];
for (const dir of dirs) {
  const dirExists = await stat(`./results/${dir}`).catch(() => false);
  if (dirExists) {
    await rmdir(`./results/${dir}`, { recursive: true });
  }
}

const files = await readdir("./results");

for (const dir of dirs) {
  await mkdir(`./results/${dir}`);
}

const confs = {
  reqs: {
    label: "Reqs/s",
  },
  meanLat: {
    label: "Mean Latency",
  },
  maxLat: {
    label: "Max Latency",
  },
};

for (const key in confs) {
  confs[key].table = {};
  confs[key].conf = {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: confs[key].label,
          data: [],
          backgroundColor: [],
        },
      ],
    },
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: "black",
        },
      },
    },
    plugins: [
      {
        id: "customCanvasBackgroundColor",
        beforeDraw: (chart, args, options) => {
          const { ctx } = chart;
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = options.color;
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    ],
  };
}

let colors = files.length;
let colorNum = 0;

function selectColor() {
  if (colors < 1) colors = 1;
  return "hsl(" + ((colorNum * (360 / colors)) % 360) + ",100%,50%)";
}

for (const file of files) {
  const parsedFile = parse(file);
  if (parsedFile.ext !== ".json") {
    continue;
  }
  const data = JSON.parse(await readFile(`./results/${file}`, "utf8"));
  const label = parsedFile.name;
  const r = data.result;
  const color = selectColor();

  confs.reqs.table[label] = Math.round(r.rps.mean);
  confs.reqs.conf.data.labels.push(label);
  confs.reqs.conf.data.datasets[0].data.push(r.rps.mean);
  confs.reqs.conf.data.datasets[0].backgroundColor.push(color);

  confs.meanLat.table[label] = Math.round(r.latency.mean);
  confs.meanLat.conf.data.labels.push(label);
  confs.meanLat.conf.data.datasets[0].data.push(r.latency.mean);
  confs.meanLat.conf.data.datasets[0].backgroundColor.push(color);

  confs.maxLat.table[label] = Math.round(r.latency.max);
  confs.maxLat.conf.data.labels.push(label);
  confs.maxLat.conf.data.datasets[0].data.push(r.latency.max);
  confs.maxLat.conf.data.datasets[0].backgroundColor.push(color);

  colorNum++;
}

const width = 600; // px
const height = 600; // px

for (const key in confs) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const chart = new Chart(ctx, confs[key].conf);
  const buf = await canvas.toBuffer();
  chart.destroy();
  await writeFile(
    `./results/tables/${key}.json`,
    JSON.stringify(confs[key].table, null, 2),
  );
  await writeFile(`./results/charts/${key}.png`, buf);
}
