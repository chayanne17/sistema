const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const sun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 30,
  color: "yellow"
};

const planets = [
  { name: "Mercurio", radius: 4, distance: 60, speed: 0.04, angle: 0, color: "#ccc" },
  { name: "Venus", radius: 6, distance: 90, speed: 0.03, angle: 0, color: "#e0b35a" },
  { name: "Tierra", radius: 7, distance: 120, speed: 0.025, angle: 0, color: "#1e90ff" },
  { name: "Marte", radius: 6, distance: 150, speed: 0.02, angle: 0, color: "#ff5733" },
  { name: "Júpiter", radius: 12, distance: 190, speed: 0.01, angle: 0, color: "#f4e2d8" }
];

let animando = true;

function dibujarSol() {
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.fillStyle = sun.color;
  ctx.fill();
  ctx.closePath();
}

function dibujarPlanetas() {
  planets.forEach(planet => {
    // Posición orbital
    const x = sun.x + planet.distance * Math.cos(planet.angle);
    const y = sun.y + planet.distance * Math.sin(planet.angle);

    // Órbita
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, planet.distance, 0, Math.PI * 2);
    ctx.strokeStyle = "#444";
    ctx.stroke();
    ctx.closePath();

    // Planeta
    ctx.beginPath();
    ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();
    ctx.closePath();

    if (animando) planet.angle += planet.speed;
  });
}

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarSol();
  dibujarPlanetas();
  requestAnimationFrame(animar);
}

// Botón de pausa/reanudar
document.getElementById("toggleBtn").addEventListener("click", () => {
  animando = !animando;
  document.getElementById("toggleBtn").textContent = animando ? "Pausar animación" : "Reanudar animación";
});

animar();
