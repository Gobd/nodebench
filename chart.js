import { readdir, readFile, writeFile, stat, mkdir, rmdir } from 'node:fs/promises';
import { parse } from 'node:path';
import { Chart } from 'chart.js/auto';
import { createCanvas } from "canvas";

const dirs = ['charts', 'tables'];
for (const dir of dirs) {
    const dirExists = await stat(`./results/${dir}`).catch(() => false);
    if (dirExists) {
        await rmdir(`./results/${dir}`, { recursive: true });
    }
}

const files = await readdir('./results');

for (const dir of dirs) {
    await mkdir(`./results/${dir}`);
}

// TODO clean up chart generation and make the simple table JSON files

const reqConf = {
    data: {
        labels: [],
        datasets: [
            {
                label: 'Reqs/s',
                data: [],
                backgroundColor: [],
            },
        ],
    },
};

const meanLat = {
    data: {
        labels: [],
        datasets: [
            {
                label: 'Mean Latency',
                data: [],
                backgroundColor: [],
            },
        ],
    },
};

const maxLat = {
    data: {
        labels: [],
        datasets: [
            {
                label: 'Max Latency',
                data: [],
                backgroundColor: [],
            },
        ],
    },
};

const colors = files.length;
let colorNum = 0;

function selectColor() {
    if (colors < 1) colors = 1
    return "hsl(" + (colorNum * (360 / colors) % 360) + ",100%,50%)";
}

for (const file of files) {
    const data = JSON.parse(await readFile(`./results/${file}`, 'utf8'));
    const label = parse(file).name;
    const r = data.result;
    const color = selectColor();

    reqConf.data.labels.push(label);
    reqConf.data.datasets[0].data.push(r.rps.mean);
    reqConf.data.datasets[0].backgroundColor.push(color);

    meanLat.data.labels.push(label);
    meanLat.data.datasets[0].data.push(r.latency.mean);
    meanLat.data.datasets[0].backgroundColor.push(color);

    maxLat.data.labels.push(label);
    maxLat.data.datasets[0].data.push(r.latency.max);
    maxLat.data.datasets[0].backgroundColor.push(color);

    colorNum++;
}

const datas = [{
    conf: reqConf,
    filename: 'reqs.png',
},
{
    conf: meanLat,
    filename: 'meanLat.png',
},
{
    conf: maxLat,
    filename: 'maxLat.png',
}]


const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color;
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};
const width = 600; // px
const height = 600; // px

for (const data of datas) {
    data.conf.type = 'bar'
    data.conf.options = {
        plugins: {
            customCanvasBackgroundColor: {
                color: 'black',
            }
        }
    };
    data.conf.plugins = [plugin];

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, data.conf);
    const buf = await canvas.toBuffer()
    chart.destroy();
    await writeFile(`./results/charts/${data.filename}`, buf);
}
