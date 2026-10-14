/**
 * Knowledge Hub cover generator — `npm run covers`
 *
 * Every blog cover shares one visual language:
 *   - a dark navy "blueprint" canvas (the hero gradient) with a fine grid,
 *   - two soft colour glows behind the artwork,
 *   - a scale bar in the bottom-left corner,
 *   - white line art that illustrates the topic, with one or two accent colours.
 *
 * Adding a cover for a new post:
 *   1. Add an entry to `covers` below: output file name, two `glow` colours and the
 *      line art (SVG drawn on the 1600×1067 canvas). Keep the art roughly inside
 *      x 480–1460, y 330–800 so the cropped preview cards never cut it off.
 *   2. Run `npm run covers` and set the post's `meta.cover` to `/images/blog/<file>`.
 *
 * Output: 1600×1067 JPG files in public/images/blog (≈100 KB each).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const W = 1600;
const H = 1067;
const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "../public/images/blog");

/** Accent colours for line art — light enough to read on navy. */
const ink = {
  cyan: "#7ddcff",
  violet: "#c9b8ff",
  pink: "#ff6fb5",
  coral: "#ff8a7a",
  green: "#7ee0b0",
  amber: "#ffd36e",
};

/** Glow colours — saturated, rendered at low opacity behind the art. */
const glow = {
  blue: "#00b7ff",
  magenta: "#ff2ed5",
  red: "#ff5a4f",
  indigo: "#7869ff",
  teal: "#4eddfc",
  navy: "#3964b3",
  green: "#2fd18f",
  royal: "#3d57ff",
};

/* -------------------------------------------------------------------------- */
/*  Shared frame and drawing helpers                                          */
/* -------------------------------------------------------------------------- */

function frame([glow1, glow2], art) {
  const minor = [];
  for (let x = 0; x <= W; x += 40) minor.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
  for (let y = 0; y <= H; y += 40) minor.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);
  const major = [];
  for (let x = 0; x <= W; x += 200) major.push(`<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`);
  for (let y = 0; y <= H; y += 200) major.push(`<line x1="0" y1="${y}" x2="${W}" y2="${y}"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="0" cy="1" r="1.35">
      <stop offset="0" stop-color="#243980"/>
      <stop offset="0.47" stop-color="#04113d"/>
      <stop offset="1" stop-color="#02071a"/>
    </radialGradient>
    <radialGradient id="glow1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${glow1}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${glow1}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${glow2}" stop-opacity="0.45"/>
      <stop offset="1" stop-color="${glow2}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1120" cy="470" r="520" fill="url(#glow1)"/>
  <circle cx="1350" cy="760" r="380" fill="url(#glow2)"/>
  <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">${minor.join("")}</g>
  <g stroke="#ffffff" stroke-opacity="0.09" stroke-width="1.5">${major.join("")}</g>
  <g stroke="#ffffff" stroke-opacity="0.35" stroke-width="2" fill="none">
    <line x1="160" y1="900" x2="640" y2="900"/>
    <line x1="160" y1="885" x2="160" y2="915"/><line x1="400" y1="890" x2="400" y2="910"/><line x1="640" y1="885" x2="640" y2="915"/>
  </g>
  <g fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${art}</g>
</svg>`;
}

const num = (value) => Number(value.toFixed(1));
const pt = ([x, y]) => `${num(x)},${num(y)}`;

/** Two-stroke arrowhead with its tip at (x, y), pointing in direction `angle` (radians). */
function head(x, y, angle, attrs = "") {
  const size = 14;
  const wing = (offset) => [
    x - size * Math.cos(angle + offset),
    y - size * Math.sin(angle + offset),
  ];
  return `<polyline points="${pt(wing(-0.5))} ${pt([x, y])} ${pt(wing(0.5))}" ${attrs}/>`;
}

