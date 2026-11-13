
import { useEffect, useMemo, useState } from "react";
import "./App.css";

const markets = {
  india: { name: "India", flag: "🇮🇳", currency: "INR", locale: "en-IN", retailer: "https://www.amazon.in/s?k=" },
  usa: { name: "USA", flag: "🇺🇸", currency: "USD", locale: "en-US", retailer: "https://www.amazon.com/s?k=" },
  uk: { name: "United Kingdom", flag: "🇬🇧", currency: "GBP", locale: "en-GB", retailer: "https://www.amazon.co.uk/s?k=" },
  europe: { name: "Europe", flag: "🇪🇺", currency: "EUR", locale: "de-DE", retailer: "https://www.amazon.de/s?k=" },
};

const components = [
  { name: "Processor", key: "cpu", icon: "▤", description: "Choose the CPU for your gaming build", previewImage: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=700", products: [
    { name: "AMD Ryzen 5 5600", socket: "AM4", power: 65, prices: { india: 10500, usa: 110, uk: 95, europe: 110 } },
    { name: "AMD Ryzen 7 5700X3D", socket: "AM4", power: 105, prices: { india: 22000, usa: 210, uk: 195, europe: 220 } },
    { name: "AMD Ryzen 5 7600", socket: "AM5", power: 88, prices: { india: 18500, usa: 190, uk: 170, europe: 190 }, productUrl: "https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-5-7600.html" },
    { name: "AMD Ryzen 5 9600X", socket: "AM5", power: 65, prices: { india: 24500, usa: 245, uk: 225, europe: 255 } },
    { name: "Intel Core i5-14400F", socket: "LGA1700", power: 148, prices: { india: 17000, usa: 175, uk: 155, europe: 175 } },
    { name: "Intel Core i7-14700F", socket: "LGA1700", power: 219, prices: { india: 35000, usa: 350, uk: 330, europe: 370 } },
  ]},
  { name: "Graphics Card", key: "gpu", icon: "▧", description: "Select the graphics card for your games", previewImage: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=700", products: [
    { name: "AMD Radeon RX 7600 8GB", power: 165, recommendedPsu: 550, estimatedLength: 270, prices: { india: 26000, usa: 250, uk: 230, europe: 270 } },
    { name: "NVIDIA GeForce RTX 4060 8GB", power: 115, recommendedPsu: 550, estimatedLength: 250, prices: { india: 28000, usa: 300, uk: 280, europe: 320 } },
    { name: "NVIDIA GeForce RTX 5060 8GB", power: 145, recommendedPsu: 550, estimatedLength: 250, prices: { india: 32000, usa: 300, uk: 290, europe: 330 } },
    { name: "AMD Radeon RX 9060 XT 16GB", power: 160, recommendedPsu: 600, estimatedLength: 280, prices: { india: 39000, usa: 350, uk: 330, europe: 380 } },
    { name: "NVIDIA GeForce RTX 4070 Super 12GB", power: 220, recommendedPsu: 650, estimatedLength: 300, prices: { india: 62000, usa: 600, uk: 550, europe: 620 } },
    { name: "AMD Radeon RX 7800 XT 16GB", power: 263, recommendedPsu: 700, estimatedLength: 300, prices: { india: 52000, usa: 500, uk: 460, europe: 530 } },
    { name: "NVIDIA GeForce RTX 5070 12GB", power: 250, recommendedPsu: 650, estimatedLength: 300, prices: { india: 65000, usa: 550, uk: 520, europe: 600 } },
    { name: "AMD Radeon RX 9070 XT 16GB", power: 304, recommendedPsu: 750, estimatedLength: 330, prices: { india: 72000, usa: 600, uk: 570, europe: 650 } },
  ]},
  { name: "Motherboard", key: "motherboard", icon: "▦", description: "Must match your processor socket and RAM", previewImage: "https://images.unsplash.com/photo-1592664474496-8e9c5c7c5f4c?w=700", products: [
    { name: "MSI B550M PRO-VDH WIFI", socket: "AM4", memory: "DDR4", formFactor: "Micro-ATX", prices: { india: 10500, usa: 110, uk: 95, europe: 115 } },
    { name: "Gigabyte B550M DS3H", socket: "AM4", memory: "DDR4", formFactor: "Micro-ATX", prices: { india: 8500, usa: 90, uk: 80, europe: 90 } },
    { name: "MSI B650 Gaming Plus WIFI", socket: "AM5", memory: "DDR5", formFactor: "ATX", image: "https://storage-asset.msi.com/global/picture/product/product_1681456847b0ea0e25f792d9f157c17bc8df9db04.webp", productUrl: "https://in.msi.com/Motherboard/B650-GAMING-PLUS-WIFI/Gallery", prices: { india: 18500, usa: 170, uk: 160, europe: 180 } },
    { name: "Gigabyte B650M DS3H", socket: "AM5", memory: "DDR5", formFactor: "Micro-ATX", prices: { india: 12500, usa: 130, uk: 120, europe: 135 } },
    { name: "MSI B760M-A WIFI DDR4", socket: "LGA1700", memory: "DDR4", formFactor: "Micro-ATX", prices: { india: 14500, usa: 145, uk: 130, europe: 150 } },
    { name: "Gigabyte B760 Gaming X DDR5", socket: "LGA1700", memory: "DDR5", formFactor: "ATX", prices: { india: 17500, usa: 165, uk: 155, europe: 175 } },
  ]},
  { name: "Memory (RAM)", key: "ram", icon: "▥", description: "Choose capacity and DDR generation", previewImage: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=700", products: [
    { name: "16GB DDR4 (2×8GB)", memory: "DDR4", capacity: 16, prices: { india: 3500, usa: 35, uk: 32, europe: 38 } },
    { name: "32GB DDR4 (2×16GB)", memory: "DDR4", capacity: 32, prices: { india: 6500, usa: 65, uk: 60, europe: 70 } },
    { name: "64GB DDR4 (2×32GB)", memory: "DDR4", capacity: 64, prices: { india: 12500, usa: 120, uk: 110, europe: 130 } },
    { name: "16GB DDR5 (2×8GB)", memory: "DDR5", capacity: 16, prices: { india: 5500, usa: 55, uk: 50, europe: 60 } },
    { name: "32GB DDR5 (2×16GB)", memory: "DDR5", capacity: 32, prices: { india: 9500, usa: 90, uk: 85, europe: 100 } },
    { name: "64GB DDR5 (2×32GB)", memory: "DDR5", capacity: 64, prices: { india: 18500, usa: 175, uk: 165, europe: 190 } },
  ]},
  { name: "Storage", key: "storage", icon: "▣", description: "Pick an SSD for games and files", previewImage: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700", products: [
    { name: "500GB SATA SSD", capacity: 500, prices: { india: 2500, usa: 28, uk: 25, europe: 30 } },
    { name: "1TB SATA SSD", capacity: 1000, prices: { india: 4500, usa: 45, uk: 42, europe: 50 } },
    { name: "500GB NVMe SSD", capacity: 500, prices: { india: 3000, usa: 35, uk: 32, europe: 38 } },
    { name: "1TB NVMe SSD", capacity: 1000, prices: { india: 5500, usa: 55, uk: 50, europe: 60 }, productUrl: "https://www.samsung.com/in/memory-storage/nvme-ssd/990-evo-plus-1tb-nvme-pcie-gen-4-mz-v9s1t0bw/" },
    { name: "2TB NVMe SSD", capacity: 2000, prices: { india: 10500, usa: 100, uk: 95, europe: 110 } },
    { name: "4TB NVMe SSD", capacity: 4000, prices: { india: 24000, usa: 220, uk: 205, europe: 240 } },
  ]},
  { name: "Power Supply", key: "psu", icon: "⚡", description: "Choose enough wattage for your graphics card", previewImage: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=700", products: [
    { name: "550W 80+ Bronze", watts: 550, prices: { india: 4000, usa: 45, uk: 40, europe: 48 } },
    { name: "650W 80+ Bronze", watts: 650, prices: { india: 5500, usa: 60, uk: 55, europe: 65 } },
    { name: "750W 80+ Gold", watts: 750, prices: { india: 8500, usa: 90, uk: 85, europe: 100 } },
    { name: "850W 80+ Gold", watts: 850, prices: { india: 11000, usa: 115, uk: 105, europe: 125 } },
    { name: "1000W 80+ Gold", watts: 1000, prices: { india: 15500, usa: 160, uk: 150, europe: 175 } },
  ]},
  { name: "PC Case", key: "case", icon: "▣", description: "Choose a case that fits your motherboard and graphics card", previewImage: "", products: [
    { name: "NZXT H3 Flow", caseType: "Micro-ATX airflow case", supportedBoards: ["Micro-ATX", "Mini-ITX"], maxGpuLength: 352, image: "https://nzxt.com/cdn/shop/files/h3-flow_01_white-hero.png?v=1789310971&width=2000", productUrl: "https://nzxt.com/products/h3-flow", prices: { india: 7500, usa: 70, uk: 65, europe: 75 } },
    { name: "MSI MAG FORGE 321R AIRFLOW", caseType: "ATX mid-tower airflow case", supportedBoards: ["ATX", "Micro-ATX", "Mini-ITX"], maxGpuLength: 390, image: "https://media.falabella.com/falabellaPE/144459678_01/w%3D800%2Ch%3D800%2Cfit%3Dpad", productUrl: "https://in.msi.com/PC-Case/MAG-FORGE-321R-AIRFLOW/Specification", prices: { india: 8500, usa: 90, uk: 80, europe: 95 } },
    { name: "Antec C5 Curve ARGB", caseType: "ATX dual-chamber mid-tower", supportedBoards: ["ATX", "Micro-ATX", "Mini-ITX"], maxGpuLength: 410, image: "https://antecindia.in/cdn/shop/files/1_5242e14b-2201-430b-b56f-6ef2f0529e0c.jpg?v=1780388466&width=3840", productUrl: "https://antecindia.in/products/antec-c5-curve-argb-black-mid-tower-case", prices: { india: 11500, usa: 120, uk: 105, europe: 125 } },
    { name: "NZXT S5 RGB", caseType: "ATX mid-tower case", supportedBoards: ["ATX", "Micro-ATX", "Mini-ITX"], maxGpuLength: 415, image: "https://media.topachat.com/media/s500/6abb80fd69052011565f15c6.jpg", productUrl: "https://nzxt.com/products/s5-rgb", prices: { india: 12500, usa: 130, uk: 115, europe: 135 } },
    { name: "Fractal Design Pop XL Air", caseType: "E-ATX full-tower airflow case", supportedBoards: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"], maxGpuLength: 455, image: "https://assets.fractal-design.com/images/uxzbxy2o/production/ef7aea387de18a22c37e2a597978601950d5fdd5-2560x3200.png?auto=format&fit=crop&h=2560&q=75&rect=0%2C320%2C2560%2C2560&w=2560", productUrl: "https://www.fractal-design.com/products/cases/pop-series/pop-xl-air/pop-xl-air-rgb-black-tg-clear-tint/", prices: { india: 13000, usa: 140, uk: 125, europe: 150 } },
  ]},
];

