import { getContext, FPS } from "./utils-module.js";

document.title = "A01 - App Graphics 2D";
document.addEventListener("DOMContentLoaded", main);

function main() {
  const ctx = getContext("#myCanvas");

  const config = {
    width: 800,
    height: 600,
    bgColor: "white",
    debug: true
  };

  ctx.canvas.width = config.width;
  ctx.canvas.height = config.height;

  // ---------- ฟังก์ชันวาด ----------

  function drawSky() {
    const gradient = ctx.createLinearGradient(0,0,0,config.height/2);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(0.7, "#B0E0E6");
    gradient.addColorStop(1, "#ffffff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,config.width, config.height/2);
  }

  function drawMountains() {
    const grad = ctx.createLinearGradient(0, config.height/2, 0, config.height);
    grad.addColorStop(0, "#556B2F");
    grad.addColorStop(1, "#8FBC8F");
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(0, config.height/2);
    ctx.quadraticCurveTo(config.width*0.25, config.height*0.2, config.width*0.5, config.height/2);
    ctx.quadraticCurveTo(config.width*0.75, config.height*0.2, config.width, config.height/2);
    ctx.lineTo(config.width, config.height);
    ctx.lineTo(0, config.height);
    ctx.closePath();
    ctx.fill();
  }

  function drawSun() {
    const sunGrad = ctx.createRadialGradient(100,100,20,100,100,50);
    sunGrad.addColorStop(0, "#FFFF33");
    sunGrad.addColorStop(1, "rgba(255,255,0,0.5)");
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(100,100,50,0,Math.PI*2);
    ctx.fill();
  }

  function drawField() {
    const grad = ctx.createLinearGradient(0, config.height/2, 0, config.height);
    grad.addColorStop(0, "#7CFC00");
    grad.addColorStop(1, "#32CD32");
    ctx.fillStyle = grad;
    ctx.fillRect(0, config.height/2, config.width, config.height/2);
  }

  function drawTree(x, y) {
    // ลำต้น
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(x, y, 20, 60);
    // ใบไม้
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x+10, y, 40, 0, Math.PI*2);
    ctx.arc(x+5, y+20, 30, 0, Math.PI*2);
    ctx.fill();
  }

  // บ้าน
  function drawHouse(x, y) {
    // ตัวบ้าน (สี่เหลี่ยม)
    const houseGrad = ctx.createLinearGradient(x, y, x, y+80);
    houseGrad.addColorStop(0, "#CD853F"); 
    houseGrad.addColorStop(1, "#A0522D"); 
    ctx.fillStyle = houseGrad;
    ctx.fillRect(x, y, 100, 80);

    // หลังคา (สามเหลี่ยม)
    ctx.fillStyle = "#8B0000";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+50, y-50);
    ctx.lineTo(x+100, y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#5C0000";
    ctx.stroke();

    // หน้าต่าง 2 บาน
    ctx.fillStyle = "#ADD8E6";
    ctx.fillRect(x + 15, y + 20, 25, 25);
    ctx.fillRect(x + 60, y + 20, 25, 25);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(x + 15, y + 20, 25, 25);
    ctx.strokeRect(x + 60, y + 20, 25, 25);

    // ประตู
    ctx.fillStyle = "#654321";
    ctx.fillRect(x + 40, y + 45, 20, 35);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(x + 40, y + 45, 20, 35);

    // Shadow หลังคา
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.moveTo(x + 50, y - 50);
    ctx.lineTo(x + 55, y - 40);
    ctx.lineTo(x + 95, y);
    ctx.closePath();
    ctx.fill();
  }

  function drawRiver() {
    const grad = ctx.createLinearGradient(0, config.height/2+50, 0, config.height);
    grad.addColorStop(0, "#1E90FF");
    grad.addColorStop(1, "#87CEFA");
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(config.width, config.height/2 + 50);
    ctx.quadraticCurveTo(config.width*0.75, config.height*0.7, config.width*0.7, config.height);
    ctx.lineTo(config.width, config.height);
    ctx.closePath();
    ctx.fill();
  }

  // เมฆ
  let cloudX = 0;
  function drawCloud(x, y){
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI*2);
    ctx.arc(x+25, y+10, 25, 0, Math.PI*2);
    ctx.arc(x-25, y+10, 20, 0, Math.PI*2);
    ctx.fill();
  }

  // ---------- Loop หลัก ----------
  function draw() {
    FPS.update();
    ctx.fillStyle = config.bgColor;
    ctx.fillRect(0,0,config.width, config.height);

    drawSky();
    drawSun();
    drawMountains();
    drawField();
    drawRiver();
    drawHouse(500,400);
    drawTree(400,460);
    drawTree(650,370);

    cloudX += 0.5;
    if(cloudX>config.width+50) cloudX=-50;
    drawCloud(cloudX, 100);
    drawCloud(cloudX/2+200, 150);

    if(config.debug) FPS.show(ctx, 10, 28);
    requestAnimationFrame(draw);
  }

  draw();
}

