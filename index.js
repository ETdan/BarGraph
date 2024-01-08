const add = document.getElementById("add");
const remove = document.getElementById("remove");
const update = document.getElementById("update");
// const reset = document.getElementById("reset");
const param = document.getElementById("param");
const parametrs = document.querySelectorAll(".parametrs");
const added =
  '<div class="parametrs"><input type="text" id="name" placeholder="insert bars name" /><input type="number" min="0" id="size" placeholder="insert the bars height"/><input type="color" id="colorPicker" /></div>';
data = {
  label: ["one", "two", "three"],
  value: [1, 2, 3],
  color: ["red", "blue", "black"],
};

const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
const dpi = window.devicePixelRatio;
ctx.scale(dpi, dpi);

// chart dimentoins
const width = canvas.width;
const height = canvas.height;
const barWidth = 35;
const barSpace = 10;
const chartStartX = 80;
const chartStartY = height - 130;
const chartEndX = width - 50;
const chartEndY = 50;
const chartWidth = chartEndX - chartStartX;
const chartHeight = chartStartY - chartEndY;

function draw(data) {
  ctx.clearRect(0, 0, width, height);
  const maxValue = Math.max(...data.value);
  // draw
  ctx.beginPath();
  ctx.moveTo(chartStartX, chartStartY);
  ctx.lineTo(chartEndX, chartStartY);
  ctx.lineTo(chartEndX, chartEndY);
  ctx.stroke();

  for (let i = 0; i < data.label.length; i++) {
    const x = chartStartX + (barWidth + barSpace) * i + barSpace + barWidth / 2;
    ctx.fillText(data.label[i], x, chartStartY + 20);
  }
  yValues = 5;
  for (let i = 0; i <= yValues; i++) {
    const y = chartStartY - (chartHeight / yValues) * i;
    ctx.fillText(((maxValue / yValues) * i).toFixed(1), chartStartX - 30, y);
  }
  // Draw bars
  for (let i = 0; i < data.value.length; i++) {
    setTimeout(() => {
      const barHeight = (chartHeight / maxValue) * data.value[i];
      const x = chartStartX + (barWidth + barSpace) * i + barSpace;
      const y = chartStartY - barHeight;

      ctx.fillStyle = data.color[i];
      ctx.fillRect(x, y, barWidth, barHeight);

      canvas.style.transition = "all 1s";
    }, i * 400);
  }
}
add.addEventListener("click", (e) => {
  console.log("add");
  param.insertAdjacentHTML("beforeend", added);
});

remove.addEventListener("click", (e) => {
  console.log("remove");
  param.lastChild.remove();
});

// reset.addEventListener("click", (e) => {
//   console.log("remove");
//   data = {
//     label: [],
//     value: [],
//     color: [],
//   };
// });

update.addEventListener("click", (e) => {
  console.log("update");
  data = {
    label: [],
    value: [],
    color: [],
  };
  const parametrs = document.querySelectorAll(".parametrs");
  parametrs.forEach((element) => {
    const inputs = element.querySelectorAll("input");

    data.label.push(inputs[0].value);
    data.value.push(+inputs[1].value);
    data.color.push(inputs[2].value);

    console.log(data);
  });
  draw(data);
});
draw(data);
