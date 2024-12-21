import { readdir, readFile, writeFile, stat, mkdir, rmdir } from 'node:fs/promises';
import { parse } from 'node:path';
import { Chart } from 'chart.js/auto';
import { createCanvas } from "canvas";

const dirExists = await stat('./charts').catch(() => false);
if (dirExists) {
    await rmdir('./charts', { recursive: true });
}
await mkdir('./charts');

const reqConf = {
    data: {
        labels: [],
        datasets: [
            {
                label: 'Reqs/s',
                data: [],
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
            },
        ],
    },
};

const files = await readdir('./results');
for (const file of files) {
    const data = JSON.parse(await readFile(`./results/${file}`, 'utf8'));
    const label = parse(file).name;
    const r = data.result;

    reqConf.data.labels.push(label);
    reqConf.data.datasets[0].data.push(r.rps.mean);

    meanLat.data.labels.push(label);
    meanLat.data.datasets[0].data.push(r.latency.mean);

    maxLat.data.labels.push(label);
    maxLat.data.datasets[0].data.push(r.latency.max);
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
    await writeFile(`./charts/${data.filename}`, buf);
}


/*
add background color of light gray
make colors orange? Or maybe color for bar?
*/
