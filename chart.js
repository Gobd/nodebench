import { readdir, writeFile, stat, mkdir, rmdir } from 'node:fs/promises';
import { Chart } from 'chart.js/auto';
import { createCanvas } from "canvas";

const dirExists = await stat('./charts').catch(() => false);
if (dirExists) {
    await rmdir('./charts', { recursive: true });
}
await mkdir('./charts');

const files = await readdir('./results');

for (const file of files) {
    console.log(file);
}


/*
Loop through each file and make a config for

avg req/s
avg latency
max latgency

then render the charts

add background color of light gray
make colors orange? Or maybe color for bar?
*/

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

const reqConf = {
    type: 'bar',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Reqs/s',
                data: [50, 60, 70, 180],
            },
        ],
    },
    options: {
        plugins: {
            customCanvasBackgroundColor: {
                color: 'black',
            }
        }
    },
    plugins: [plugin],
};

const width = 400; // px
const height = 400; // px

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
const chart = new Chart(ctx, reqConf);
const buf = await canvas.toBuffer()
chart.destroy();
await writeFile('./charts/mychart.png', buf);