const games = [
  { name: "Cyberpunk 2077", base: 75, cpuHeavy: .82 },
  { name: "GTA V", base: 150, cpuHeavy: .9 },
  { name: "Minecraft Java", base: 180, cpuHeavy: .9 },
  { name: "Fortnite", base: 140, cpuHeavy: .85 },
  { name: "Counter-Strike 2", base: 190, cpuHeavy: .95 },
  { name: "Call of Duty: Warzone", base: 105, cpuHeavy: .88 },
  { name: "Red Dead Redemption 2", base: 95, cpuHeavy: .8 },
  { name: "Forza Horizon 5", base: 125, cpuHeavy: .82 },
  { name: "Hogwarts Legacy", base: 85, cpuHeavy: .78 },
  { name: "Apex Legends", base: 150, cpuHeavy: .88 },
];

const gpuFactors = {
  "AMD Radeon RX 7600 8GB": .82, "NVIDIA GeForce RTX 4060 8GB": .85,
  "NVIDIA GeForce RTX 5060 8GB": 1.02, "AMD Radeon RX 9060 XT 16GB": 1.12,
  "NVIDIA GeForce RTX 4070 Super 12GB": 1.35, "AMD Radeon RX 7800 XT 16GB": 1.32,
  "NVIDIA GeForce RTX 5070 12GB": 1.48, "AMD Radeon RX 9070 XT 16GB": 1.62,
};
const cpuFactors = {
  "AMD Ryzen 5 5600": .88, "AMD Ryzen 7 5700X3D": 1.12,
  "AMD Ryzen 5 7600": 1.08, "AMD Ryzen 5 9600X": 1.18,
  "Intel Core i5-14400F": 1.02, "Intel Core i7-14700F": 1.2,
};
const resolutionFactors = { "1080p": 1, "1440p": .72, "4K": .43 };
const qualityFactors = { Low: 1.35, Medium: 1.15, High: 1, Ultra: .78 };
const SAVED_BUILDS_KEY = "nexplay_saved_builds";
const emptyFilter = { search: "", maxPrice: "", sort: "default" };

