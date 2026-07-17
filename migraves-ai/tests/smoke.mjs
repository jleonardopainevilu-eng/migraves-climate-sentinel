import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

class ClassList { add() {} remove() {} }
class DummyElement {
  constructor(selector = "") {
    this.selector = selector;
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.hidden = false;
    this.dataset = {};
    this.className = "";
    this.classList = new ClassList();
    this.tagName = "DIV";
    this.style = {};
    this.files = [];
    this.complete = true;
    this.naturalWidth = 900;
    this.naturalHeight = 560;
  }
  addEventListener() {}
  removeAttribute() {}
  setAttribute() {}
  focus() {}
  reset() {}
  scrollIntoView() {}
  requestSubmit() {}
  click() {}
  getBoundingClientRect() { return { width: 600, height: 400 }; }
  getContext() {
    return {
      scale() {}, clearRect() {}, strokeRect() {}, fillRect() {}, fillText() {},
      measureText() { return { width: 100 }; },
      set strokeStyle(_) {}, set lineWidth(_) {}, set fillStyle(_) {}, set font(_) {}
    };
  }
  closest() { return null; }
}

const elements = new Map();
const getElement = (selector) => {
  if (!elements.has(selector)) elements.set(selector, new DummyElement(selector));
  return elements.get(selector);
};

const document = {
  documentElement: { lang: "es" },
  querySelector: getElement,
  querySelectorAll() { return []; },
  createElement() { return new DummyElement("created"); }
};

const storage = new Map();
const localStorage = {
  getItem: (key) => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key)
};

const sandbox = {
  console,
  document,
  localStorage,
  window: { devicePixelRatio: 1, addEventListener() {} },
  structuredClone,
  Intl,
  Date,
  Math,
  Number,
  String,
  Array,
  Object,
  JSON,
  Blob: class {},
  URL: { createObjectURL() { return "blob:test"; }, revokeObjectURL() {} },
  FileReader: class {},
  fetch: async () => ({ ok: false, json: async () => ({ error: "network disabled in smoke test" }) }),
  setTimeout,
  clearTimeout,
  confirm: () => true
};

vm.createContext(sandbox);
const appCode = fs.readFileSync(new URL("../app.js", import.meta.url), "utf8");
const testCode = `${appCode}\n
(async () => {
  loadDemo("chamiza");
  await runAnalysis({ preventDefault() {} });
  document.querySelector("#reviewerName").value = "Equipo piloto";
  document.querySelector("#reviewerRole").value = "biologist";
  setValidation("scientific_validated");
  globalThis.__record = buildRecord();

  document.querySelector("#areaName").value = "Humedal Prueba";
  document.querySelector("#areaCode").value = "ABM-TST-001";
  document.querySelector("#areaRegion").value = "Los Lagos, Chile";
  document.querySelector("#areaLatitude").value = "-41.5";
  document.querySelector("#areaLongitude").value = "-73.0";
  document.querySelector("#areaRadius").value = "1.2";
  document.querySelector("#baselinePeriod").value = "2016-2025";
  document.querySelector("#prioritySpecies").value = "Aves playeras";
  document.querySelector("#areaBaseline").value = "Mediana de 50 aves durante octubre.";
  document.querySelector("#ecosystemType").value = "coastal_wetland";
  document.querySelector("#areaCoordinator").value = "research_team";
  document.querySelector("#dataAccess").value = "restricted";
  createArea({ preventDefault() {} });
  globalThis.__area = toAbmObject(areas[state.selectedArea]);
})();`;

vm.runInContext(testCode, sandbox, { filename: "app.js" });
await new Promise((resolve) => setTimeout(resolve, 1200));

assert.ok(sandbox.__record, "Demo should generate an RBM");
assert.match(sandbox.__record.record_id, /^RBM-/);
assert.equal(sandbox.__record.validation.data_quality_level, "N4");
assert.equal(sandbox.__record.climate_response_index.score, 72);
assert.equal(sandbox.__area.area_id, "ABM-TST-001");
assert.deepEqual([...sandbox.__area.geometry.coordinates], [-73, -41.5]);
assert.equal(sandbox.__area.governance.data_access, "restricted");

console.log("MigrAves smoke test passed: ABM creation, demo RBM generation, IRBC, and N4 validation.");