/** Straight line with an arrowhead at the end. */
function arrow(x1, y1, x2, y2, attrs = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${attrs}/>${head(x2, y2, Math.atan2(y2 - y1, x2 - x1), attrs)}`;
}

/** Clockwise arc (angles in degrees) with an arrowhead at its end. */
function arcArrow(cx, cy, r, startDeg, endDeg, attrs = "") {
  const rad = (deg) => (deg * Math.PI) / 180;
  const at = (deg) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))];
  const [ex, ey] = at(endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `<path d="M${pt(at(startDeg))} A${r} ${r} 0 ${large} 1 ${pt([ex, ey])}" ${attrs}/>${head(ex, ey, rad(endDeg + 90), attrs)}`;
}

/* -------------------------------------------------------------------------- */
/*  Engineering covers                                                        */
/* -------------------------------------------------------------------------- */

/** MEP 3D coordination: isometric volume with a pipe and a duct crossing, clash marker. */
function coordinationArt() {
  const O = [1000, 560];
  const s = 230;
  const xv = [0.866 * s, 0.5 * s];
  const yv = [-0.866 * s, 0.5 * s];
  const p = (a, b, z) => [O[0] + a * xv[0] + b * yv[0], O[1] + a * xv[1] + b * yv[1] - z * s];
  const A = p(0, 0, 0),
    B = p(1, 0, 0),
    C = p(1, 1, 0),
    D = p(0, 1, 0);
  const A2 = p(0, 0, 1),
    B2 = p(1, 0, 1),
    C2 = p(1, 1, 1),
    D2 = p(0, 1, 1);
  const line = (from, to, attrs) =>
    `<line x1="${from[0]}" y1="${from[1]}" x2="${to[0]}" y2="${to[1]}" ${attrs}/>`;
  const clash = p(0.5, 0.5, 0.58);
  return `
    <polygon points="${[A2, B2, C2, D2].map(pt).join(" ")}" stroke-opacity="0.95"/>
    <polyline points="${[B2, B, C, D, D2].map(pt).join(" ")}" stroke-opacity="0.95"/>
    ${line(C2, C, 'stroke-opacity="0.95"')}
    <polyline points="${[B, A, D].map(pt).join(" ")}" stroke-opacity="0.35" stroke-dasharray="10 12"/>
    ${line(A, A2, 'stroke-opacity="0.35" stroke-dasharray="10 12"')}
    ${line(p(-0.9, 0.45, 0.55), p(1.9, 0.45, 0.55), `stroke="${ink.cyan}"`)}
    ${line(p(-0.9, 0.55, 0.55), p(1.9, 0.55, 0.55), `stroke="${ink.cyan}"`)}
    <polyline points="${[p(0.35, -1, 0.7), p(0.35, 2, 0.7)].map(pt).join(" ")}" stroke="${ink.violet}"/>
    <polyline points="${[p(0.65, -1, 0.7), p(0.65, 2, 0.7)].map(pt).join(" ")}" stroke="${ink.violet}"/>
    <polyline points="${[p(0.35, -1, 0.42), p(0.35, 2, 0.42)].map(pt).join(" ")}" stroke="${ink.violet}" stroke-opacity="0.6"/>
    <circle cx="${clash[0]}" cy="${clash[1]}" r="46" stroke="${ink.pink}" stroke-width="5"/>
    <circle cx="${clash[0]}" cy="${clash[1]}" r="78" stroke="${ink.pink}" stroke-opacity="0.45" stroke-dasharray="8 10"/>`;
}

/** Fire protection: main pipe, riser with valve, branch lines with sprinkler heads and spray. */
function fireProtectionArt() {
  const branches = [720, 920, 1120, 1320]
    .map(
      (x) => `
    <line x1="${x}" y1="402" x2="${x}" y2="560"/>
    <circle cx="${x}" cy="576" r="14" stroke="${ink.coral}"/>
    <line x1="${x - 26}" y1="598" x2="${x + 26}" y2="598"/>
    ${[-50, -25, 0, 25, 50].map((d) => `<line x1="${x + d * 0.3}" y1="616" x2="${x + d}" y2="690" stroke="${ink.cyan}" stroke-opacity="0.8" stroke-dasharray="6 9"/>`).join("")}`,
    )
    .join("");
  return `
    <rect x="560" y="370" width="900" height="32" rx="16"/>
    <line x1="600" y1="402" x2="600" y2="820"/>
    <line x1="632" y1="402" x2="632" y2="820"/>
    <path d="M580 700 L652 740 L652 700 L580 740 Z" stroke="${ink.coral}"/>
    <circle cx="616" cy="690" r="10"/>
    <line x1="616" y1="680" x2="616" y2="650"/>
    ${branches}`;
}

/** HVAC: fan, supply duct, branches and ceiling diffusers with airflow. */
function hvacArt() {
  const blades = [0, 120, 240]
    .map((deg) => `<path d="M520 450 q 40 -70 0 -110" transform="rotate(${deg} 520 450)"/>`)
    .join("");
  const diffusers = [800, 1060, 1320]
    .map(
      (x) => `
    <line x1="${x - 30}" y1="490" x2="${x - 30}" y2="600"/>
    <line x1="${x + 30}" y1="490" x2="${x + 30}" y2="600"/>
    <rect x="${x - 60}" y="600" width="120" height="40" rx="6"/>
    <line x1="${x - 60}" y1="600" x2="${x + 60}" y2="640"/>
    <line x1="${x + 60}" y1="600" x2="${x - 60}" y2="640"/>
    <path d="M${x - 70} 690 q 20 -18 40 0 t 40 0 t 40 0" stroke="${ink.cyan}" stroke-opacity="0.85"/>
    <path d="M${x - 50} 730 q 20 -18 40 0 t 40 0" stroke="${ink.cyan}" stroke-opacity="0.55"/>`,
    )
    .join("");
  return `
    <circle cx="520" cy="450" r="110"/>
    <circle cx="520" cy="450" r="16"/>
    ${blades}
    <rect x="630" y="410" width="820" height="80" rx="10"/>
    <line x1="660" y1="450" x2="1420" y2="450" stroke-opacity="0.35" stroke-dasharray="14 14"/>
    ${diffusers}`;
}

/** Commissioning: clipboard checklist and a gauge. */
function commissioningArt() {
  const rows = [400, 480, 560, 640]
    .map(
      (y, i) => `
    <rect x="720" y="${y}" width="40" height="40" rx="8"/>
    ${i < 3 ? `<path d="M728 ${y + 20} l 9 10 l 17 -20" stroke="${ink.green}" stroke-width="5"/>` : ""}
    <line x1="790" y1="${y + 14}" x2="${i % 2 ? 990 : 1020}" y2="${y + 14}" stroke-opacity="0.8"/>
    <line x1="790" y1="${y + 32}" x2="${i % 2 ? 930 : 960}" y2="${y + 32}" stroke-opacity="0.4"/>`,
    )
    .join("");
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const a = Math.PI + (i * Math.PI) / 8;
    const r1 = 120;
    const r2 = i % 2 ? 104 : 96;
    return `<line x1="${1310 + r1 * Math.cos(a)}" y1="${650 + r1 * Math.sin(a)}" x2="${1310 + r2 * Math.cos(a)}" y2="${650 + r2 * Math.sin(a)}"/>`;
  }).join("");
  return `
    <rect x="680" y="320" width="400" height="430" rx="22"/>
    <rect x="800" y="296" width="160" height="48" rx="12"/>
    ${rows}
    <path d="M1170 650 A 140 140 0 0 1 1450 650"/>
    ${ticks}
    <line x1="1310" y1="650" x2="${1310 + 95 * Math.cos(Math.PI * 1.72)}" y2="${650 + 95 * Math.sin(Math.PI * 1.72)}" stroke="${ink.green}" stroke-width="6"/>
    <circle cx="1310" cy="650" r="12"/>`;
}

/* -------------------------------------------------------------------------- */
/*  IT covers                                                                 */
/* -------------------------------------------------------------------------- */

/** IT monitoring: screen with a live pulse line, alert marker and a metrics chart. */
function monitoringArt() {
  const pulse = [
    [600, 560],
    [720, 560],
    [750, 505],
    [790, 635],
    [830, 455],
    [870, 600],
    [900, 560],
    [1000, 560],
    [1030, 525],
    [1060, 560],
    [1160, 560],
  ];
  const bars = [
    [1285, 80, "#ffffff"],
    [1335, 130, ink.cyan],
    [1385, 100, "#ffffff"],
  ]
    .map(
      ([x, h, color]) =>
        `<rect x="${x}" y="${760 - h}" width="30" height="${h}" rx="6" stroke="${color}"/>`,
    )
    .join("");
  return `
    <rect x="560" y="330" width="640" height="400" rx="22"/>
    <line x1="560" y1="400" x2="1200" y2="400" stroke-opacity="0.35"/>
    ${[600, 628, 656].map((x) => `<circle cx="${x}" cy="366" r="7" stroke-opacity="0.6"/>`).join("")}
    <line x1="880" y1="730" x2="880" y2="790"/>
    <line x1="790" y1="792" x2="970" y2="792"/>
    <line x1="600" y1="560" x2="1160" y2="560" stroke-opacity="0.25" stroke-dasharray="10 12"/>
    <polyline points="${pulse.map(pt).join(" ")}" stroke="${ink.cyan}" stroke-width="5"/>
    <circle cx="1340" cy="420" r="50" stroke="${ink.pink}" stroke-width="5"/>
    <circle cx="1340" cy="420" r="80" stroke="${ink.pink}" stroke-opacity="0.45" stroke-dasharray="8 10"/>
    <line x1="1340" y1="396" x2="1340" y2="428" stroke="${ink.pink}" stroke-width="6"/>
    <circle cx="1340" cy="447" r="4" fill="${ink.pink}" stroke="none"/>
    <line x1="1270" y1="760" x2="1430" y2="760" stroke-opacity="0.6"/>
    ${bars}`;
}

/** Process automation: trigger → gear → decision → two outcomes, with an automated loop back. */
function automationArt() {
  const cx = 800;
  const cy = 540;
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const c = (i * Math.PI) / 4;
    const deg = (d) => (d * Math.PI) / 180;
    return [
      [66, c - deg(14)],
      [84, c - deg(9)],
      [84, c + deg(9)],
      [66, c + deg(14)],
    ].map(([r, a]) => pt([cx + r * Math.cos(a), cy + r * Math.sin(a)]));
  }).flat();
  return `
    <circle cx="560" cy="540" r="40"/>
    <polygon points="548,520 548,560 578,540" stroke="${ink.violet}"/>
    ${arrow(600, 540, 704, 540)}
    <polygon points="${teeth.join(" ")}" stroke="${ink.violet}"/>
    <circle cx="${cx}" cy="${cy}" r="26" stroke="${ink.violet}"/>
    ${arrow(884, 540, 962, 540)}
    <polygon points="1040,466 1114,540 1040,614 966,540"/>
    <line x1="1114" y1="540" x2="1170" y2="540"/>
    <line x1="1170" y1="410" x2="1170" y2="670"/>
    ${arrow(1170, 410, 1236, 410)}
    ${arrow(1170, 670, 1236, 670)}
    <rect x="1240" y="372" width="200" height="76" rx="16"/>
    <path d="M1318 410 l 14 14 l 26 -28" stroke="${ink.green}" stroke-width="6"/>
    <rect x="1240" y="632" width="200" height="76" rx="16"/>
    <line x1="1270" y1="660" x2="1400" y2="660" stroke-opacity="0.8"/>
    <line x1="1270" y1="684" x2="1360" y2="684" stroke-opacity="0.4"/>
    <path d="M1340 708 V770 H800 V640" stroke="${ink.pink}" stroke-opacity="0.7" stroke-dasharray="10 12"/>
    ${head(800, 632, -Math.PI / 2, `stroke="${ink.pink}" stroke-opacity="0.7"`)}`;
}

/** Configuration management: one versioned config file synced to identical servers. */
function configurationArt() {
  const code = [
    [440, 556, 626, 642, 712],
    [480, 586, 640, 656, 716],
    [520, 586, 660, 676, 712],
    [560, 586, 630, 646, 712],
    [600, 556, 610],
  ]
    .map(
      ([y, x1, x2, v1, v2]) =>
        `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke-opacity="0.85"/>` +
        (v1 ? `<line x1="${v1}" y1="${y}" x2="${v2}" y2="${y}" stroke="${ink.amber}"/>` : ""),
    )
    .join("");
  const servers = [390, 510, 630]
    .map(
      (y) => `
    <rect x="1036" y="${y - 44}" width="380" height="88" rx="14"/>
    <circle cx="1070" cy="${y}" r="7" stroke="${ink.green}"/>
    <circle cx="1096" cy="${y}" r="7" stroke-opacity="0.6"/>
    <line x1="1130" y1="${y - 12}" x2="1290" y2="${y - 12}" stroke-opacity="0.5"/>
    <line x1="1130" y1="${y + 12}" x2="1250" y2="${y + 12}" stroke-opacity="0.3"/>
    <circle cx="1370" cy="${y}" r="20" stroke="${ink.green}"/>
    <path d="M1361 ${y} l 7 7 l 13 -14" stroke="${ink.green}"/>`,
    )
    .join("");
  return `
    <path d="M538 360 H700 L750 410 V642 a18 18 0 0 1 -18 18 H538 a18 18 0 0 1 -18 -18 V378 a18 18 0 0 1 18 -18 Z"/>
    <polyline points="700,360 700,410 750,410"/>
    ${code}
    <line x1="750" y1="510" x2="856" y2="510"/>
    <circle cx="900" cy="510" r="44" stroke="${ink.amber}"/>
    ${arcArrow(900, 510, 24, 200, 330, `stroke="${ink.amber}"`)}
    ${arcArrow(900, 510, 24, 20, 150, `stroke="${ink.amber}"`)}
    ${arrow(944, 510, 1030, 510)}
    <line x1="980" y1="390" x2="980" y2="630"/>
    ${arrow(980, 390, 1030, 390)}
    ${arrow(980, 630, 1030, 630)}
    ${servers}`;
}

/* -------------------------------------------------------------------------- */
/*  Cover list                                                                */
/* -------------------------------------------------------------------------- */

const covers = [
  // IT
  { file: "it-monitoring.jpg", glows: [glow.blue, glow.indigo], art: monitoringArt },
  { file: "process-automation-flow.jpg", glows: [glow.indigo, glow.magenta], art: automationArt },
  {
    file: "configuration-management-sync.jpg",
    glows: [glow.royal, glow.green],
    art: configurationArt,
  },
  // Engineering
  { file: "mep-3d-coordination.jpg", glows: [glow.blue, glow.magenta], art: coordinationArt },
  { file: "fire-protection-design.jpg", glows: [glow.red, glow.indigo], art: fireProtectionArt },
  { file: "hvac-energy-efficiency.jpg", glows: [glow.teal, glow.navy], art: hvacArt },
  { file: "mep-commissioning.jpg", glows: [glow.green, glow.blue], art: commissioningArt },
];

for (const { file, glows, art } of covers) {
  const output = path.join(OUT_DIR, file);
  await sharp(Buffer.from(frame(glows, art())))
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(output);
  console.log(`✓ ${file}`);
}