function retailerUrl(name, market) {
  return `${markets[market].retailer}${encodeURIComponent(name)}`;
}
function readSavedBuilds() {
  try {
    const value = JSON.parse(localStorage.getItem(SAVED_BUILDS_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}
function encodeBuild(build) {
  const bytes = new TextEncoder().encode(JSON.stringify(build));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function decodeBuild(value) {
  const base = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base + "=".repeat((4 - base.length % 4) % 4));
  return JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, c => c.charCodeAt(0))));
}
function validateBuild(build) {
  if (!build || typeof build !== "object" || build.version !== 1 || !markets[build.market] || !build.selected || typeof build.selected !== "object") throw new Error("This build file is invalid or unsupported.");
  const selected = {};
  components.forEach(c => {
    const name = build.selected[c.key];
    if (typeof name === "string" && c.products.some(p => p.name === name)) selected[c.key] = name;
  });
  if (!Object.keys(selected).length) throw new Error("No recognised components were found in this build.");
  return { version: 1, name: typeof build.name === "string" && build.name.trim() ? build.name.trim().slice(0, 40) : "Imported PC Build", market: build.market, selected };
}
function findProduct(key, selected) {
  return components.find(c => c.key === key)?.products.find(p => p.name === selected?.[key]);
}
function buildTotal(selected, market) {
  return components.reduce((sum, c) => sum + (findProduct(c.key, selected)?.prices[market] || 0), 0);
}
function compatibilityIssues(selected) {
  const cpu = findProduct("cpu", selected);
  const gpu = findProduct("gpu", selected);
  const board = findProduct("motherboard", selected);
  const ram = findProduct("ram", selected);
  const psu = findProduct("psu", selected);
  const pcCase = findProduct("case", selected);
  const issues = [];
  if (cpu && board && cpu.socket !== board.socket) issues.push("CPU socket mismatch");
  if (board && ram && board.memory !== ram.memory) issues.push("RAM generation mismatch");
  if (gpu && psu && psu.watts < gpu.recommendedPsu) issues.push("PSU wattage below GPU recommendation");
  if (pcCase && board && !pcCase.supportedBoards.includes(board.formFactor)) issues.push("Case does not support motherboard form factor");
  if (pcCase && gpu && gpu.estimatedLength > pcCase.maxGpuLength) issues.push("GPU may exceed case clearance");
  return issues;
}
function upgradeReason(key, oldProduct, newProduct) {
  if (key === "ram") return `${newProduct.capacity}GB capacity compared with ${oldProduct?.capacity || "unknown"}GB`;
  if (key === "storage") return `${newProduct.capacity / 1000}TB capacity compared with ${(oldProduct?.capacity || 0) / 1000}TB`;
  if (key === "psu") return `${newProduct.watts}W capacity compared with ${oldProduct?.watts || 0}W`;
  if (key === "gpu") return "A different graphics card option from the current catalogue";
  if (key === "cpu") return "A different processor option from the current catalogue";
  if (key === "motherboard") return "A different motherboard option from the current catalogue";
  return "A different case option from the current catalogue";
}

function App() {
  const [selected, setSelected] = useState({});
  const [market, setMarket] = useState("india");
  const [filters, setFilters] = useState({});
  const [buildName, setBuildName] = useState("");
  const [savedBuilds, setSavedBuilds] = useState(readSavedBuilds);
  const [importMessage, setImportMessage] = useState("");
  const [importError, setImportError] = useState(false);
  const [imageFailures, setImageFailures] = useState({});
  const [selectedGame, setSelectedGame] = useState("Cyberpunk 2077");
  const [resolution, setResolution] = useState("1080p");
  const [quality, setQuality] = useState("High");
  const [compareA, setCompareA] = useState("");
  const [compareB, setCompareB] = useState("");

  // v2.9 Upgrade Advisor
  const [advisorBuildId, setAdvisorBuildId] = useState("");
  const [upgradeBudget, setUpgradeBudget] = useState("15000");
  const [advisorResults, setAdvisorResults] = useState(null);

  const currentMarket = markets[market];
  const money = amount => new Intl.NumberFormat(currentMarket.locale, { style: "currency", currency: currentMarket.currency, maximumFractionDigits: 0 }).format(amount);
  const getSelectedProduct = key => findProduct(key, selected);
  const cpu = getSelectedProduct("cpu");
  const gpu = getSelectedProduct("gpu");
  const motherboard = getSelectedProduct("motherboard");
  const ram = getSelectedProduct("ram");
  const psu = getSelectedProduct("psu");
  const pcCase = getSelectedProduct("case");
  const selectedCount = Object.values(selected).filter(Boolean).length;
  const total = buildTotal(selected, market);
  const allIssues = compatibilityIssues(selected);
  const coreIssues = [];
  const powerIssues = [];
  const caseIssues = [];
  if (cpu && motherboard && cpu.socket !== motherboard.socket) coreIssues.push(`CPU socket mismatch: ${cpu.name} requires ${cpu.socket}, but your motherboard uses ${motherboard.socket}.`);
  if (motherboard && ram && motherboard.memory !== ram.memory) coreIssues.push(`RAM mismatch: your motherboard supports ${motherboard.memory}, but you selected ${ram.memory}.`);
  if (gpu && psu && psu.watts < gpu.recommendedPsu) powerIssues.push(`Power supply warning: ${gpu.name} recommends at least ${gpu.recommendedPsu}W, but your PSU is ${psu.watts}W.`);
  if (pcCase && motherboard && !pcCase.supportedBoards.includes(motherboard.formFactor)) caseIssues.push(`${pcCase.name} does not support your ${motherboard.formFactor} motherboard.`);
  if (pcCase && gpu && gpu.estimatedLength > pcCase.maxGpuLength) caseIssues.push(`GPU clearance warning: GPU length is estimated at ${gpu.estimatedLength}mm, but this case supports up to ${pcCase.maxGpuLength}mm.`);
  const coreReady = Boolean(cpu && motherboard && ram);
  const powerReady = Boolean(gpu && psu);
  const caseReady = Boolean(pcCase && motherboard && gpu);
  const estimatedSystemPower = cpu && gpu ? cpu.power + gpu.power + 100 : null;

  const game = games.find(g => g.name === selectedGame);
  const fpsEstimate = cpu && gpu && game ? Math.max(1, Math.round(game.base * gpuFactors[gpu.name] * cpuFactors[cpu.name] * resolutionFactors[resolution] * qualityFactors[quality] * game.cpuHeavy)) : null;
  const fpsLow = fpsEstimate === null ? null : Math.max(1, Math.round(fpsEstimate * .85));
  const fpsHigh = fpsEstimate === null ? null : Math.round(fpsEstimate * 1.15);

  function updateSavedBuilds(updated) {
    try {
      localStorage.setItem(SAVED_BUILDS_KEY, JSON.stringify(updated));
      setSavedBuilds(updated);
      return true;
    } catch { window.alert("Unable to update saved builds. Browser storage may be full."); return false; }
  }
  function selectProduct(key, value) {
    setSelected(previous => ({ ...previous, [key]: value }));
    setImageFailures(previous => ({ ...previous, [key]: false }));
  }
  function getFilter(key) { return filters[key] || emptyFilter; }
  function updateFilter(key, field, value) {
    setFilters(previous => ({ ...previous, [key]: { ...emptyFilter, ...previous[key], [field]: value } }));
  }
  function clearFilter(key) { setFilters(previous => ({ ...previous, [key]: emptyFilter })); }
  function getVisibleProducts(component) {
    const filter = getFilter(component.key);
    let list = component.products.filter(p => p.name.toLowerCase().includes(filter.search.toLowerCase()) && (filter.maxPrice === "" || p.prices[market] <= Number(filter.maxPrice)));
    if (filter.sort === "low") list.sort((a, b) => a.prices[market] - b.prices[market]);
    if (filter.sort === "high") list.sort((a, b) => b.prices[market] - a.prices[market]);
    if (filter.sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }
  function saveBuild() {
    if (!selectedCount) return window.alert("Please select some PC components first.");
    if (allIssues.length) return window.alert("Your PC has compatibility warnings. Review them before saving.");
    if (!buildName.trim()) return window.alert("Please enter a name for your PC build.");
    const updated = [...savedBuilds, { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name: buildName.trim(), market, selected: { ...selected }, createdAt: new Date().toISOString() }];
    if (updateSavedBuilds(updated)) { setBuildName(""); window.alert("Build saved successfully!"); }
  }
  function loadBuild(build) {
    try {
      const valid = validateBuild({ version: 1, name: build.name, market: build.market, selected: build.selected });
      setSelected(valid.selected); setMarket(valid.market);
      window.alert(`"${valid.name}" has been loaded.`);
      document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" });
    } catch { window.alert("This saved build could not be loaded."); }
  }
  function deleteBuild(id) {
    if (updateSavedBuilds(savedBuilds.filter(b => b.id !== id))) {
      if (compareA === id) setCompareA("");
      if (compareB === id) setCompareB("");
      if (advisorBuildId === id) { setAdvisorBuildId(""); setAdvisorResults(null); }
    }
  }
  async function shareBuild(build) {
    try {
      const data = validateBuild({ version: 1, name: build.name, market: build.market, selected: build.selected });
      const url = `${window.location.origin}${window.location.pathname}#build=${encodeBuild(data)}`;
      if (url.length > 8000) return window.alert("Share link is too long.");
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(url); window.alert("Share link copied!"); }
      else window.prompt("Copy this share link:", url);
    } catch { window.alert("Unable to create share link."); }
  }
  function exportBuild(build) {
    try {
      const blob = new Blob([JSON.stringify({ app: "NexPlay", version: 1, name: build.name, market: build.market, selected: build.selected, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${(build.name || "nexplay-build").replace(/[^a-z0-9-_]/gi, "-")}.json`;
      document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    } catch { window.alert("Unable to export this build."); }
  }
  function applyImportedBuild(build) {
    setSelected(build.selected); setMarket(build.market); setBuildName(build.name);
    setImportMessage(`Successfully imported "${build.name}".`); setImportError(false);
    document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" });
  }
  function importJSON(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) { setImportMessage("File must be smaller than 1 MB."); setImportError(true); event.target.value = ""; return; }
    if (!file.name.toLowerCase().endsWith(".json")) { setImportMessage("Please choose a .json file."); setImportError(true); event.target.value = ""; return; }
    const reader = new FileReader();
    reader.onload = () => {
      try { applyImportedBuild(validateBuild(JSON.parse(reader.result))); }
      catch (error) { setImportMessage(error.message || "Could not read this build."); setImportError(true); }
      event.target.value = "";
    };
    reader.onerror = () => { setImportMessage("Unable to read this file."); setImportError(true); event.target.value = ""; };
    reader.readAsText(file);
  }
  useEffect(() => {
    if (!window.location.hash.startsWith("#build=")) return;
    try { applyImportedBuild(validateBuild(decodeBuild(window.location.hash.slice(7)))); }
    catch (error) { setImportMessage(error.message || "Invalid shared build link."); setImportError(true); }
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);

  const buildA = savedBuilds.find(b => b.id === compareA);
  const buildB = savedBuilds.find(b => b.id === compareB);
  const buildATotal = buildA ? buildTotal(buildA.selected, market) : 0;
  const buildBTotal = buildB ? buildTotal(buildB.selected, market) : 0;
  const comparisonDifference = Math.abs(buildATotal - buildBTotal);
  const advisorBuild = savedBuilds.find(b => b.id === advisorBuildId);

  function generateUpgradeAdvice() {
    if (!advisorBuild) { setAdvisorResults([]); return; }
    const budget = Math.max(0, Number(upgradeBudget) || 0);
    const base = advisorBuild.selected || {};
    const baselineIssues = compatibilityIssues(base);
    const suggestions = [];
    components.forEach(component => {
      const oldProduct = findProduct(component.key, base);
      if (!oldProduct) return;
      component.products.forEach(candidate => {
        if (candidate.name === oldProduct.name) return;
        const extraCost = candidate.prices[market] - oldProduct.prices[market];
        if (extraCost <= 0 || extraCost > budget) return;
        const next = { ...base, [component.key]: candidate.name };
        const nextIssues = compatibilityIssues(next);
        const introducesIssue = nextIssues.some(issue => !baselineIssues.includes(issue));
        if (introducesIssue) return;
        let improvement = false;
        if (component.key === "ram") improvement = (candidate.capacity || 0) > (oldProduct.capacity || 0);
        else if (component.key === "storage") improvement = (candidate.capacity || 0) > (oldProduct.capacity || 0);
        else if (component.key === "psu") improvement = (candidate.watts || 0) > (oldProduct.watts || 0);
        else if (component.key === "gpu") improvement = (candidate.power || 0) !== (oldProduct.power || 0) || candidate.recommendedPsu !== oldProduct.recommendedPsu;
        else if (component.key === "cpu") improvement = candidate.socket === oldProduct.socket;
        else if (component.key === "motherboard") improvement = candidate.socket === oldProduct.socket && candidate.memory === oldProduct.memory;
        else if (component.key === "case") improvement = candidate.maxGpuLength > (oldProduct.maxGpuLength || 0);
        if (!improvement) return;
        suggestions.push({
          key: component.key, category: component.name, oldProduct, candidate,
          extraCost, reason: upgradeReason(component.key, oldProduct, candidate),
          newTotal: buildTotal(next, market),
        });
      });
    });
    suggestions.sort((a, b) => a.extraCost - b.extraCost);
    setAdvisorResults(suggestions);
  }

  const totalParts = components.reduce((count, c) => count + c.products.length, 0);

  return (
    <div className="app">
      <nav className="navbar">
        <a href="#top" className="logo">NEX<span>PLAY</span></a>
        <div className="nav-links">
          <a href="#builder">PC Builder</a><a href="#fps-estimator">FPS Estimator</a>
          <a href="#compatibility">Compatibility</a><a href="#saved-builds">Saved Builds</a>
          <a href="#compare-builds">Compare</a><a href="#upgrade-advisor">Upgrade Advisor</a>
        </div>
        <a href="#builder" className="nav-button">Build a PC</a>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <span className="tag">YOUR CUSTOM PC STARTS HERE</span>
            <h1>BUILD YOUR<br /><span>DREAM PC.</span></h1>
            <p>Choose your components, check key compatibility and estimate your gaming performance.</p>
            <a href="#builder" className="primary-button">START BUILDING →</a>
          </div>
          <div className="hero-visual" aria-hidden="true"><div className="pc-circle"><div className="pc-case"><div className="pc-fan">✦</div><div className="pc-fan second">✦</div><div className="pc-light" /></div></div><span className="floating-text">POWER YOUR GAME</span></div>
        </section>

        <section className="builder" id="builder">
          <div className="section-heading"><span className="tag">CUSTOM PC CONFIGURATOR</span><h2>PC <span>BUILDER</span></h2><p>Search, filter and sort your parts. Check compatibility and watch your estimated budget update.</p></div>
          <div className="market-picker"><label htmlFor="market">SELECT YOUR MARKET</label><select id="market" value={market} onChange={e => { setMarket(e.target.value); setAdvisorResults(null); }}>{Object.entries(markets).map(([key, item]) => <option key={key} value={key}>{item.flag} {item.name} ({item.currency})</option>)}</select></div>
          <div className="catalogue-count"><span>{totalParts} PARTS AVAILABLE</span><span>{currentMarket.flag} Prices shown for {currentMarket.name}</span></div>

          <div className="builder-layout">
            <div className="component-list">
              {components.map(component => {
                const filter = getFilter(component.key);
                const visible = getVisibleProducts(component);
                const product = getSelectedProduct(component.key);
                const isVisible = visible.some(p => p.name === product?.name);
                const image = product?.image || component.previewImage;
                return (
                  <div className="component-card" key={component.key}>
                    <div className="component-info"><div className="component-icon">{component.icon}</div><div><h3>{component.name}</h3><p>{component.description} · {component.products.length} options</p></div></div>
                    {product && <div className="product-preview">
                      {image && !imageFailures[component.key] ? <img src={image} alt={product.name} loading="lazy" onError={() => setImageFailures(prev => ({ ...prev, [component.key]: true }))} /> : <div className="product-image-fallback"><span>{component.icon}</span><small>Image preview unavailable</small></div>}
                      <div className="product-preview-details"><span className="preview-label">{product.image ? "PRODUCT IMAGE" : "CATEGORY PREVIEW"}</span><strong>{product.name}</strong><b>{money(product.prices[market])}</b><div className="product-link-row"><a href={retailerUrl(product.name, market)} target="_blank" rel="noreferrer">SEARCH RETAILERS ↗</a>{product.productUrl && <a href={product.productUrl} target="_blank" rel="noreferrer">MANUFACTURER ↗</a>}</div></div>
                    </div>}
                    <div className="product-filters">
                      <input type="search" placeholder={`Search ${component.name}...`} aria-label={`Search ${component.name}`} value={filter.search} onChange={e => updateFilter(component.key, "search", e.target.value)} />
                      <input type="number" min="0" placeholder={`Max price (${currentMarket.currency})`} aria-label={`Maximum price for ${component.name}`} value={filter.maxPrice} onChange={e => updateFilter(component.key, "maxPrice", e.target.value)} />
                      <select aria-label={`Sort ${component.name}`} value={filter.sort} onChange={e => updateFilter(component.key, "sort", e.target.value)}><option value="default">Default order</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="az">Name: A to Z</option></select>
                    </div>
                    <div className="filter-result-row"><span>{visible.length} of {component.products.length} products shown</span><button className="clear-filter" onClick={() => clearFilter(component.key)}>Clear filters</button></div>
                    <select aria-label={`Choose ${component.name}`} value={selected[component.key] || ""} onChange={e => selectProduct(component.key, e.target.value)}>
                      <option value="">Choose a component</option>
                      {product && !isVisible && <option value={product.name}>{product.name} — {money(product.prices[market])} (selected)</option>}
                      {visible.map(p => <option key={p.name} value={p.name}>{p.name} — {money(p.prices[market])}</option>)}
                    </select>
                    {!visible.length && <p className="no-results">No products match these filters. Try changing your search or maximum price.</p>}
                  </div>
                );
              })}
            </div>

            <aside className="summary">
              <span className="tag">YOUR CONFIGURATION</span><h3>Build Summary</h3><p className="market-label">{currentMarket.flag} {currentMarket.name}</p>
              {components.map(c => { const p = getSelectedProduct(c.key); return <div className="summary-row" key={c.key}><span>{c.name}</span><strong>{p ? money(p.prices[market]) : "Not selected"}</strong></div>; })}
              <div className="compatibility-box" id="compatibility"><h4>CORE COMPATIBILITY</h4>{!coreReady && <p>Select a CPU, motherboard and RAM to check compatibility.</p>}{coreReady && !coreIssues.length && <p className="compatibility-success">✓ CPU socket and RAM type match.</p>}{coreIssues.map((issue, i) => <p className="compatibility-error" key={i}>⚠ {issue}</p>)}</div>
              <div className="compatibility-box"><h4>GPU & POWER SUPPLY</h4>{!powerReady && <p>Choose a GPU and PSU to check power compatibility.</p>}{powerReady && !powerIssues.length && <p className="compatibility-success">✓ PSU meets the {gpu.recommendedPsu}W GPU recommendation.</p>}{powerIssues.map((issue, i) => <p className="compatibility-error" key={i}>⚠ {issue}</p>)}{estimatedSystemPower !== null && <p>Estimated CPU + GPU + other system power: {estimatedSystemPower}W</p>}</div>
              <div className="compatibility-box"><h4>CASE & CLEARANCE</h4>{!pcCase && <p>Choose a PC case to check motherboard and graphics card fit.</p>}{pcCase && !motherboard && <p>Select a motherboard to check case form-factor support.</p>}{pcCase && !gpu && <p>Select a graphics card to check estimated GPU clearance.</p>}{caseReady && !caseIssues.length && <p className="compatibility-success">✓ Case supports the selected motherboard size and estimated GPU length.</p>}{caseIssues.map((issue, i) => <p className="compatibility-error" key={i}>⚠ {issue}</p>)}{pcCase && <p>Case GPU clearance: up to {pcCase.maxGpuLength}mm. GPU lengths are estimates.</p>}</div>
              {pcCase && <div className="compatibility-box case-specifications"><h4>SELECTED CASE SPECIFICATIONS</h4><a href={pcCase.productUrl} target="_blank" rel="noreferrer"><img src={pcCase.image} alt={pcCase.name} loading="lazy" onError={e => { e.currentTarget.style.display = "none"; }} /></a><h3>{pcCase.name}</h3><p><strong>Case type:</strong> {pcCase.caseType}</p><p><strong>Motherboard support:</strong> {pcCase.supportedBoards.join(", ")}</p><p><strong>Maximum GPU length:</strong> {pcCase.maxGpuLength}mm</p><a href={pcCase.productUrl} target="_blank" rel="noreferrer">VIEW MANUFACTURER SPECS ↗</a></div>}
              <div className="total"><span>ESTIMATED TOTAL</span><strong>{money(total)}</strong></div>
              <div className="save-build-section"><h4>SAVE YOUR CONFIGURATION</h4><input className="build-name-input" placeholder="Enter build name..." value={buildName} maxLength={40} onChange={e => setBuildName(e.target.value)} onKeyDown={e => { if (e.key === "Enter") saveBuild(); }} /><button className="primary-button full-button" onClick={saveBuild}>SAVE MY BUILD</button></div>
              <div className="sharing-section"><h4>SHARE & IMPORT BUILDS</h4><p>Import a build from a JSON file exported by NexPlay.</p><label className="import-button" htmlFor="import-build-file">IMPORT JSON FILE</label><input id="import-build-file" className="file-input-hidden" type="file" accept=".json,application/json" onChange={importJSON} />{importMessage && <p className={importError ? "import-message import-error" : "import-message"}>{importMessage}</p>}</div>
              <div className="saved-builds-section" id="saved-builds"><div className="saved-builds-heading"><h4>SAVED BUILDS</h4><span>{savedBuilds.length}</span></div>
                {!savedBuilds.length ? <p className="empty-builds">No saved builds yet. Create your first PC configuration!</p> : <div className="saved-builds-list">{savedBuilds.map(build => <div className="saved-build-card" key={build.id}><div className="saved-build-info"><strong>{build.name}</strong><span>{markets[build.market]?.flag} {markets[build.market]?.name}</span><small>{Object.values(build.selected || {}).filter(Boolean).length} components saved</small></div><div className="saved-build-actions"><button className="load-build-button" onClick={() => loadBuild(build)}>LOAD</button><button className="share-build-button" onClick={() => shareBuild(build)}>SHARE</button><button className="export-build-button" onClick={() => exportBuild(build)}>EXPORT JSON</button><button className="delete-build-button" onClick={() => { if (window.confirm(`Delete "${build.name}"?`)) deleteBuild(build.id); }}>DELETE</button></div></div>)}</div>}
              </div>
              <p className="disclaimer">Demo prices and estimated power/clearance figures only. Retailer links open product searches and do not guarantee stock or prices. Some images are representative category previews, not exact product photos. GPU dimensions vary by manufacturer and model. Check exact manufacturer specifications, cooler clearance, connectors and local retailer prices before buying. Saved builds are stored locally in this browser and are not cloud-synced. Share links contain build data in the URL.</p>
            </aside>
          </div>
        </section>

        <section className="comparison-section" id="compare-builds">
          <div className="section-heading"><span className="tag">NEXPLAY BUILD ANALYSER</span><h2>BUILD <span>COMPARISON</span></h2><p>Compare two of your saved PC configurations side by side.</p></div>
          {savedBuilds.length < 2 ? <div className="comparison-empty"><div className="comparison-empty-icon">⇄</div><h3>Save at least two PC builds</h3><p>You need two saved configurations to use Build Comparison. Create and save another build in the PC Builder.</p><a href="#builder" className="primary-button">GO TO PC BUILDER</a></div> :
            <div className="comparison-card">
              <div className="comparison-selectors"><div className="comparison-select"><label htmlFor="compare-a">BUILD A</label><select id="compare-a" value={compareA} onChange={e => setCompareA(e.target.value)}><option value="">Choose first build</option>{savedBuilds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div><div className="comparison-vs">VS</div><div className="comparison-select"><label htmlFor="compare-b">BUILD B</label><select id="compare-b" value={compareB} onChange={e => setCompareB(e.target.value)}><option value="">Choose second build</option>{savedBuilds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div></div>
              {buildA && buildB && compareA === compareB && <p className="comparison-message">Choose two different saved builds to compare them.</p>}
              {buildA && buildB && compareA !== compareB && <>
                <div className="comparison-price-overview"><div className="comparison-price"><span>{buildA.name}</span><strong>{money(buildATotal)}</strong></div><div className="comparison-price"><span>{buildB.name}</span><strong>{money(buildBTotal)}</strong></div></div>
                <div className="comparison-verdict"><p>{buildATotal === buildBTotal ? "Both builds have the same estimated total." : <><strong>{buildATotal < buildBTotal ? buildA.name : buildB.name}</strong> costs less by <strong>{money(comparisonDifference)}</strong> in {currentMarket.name}.</>}</p></div>
                <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>COMPONENT</th><th>{buildA.name}</th><th>{buildB.name}</th><th>COMPARISON</th></tr></thead><tbody>{components.map(c => { const a = findProduct(c.key, buildA.selected)?.name || "Not selected"; const b = findProduct(c.key, buildB.selected)?.name || "Not selected"; const same = a === b; return <tr key={c.key} className={same ? "comparison-same" : "comparison-different"}><td className="comparison-component-name">{c.name}</td><td>{a}</td><td>{b}</td><td><span className={`comparison-status ${same ? "same" : "different"}`}>{same ? "SAME" : "DIFFERENT"}</span></td></tr>; })}<tr className="comparison-total-row"><td>ESTIMATED TOTAL</td><td>{money(buildATotal)}</td><td>{money(buildBTotal)}</td><td>{buildATotal === buildBTotal ? "EQUAL" : `${money(comparisonDifference)} difference`}</td></tr></tbody></table></div>
                <div className="comparison-footer"><p>Prices use your currently selected market: <strong>{currentMarket.name}</strong>.</p><p>Component differences are shown without assuming one part is automatically better.</p><button className="load-build-button" onClick={() => loadBuild(buildA)}>LOAD BUILD A</button><button className="load-build-button" onClick={() => loadBuild(buildB)}>LOAD BUILD B</button></div>
              </>}
              {(!buildA || !buildB) && <div className="comparison-placeholder"><span>⇄</span><p>Select two saved builds above to see their component and price comparison.</p></div>}
            </div>}
        </section>

        {/* NEXPLAY v2.9 UPGRADE ADVISOR */}
        <section className="upgrade-section" id="upgrade-advisor">
          <div className="section-heading"><span className="tag">NEXPLAY SMART UPGRADES</span><h2>BUILD <span>UPGRADE ADVISOR</span></h2><p>Choose a saved PC, set your budget and discover compatible component upgrade options.</p></div>
          <div className="upgrade-card">
            {savedBuilds.length === 0 ? <div className="upgrade-empty"><div className="upgrade-icon">↗</div><h3>Save a PC build to get started</h3><p>Your Upgrade Advisor uses your saved configurations to find possible upgrades.</p><a href="#builder" className="primary-button">CREATE A PC BUILD</a></div> :
              <>
                <div className="upgrade-controls">
                  <div className="upgrade-control"><label htmlFor="advisor-build">CHOOSE A SAVED BUILD</label><select id="advisor-build" value={advisorBuildId} onChange={e => { setAdvisorBuildId(e.target.value); setAdvisorResults(null); }}><option value="">Select a saved build</option>{savedBuilds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
                  <div className="upgrade-control"><label htmlFor="upgrade-budget">UPGRADE BUDGET ({currentMarket.currency})</label><input id="upgrade-budget" type="number" min="0" value={upgradeBudget} onChange={e => { setUpgradeBudget(e.target.value); setAdvisorResults(null); }} placeholder="Enter your budget" /></div>
                </div>
                <button className="primary-button advisor-generate" onClick={generateUpgradeAdvice} disabled={!advisorBuildId}>FIND MY UPGRADES ↗</button>
                {advisorBuild && <div className="advisor-build-overview"><span>SELECTED BUILD</span><strong>{advisorBuild.name}</strong><p>Current estimated value: {money(buildTotal(advisorBuild.selected, market))}</p><p>Budget: {money(Math.max(0, Number(upgradeBudget) || 0))}</p></div>}
                {advisorResults && <div className="advisor-results">
                  <div className="advisor-results-heading"><h3>YOUR UPGRADE OPTIONS</h3><span>{advisorResults.length} compatible option{advisorResults.length === 1 ? "" : "s"}</span></div>
                  {advisorResults.length === 0 ? <div className="advisor-no-results"><h4>No upgrades found within this budget</h4><p>Try increasing your budget, or check whether your saved build has the required supporting components selected. Suggestions only use products in the current NexPlay catalogue.</p></div> :
                    <div className="upgrade-list">{advisorResults.map((item, index) => <article className="upgrade-item" key={`${item.key}-${item.candidate.name}`}>
                      <div className="upgrade-item-top"><span className="upgrade-category">{item.category}</span><span className="upgrade-number">OPTION {index + 1}</span></div>
                      <div className="upgrade-comparison"><div className="upgrade-part"><small>CURRENT COMPONENT</small><strong>{item.oldProduct.name}</strong><span>{money(item.oldProduct.prices[market])}</span></div><div className="upgrade-arrow">→</div><div className="upgrade-part proposed"><small>PROPOSED UPGRADE</small><strong>{item.candidate.name}</strong><span>{money(item.candidate.prices[market])}</span></div></div>
                      <div className="upgrade-cost-row"><span>Additional cost</span><strong>+{money(item.extraCost)}</strong></div>
                      <div className="upgrade-cost-row"><span>New estimated build total</span><strong>{money(item.newTotal)}</strong></div>
                      <p className="upgrade-reason">{item.reason}</p>
                      <button className="apply-upgrade-button" onClick={() => { const updated = { ...item.oldProduct, ...item.candidate }; const next = { ...advisorBuild.selected, [item.key]: item.candidate.name }; loadBuild({ ...advisorBuild, selected: next }); setAdvisorResults(null); }}>LOAD THIS UPGRADE INTO BUILDER</button>
                    </article>)}</div>}
                  <p className="advisor-disclaimer">Upgrade suggestions are based on catalogue specifications and estimated prices, not measured performance tests. A compatible suggestion does not guarantee physical fit, BIOS support, power-connector availability or performance gains. Verify exact manufacturer specifications before purchasing.</p>
                </div>}
              </>
            }
          </div>
        </section>

        <section className="fps-section" id="fps-estimator">
          <div className="section-heading"><span className="tag">NEXPLAY PERFORMANCE TOOL</span><h2>GAMING <span>FPS ESTIMATOR</span></h2><p>See an approximate gaming performance estimate based on the CPU and GPU in your selected build.</p></div>
          <div className="fps-card">
            <div className="fps-controls">
              <div className="fps-control"><label htmlFor="fps-game">SELECT GAME</label><select id="fps-game" value={selectedGame} onChange={e => setSelectedGame(e.target.value)}>{games.map(g => <option key={g.name}>{g.name}</option>)}</select></div>
              <div className="fps-control"><label htmlFor="fps-resolution">RESOLUTION</label><select id="fps-resolution" value={resolution} onChange={e => setResolution(e.target.value)}>{Object.keys(resolutionFactors).map(v => <option key={v}>{v}</option>)}</select></div>
              <div className="fps-control"><label htmlFor="fps-quality">GRAPHICS QUALITY</label><select id="fps-quality" value={quality} onChange={e => setQuality(e.target.value)}>{Object.keys(qualityFactors).map(v => <option key={v}>{v}</option>)}</select></div>
            </div>
            <div className="fps-result">{fpsEstimate === null ? <div className="fps-empty"><span className="fps-icon">▧</span><h3>Select a CPU and graphics card</h3><p>Your estimated FPS will appear here once both components are selected in the PC Builder.</p><a href="#builder" className="primary-button">CHOOSE COMPONENTS</a></div> : <>
              <span className="fps-result-label">ESTIMATED PERFORMANCE</span><div className="fps-number">{fpsEstimate}<small> FPS</small></div><div className="fps-range">Approximate range: {fpsLow}–{fpsHigh} FPS</div><div className="fps-meter"><div className="fps-meter-fill" style={{ width: `${Math.min(100, fpsEstimate / 240 * 100)}%` }} /></div><div className="fps-details"><div><span>GAME</span><strong>{selectedGame}</strong></div><div><span>CPU</span><strong>{cpu.name}</strong></div><div><span>GPU</span><strong>{gpu.name}</strong></div><div><span>RESOLUTION</span><strong>{resolution}</strong></div><div><span>QUALITY</span><strong>{quality}</strong></div></div>
            </>}</div>
            <p className="fps-disclaimer">FPS estimates are generated from a simplified internal model, not measured game benchmarks. They are for rough comparison only. Actual FPS can differ substantially depending on game version, graphics settings, drivers, ray tracing, upscaling, RAM, cooling and the specific PC. Minecraft performance also depends heavily on render distance, shaders and mods. No guarantee of actual performance is implied.</p>
          </div>
        </section>
      </main>
      <footer><a href="#top" className="logo">NEX<span>PLAY</span></a><p>Built for gamers. Powered by passion.</p><small>© 2026 NexPlay. All rights reserved.</small></footer>
    </div>
  );
}

export default App;
