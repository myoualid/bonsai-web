import {
  Bonsai,
  Federation,
  Ifc,
  Loader,
  Terminal,
  Viewer,
  createLogger,
  ensureElementChildren,
  getSpatialDecomposition,
  measure,
  onViewerTools,
  ops_default,
  projectPoint,
  resolvePick,
  scriptScope,
  viewer,
  writeStoredZip
} from "./chunk-T54G3JH2.js";

// src/gui.js
import { FloatingDialog as FloatingDialog4, InputList as InputList2, LabeledBoxItem as LabeledBoxItem2, StatusBar, TabView as TabView3 } from "@aeco-dev/gui";
import { Layout, World } from "@aeco-dev/layout";

// src/modules/code.terminal/ui.js
import {
  Button,
  Caption,
  Container,
  InputText,
  Operator,
  ScrollViewer,
  StackPanel,
  TabView,
  Text
} from "@aeco-dev/gui";
var TOP_LEVEL = [
  "bonsai",
  "console",
  "Math",
  "JSON",
  "Object",
  "Array",
  "Promise",
  "setTimeout",
  "clearTimeout",
  "fetch",
  "performance"
];
function extractChain(text, cursorPos) {
  let i = cursorPos;
  while (i > 0 && /[\w$.]/.test(text[i - 1])) i--;
  return text.slice(i, cursorPos);
}
function allProps(obj) {
  const seen = /* @__PURE__ */ new Set();
  let cur = obj;
  while (cur != null) {
    for (const key of Object.getOwnPropertyNames(cur)) {
      if (!key.startsWith("__")) seen.add(key);
    }
    cur = Object.getPrototypeOf(cur);
    if (cur === Object.prototype) break;
  }
  return [...seen].sort();
}
function getCompletions(text, cursor, context) {
  cursor = cursor ?? text.length;
  const chain = extractChain(text, cursor);
  const dotIdx = chain.lastIndexOf(".");
  if (dotIdx === -1) {
    const partial2 = chain;
    const completions = partial2 ? TOP_LEVEL.filter((k) => k.startsWith(partial2) && k !== partial2) : [];
    return { completions, chain, partial: partial2 };
  }
  const objExpr = chain.slice(0, dotIdx);
  const partial = chain.slice(dotIdx + 1);
  if (!objExpr) return { completions: [], chain, partial };
  try {
    const fn = new Function("bonsai", `return (${objExpr})`);
    const obj = fn(scriptScope(context));
    if (obj == null) return { completions: [], chain, partial };
    const completions = allProps(obj).filter(
      (k) => !partial || k.startsWith(partial)
    );
    return { completions, chain, partial };
  } catch {
    return { completions: [], chain, partial };
  }
}
function applyCompletion(text, cursor, chain, completion) {
  cursor = cursor ?? text.length;
  const dotIdx = chain.lastIndexOf(".");
  const keep = dotIdx === -1 ? "" : chain.slice(0, dotIdx + 1);
  const before = text.slice(0, cursor - chain.length);
  const after = text.slice(cursor);
  const newText = before + keep + completion;
  return { text: newText + after, cursor: newText.length };
}
var PROMPT = "bonsai >";
var SNIPPETS = [
  {
    id: "tool",
    label: "bonsai.tool",
    items: [
      { label: "Active model", command: "bonsai.tool.Ifc.get()" },
      { label: "Count walls", command: "bonsai.tool.Ifc.file()?.byType('IfcWall').length" },
      { label: "Storeys", command: "bonsai.tool.Ifc.file()?.byType('IfcBuildingStorey').map((s) => bonsai.tool.Element.displayName(s))" },
      { label: "Selected GlobalId", command: "bonsai.tool.Ifc.globalId()" },
      { label: "Selected attributes", command: "bonsai.tool.Element.getAttributes(bonsai.tool.Ifc.entity())" },
      { label: "Selected psets", command: "bonsai.tool.Pset.getPsets(bonsai.tool.Ifc.entity())" }
    ]
  },
  {
    id: "ops",
    label: "bonsai.ops",
    items: [
      { label: "List operators", command: "bonsai.ops.list()" },
      { label: "New project", command: "await bonsai.ops.execute('project.new')" },
      { label: "Top view", command: "bonsai.ops.execute('viewer.standard_view', 'TOP')" },
      { label: "View all", command: "bonsai.ops.execute('viewer.view_all')" },
      { label: "Isolate selection", command: "bonsai.ops.execute('viewer.isolate')" },
      { label: "Section", command: "bonsai.ops.execute('viewer.section')" },
      { label: "Clear cuts", command: "bonsai.ops.execute('viewer.clear_section')" },
      { label: "Show all", command: "bonsai.ops.execute('show.all')" },
      { label: "Undo", command: "bonsai.ops.undo()" }
    ]
  }
];
function row(...children) {
  return new StackPanel({ isVertical: false }).gap("0.5rem").setStyle("alignItems", ["center"]).setStyle("flexWrap", ["wrap"]).add(...children);
}
var TerminalPanelUI = class {
  static id = "code.terminal";
  static spec = {
    group: "terminal",
    position: "bottom",
    id: "terminal-panel",
    label: "Terminal",
    icon: "terminal",
    title: "Terminal",
    autoShow: false,
    panelStyles: { height: "100%", maxHeight: "100%", display: "flex", flexDirection: "column" }
  };
  constructor({ context }) {
    this.context = context;
    this.visible = false;
    this.workspacePanel = null;
    this.activeTerminalGuid = null;
    this.historyIndex = -1;
    this.tabs = null;
    this.promptInput = null;
    this.executing = false;
    this._outputs = /* @__PURE__ */ new Map();
    this._completions = null;
    this._completionItems = [];
    this._completionIndex = -1;
    this._onPointerDown = (event) => {
      if (!this._completions?.dom.contains(event.target)) this._closeCompletions();
    };
    this._onResize = () => {
      if (this._completionItems.length > 0) this._positionCompletions();
    };
    context.terminal = context.terminal || {};
    context.terminal.terminalPanel = this;
    context.terminal.activeTerminalGuid = null;
    context.terminal.onTerminalCreated = (guid) => {
      this.refreshTerminalList();
      this.selectTerminal(guid, { focusInput: true });
    };
    context.terminal.onTerminalCleared = (guid) => {
      if (guid === this.activeTerminalGuid) this.renderActiveTerminal();
    };
    context.terminal.onTerminalClosed = (guid) => {
      const wasActive = guid === this.activeTerminalGuid;
      if (wasActive) {
        this.activeTerminalGuid = null;
        this.context.terminal.activeTerminalGuid = null;
      }
      this.refreshTerminalList();
      if (!wasActive) return;
      const next = Terminal.list()[0] ?? Terminal.create();
      this.selectTerminal(next.guid);
    };
    context.terminal.onCommandResult = ({ terminalGuid }) => {
      if (terminalGuid === this.activeTerminalGuid) {
        this.renderActiveTerminal();
        this._focusInput();
      }
      this.refreshTerminalList();
    };
    this._buildCompletionsPopup();
    this.build();
    if (Terminal.list().length === 0) Terminal.create("Terminal 1");
    const first = Terminal.list()[0];
    if (first) this.selectTerminal(first.guid);
  }
  attach(workspacePanel) {
    this.workspacePanel = workspacePanel;
    this._syncVisible();
  }
  _syncVisible() {
    this.visible = Boolean(this.workspacePanel?.isVisible?.());
    return this.visible;
  }
  _buildCompletionsPopup() {
    this._completions = new StackPanel({ isVertical: true }).addClass("bonsai-completions").setStyle("display", ["none"]).setStyle("position", ["fixed"]).setStyle("zIndex", ["999"]);
    document.body.appendChild(this._completions.dom);
    document.addEventListener("mousedown", this._onPointerDown);
    window.addEventListener("resize", this._onResize);
  }
  _openCompletions(items, selectedIndex = 0) {
    const popup = this._completions;
    popup.clear();
    this._completionItems = items;
    this._completionIndex = selectedIndex;
    items.forEach((item, index) => {
      const choice = new Button(item).addClass("secondary").setTooltip(item);
      if (index === selectedIndex) choice.addClass("is-active");
      choice.dom.addEventListener("mousedown", (event) => {
        event.preventDefault();
        this._applyCompletionAt(index);
      });
      popup.add(choice);
    });
    popup.setStyle("display", ["flex"]);
    this._positionCompletions();
  }
  _positionCompletions() {
    if (!this.promptInput?.dom || !this._completions) return;
    const rect = this.promptInput.dom.getBoundingClientRect();
    const popup = this._completions.dom;
    const popH = Math.min(popup.scrollHeight, 200);
    popup.style.left = `${rect.left}px`;
    popup.style.top = `${rect.top - popH - 6}px`;
    popup.style.minWidth = `${Math.max(180, rect.width)}px`;
  }
  _closeCompletions() {
    this._completions?.setStyle("display", ["none"]);
    this._completionItems = [];
    this._completionIndex = -1;
  }
  _highlightCompletion(index) {
    if (!this._completions) return;
    this._completionIndex = index;
    const buttons = this._completions.dom.querySelectorAll(".Button");
    buttons.forEach((button, i) => {
      button.classList.toggle("is-active", i === index);
    });
    buttons[index]?.scrollIntoView({ block: "nearest" });
  }
  _applyCompletionAt(index) {
    const item = this._completionItems[index];
    if (!item || !this.promptInput) return;
    const dom = this.promptInput.dom;
    const text = dom.value;
    const cursor = dom.selectionStart ?? text.length;
    const { chain } = getCompletions(text, cursor, this.context);
    const { text: newText, cursor: newCursor } = applyCompletion(text, cursor, chain, item);
    this.promptInput.setValue(newText);
    requestAnimationFrame(() => {
      dom.selectionStart = newCursor;
      dom.selectionEnd = newCursor;
    });
    this._closeCompletions();
  }
  _triggerCompletions() {
    if (!this.promptInput) return;
    const dom = this.promptInput.dom;
    const text = dom.value;
    const cursor = dom.selectionStart ?? text.length;
    const { completions, chain } = getCompletions(text, cursor, this.context);
    if (completions.length === 0) return;
    if (completions.length === 1) {
      const { text: newText, cursor: newCursor } = applyCompletion(text, cursor, chain, completions[0]);
      this.promptInput.setValue(newText);
      requestAnimationFrame(() => {
        dom.selectionStart = newCursor;
        dom.selectionEnd = newCursor;
      });
      return;
    }
    this._openCompletions(completions, 0);
  }
  build() {
    this.tabs = new TabView();
    this.promptInput = new InputText();
    this.promptInput.dom.spellcheck = false;
    this.promptInput.dom.placeholder = "JavaScript expression\u2026";
    this.promptInput.setStyle("flex", ["1"]);
    this.promptInput.dom.setAttribute("aria-label", "Terminal input");
    this.promptInput.dom.addEventListener("keydown", (event) => this._onPromptKeyDown(event));
    const promptRow = row(
      new Text(PROMPT).setStyle("color", ["var(--dui-color-accent)"]),
      this.promptInput
    ).setStyle("flexWrap", ["nowrap"]);
    const snippets = new TabView().addClass("bonsai-terminal-snippets");
    for (const group of SNIPPETS) {
      const list = new StackPanel({ isVertical: true }).addClass("bonsai-terminal-snippet-list").gap("0.25rem");
      for (const item of group.items) {
        list.add(new Button(item.label).addClass("secondary").setTooltip(item.command).onClick((event) => {
          event.preventDefault();
          this.promptInput.setValue(item.command);
          this._focusInput();
        }));
      }
      const scroll = new ScrollViewer({ scrollable: true, fill: true }).add(list);
      snippets.addTab(`terminal-snippets-${group.id}`, group.label, scroll);
    }
    snippets.select(`terminal-snippets-${SNIPPETS[0].id}`);
    const header = row(
      new Container().addClass("bonsai-terminal-tabs").add(this.tabs.tabsDiv),
      new Operator("add").setTooltip("New terminal").onClick((event) => {
        event.preventDefault();
        ops_default.execute("terminal.new", this.context);
      }),
      new Operator("clear_all").setTooltip("Clear terminal").onClick((event) => {
        event.preventDefault();
        ops_default.execute("code.terminal.clear", this.context);
      }),
      new Operator("close").setTooltip("Close terminal").onClick((event) => {
        event.preventDefault();
        ops_default.execute("code.terminal.close", this.context);
      })
    ).addClass("bonsai-terminal-header").setStyle("flexWrap", ["nowrap"]);
    const output = new StackPanel({ isVertical: true }).addClass("bonsai-terminal-console").gap("0.5rem").add(this.tabs, promptRow);
    const body = new StackPanel({ isVertical: false }).addClass("bonsai-terminal-body").gap("0.75rem").add(output, snippets);
    this.root = new StackPanel({ isVertical: true }).addClass("bonsai-terminal").gap("0.5rem").setStyle("height", ["100%"]).setStyle("minHeight", ["0"]).add(header, body);
  }
  _onPromptKeyDown(event) {
    const completionsOpen = this._completionItems.length > 0;
    if (event.key === "Tab") {
      event.preventDefault();
      if (completionsOpen) {
        const next = (this._completionIndex + (event.shiftKey ? -1 : 1) + this._completionItems.length) % this._completionItems.length;
        this._highlightCompletion(next);
      } else {
        this._triggerCompletions();
      }
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (completionsOpen && this._completionIndex >= 0) this._applyCompletionAt(this._completionIndex);
      else void this._submitCommand();
      return;
    }
    if (event.key === "Escape") {
      if (completionsOpen) {
        event.preventDefault();
        this._closeCompletions();
      }
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (completionsOpen) {
        const prev = (this._completionIndex - 1 + this._completionItems.length) % this._completionItems.length;
        this._highlightCompletion(prev);
      } else {
        this._historyStep(-1);
      }
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (completionsOpen) {
        const next = (this._completionIndex + 1) % this._completionItems.length;
        this._highlightCompletion(next);
      } else {
        this._historyStep(1);
      }
      return;
    }
    if (completionsOpen) this._closeCompletions();
  }
  toggle() {
    if (this.isVisible()) this.hide();
    else this.show();
    return this;
  }
  isVisible() {
    return this.workspacePanel ? this._syncVisible() : this.visible;
  }
  show() {
    const panel = this.workspacePanel;
    if (panel && !panel.isVisible()) {
      const layout = panel.layout;
      const needsOpen = typeof layout?.isWorkspaceOpen === "function" && !layout.isWorkspaceOpen(panel.position);
      panel.show({ open: needsOpen, select: needsOpen });
    }
    this.visible = this.workspacePanel ? this.isVisible() : true;
    if (this.visible) this._focusInput();
    return this;
  }
  hide() {
    const panel = this.workspacePanel;
    if (panel?.isVisible()) panel.hide({ closeIfEmpty: true });
    this.visible = false;
    this._closeCompletions();
    return this;
  }
  refreshTerminalList() {
    if (!this.tabs) return;
    const sessions = Terminal.list();
    const live = new Set(sessions.map((session) => session.guid));
    for (const guid of [...this._outputs.keys()]) {
      if (live.has(guid)) continue;
      this.tabs.removeTab(guid);
      this._outputs.delete(guid);
    }
    for (const session of sessions) {
      if (this._outputs.has(session.guid)) continue;
      const lines = new StackPanel({ isVertical: true }).gap("0.25rem");
      const scroll = new ScrollViewer({ scrollable: true, fill: true });
      scroll.add(lines);
      this.tabs.addTab(session.guid, session.name, scroll);
      this._outputs.set(session.guid, { lines, scroll });
      const tab = this.tabs.tabs.find((item) => item.dom.id === session.guid);
      tab?.onClick(() => this.selectTerminal(session.guid, { focusInput: true }));
    }
    if (this.activeTerminalGuid && live.has(this.activeTerminalGuid)) {
      this.tabs.select(this.activeTerminalGuid);
    }
  }
  selectTerminal(guid, { focusInput = false } = {}) {
    const session = Terminal.get(guid);
    if (!session) return;
    this.activeTerminalGuid = guid;
    this.context.terminal.activeTerminalGuid = guid;
    this.historyIndex = -1;
    this.refreshTerminalList();
    this.renderActiveTerminal();
    if (focusInput) this._focusInput();
  }
  renderActiveTerminal() {
    const slot = this._outputs.get(this.activeTerminalGuid);
    if (!slot) return;
    slot.lines.clear();
    const session = Terminal.get(this.activeTerminalGuid);
    if (!session) {
      slot.lines.add(new Caption("No terminal selected."));
      return;
    }
    for (const entry of session.history) {
      slot.lines.add(row(
        new Text(PROMPT).setStyle("color", ["var(--dui-color-accent)"]),
        new Text(entry.command)
      ).setStyle("flexWrap", ["nowrap"]));
      if (entry.output) {
        slot.lines.add(
          new Text(entry.output).setStyle("color", [entry.success ? "var(--dui-color-info)" : "var(--dui-color-danger)"]).setStyle("whiteSpace", ["pre-wrap"]).setStyle("overflowWrap", ["anywhere"])
        );
      }
    }
    const scroller = slot.scroll.dom;
    scroller.scrollTop = scroller.scrollHeight;
  }
  async _submitCommand() {
    if (this.executing || !this.promptInput) return;
    const command = this.promptInput.getValue();
    if (!String(command).trim()) return;
    this.executing = true;
    this.promptInput.setValue("");
    this.historyIndex = -1;
    try {
      await ops_default.execute(
        "code.terminal.execute",
        this.context,
        command,
        this.activeTerminalGuid
      );
    } finally {
      this.executing = false;
      this._focusInput();
    }
  }
  _historyStep(delta) {
    const session = Terminal.get(this.activeTerminalGuid);
    if (!session || !this.promptInput) return;
    const commands = session.commandHistory;
    if (commands.length === 0) return;
    if (this.historyIndex < 0) this.historyIndex = commands.length;
    this.historyIndex = Math.max(0, Math.min(commands.length, this.historyIndex + delta));
    if (this.historyIndex >= commands.length) {
      this.promptInput.setValue("");
      this.historyIndex = commands.length;
      return;
    }
    this.promptInput.setValue(commands[this.historyIndex]);
  }
  _focusInput() {
    this.promptInput?.dom.focus();
  }
  destroy() {
    document.removeEventListener("mousedown", this._onPointerDown);
    window.removeEventListener("resize", this._onResize);
    this._completions?.dom.remove();
    this._completions = null;
    this.workspacePanel?.hide();
    this.workspacePanel = null;
  }
};
var ui_default = [TerminalPanelUI];

// src/modules/georeferencing/ui.js
import {
  FloatingDialog,
  InputDropdown,
  InputNumber,
  Operator as IconButton,
  StackPanel as StackPanel2,
  Text as Text2,
  Tooltip
} from "@aeco-dev/gui";
var RIBBON_BUTTON_ID = "RB_SurveyPoint";
var FEDERATION_UNITS = {
  "METRE|": "metre",
  "METRE|MILLI": "millimetre",
  "METRE|CENTI": "centimetre",
  "foot|": "foot",
  "inch|": "inch"
};
var UNIT_BY_LABEL = {
  m: "METRE|",
  mm: "METRE|MILLI",
  cm: "METRE|CENTI",
  ft: "foot|",
  in: "inch|"
};
function row2(...children) {
  return new StackPanel2({ isVertical: false }).gap("0.5rem").setStyle("alignItems", ["center"]).setStyle("flexWrap", ["wrap"]).add(...children);
}
function fmtCoord(n) {
  if (!Number.isFinite(n)) return "\u2014";
  const abs = Math.abs(n);
  const digits = abs >= 1e3 ? 2 : abs >= 10 ? 3 : 4;
  return n.toFixed(digits);
}
function coordInput() {
  const input = new InputNumber(0).setPrecision(4).setStep(1).setNudge(0.01);
  input.setValue(0);
  input.setStyle("width", ["100%"]);
  return input;
}
function angleInput() {
  const input = new InputNumber(0).setPrecision(2).setStep(1).setNudge(0.1);
  input.setValue(0);
  input.setStyle("width", ["6rem"]);
  return input;
}
function hint(control, text) {
  new Tooltip(text).attachTo(control);
  return control;
}
function labeled(label, control, tip) {
  const caption = new Text2(label);
  caption.setStyle("fontSize", ["0.7rem"]);
  if (tip && !control._hinted) {
    hint(control, tip);
    control._hinted = true;
  }
  return new StackPanel2({ isVertical: true }).gap("0.15rem").setStyle("flex", ["1"]).setStyle("minWidth", ["4.25rem"]).add(caption, control);
}
function helpButton(dialog) {
  const button = new IconButton("help");
  button.setTooltip("Help");
  button.dom.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dialog.isActive) dialog.hide();
    else dialog.show();
  });
  return button;
}
function originFields(onEdit) {
  const fields = {
    x: coordInput(),
    y: coordInput(),
    z: coordInput(),
    north: angleInput(),
    hold: false,
    seed: ""
  };
  for (const input of [fields.x, fields.y, fields.z, fields.north]) {
    input.dom.addEventListener("input", () => {
      fields.hold = true;
      onEdit(fields);
    });
    input.onChange(() => onEdit(fields));
  }
  return fields;
}
function readLive(fields) {
  const nums = [fields.x, fields.y, fields.z, fields.north].map((input) => {
    const raw = input.dom.value.trim();
    if (raw === "" || raw === "-" || raw === "." || raw === "-.") return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  });
  if (nums.some((n) => n == null)) return null;
  return { xyz: nums.slice(0, 3), rzDeg: nums[3] };
}
function readOrigin() {
  try {
    if (!viewer?.getFalseOrigin) return null;
    return viewer.getFalseOrigin();
  } catch {
    return null;
  }
}
function originSeed(origin) {
  return `${origin.xyz.join(",")}|${origin.rzDeg}|${origin.explicit}`;
}
function writeOrigin(fields, origin) {
  const seed = originSeed(origin);
  if (fields.hold || seed === fields.seed) return;
  fields.seed = seed;
  fields.x.setValue(origin.xyz[0]);
  fields.y.setValue(origin.xyz[1]);
  fields.z.setValue(origin.xyz[2]);
  fields.north.setValue(origin.rzDeg);
}
var GeoreferencingPanelUI = class {
  static id = "georeferencing";
  constructor({ context }) {
    this.context = context;
    this._baseline = null;
    this._applying = false;
    this._survey = originFields(() => this._applySurvey());
    this._unit = hint(new InputDropdown(), "Federation unit. Changing the unit does not convert the numbers; it changes what a number means.");
    this._unit.setOptions(FEDERATION_UNITS);
    this._unit.dom.setAttribute("aria-label", "federation unit");
    this._surveyPoint = new Text2("Survey point  \u2014");
    this._worldOrigin = new Text2("World origin  \u2014");
    this._marker = new Text2("False origin  \u2014");
    this._georef = new Text2("Load a model to read its map conversion.");
    for (const line of [this._surveyPoint, this._worldOrigin, this._marker, this._georef]) {
      line.setStyle("whiteSpace", ["pre-wrap"]);
    }
    this._unit.onChange(() => this._setUnit());
    const surveyHelp = new FloatingDialog({
      title: "Survey point",
      icon: "help",
      panelStyles: { width: "18rem" }
    });
    surveyHelp.content(new StackPanel2({ isVertical: true }).gap("0.5rem").add(
      new Text2("X, Y, Z and grid north are the survey marker in the world. Typing them moves the marker. Models stay where they are. A model\u2019s own X, Y, Z and grid north place that model in the same world, about this survey point. Sync puts the marker back where it was when the model was loaded.")
    ));
    const sync = new IconButton("sync").setTooltip("Reset survey point");
    sync.setStyle("cursor", ["pointer"]);
    sync.dom.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._reset();
    });
    this.dialog = new FloatingDialog({
      title: "Survey point",
      icon: "my_location",
      panelStyles: { width: "22rem" }
    });
    this.dialog.content(new StackPanel2({ isVertical: true }).gap("0.5rem").add(
      row2(sync, helpButton(surveyHelp)),
      this._surveyPoint,
      this._worldOrigin,
      this._marker,
      this._georef,
      this._unit,
      row2(
        labeled("X", this._survey.x, "Survey marker X in the world. Does not move models."),
        labeled("Y", this._survey.y, "Survey marker Y in the world. Does not move models."),
        labeled("Z", this._survey.z, "Survey marker Z in the world. Does not move models.")
      ),
      labeled("Grid north \xB0", this._survey.north, "Grid north of the survey point, in degrees. Turns the drawing frame, not the models.")
    ));
    this.dialog.onShow = () => {
      this.syncRibbon();
      this.refresh();
    };
    this.dialog.onHide = () => this.syncRibbon();
    context.georeferencing = context.georeferencing || {};
    context.georeferencing.panel = this;
    const { signals } = context;
    signals.viewerReady.add(() => this.refresh());
    signals.modelLoaded.add(() => this.refresh());
    signals.modelLoadedToGPU.add(() => this._paintGeoref());
    signals.liveIfcReady.add(() => this.refresh());
    signals.modelCleared.add(() => this.refresh());
    this.refresh();
  }
  toggle() {
    this.dialog.toggle();
    return this;
  }
  isVisible() {
    return Boolean(this.dialog?.isActive);
  }
  syncRibbon() {
    document.getElementById(RIBBON_BUTTON_ID)?.classList.toggle("Active", this.isVisible());
  }
  refresh() {
    this._syncSurvey();
    this._paintGeoref();
  }
  _syncSurvey() {
    const origin = readOrigin();
    if (!origin) return;
    if (!this._survey.hold) {
      this._baseline = { xyz: origin.xyz.slice(), rzDeg: origin.rzDeg };
      writeOrigin(this._survey, origin);
    }
    this._paintSurvey(origin);
    if (!this._unit.dom.matches(":focus")) {
      const key = UNIT_BY_LABEL[origin.unit];
      if (key) this._unit.setValue(key);
    }
  }
  _applySurvey() {
    if (this._applying) return;
    const pose = readLive(this._survey);
    if (!pose) return;
    this._survey.hold = true;
    ops_default.execute("viewer.set_false_origin", this.context, pose);
    this._paintSurvey({ ...pose, explicit: true, unit: readOrigin()?.unit });
  }
  _reset() {
    const origin = this._baseline ?? readOrigin();
    if (!origin) return;
    this._applying = true;
    ops_default.execute("viewer.set_false_origin", this.context, {
      xyz: origin.xyz,
      rzDeg: origin.rzDeg
    });
    this._survey.hold = false;
    this._survey.seed = "";
    this._applying = false;
    this._syncSurvey();
  }
  _paintSurvey(origin) {
    const unit = origin.unit || "m";
    let survey = [0, 0, 0];
    let world = [0, 0, 0];
    try {
      if (viewer.surveyPoint) survey = viewer.surveyPoint();
      if (viewer.worldOrigin) world = viewer.worldOrigin();
    } catch {
    }
    const mag = Math.hypot(origin.xyz[0], origin.xyz[1], origin.xyz[2]);
    const how = origin.explicit ? "set by you" : mag > 1e-4 || Math.abs(origin.rzDeg) > 1e-3 ? "guessed from the first model" : "no shift yet";
    this._surveyPoint.setValue(`Survey point  ${survey.map(fmtCoord).join(", ")} m`);
    this._worldOrigin.setValue(`World origin  ${world.map(fmtCoord).join(", ")} m`);
    this._marker.setValue(
      `False origin  ${origin.xyz.map(fmtCoord).join(", ")} ${unit}  \xB7  grid north ${origin.rzDeg.toFixed(2)}\xB0  \xB7  ${how}`
    );
  }
  _paintGeoref() {
    const models = this.context.store.models;
    if (!models.length) {
      this._georef.setValue("Load a model to read its map conversion.");
      return;
    }
    const lines = [];
    for (const entry of models) {
      let georef = null;
      try {
        georef = viewer?.getModelGeoref?.(entry.sourceId) ?? null;
      } catch {
      }
      const name = entry.name || entry.viewName || `Model ${entry.sourceId}`;
      if (!georef) {
        lines.push(`${name}: still loading`);
        continue;
      }
      const map = georef.hasCoordinateOperation ? "map conversion" : "no map conversion";
      lines.push(`${name}: ${map}`);
    }
    this._georef.setValue(lines.join("\n"));
  }
  _setUnit() {
    const [name, prefix = ""] = this._unit.getValue().split("|");
    ops_default.execute("viewer.set_federation_unit", this.context, { name, prefix });
    this._syncSurvey();
  }
};
var ui_default2 = [GeoreferencingPanelUI];

// src/modules/profiling/ui.js
import {
  Canvas,
  Card,
  Caption as Caption2,
  Code,
  FloatingWindow,
  Grid,
  PropertyGrid,
  StackPanel as StackPanel3,
  Text as Text3
} from "@aeco-dev/gui";

// src/modules/profiling/fps-gauge.js
var MAX_FPS = 2e3;
var BASELINE_FPS = 60;
var TICKS = [0, 30, 60, 120, 250, 500, 1e3, 2e3];
var LOG_K = 12;
var ARC_START = Math.PI * 5 / 6;
var ARC_SWEEP = Math.PI * 4 / 3;
function readColor(name, fallback) {
  if (typeof document === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
function fpsToT(fps) {
  const value = Math.max(0, Number(fps) || 0);
  const clamped = Math.min(value, MAX_FPS);
  return Math.log1p(clamped / LOG_K) / Math.log1p(MAX_FPS / LOG_K);
}
function angleFor(t) {
  return ARC_START + t * ARC_SWEEP;
}
var FpsGauge = class {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.fps = 0;
    this.display = 0;
    this._onResize = () => this.draw();
    window.addEventListener("resize", this._onResize);
    this._resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => this.draw());
    this._resizeObserver?.observe(canvas);
  }
  update(fps) {
    this.fps = Number.isFinite(fps) && fps > 0 ? fps : 0;
    const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || this.display === 0) this.display = this.fps;
    else this.display += (this.fps - this.display) * 0.35;
    this.draw();
  }
  draw() {
    if (!this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height * 0.64;
    const radius = Math.min(width * 0.36, height * 0.46);
    const track = Math.max(12, radius * 0.2);
    const t = fpsToT(this.display);
    this.drawTrack(cx, cy, radius, track);
    this.drawValue(cx, cy, radius, track, t);
    this.drawTicks(cx, cy, radius, track);
    this.drawNeedle(cx, cy, radius, track, t);
    this.drawHub(cx, cy);
    this.drawReadout(cx, cy, radius);
  }
  drawTrack(cx, cy, radius, track) {
    const ctx = this.ctx;
    ctx.lineCap = "round";
    ctx.lineWidth = track;
    ctx.strokeStyle = readColor("--dui-color-surface-pressed", "#1f2228");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, ARC_START, ARC_START + ARC_SWEEP, false);
    ctx.stroke();
  }
  drawValue(cx, cy, radius, track, t) {
    if (t <= 0) return;
    const ctx = this.ctx;
    const start2 = angleFor(0);
    const end = angleFor(t);
    const fill = this.display >= BASELINE_FPS ? "#3ecbff" : readColor("--dui-color-danger", "#d4785a");
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = track;
    ctx.strokeStyle = fill;
    ctx.shadowColor = fill;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, start2, end, false);
    ctx.stroke();
    ctx.restore();
  }
  drawTicks(cx, cy, radius, track) {
    const ctx = this.ctx;
    const inner = radius - track * 0.7;
    const outer = radius + track * 0.55;
    ctx.save();
    ctx.fillStyle = readColor("--dui-color-text-subtle", "#8f98a6");
    ctx.font = `500 ${Math.max(9, Math.round(radius * 0.11))}px ${readColor("--dui-font-ui", "Nunito, sans-serif")}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const fps of TICKS) {
      const t = fpsToT(fps);
      const angle = angleFor(t);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const baseline = fps === BASELINE_FPS;
      ctx.strokeStyle = baseline ? readColor("--dui-color-accent", "#39b54a") : readColor("--dui-color-border-strong", "#5b6472");
      ctx.lineWidth = baseline ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(cx + cos * inner, cy + sin * inner);
      ctx.lineTo(cx + cos * outer, cy + sin * outer);
      ctx.stroke();
      const labelR = radius + track * 0.95;
      ctx.fillStyle = baseline ? readColor("--dui-color-accent", "#39b54a") : readColor("--dui-color-text-muted", "#9aa4b3");
      ctx.fillText(String(fps), cx + cos * labelR, cy + sin * labelR);
    }
    ctx.restore();
  }
  drawNeedle(cx, cy, radius, track, t) {
    const ctx = this.ctx;
    const angle = angleFor(t);
    const tip = radius - track * 0.15;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.fillStyle = readColor("--dui-color-text", "#d0d5dd");
    ctx.beginPath();
    ctx.moveTo(tip, 0);
    ctx.lineTo(-radius * 0.12, radius * 0.035);
    ctx.lineTo(-radius * 0.12, -radius * 0.035);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  drawHub(cx, cy) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.fillStyle = readColor("--dui-color-text", "#d0d5dd");
    ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = readColor("--dui-color-bg", "#26292f");
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  drawReadout(cx, cy, radius) {
    const ctx = this.ctx;
    const value = this.fps > 0 ? this.fps.toFixed(0) : "\u2014";
    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = readColor("--dui-color-text", "#d0d5dd");
    ctx.font = `600 ${Math.max(22, Math.round(radius * 0.28))}px ${readColor("--dui-font-mono", "Inconsolata, monospace")}`;
    ctx.fillText(value, cx, cy + radius * 0.28);
    ctx.fillStyle = readColor("--dui-color-text-muted", "#9aa4b3");
    ctx.font = `500 ${Math.max(10, Math.round(radius * 0.12))}px ${readColor("--dui-font-ui", "Nunito, sans-serif")}`;
    ctx.fillText("fps", cx, cy + radius * 0.46);
    ctx.restore();
  }
  destroy() {
    window.removeEventListener("resize", this._onResize);
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }
};

// src/modules/profiling/metrics.js
var HISTORY = 90;
function formatFps(value) {
  return Number.isFinite(value) && value > 0 ? `${value.toFixed(0)} fps` : "\u2014 fps";
}
function formatMs(value) {
  return Number.isFinite(value) && value > 0 ? `${value.toFixed(1)} ms` : "\u2014";
}
function formatCount(value) {
  return Number.isFinite(value) && value > 0 ? value.toLocaleString() : "\u2014";
}
function formatObjects(visible, total) {
  if (!Number.isFinite(total) || total <= 0) return "\u2014";
  return `${formatCount(visible)}/${formatCount(total)}`;
}
function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "\u2014";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  const digits = size >= 10 || unit === 0 ? 0 : 1;
  return `${size.toFixed(digits)} ${units[unit]}`;
}
function emptyStats() {
  return {
    clientFps: 0,
    wasmFps: 0,
    frameMs: 0,
    objectsVisible: 0,
    objectsTotal: 0,
    trianglesVisible: 0,
    trianglesTotal: 0,
    drawCalls: 0,
    vramUsed: 0,
    vramCapacity: 0,
    workingSetMissing: 0
  };
}
var ViewerMetrics = class {
  constructor() {
    this.clientFps = 0;
    this.samples = [];
    this.history = [];
    this.stats = null;
    this.rafId = 0;
  }
  start() {
    if (this.rafId) return this;
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (dt > 0) {
        this.samples.push(1e3 / dt);
        if (this.samples.length > HISTORY) this.samples.shift();
        let sum = 0;
        for (const sample of this.samples) sum += sample;
        this.clientFps = sum / this.samples.length;
      }
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
    return this;
  }
  stop() {
    if (!this.rafId) return this;
    cancelAnimationFrame(this.rafId);
    this.rafId = 0;
    return this;
  }
  readViewer(viewer2) {
    try {
      this.stats = viewer2?.stats?.() ?? null;
    } catch {
      this.stats = null;
    }
    const fps = this.stats?.fps > 0 ? this.stats.fps : this.clientFps;
    if (fps > 0) {
      this.history.push(fps);
      if (this.history.length > HISTORY) this.history.shift();
    }
    return this.getSnapshot();
  }
  getSnapshot() {
    const stats = this.stats;
    return {
      ...emptyStats(),
      clientFps: this.clientFps,
      wasmFps: stats?.fps ?? 0,
      frameMs: stats?.frameTimeMs ?? 0,
      objectsVisible: stats?.objects?.visible ?? 0,
      objectsTotal: stats?.objects?.total ?? 0,
      trianglesVisible: stats?.triangles?.visible ?? 0,
      trianglesTotal: stats?.triangles?.total ?? 0,
      drawCalls: stats?.drawCalls ?? 0,
      vramUsed: stats?.vram?.usedBytes ?? 0,
      vramCapacity: stats?.vram?.capacityBytes ?? 0,
      workingSetMissing: stats?.workingSet?.chunksMissing ?? 0
    };
  }
  getFpsHistory() {
    return this.history;
  }
};

// src/modules/profiling/ui.js
var RIBBON_BUTTON_ID2 = "RB_Profiler";
var FOOTER_ID = "ProfilerFooter";
function row3(...children) {
  return new StackPanel3({ isVertical: false }).gap("0.5rem").setStyle("alignItems", ["center"]).add(...children);
}
function column(...children) {
  return new StackPanel3({ isVertical: true }).gap("0.625rem").add(...children);
}
function metricValue(initial = "\u2014") {
  return new Code(initial);
}
function statTile(label) {
  const valueEl = new Code("\u2014");
  const tile = new Card().padding("0.5rem 0.625rem").add(column(new Caption2(label), valueEl).gap("0.15rem"));
  return { tile, valueEl };
}
function fpsTone(fps) {
  if (!Number.isFinite(fps) || fps <= 0) return "";
  if (fps >= 50) return "is-good";
  if (fps >= 30) return "is-ok";
  return "is-low";
}
function drawSparkline(canvas, series) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  if (!series.length) return;
  const peak = Math.max(60, ...series, 1);
  const step = series.length > 1 ? width / (series.length - 1) : width;
  const color = getComputedStyle(document.documentElement).getPropertyValue("--dui-color-accent").trim() || "#39b54a";
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  for (let i = 0; i < series.length; i += 1) {
    const x = i * step;
    const y = height - Math.min(series[i], peak) / peak * (height - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}
var ProfilerHudUI = class {
  static id = "profiling";
  constructor({ context }) {
    this.context = context;
    this.metrics = new ViewerMetrics().start();
    this.visible = false;
    this.refreshTimer = 0;
    this.panel = null;
    this.footer = null;
    this.footerFps = null;
    this.footerMs = null;
    this.fpsStrip = {};
    this.renderValues = {};
    this.graphCanvas = null;
    this.gauge = null;
    this.gaugeCanvas = null;
    this.headerValues = {};
    this.placed = false;
    if (!context.profiling) context.profiling = {};
    context.profiling.profilerPanel = this;
    context.profiling.metrics = this.metrics;
    this.buildFooter();
    this.buildWindow();
    this.startRefresh();
  }
  buildFooter() {
    const host = document.getElementById(FOOTER_ID);
    if (!host) return;
    this.footerFps = new Text3("\u2014 fps").addClass("ProfilerFooter-fps");
    this.footerMs = new Text3("").addClass("ProfilerFooter-ms");
    this.footer = row3(this.footerFps, this.footerMs).addClass("ProfilerFooter-readout").setTooltip("Open profiler");
    this.footer.dom.setAttribute("role", "button");
    this.footer.dom.tabIndex = 0;
    this.footer.onClick(() => this.toggle());
    this.footer.dom.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      this.toggle();
    });
    host.appendChild(this.footer.dom);
  }
  buildWindow() {
    this.panel = new FloatingWindow({
      title: "Profiler",
      icon: "speed",
      closable: true
    });
    this.panel.addClass("ProfilerWindow");
    this.panel.setStyles({
      width: "min(360px, calc(100% - 28px))",
      height: "auto",
      maxHeight: "min(78vh, calc(100% - 28px))",
      zIndex: "24"
    });
    this.panel.onClose(() => {
      this.visible = false;
      this.syncRibbon();
    });
    this.headerValues.viewer = new Text3("\u2014").addClass("ProfilerGauge-statValue");
    this.headerValues.client = new Text3("\u2014").addClass("ProfilerGauge-statValue");
    this.headerValues.frame = new Text3("\u2014").addClass("ProfilerGauge-statValue");
    const header = row3(
      column(new Caption2("Viewer"), this.headerValues.viewer).addClass("ProfilerGauge-stat"),
      column(new Caption2("Client"), this.headerValues.client).addClass("ProfilerGauge-stat"),
      column(new Caption2("Frame"), this.headerValues.frame).addClass("ProfilerGauge-stat")
    ).addClass("ProfilerGauge-header");
    this.gaugeCanvas = new Canvas();
    this.gaugeCanvas.dom.setAttribute("aria-label", "FPS gauge");
    this.gaugeCanvas.dom.classList.add("ProfilerGauge-canvas");
    this.gauge = new FpsGauge(this.gaugeCanvas.dom);
    const gaugeCard = new Card().padding("0.5rem 0.25rem 0.25rem").addClass("ProfilerGauge");
    gaugeCard.add(column(header, this.gaugeCanvas).gap("0.25rem"));
    this.fpsStrip.viewer = statTile("Viewer FPS");
    this.fpsStrip.client = statTile("Client FPS");
    this.fpsStrip.frame = statTile("Frame time");
    const tiles = new Grid().autoFit("96px").gap("0.5rem");
    tiles.add(
      this.fpsStrip.viewer.tile,
      this.fpsStrip.client.tile,
      this.fpsStrip.frame.tile
    );
    const graphCard = new Card().padding("0.375rem");
    this.graphCanvas = new Canvas();
    this.graphCanvas.dom.setAttribute("aria-label", "FPS history");
    this.graphCanvas.dom.classList.add("ProfilerGraph");
    graphCard.add(this.graphCanvas);
    this.renderValues = {
      objects: metricValue(),
      triangles: metricValue(),
      drawCalls: metricValue(),
      vram: metricValue(),
      missing: metricValue()
    };
    const renderGrid = new PropertyGrid({
      compact: true,
      title: "Render",
      rows: {
        objects: { label: "Objects", value: this.renderValues.objects },
        triangles: { label: "Triangles", value: this.renderValues.triangles },
        drawCalls: { label: "Draw calls", value: this.renderValues.drawCalls },
        vram: { label: "VRAM", value: this.renderValues.vram },
        missing: { label: "Chunks missing", value: this.renderValues.missing }
      }
    });
    this.panel.setContent(column(gaugeCard, tiles, graphCard, renderGrid));
    this.panel.hide();
  }
  mountWindow() {
    const mount = this.context.dom?.viewport || document.getElementById("Viewport") || document.getElementById("World") || document.body;
    this.panel.mountFloating(mount);
    const host = mount.getBoundingClientRect();
    this.panel.dom.style.width = `${Math.min(360, Math.max(240, host.width - 28))}px`;
    this.panel.dom.style.height = "auto";
    if (this.placed) return;
    const box = this.panel.dom.getBoundingClientRect();
    const left = Math.max(8, host.width - box.width - 14);
    const top = 14;
    this.panel.dom.style.left = `${left}px`;
    this.panel.dom.style.top = `${top}px`;
    this.panel.dom.style.right = "";
    this.panel.dom.style.bottom = "";
    this.placed = true;
  }
  toggle() {
    return this.visible ? this.hide() : this.show();
  }
  show() {
    this.mountWindow();
    this.visible = true;
    this.syncRibbon();
    this.refresh();
    return this;
  }
  hide() {
    this.visible = false;
    this.panel?.hide();
    this.syncRibbon();
    return this;
  }
  syncRibbon() {
    document.getElementById(RIBBON_BUTTON_ID2)?.classList.toggle("Active", this.visible);
    this.footer?.toggleClass("is-open", this.visible);
  }
  startRefresh() {
    const tick = () => {
      this.refresh();
      this.refreshTimer = window.setTimeout(tick, 250);
    };
    tick();
  }
  refresh() {
    const snapshot = this.metrics.readViewer(Viewer.get());
    const fps = snapshot.wasmFps > 0 ? snapshot.wasmFps : snapshot.clientFps;
    const tone = fpsTone(fps);
    this.footerFps?.setValue(formatFps(fps));
    this.footerMs?.setValue(snapshot.frameMs > 0 ? formatMs(snapshot.frameMs) : "");
    this.footerFps?.removeClass("is-good").removeClass("is-ok").removeClass("is-low");
    if (tone) this.footerFps?.addClass(tone);
    if (!this.visible) return;
    this.headerValues.viewer?.setValue(formatFps(snapshot.wasmFps));
    this.headerValues.client?.setValue(formatFps(snapshot.clientFps));
    this.headerValues.frame?.setValue(formatMs(snapshot.frameMs));
    this.gauge?.update(fps);
    this.fpsStrip.viewer.valueEl.setTextContent(formatFps(snapshot.wasmFps));
    this.fpsStrip.client.valueEl.setTextContent(formatFps(snapshot.clientFps));
    this.fpsStrip.frame.valueEl.setTextContent(formatMs(snapshot.frameMs));
    this.renderValues.objects.setTextContent(
      formatObjects(snapshot.objectsVisible, snapshot.objectsTotal)
    );
    this.renderValues.triangles.setTextContent(
      formatObjects(snapshot.trianglesVisible, snapshot.trianglesTotal)
    );
    this.renderValues.drawCalls.setTextContent(formatCount(snapshot.drawCalls));
    this.renderValues.vram.setTextContent(
      snapshot.vramCapacity > 0 ? `${formatBytes(snapshot.vramUsed)} / ${formatBytes(snapshot.vramCapacity)}` : formatBytes(snapshot.vramUsed)
    );
    this.renderValues.missing.setTextContent(formatCount(snapshot.workingSetMissing));
    if (this.graphCanvas) drawSparkline(this.graphCanvas.dom, this.metrics.getFpsHistory());
  }
  destroy() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = 0;
    }
    this.metrics.stop();
    this.gauge?.destroy();
    this.gauge = null;
    this.panel?.hide();
    this.footer?.dom.remove();
    this.panel = null;
    this.footer = null;
  }
};
var ui_default3 = [ProfilerHudUI];

// src/modules/project/ui.js
import {
  Badge,
  FloatingDialog as FloatingDialog2,
  InputList,
  InputNumber as InputNumber2,
  LabeledBoxItem,
  Operator as IconButton2,
  StackPanel as StackPanel4,
  Text as Text4,
  Tooltip as Tooltip2
} from "@aeco-dev/gui";
function formatBytes2(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  const digits = size >= 10 ? 0 : 1;
  return `${size.toFixed(digits)} ${units[unit]}`;
}
function zipBytes(names, payloadBytes) {
  const encoder = new TextEncoder();
  let overhead = 22;
  for (const name of names) overhead += 76 + encoder.encode(name).byteLength * 2;
  return overhead + payloadBytes;
}
function liveIfc(sourceId) {
  const cached = Loader.bundle(sourceId)?.ifc;
  if (cached) return cached;
  const file = Ifc.file(sourceId);
  if (!file?.toString) return null;
  const data = new TextEncoder().encode(file.toString());
  const name = Ifc.get(sourceId)?.name || "model.ifc";
  return { name, bytes: data.byteLength, data };
}
function row4(...children) {
  return new StackPanel4({ isVertical: false }).gap("0.5rem").setStyle("alignItems", ["center"]).setStyle("flexWrap", ["wrap"]).add(...children);
}
function coordInput2() {
  const input = new InputNumber2(0).setPrecision(4).setStep(1).setNudge(0.01);
  input.setValue(0);
  input.setStyle("width", ["100%"]);
  return input;
}
function angleInput2() {
  const input = new InputNumber2(0).setPrecision(2).setStep(1).setNudge(0.1);
  input.setValue(0);
  input.setStyle("width", ["6rem"]);
  return input;
}
function hint2(control, text) {
  new Tooltip2(text).attachTo(control);
  return control;
}
function labeled2(label, control, tip) {
  const caption = new Text4(label);
  caption.setStyle("fontSize", ["0.7rem"]);
  if (tip && !control._hinted) {
    hint2(control, tip);
    control._hinted = true;
  }
  return new StackPanel4({ isVertical: true }).gap("0.15rem").setStyle("flex", ["1"]).setStyle("minWidth", ["4.25rem"]).add(caption, control);
}
function originFields2(onEdit) {
  const fields = {
    x: coordInput2(),
    y: coordInput2(),
    z: coordInput2(),
    north: angleInput2(),
    hold: false,
    seed: ""
  };
  for (const input of [fields.x, fields.y, fields.z, fields.north]) {
    input.dom.addEventListener("input", () => {
      fields.hold = true;
      onEdit(fields);
    });
    input.onChange(() => onEdit(fields));
  }
  return fields;
}
function readLive2(fields) {
  const nums = [fields.x, fields.y, fields.z, fields.north].map((input) => {
    const raw = input.dom.value.trim();
    if (raw === "" || raw === "-" || raw === "." || raw === "-.") return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  });
  if (nums.some((n) => n == null)) return null;
  return { xyz: nums.slice(0, 3), rzDeg: nums[3] };
}
function readOrigin2() {
  try {
    if (!viewer?.getFalseOrigin) return null;
    return viewer.getFalseOrigin();
  } catch {
    return null;
  }
}
var ProjectPanelUI = class {
  static id = "project";
  static spec = {
    group: "project",
    position: "left",
    id: "project-panel",
    label: "Project",
    icon: "folder_open",
    title: "Federation"
  };
  constructor({ context }) {
    this.context = context;
    this._badge = new Badge("0 models");
    this._visibleCaption = new Badge("0 visible");
    this._list = new InputList();
    this._list.dom.setAttribute("aria-label", "models");
    this._modelFields = /* @__PURE__ */ new Map();
    this._applying = false;
    this._viewDialog = new FloatingDialog2({
      title: "Download",
      icon: "download",
      panelStyles: { width: "22rem" }
    });
    this._downloadSourceId = null;
    this._positionDialog = new FloatingDialog2({
      title: "Position",
      icon: "open_with",
      panelStyles: { width: "22rem" }
    });
    this._positionSourceId = null;
    context.viewCacheDialog = {
      toggle: (sourceId) => {
        if (this._viewDialog.isActive && this._downloadSourceId === sourceId) {
          this._viewDialog.hide();
          return;
        }
        this._downloadSourceId = sourceId;
        this._fillDownload(sourceId);
        if (!this._viewDialog.isActive) this._viewDialog.show();
      }
    };
    const save = new IconButton2("download").setTooltip("Download project");
    save.setStyle("cursor", ["pointer"]);
    save.dom.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      ops_default.execute("project.download", this.context);
    });
    this.root = new StackPanel4({ isVertical: true }).gap("0.75rem").add(
      row4(this._badge, this._visibleCaption, save),
      this._list
    );
    const { signals } = context;
    signals.viewerReady.add(() => this.refresh());
    signals.modelLoaded.add(() => this.refresh());
    signals.liveIfcReady.add(() => this.refresh());
    signals.modelCleared.add(() => {
      this._viewDialog.hide();
      this._positionDialog.hide();
      this._positionSourceId = null;
      this.refresh();
    });
    signals.visibilityChanged.add(() => this.refresh());
    this.refresh();
  }
  _positionIcon(sourceId, label) {
    const icon = new IconButton2("open_with").setTooltip("Position");
    icon.setStyle("cursor", ["pointer"]);
    icon.dom.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this._togglePosition(sourceId, label);
    });
    return icon;
  }
  _togglePosition(sourceId, label) {
    if (this._positionDialog.isActive && this._positionSourceId === sourceId) {
      this._positionDialog.hide();
      return;
    }
    this._positionSourceId = sourceId;
    this._fillPosition(sourceId, label);
    if (!this._positionDialog.isActive) this._positionDialog.show();
  }
  _fillPosition(sourceId, label) {
    const fields = this._fieldsFor(sourceId);
    const stored = Federation.modelForSource(sourceId)?.transform;
    if (stored && !fields.hold) {
      fields.x.setValue(stored.b[0]);
      fields.y.setValue(stored.b[1]);
      fields.z.setValue(stored.b[2]);
      fields.north.setValue(stored.rxyzDeg[2]);
    }
    this._positionDialog.setTitle(label || "Position");
    this._positionDialog.content(new StackPanel4({ isVertical: true }).gap("0.5rem").add(
      row4(
        labeled2("X", fields.x, "World X where this model\u2019s origin is placed."),
        labeled2("Y", fields.y, "World Y where this model\u2019s origin is placed."),
        labeled2("Z", fields.z, "World Z where this model\u2019s origin is placed.")
      ),
      labeled2("Grid \xB0", fields.north, "Grid north for this model, in degrees, about the survey point.")
    ));
  }
  _downloadIcon(onClick) {
    const icon = new IconButton2("download").setTooltip("Download");
    icon.setStyle("cursor", ["pointer"]);
    icon.dom.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    });
    return icon;
  }
  _fillDownload(sourceId) {
    const ifc = liveIfc(sourceId);
    const view = Loader.bundle(sourceId)?.view ?? null;
    const body = new StackPanel4({ isVertical: true }).gap("0.5rem");
    body.add(this._fileRow(ifc?.name ?? "model.ifc", ifc, () => {
      void Loader.saveFile(new File([ifc.data], ifc.name));
    }));
    body.add(this._fileRow(view?.name ?? "model.ifcview", view, () => {
      void Loader.saveFile(view.file);
    }));
    const zipName = `${(ifc?.name ?? view?.name ?? "model").replace(/\.(ifc|ifcview)$/i, "")}.zip`;
    const zip = ifc && view ? { name: zipName, bytes: zipBytes([ifc.name, view.name], ifc.bytes + view.bytes) } : null;
    body.add(this._fileRow(zipName, zip, async () => {
      const viewBytes = new Uint8Array(await view.file.arrayBuffer());
      const data = writeStoredZip([
        { name: ifc.name, data: ifc.data },
        { name: view.name, data: viewBytes }
      ]);
      void Loader.saveFile(new File([data], zipName));
    }));
    this._viewDialog.content(body);
  }
  _fileRow(name, payload, onDownload) {
    const line = row4(new Text4(name), new Badge(payload ? formatBytes2(payload.bytes) : "\u2014"));
    if (payload) line.add(this._downloadIcon(() => onDownload()));
    return line;
  }
  async refresh() {
    const token = (this._refreshToken ?? 0) + 1;
    this._refreshToken = token;
    const { result } = await ops_default.execute("project.models", this.context);
    if (token !== this._refreshToken) return;
    const visibility = new Map((result ?? []).map((row6) => [row6.sourceId, row6]));
    const models = this.context.store.models.map((entry) => {
      const sourceId = entry.sourceId;
      const row6 = visibility.get(sourceId);
      return {
        id: `model-${sourceId}`,
        label: entry.name || entry.viewName || `Model ${sourceId}`,
        checked: row6?.checked ?? true,
        sourceId,
        objectIds: row6?.objectIds ?? []
      };
    });
    this._list.clear();
    const visibleCount = models.filter((model) => model.checked).length;
    this._badge.setValue(`${models.length} model${models.length === 1 ? "" : "s"}`);
    this._visibleCaption.setValue(`${visibleCount} visible`);
    const ids = new Set(models.map((model) => model.sourceId));
    for (const id of this._modelFields.keys()) {
      if (!ids.has(id)) this._modelFields.delete(id);
    }
    if (this._positionSourceId != null && !ids.has(this._positionSourceId)) {
      this._positionDialog.hide();
      this._positionSourceId = null;
    }
    for (const model of models) {
      const item = new LabeledBoxItem(
        { id: model.id, label: model.label, checked: model.checked },
        { [model.id]: "folder_open", default: "folder_open" }
      );
      const checkbox = item.dom.querySelector('input[type="checkbox"]');
      checkbox?.addEventListener("change", () => {
        this._setModelVisible(model.sourceId, model.objectIds, checkbox.checked);
      });
      const actions = item.dom.querySelector(".LabeledBoxItem-actions");
      actions?.appendChild(this._syncIcon(() => this._resetModel(model.sourceId)).dom);
      actions?.appendChild(this._positionIcon(model.sourceId, model.label).dom);
      actions?.appendChild(this._downloadIcon(() => {
        ops_default.execute("project.download_view", this.context, model.sourceId);
      }).dom);
      if (this._positionDialog.isActive && this._positionSourceId === model.sourceId) {
        this._positionDialog.setTitle(model.label);
      }
      this._list.add(item);
    }
  }
  _syncIcon(onClick) {
    const icon = new IconButton2("sync").setTooltip("Reset placement");
    icon.setStyle("cursor", ["pointer"]);
    icon.dom.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    });
    return icon;
  }
  _fieldsFor(sourceId) {
    let fields = this._modelFields.get(sourceId);
    if (fields) return fields;
    fields = originFields2(() => this._applyModel(sourceId, fields));
    this._modelFields.set(sourceId, fields);
    return fields;
  }
  _applyModel(sourceId, fields) {
    if (this._applying) return;
    const pose = readLive2(fields);
    if (!pose) return;
    const pivot = readOrigin2()?.xyz ?? [0, 0, 0];
    ops_default.execute("viewer.set_model_transform", this.context, sourceId, {
      aFrame: "global",
      a: [0, 0, 0],
      b: pose.xyz,
      rotationDeg: [0, 0, pose.rzDeg],
      pivot
    });
  }
  _resetModel(sourceId) {
    const fields = this._modelFields.get(sourceId);
    this._applying = true;
    ops_default.execute("viewer.clear_model_transform", this.context, sourceId);
    if (fields) {
      fields.hold = false;
      fields.seed = "";
      fields.x.setValue(0);
      fields.y.setValue(0);
      fields.z.setValue(0);
      fields.north.setValue(0);
    }
    this._applying = false;
  }
  _setModelVisible(sourceId, objectIds, visible) {
    Federation.setVisible(sourceId, visible);
    if (!objectIds?.length) return;
    const name = visible ? "show.selection" : "hide.selection";
    ops_default.execute(name, this.context, objectIds);
  }
};
var ui_default4 = [ProjectPanelUI];

// src/modules/properties/ui.js
import {
  CollapsiblePanel,
  InputSearch,
  Operator as Operator2,
  PropertyGrid as PropertyGrid2,
  StackPanel as StackPanel5,
  SummaryCard
} from "@aeco-dev/gui";
function rowsObject(rows) {
  const out = {};
  rows.forEach((row6, index) => {
    out[`row-${index}`] = {
      label: String(row6.key),
      value: row6.value == null ? "" : String(row6.value)
    };
  });
  return out;
}
function filterSet(set, text) {
  if (!text || set.title.toLowerCase().includes(text)) return set;
  const rows = set.rows.filter((row6) => String(row6.key).toLowerCase().includes(text) || String(row6.value ?? "").toLowerCase().includes(text));
  return rows.length ? { title: set.title, rows } : null;
}
var GridSection = class {
  constructor(title, emptyText) {
    this.grid = new PropertyGrid2({ rows: {}, emptyText });
    this.panel = new CollapsiblePanel({ title }).add(this.grid);
  }
  setRows(rows) {
    this.grid.setRows(rowsObject(rows));
  }
};
var SetSection = class {
  constructor(title, { emptyText, noMatchText, placeholder }) {
    this.sets = [];
    this.emptyText = emptyText;
    this.noMatchText = noMatchText;
    this.toggle = new Operator2("filter_alt");
    this.toggle.dom.title = placeholder;
    this.toggle.onClick(() => this._toggleFilter());
    this.filter = new InputSearch(placeholder, () => this._render());
    this.filter.setHidden(true);
    this.list = new StackPanel5({ isVertical: true }).gap("6px");
    this.panel = new CollapsiblePanel({ title, actions: [this.toggle] }).add(this.filter, this.list);
  }
  setSets(sets) {
    this.sets = sets;
    this._render();
  }
  _toggleFilter() {
    const open = this.filter.dom.hidden;
    this.filter.setHidden(!open);
    this.toggle.dom.classList.toggle("is-active", open);
    if (open) {
      this.panel.expand();
      this.filter.dom.focus();
    } else if (this.filter.getValue()) {
      this.filter.setValue("");
      this._render();
    }
  }
  _render() {
    const text = this.filter.getValue().trim().toLowerCase();
    const shown = this.sets.map((set) => filterSet(set, text)).filter(Boolean);
    this.list.clear();
    if (!shown.length) {
      const emptyText = this.sets.length ? this.noMatchText : this.emptyText;
      this.list.add(new PropertyGrid2({ rows: {}, emptyText }));
      return;
    }
    for (const set of shown) {
      this.list.add(new PropertyGrid2({ title: set.title, rows: rowsObject(set.rows) }));
    }
  }
};
var PropertiesPanelUI = class {
  static id = "properties";
  static spec = {
    group: "properties",
    position: "right",
    id: "properties-panel",
    label: "Properties",
    icon: "tune",
    title: "Properties"
  };
  constructor({ context }) {
    this.context = context;
    this._entity = new SummaryCard({ icon: "deployed_code" });
    this._attributes = new GridSection("Attributes", "No attributes");
    this._relationships = new GridSection("Relationships", "No relationships");
    this._psets = new SetSection("Properties", {
      emptyText: "No properties",
      noMatchText: "No matching properties",
      placeholder: "Filter properties or sets"
    });
    this._qtos = new SetSection("Quantities", {
      emptyText: "No quantities",
      noMatchText: "No matching quantities",
      placeholder: "Filter quantities or sets"
    });
    this.root = new StackPanel5({ isVertical: true }).gap("10px").add(
      this._entity,
      this._attributes.panel,
      this._psets.panel,
      this._qtos.panel,
      this._relationships.panel
    );
    const { signals } = context;
    signals.objectPicked.add(() => this._refresh());
    signals.modelLoaded.add(() => this._refresh(null));
    signals.modelCleared.add(() => this._refresh(null));
    this._refresh(null);
  }
  _refresh(pick) {
    const selected = pick === void 0 ? this.context.store.selection : pick;
    const { result: state } = ops_default.execute("properties.for_pick", this.context, selected);
    this._entity.setTitle(state.entity.entity_class || "\u2014").setSubtitle(state.entity.predefined_type || "");
    this._attributes.setRows(state.attributes);
    this._relationships.setRows(state.relationships);
    this._psets.setSets(state.property_sets);
    this._qtos.setSets(state.quantity_sets);
  }
};
var ui_default5 = [PropertiesPanelUI];

// src/modules/settings/ui.js
import {
  Caption as Caption3,
  Checkbox,
  FloatingDialog as FloatingDialog3,
  InputColor,
  InputDropdown as InputDropdown2,
  InputNumber as InputNumber3,
  StackPanel as StackPanel6,
  TabView as TabView2,
  Text as Text5,
  Tooltip as Tooltip3
} from "@aeco-dev/gui";
var RIBBON_BUTTON_ID3 = "RB_Settings";
var DEFAULT_BACKGROUND = "#202329";
var KERNELS = {
  passthrough: "Passthrough",
  opencascade: "OpenCascade",
  manifold: "Manifold",
  cgal: "CGAL",
  cgalsimple: "CGAL simple",
  "hybrid-manifold-opencascade": "Hybrid (Manifold + OpenCascade)"
};
var THREADS = {
  auto: "Auto (worker)",
  worker: "Worker",
  main: "Main thread"
};
var DELIVERY = {
  stream: "Stream while converting",
  end: "Open when finished"
};
var FOG_MODES = {
  linear: "Linear",
  exp2: "Exponential"
};
function column2(...children) {
  return new StackPanel6({ isVertical: true }).gap("0.625rem").add(...children);
}
function row5(...children) {
  return new StackPanel6({ isVertical: false }).gap("0.5rem").setStyle("alignItems", ["center"]).setStyle("flexWrap", ["wrap"]).add(...children);
}
function hint3(control, text) {
  new Tooltip3(text).attachTo(control);
  return control;
}
function labeled3(label, control, tip) {
  const caption = new Text5(label);
  caption.setStyle("fontSize", ["0.7rem"]);
  if (tip) hint3(control, tip);
  return new StackPanel6({ isVertical: true }).gap("0.15rem").setStyle("flex", ["1"]).setStyle("minWidth", ["6rem"]).add(caption, control);
}
function heading(label) {
  return new Text5(label).setStyle("fontWeight", ["600"]);
}
function note(text) {
  return new Caption3(text).setStyle("whiteSpace", ["pre-wrap"]);
}
function dropdown(options, tip) {
  const input = hint3(new InputDropdown2(), tip);
  input.setOptions(options);
  input.setStyle("width", ["100%"]);
  return input;
}
function numberInput(value, precision, step, min, max) {
  const input = new InputNumber3(value).setPrecision(precision).setStep(step).setNudge(step);
  input.setRange(min, max);
  input.setValue(value);
  input.setStyle("width", ["100%"]);
  return input;
}
function fogModeName(mode) {
  return mode === 2 || mode === "exp2" ? "exp2" : "linear";
}
function readFog() {
  try {
    if (!Viewer.get()?.fog) return null;
    return viewer.fog();
  } catch {
    return null;
  }
}
var SettingsPanelUI = class {
  static id = "settings";
  constructor({ context }) {
    this.context = context;
    this._writing = false;
    this._background = DEFAULT_BACKGROUND;
    this._kernel = dropdown(KERNELS, "IfcOpenShell geometry plugin.");
    this._thread = dropdown(THREADS, "Auto converts in a worker. Main thread blocks frames while it tessellates.");
    this._delivery = dropdown(
      DELIVERY,
      "Stream shows meshes as they are tessellated. Open when finished waits for the sidecar, then loads it in one step."
    );
    this._geometryNote = note("");
    this._color = hint3(new InputColor(), "Viewport clear colour. Fog fades toward this colour.");
    this._color.setValue(DEFAULT_BACKGROUND);
    this._color.setStyle("width", ["100%"]);
    this._fogEnabled = new Checkbox(true);
    this._fogEnabled.dom.setAttribute("aria-label", "Fog");
    this._fogMode = dropdown(FOG_MODES, "Linear uses near and far. Exponential uses density.");
    this._fogNear = numberInput(0.35, 2, 0.05, 0, 20);
    this._fogFar = numberInput(2.2, 2, 0.05, 0, 50);
    this._fogDensity = numberInput(2e-3, 3, 1e-3, 0, 1);
    this._kernel.onChange(() => this._commitGeometry({ kernel: this._kernel.getValue() }));
    this._thread.onChange(() => this._commitGeometry({ thread: this._thread.getValue() }));
    this._delivery.onChange(() => this._commitGeometry({ delivery: this._delivery.getValue() }));
    this._color.dom.addEventListener("input", () => this._onBackground());
    this._color.onChange(() => this._onBackground());
    this._fogEnabled.onChange(() => this._commitFog({ enabled: this._fogEnabled.getValue() }));
    this._fogMode.onChange(() => this._commitFog({ mode: this._fogMode.getValue() }));
    for (const [input, key] of [
      [this._fogNear, "near"],
      [this._fogFar, "far"],
      [this._fogDensity, "density"]
    ]) {
      const apply = () => {
        const n = Number(String(input.dom.value).trim());
        if (!Number.isFinite(n)) return;
        this._commitFog({ [key]: n });
      };
      input.dom.addEventListener("input", apply);
      input.onChange(apply);
    }
    const tabs = new TabView2();
    tabs.addTab("settings-geometry", "Geometry", column2(
      labeled3("Kernel", this._kernel),
      labeled3("Thread", this._thread),
      labeled3("Delivery", this._delivery),
      this._geometryNote
    ).padding("0.75rem 0.15rem 0.15rem"));
    tabs.addTab("settings-scene", "Scene", column2(
      heading("Background"),
      labeled3("Colour", this._color),
      heading("Fog"),
      row5(this._fogEnabled, new Text5("Enabled")),
      labeled3("Mode", this._fogMode),
      row5(
        labeled3("Near", this._fogNear, "Where linear fog starts, as a multiple of the camera distance."),
        labeled3("Far", this._fogFar, "Where linear fog is fully opaque, as a multiple of the camera distance.")
      ),
      labeled3("Density", this._fogDensity, "Strength of exponential fog."),
      note("Linear fog uses near and far. Exponential fog uses density. Fog fades into the background colour.")
    ).padding("0.75rem 0.15rem 0.15rem"));
    tabs.select("settings-geometry");
    this.dialog = new FloatingDialog3({
      title: "Settings",
      icon: "settings",
      panelStyles: { width: "min(24rem, calc(100% - 1rem))" }
    });
    this.dialog.addClass("SettingsDialog");
    this.dialog.content(tabs);
    this.dialog.onShow = () => {
      this.syncRibbon();
      this.refresh();
    };
    this.dialog.onHide = () => this.syncRibbon();
    context.settings = context.settings || {};
    context.settings.panel = this;
    const { signals } = context;
    signals.viewerReady.add(() => this._syncScene());
    signals.geometryChanged.add((options) => this._paintGeometry(options));
    signals.backgroundChanged.add((payload) => {
      if (payload?.color) this._paintBackground(payload.color);
    });
    signals.fogChanged.add(() => this._syncFog());
    this._paintGeometry(Loader.convertOptions());
  }
  toggle() {
    this.dialog.toggle();
    return this;
  }
  isVisible() {
    return Boolean(this.dialog?.isActive);
  }
  syncRibbon() {
    document.getElementById(RIBBON_BUTTON_ID3)?.classList.toggle("Active", this.isVisible());
  }
  refresh() {
    this._paintGeometry(Loader.convertOptions());
    this._syncScene();
  }
  _commitGeometry(patch) {
    ops_default.execute("settings.set_geometry", this.context, patch);
  }
  _paintGeometry(options) {
    if (!options) return;
    if (!this._kernel.dom.matches(":focus")) this._kernel.setValue(options.kernel);
    if (!this._thread.dom.matches(":focus")) this._thread.setValue(options.thread);
    if (!this._delivery.dom.matches(":focus")) this._delivery.setValue(options.delivery);
    const streamNote = Loader.canStream() ? "Stream feeds parts into the viewer as tessellation proceeds." : "This viewer build has no stream API, so Stream still opens the sidecar when conversion finishes.";
    this._geometryNote.setValue(
      `Auto and Worker convert in a worker at every file size. Main thread is opt-in and yields every 30 ms. Open when finished loads the sidecar in one step. ${streamNote} These apply the next time a model is converted.`
    );
  }
  _onBackground() {
    const color = this._color.getValue();
    if (!color || color === this._background) return;
    this._background = color;
    if (!Viewer.get()) return;
    this._writing = true;
    ops_default.execute("viewer.set_background", this.context, color);
    this._writing = false;
  }
  _paintBackground(color) {
    if (this._writing || this._color.dom.matches(":focus")) return;
    if (typeof color !== "string") return;
    const hex = color.startsWith("#") ? color.slice(0, 7) : color;
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
    this._background = hex;
    this._color.setValue(hex);
  }
  _commitFog(patch) {
    if (!Viewer.get()) return;
    this._writing = true;
    ops_default.execute("viewer.set_fog", this.context, patch);
    this._writing = false;
    this._paintFogFields();
  }
  _syncScene() {
    this._paintBackground(this._background);
    this._syncFog();
  }
  _syncFog() {
    const fog = readFog();
    if (!fog || this._writing) {
      this._paintFogFields();
      return;
    }
    if (!this._fogEnabled.dom.matches(":focus")) this._fogEnabled.setValue(fog.enabled);
    if (!this._fogMode.dom.matches(":focus")) this._fogMode.setValue(fogModeName(fog.mode));
    if (!this._fogNear.dom.matches(":focus")) this._fogNear.setValue(fog.near);
    if (!this._fogFar.dom.matches(":focus")) this._fogFar.setValue(fog.far);
    if (!this._fogDensity.dom.matches(":focus")) this._fogDensity.setValue(fog.density);
    this._paintFogFields();
  }
  _paintFogFields() {
    const exponential = this._fogMode.getValue() === "exp2";
    const enabled = this._fogEnabled.getValue();
    this._fogMode.setDisabled(!enabled);
    this._fogNear.setDisabled(!enabled || exponential);
    this._fogFar.setDisabled(!enabled || exponential);
    this._fogDensity.setDisabled(!enabled || !exponential);
  }
};
var ui_default6 = [SettingsPanelUI];

// src/modules/spatial-hierarchy/ui.js
import {
  NavigationList,
  Operator as Operator3,
  StackPanel as StackPanel7,
  Text as Text6,
  TreeView
} from "@aeco-dev/gui";
function decompositionNodeToHierarchy(node, sourceId) {
  const item = {
    nodeId: `spatial:${sourceId}:${node.id}`,
    kind: "spatial",
    label: node.name,
    subtitle: node.type,
    children: node.children.map((child) => decompositionNodeToHierarchy(child, sourceId)),
    sourceId,
    guid: node.guid || void 0,
    ifcId: node.id,
    ifcType: node.type,
    isContainer: node.isContainer,
    _lazySource: node._lazySource
  };
  return item;
}
function buildModelHierarchyRoot(sourceId, label, spatialDecomposition) {
  const children = spatialDecomposition.map((node) => decompositionNodeToHierarchy(node, sourceId));
  return {
    nodeId: `model:${sourceId}`,
    kind: "model",
    label,
    subtitle: children.length ? void 0 : "Waiting for live IFC\u2026",
    children,
    sourceId
  };
}
function navigationRoot(roots) {
  if (roots.length === 1) return roots[0];
  return {
    nodeId: "spatial:models",
    kind: "models",
    label: "Models",
    children: roots
  };
}
function pathToNode(root, nodeId) {
  if (!root || !nodeId) return null;
  const path = [];
  return walk(root) ? path : null;
  function walk(node) {
    path.push(node);
    if (node.nodeId === nodeId) return true;
    for (const child of node.children ?? []) {
      if (walk(child)) return true;
    }
    path.pop();
    return false;
  }
}
function assignObjectIds(node, guidToObjectId) {
  const ids = /* @__PURE__ */ new Set();
  const own = node.guid ? guidToObjectId.get(node.guid) : void 0;
  node.objectId = own;
  if (own) ids.add(own);
  for (const child of node.children) {
    for (const id of assignObjectIds(child, guidToObjectId)) ids.add(id);
  }
  node.objectIds = [...ids];
  return node.objectIds;
}
function hiddenCount(objectIds, hidden) {
  let count = 0;
  for (const id of objectIds) if (hidden.has(id)) count += 1;
  return count;
}
function findNodeByGuid(roots, guid) {
  if (!guid) return null;
  for (const root of roots) {
    const found = walkFind(root, (node) => node.guid === guid);
    if (found) return found;
  }
  return null;
}
function walkFind(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.children ?? []) {
    const found = walkFind(child, predicate);
    if (found) return found;
  }
  return null;
}
function actionsRow(...children) {
  return new StackPanel7({ isVertical: false }).addClass("SpatialTree-actions").gap("0.15rem").setStyle("alignItems", ["center"]).setStyle("marginLeft", ["auto"]).add(...children);
}
function actionButton(icon, tooltip, onClick) {
  const btn = new Operator3(icon);
  btn.dom.title = tooltip;
  btn.dom.setAttribute("aria-label", tooltip);
  btn.onClick((event) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  });
  return btn;
}
var SpatialHierarchyPanelUI = class {
  static id = "spatial-hierarchy";
  static spec = {
    group: "spatial-structure",
    position: "left",
    id: "spatial-panel",
    label: "Spatial",
    icon: "account_tree",
    title: "Navigator"
  };
  constructor({ context }) {
    this.context = context;
    this._roots = [];
    this._rootBySourceId = /* @__PURE__ */ new Map();
    this._guidToObjectId = /* @__PURE__ */ new Map();
    this._hidden = /* @__PURE__ */ new Set();
    this._selectedNodeId = null;
    this._viewMode = "tree";
    this._selectionOrigin = null;
    this._lastPointerEvent = null;
    const hierarchyOptions = {
      getLabel: (item) => item.label,
      getChildren: (item) => this._childrenOf(item),
      emptyMessage: "",
      onItemClick: (item) => {
        if (item.kind === "model" || item.kind === "models" || item.kind === "pending") return;
        void this._selectFromPanel(item, this._modsFromEvent(this._lastPointerEvent));
      }
    };
    this._tree = new TreeView({
      ...hierarchyOptions,
      getId: (item) => item.nodeId,
      expandRoot: true,
      renderItem: (item, tree, depth) => this._renderItem(item, tree, depth)
    });
    this._tree.panel.addClass("SpatialTree");
    this._list = new NavigationList({
      ...hierarchyOptions,
      getTitle: (item) => item.label || "Spatial",
      autoNavigate: false,
      onNavigate: (item) => {
        this._list.emptyMessage = item?.subtitle || "";
      },
      renderItem: (item, list) => this._renderItem(item, list)
    });
    this._list.panel.addClass("SpatialNav");
    this._treeModeBtn = actionButton("account_tree", "Tree view", () => this._setViewMode("tree"));
    this._listModeBtn = actionButton("view_list", "Navigation list", () => this._setViewMode("list"));
    this._viewBar = new StackPanel7({ isVertical: false }).addClass("SpatialNavigator-viewbar").gap("0.15rem").setStyle("alignItems", ["center"]).add(this._treeModeBtn, this._listModeBtn);
    this._viewBar.dom.setAttribute("role", "group");
    this._viewBar.dom.setAttribute("aria-label", "Spatial view");
    this._hiddenCaption = new Text6("");
    this._summary = new StackPanel7({ isVertical: false }).addClass("SpatialTree-summary").gap("0.25rem").setStyle("alignItems", ["center"]).add(
      this._hiddenCaption,
      actionsRow(actionButton("visibility", "Show all", () => ops_default.execute("show.all", this.context)))
    );
    this._summary.dom.hidden = true;
    this._views = new StackPanel7({ isVertical: true }).addClass("SpatialNavigator-views").add(this._tree.panel, this._list.panel);
    this.root = new StackPanel7({ isVertical: true }).addClass("SpatialNavigator").gap("0.5rem").add(this._viewBar, this._summary, this._views);
    this._syncViewChrome();
    const { signals } = context;
    signals.modelLoaded.add((payload) => void this.refreshGuids(payload));
    signals.liveIfcReady.add((payload) => void this.refresh(payload));
    signals.modelCleared.add(() => {
      this._roots = [];
      this._rootBySourceId.clear();
      this._guidToObjectId.clear();
      this._hidden.clear();
      this._selectedNodeId = null;
      this._selectionOrigin = null;
      this._updateSummary();
      this._tree.setData(null);
      this._clearList();
    });
    signals.objectPicked.add((pick) => this._onViewportSelection(pick));
    signals.visibilityChanged.add(() => void this._refreshVisibility());
    void this.refresh();
  }
  async refreshGuids() {
    const { result: objects } = await ops_default.execute("spatial.objects", this.context);
    this._guidToObjectId.clear();
    for (const obj of objects ?? []) {
      if (obj.guid && obj.objectId > 0) this._guidToObjectId.set(obj.guid, obj.objectId);
    }
    for (const root of this._roots) assignObjectIds(root, this._guidToObjectId);
    this._tree.refresh?.();
    if (this._list.currentData) this._list.refresh();
  }
  async refresh(payload) {
    await this.refreshGuids();
    const wanted = payload?.sourceId;
    const models = this.context.store.models;
    this._roots = models.map((entry) => {
      if (wanted != null && entry.sourceId !== wanted && this._rootBySourceId.has(entry.sourceId)) {
        return this._rootBySourceId.get(entry.sourceId);
      }
      const file = entry.mode === "edit" ? entry.file : null;
      const root = buildModelHierarchyRoot(
        entry.sourceId,
        entry.name || entry.viewName || `Model ${entry.sourceId}`,
        file ? getSpatialDecomposition(file) : []
      );
      assignObjectIds(root, this._guidToObjectId);
      this._rootBySourceId.set(entry.sourceId, root);
      return root;
    });
    const live = new Set(models.map((entry) => entry.sourceId));
    for (const sourceId of [...this._rootBySourceId.keys()]) {
      if (!live.has(sourceId)) this._rootBySourceId.delete(sourceId);
    }
    await this._loadHidden();
    this._renderViews();
  }
  _childrenOf(item) {
    if (!item) return [];
    if (item._lazySource) {
      const expanded = this._tree.expandedIds.has(item.nodeId) || this._viewMode === "list" && this._list.currentData === item;
      if (expanded) this._expandLazy(item, false);
      else if (!(item.children && item.children.length)) {
        return [{ nodeId: `${item.nodeId}:pending`, kind: "pending", label: "", children: [] }];
      }
    }
    return item.children || [];
  }
  _expandLazy(item, recursive) {
    if (item?._lazySource) {
      ensureElementChildren(item);
      item.children = (item.children ?? []).map(
        (child) => child.kind ? child : decompositionNodeToHierarchy(child, item.sourceId)
      );
      assignObjectIds(item, this._guidToObjectId);
    }
    if (recursive) {
      for (const child of item.children ?? []) this._expandLazy(child, true);
    }
  }
  async _loadHidden() {
    const { result: hidden } = await ops_default.execute("spatial.hidden", this.context);
    this._hidden = hidden ?? /* @__PURE__ */ new Set();
    this._updateSummary();
  }
  async _refreshVisibility() {
    await this._loadHidden();
    this._tree.refresh();
    if (this._list.currentData) this._list.refresh();
  }
  _setViewMode(mode) {
    if (mode !== "tree" && mode !== "list") return;
    this._viewMode = mode;
    this._syncViewChrome();
    if (mode === "list") this._showSelectionInList();
  }
  _syncViewChrome() {
    const list = this._viewMode === "list";
    this._treeModeBtn.toggleClass("is-active", !list);
    this._listModeBtn.toggleClass("is-active", list);
    this._treeModeBtn.dom.setAttribute("aria-pressed", String(!list));
    this._listModeBtn.dom.setAttribute("aria-pressed", String(list));
    this._tree.panel.dom.hidden = list;
    this._list.panel.dom.hidden = !list;
  }
  _updateSummary() {
    const count = this._hidden.size;
    this._summary.dom.hidden = count === 0;
    this._hiddenCaption.setValue(`${count} object${count === 1 ? "" : "s"} hidden`);
  }
  _onViewportSelection(pick) {
    if (!pick?.guid) {
      if (!pick?.objectId) {
        this._selectedNodeId = null;
        this._selectionOrigin = null;
        this._selectNode(null);
      }
      return;
    }
    if (this._selectionOrigin === "panel") {
      this._selectionOrigin = null;
      return;
    }
    const node = findNodeByGuid(this._roots, pick.guid);
    if (!node) return;
    this._selectionOrigin = "viewport";
    this._selectedNodeId = node.nodeId;
    this._selectNode(node.nodeId);
  }
  async _selectFromPanel(item, mods) {
    this._selectionOrigin = "panel";
    this._selectedNodeId = item.nodeId;
    this._selectNode(item.nodeId);
    if (item.objectId) {
      ops_default.execute("spatial.select", this.context, [item.objectId], mods);
      await this._publishActivePick(item.objectId, item);
      return;
    }
    if (!item.guid) return;
    ops_default.execute("viewer.object_picked", this.context, {
      guid: item.guid,
      sourceId: item.sourceId,
      type: item.ifcType,
      name: item.label
    });
  }
  async _runAction(item, action) {
    this._expandLazy(item, true);
    const objectIds = item.objectIds ?? [];
    if (objectIds.length === 0) return;
    if (action === "hide") {
      ops_default.execute("hide.selection", this.context, objectIds);
      return;
    }
    if (action === "show") {
      ops_default.execute("show.selection", this.context, objectIds);
      return;
    }
    if (action === "isolate") {
      this._selectionOrigin = "panel";
      this._selectedNodeId = item.nodeId;
      this._selectNode(item.nodeId);
      ops_default.execute("spatial.isolate", this.context, objectIds);
      await this._publishActivePick(objectIds[0], item);
    }
  }
  async _publishActivePick(objectId, item) {
    if (!objectId) return;
    const { result: objects } = await ops_default.execute("spatial.objects", this.context);
    let pick = (objects ?? []).find((object) => object.objectId === objectId) ?? null;
    if (!pick) {
      pick = {
        objectId,
        guid: item.guid || void 0,
        sourceId: item.sourceId,
        type: item.ifcType,
        name: item.label
      };
    }
    ops_default.execute("viewer.object_picked", this.context, pick);
  }
  _renderViews() {
    if (this._roots.length === 0) {
      this._tree.setData(null);
      this._clearList();
      return;
    }
    this._tree.setData(this._roots);
    const root = navigationRoot(this._roots);
    this._list.emptyMessage = root.subtitle || "";
    this._list.setData(root);
    this._selectNode(this._selectedNodeId);
  }
  _clearList() {
    this._list.rootData = null;
    this._list.currentData = null;
    this._list.history = [];
    this._list.content.clear();
    this._list.header.setTitle("");
    this._list.header.setLeadingActions([]);
  }
  // Open the parent of the selected row so that row is on screen.
  _showSelectionInList() {
    const root = this._list.rootData;
    if (!root) return;
    const path = pathToNode(root, this._selectedNodeId);
    if (!path || path.length < 2) {
      this._list.history = [];
      this._list.currentData = root;
    } else {
      this._list.history = path.slice(0, -2);
      this._list.currentData = path[path.length - 2];
    }
    this._list.emptyMessage = this._list.currentData?.subtitle || "";
    this._list.refresh();
  }
  _selectNode(nodeId) {
    if (!nodeId || !this._tree.rootData) {
      this._tree.setSelected(null);
    } else {
      const roots = Array.isArray(this._tree.rootData) ? this._tree.rootData : [this._tree.rootData];
      this._tree.setSelected(findById(roots, nodeId));
    }
    if (this._viewMode === "list") this._showSelectionInList();
  }
  _modsFromEvent(event) {
    if (event?.shiftKey) return "add";
    if (event?.ctrlKey || event?.metaKey) return "remove";
    return "replace";
  }
  _renderItem(item, view, depth) {
    const row6 = view.defaultRenderItem(item, view, depth);
    row6.dom.addEventListener("mousedown", (event) => {
      this._lastPointerEvent = event;
    });
    if (item.nodeId && item.nodeId === this._selectedNodeId) row6.addClass("is-selected");
    if (item.kind === "spatial") {
      row6.dom.title = "Click to select (Shift add, Ctrl remove)";
      const label = row6.dom.querySelector(".TreeView-label, .NavigationList-label");
      if (label && item.subtitle) {
        const caption = document.createElement("span");
        caption.className = "Caption SpatialTree-type";
        caption.textContent = item.subtitle;
        label.insertAdjacentElement("afterend", caption);
      }
    }
    const chevron = row6.dom.querySelector(".NavigationList-chevron");
    if (chevron && typeof view.navigateTo === "function") {
      chevron.setAttribute("role", "button");
      chevron.setAttribute("aria-label", "Open");
      chevron.removeAttribute("aria-hidden");
      chevron.tabIndex = 0;
      const open = (event) => {
        event.preventDefault();
        event.stopPropagation();
        view.navigateTo(item);
      };
      chevron.addEventListener("click", open);
      chevron.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " " && event.code !== "Space") return;
        open(event);
      });
    }
    const objectIds = item.objectIds ?? [];
    if (objectIds.length === 0) return row6;
    const hidden = hiddenCount(objectIds, this._hidden);
    let eye;
    if (hidden === 0) {
      eye = actionButton("visibility", "Hide", () => void this._runAction(item, "hide"));
    } else if (hidden === objectIds.length) {
      row6.addClass("is-hidden");
      eye = actionButton("visibility_off", "Show", () => void this._runAction(item, "show"));
    } else {
      row6.addClass("is-partially-hidden");
      eye = actionButton("visibility", `Show all (${hidden} of ${objectIds.length} hidden)`, () => void this._runAction(item, "show"));
    }
    eye.addClass("SpatialTree-eye");
    const actions = actionsRow(
      actionButton("filter_center_focus", "Isolate", () => void this._runAction(item, "isolate")),
      eye
    );
    if (chevron) row6.dom.insertBefore(actions.dom, chevron);
    else row6.add(actions);
    return row6;
  }
};
function findById(roots, nodeId) {
  for (const root of roots) {
    const found = walk(root);
    if (found) return found;
  }
  return null;
  function walk(node) {
    if (node.nodeId === nodeId) return node;
    for (const child of node.children ?? []) {
      const hit = walk(child);
      if (hit) return hit;
    }
    return null;
  }
}
var ui_default7 = [SpatialHierarchyPanelUI];

// src/modules/viewer/ui.js
var BUTTONS = {
  RB_Section: "section",
  RB_Fly: "fly",
  RB_Ortho: "ortho",
  RB_Grid: "grid",
  RB_Axes: "axes",
  RB_Fog: "fog",
  RB_Xray: "xray",
  RB_SelectionOutline: "outline"
};
var MEASURE_BUTTONS = {
  RB_MeasureLength: "length",
  RB_MeasureArea: "area",
  RB_MeasureVolume: "volume"
};
var GUIDE = {
  length: "Length \u2014 click to place points. Backspace removes the last. Esc exits.",
  area: "Area \u2014 click around a region. Backspace removes the last point. Esc exits.",
  volume: "Volume \u2014 select the objects to measure. Esc exits."
};
var CLICK_SLOP_PX = 4;
function ns(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
var ViewerToolsUI = class {
  static id = "viewer";
  constructor({ context }) {
    this.context = context;
    this.tools = null;
    this.measureState = measure.snapshot();
    this.hint = document.createElement("div");
    this.hint.id = "viewer-tool-hint";
    this.hint.hidden = true;
    const viewport = context.dom?.viewport;
    viewport?.appendChild(this.hint);
    this.overlay = ns("svg");
    this.overlay.id = "measure-overlay";
    this.overlay.setAttribute("aria-hidden", "true");
    this.overlay.hidden = true;
    viewport?.appendChild(this.overlay);
    this._off = onViewerTools((state) => this.syncTools(state));
    context.signals.viewerToolsChanged.add((state) => this.syncTools(state));
    context.signals.measureChanged.add((state) => this.syncMeasure(state));
    this._down = null;
    this._raf = 0;
    this.preview = null;
    this._hoverSerial = 0;
    const canvas = () => viewer?.canvas ?? viewport?.querySelector("#viewer-canvas");
    viewport?.addEventListener("pointerdown", (event) => {
      if (event.target !== canvas()) return;
      this._down = event.button === 0 ? { x: event.clientX, y: event.clientY } : null;
    });
    viewport?.addEventListener("pointermove", (event) => {
      if (this._down || event.target !== canvas()) return;
      this._hover(event, canvas());
    });
    viewport?.addEventListener("pointerup", (event) => {
      const down = this._down;
      this._down = null;
      if (!down || event.button !== 0 || event.target !== canvas()) return;
      if (Math.hypot(event.clientX - down.x, event.clientY - down.y) > CLICK_SLOP_PX) return;
      this._click(event, canvas());
    });
    document.addEventListener("keydown", (event) => this._key(event));
  }
  syncTools(state) {
    this.tools = state;
    this._paintButtons();
    this._paintHint();
  }
  syncMeasure(state) {
    this.measureState = state ?? measure.snapshot();
    this._paintButtons();
    this._paintHint();
    this._paintOverlay();
    const canvas = viewer?.canvas;
    if (canvas) {
      const placing = this.measureState.mode === "length" || this.measureState.mode === "area";
      canvas.style.cursor = placing ? "crosshair" : "";
    }
    if (this.measureState.mode) this._watch();
    else if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = 0;
    }
  }
  _paintButtons() {
    const state = this.tools;
    if (state) {
      for (const [id, key] of Object.entries(BUTTONS)) this._press(id, !!state[key]);
    }
    const mode = this.measureState?.mode ?? null;
    for (const [id, key] of Object.entries(MEASURE_BUTTONS)) this._press(id, mode === key);
  }
  _press(id, on) {
    const el = document.getElementById(id);
    if (!el) return;
    const box = el.matches?.('input[type="checkbox"]') ? el : el.querySelector?.('input[type="checkbox"]');
    if (box) {
      if (box.checked !== on) box.checked = on;
      return;
    }
    el.classList.toggle("Active", on);
    el.setAttribute("aria-pressed", String(on));
  }
  _paintHint() {
    const lines = [];
    if (this.tools?.section) lines.push("Section \u2014 click a surface to cut. Drag the arrow to slide it. Delete removes the last cut.");
    if (this.tools?.fly) lines.push("Fly \u2014 WASD and QE move, the mouse looks, Shift boosts, Esc exits.");
    const mode = this.measureState?.mode;
    if (mode && !this.tools?.fly) {
      lines.push(GUIDE[mode]);
      for (const line of this.measureState.lines ?? []) lines.push(line);
      if (this.measureState.placement === "plane" && (this.measureState.points?.length ?? 0) > 0) {
        lines.push("Points sit on the horizontal plane through the last point.");
      }
    }
    this.hint.hidden = lines.length === 0;
    this.hint.textContent = lines.join("\n");
  }
  _paintOverlay() {
    const state = this.measureState;
    const show = state?.mode === "length" || state?.mode === "area";
    this.overlay.hidden = !show;
    this.overlay.replaceChildren();
    if (!show || !viewer) return;
    const last = state.points?.[state.points.length - 1];
    for (const seg of state.segments ?? []) {
      this._stroke(seg.a, seg.b, seg.color || "#f7fafc", seg.dashed);
      const a = projectPoint(viewer, seg.a);
      const b = projectPoint(viewer, seg.b);
      if (!a || !b || !seg.label) continue;
      const text = ns("text");
      text.setAttribute("x", (a.x + b.x) / 2);
      text.setAttribute("y", (a.y + b.y) / 2 - 6);
      text.setAttribute("fill", seg.color || "#f7fafc");
      text.setAttribute("font-size", "11");
      text.setAttribute("font-family", "ui-monospace, Menlo, Consolas, monospace");
      text.setAttribute("text-anchor", "middle");
      text.textContent = seg.label;
      this.overlay.append(text);
    }
    for (const point of state.dots ?? []) {
      const screen2 = projectPoint(viewer, point);
      if (!screen2) continue;
      const dot = ns("circle");
      dot.setAttribute("cx", screen2.x);
      dot.setAttribute("cy", screen2.y);
      dot.setAttribute("r", "4");
      dot.setAttribute("fill", "#f6e05e");
      this.overlay.append(dot);
    }
    const preview = this.preview?.point;
    if (!preview) return;
    const screen = projectPoint(viewer, preview);
    if (!screen) return;
    if (last) {
      const from = projectPoint(viewer, last);
      if (from) {
        const guide = ns("line");
        guide.setAttribute("x1", from.x);
        guide.setAttribute("y1", from.y);
        guide.setAttribute("x2", screen.x);
        guide.setAttribute("y2", screen.y);
        guide.setAttribute("stroke", "#f6e05e");
        guide.setAttribute("stroke-width", "1");
        guide.setAttribute("stroke-dasharray", "3 3");
        this.overlay.append(guide);
      }
    }
    const mark = ns("circle");
    mark.setAttribute("cx", screen.x);
    mark.setAttribute("cy", screen.y);
    mark.setAttribute("r", "4");
    mark.setAttribute("fill", "none");
    mark.setAttribute("stroke", "#f6e05e");
    mark.setAttribute("stroke-width", "1.5");
    this.overlay.append(mark);
  }
  _stroke(a, b, color, dashed) {
    const from = projectPoint(viewer, a);
    const to = projectPoint(viewer, b);
    if (!from || !to) return;
    const line = ns("line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", "1.5");
    if (dashed) line.setAttribute("stroke-dasharray", "4 3");
    this.overlay.append(line);
  }
  _watch() {
    if (this._raf || typeof requestAnimationFrame !== "function") return;
    const tick = () => {
      if (!this.measureState?.mode) {
        this._raf = 0;
        return;
      }
      this._paintOverlay();
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }
  _click(event, canvas) {
    const mode = measure.mode();
    if (mode !== "length" && mode !== "area") return;
    if (this.tools?.section || this.tools?.fly) return;
    if (typeof viewer?.flyActive === "function" && viewer.flyActive()) return;
    if (typeof viewer?.sectionActive === "function" && viewer.sectionActive()) return;
    const rect = canvas.getBoundingClientRect();
    void ops_default.execute("viewer.measure_click", this.context, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      alt: event.altKey
    });
  }
  _hover(event, canvas) {
    const mode = measure.mode();
    if (mode !== "length" && mode !== "area") {
      this.preview = null;
      return;
    }
    if (this.tools?.section || this.tools?.fly) return;
    const rect = canvas.getBoundingClientRect();
    const serial = ++this._hoverSerial;
    const click = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      alt: event.altKey
    };
    void resolvePick(viewer, click, measure.snapshot().points).then((hit) => {
      if (serial !== this._hoverSerial) return;
      this.preview = hit;
      this._paintOverlay();
    });
  }
  _key(event) {
    if (!measure.mode()) return;
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return;
    if (event.key === "Escape") {
      event.preventDefault();
      ops_default.execute("viewer.measure", this.context, measure.mode());
    } else if (event.key === "Backspace" && (measure.mode() === "length" || measure.mode() === "area")) {
      event.preventDefault();
      ops_default.execute("viewer.measure_undo", this.context);
    }
  }
};
var ui_default8 = [ViewerToolsUI];

// src/modules/ui.js
var modulePanels = [...ui_default4, ...ui_default6, ...ui_default2, ...ui_default7, ...ui_default5, ...ui_default8, ...ui_default3, ...ui_default];

// src/gui.js
var log = createLogger("bonsai");
function mountShell(container, ui) {
  const world = new World(ui.WorldComponent);
  world.root.addClass("World");
  world.mount(container);
  const layout = new Layout(ui.layout).init(world);
  return {
    world,
    layout,
    viewport: world.dom.querySelector("#Viewport"),
    footer: world.dom.querySelector("#Footer")
  };
}
function createWorkspacePanel(layout, options, body) {
  const panel = new Layout.Panel({
    layout,
    position: options.position,
    group: options.group,
    id: options.id,
    label: options.label,
    icon: options.icon,
    title: options.title,
    floatable: true,
    panelStyles: options.panelStyles
  });
  if (body) panel.add(body.addClass("bonsai-panel-body"));
  if (options.autoShow !== false) panel.show({ select: false, open: true });
  return panel;
}
function mountUi(context, layout, configs) {
  const panels = [];
  for (const item of configs) {
    if (item.active === false) continue;
    for (const UI of modulePanels) {
      if (UI.id !== item.id) continue;
      const instance = new UI({ context });
      if (!UI.spec || !instance.root) continue;
      const panel = createWorkspacePanel(layout, UI.spec, instance.root);
      instance.attach?.(panel);
      panels.push({ spec: UI.spec, panel });
    }
  }
  return panels;
}
function bindRibbon(context, ribbon, layout) {
  const toggles = [];
  function bindNode(spec) {
    if (spec.type === "RibbonGroup") {
      const el2 = document.getElementById(spec.id);
      if (el2 && spec.workMode) el2.dataset.workMode = spec.workMode;
      if (el2) toggles.push({ el: el2, workMode: spec.workMode });
      for (const child of spec.children ?? []) bindNode(child);
      if (el2) packRibbonChecks(el2);
      return;
    }
    const el = document.getElementById(spec.id);
    if (!el) return;
    if (spec.workMode) {
      el.dataset.workMode = spec.workMode;
      toggles.push({ el, workMode: spec.workMode });
    }
    if (!spec.operator) return;
    if (spec.type === "Search") {
      bindRibbonSearch(el, spec, context);
      return;
    }
    if (spec.type === "Checkbox") {
      bindRibbonCheckbox(el, spec, context);
      return;
    }
    if (spec.type === "Dropdown") {
      el.addEventListener("change", () => {
        void ops_default.execute(spec.operator, context, el.value);
      });
      if (spec.operator === "viewer.nav_preset") {
        context.signals.navPresetChanged.add((payload) => {
          const preset = payload?.preset;
          if (preset && el.value !== preset) el.value = preset;
        });
      }
      return;
    }
    el.type = "button";
    const args = spec.args ?? [];
    el.addEventListener("click", () => {
      void ops_default.execute(spec.operator, context, ...args);
    });
  }
  for (const spec of ribbon.buttons) bindNode(spec);
  const bar = document.getElementById("WorkModeBar");
  const workModes = new TabView3();
  workModes.setId("RibbonWorkModes");
  workModes.addClass("RibbonWorkModes");
  for (const mode of ribbon.workModes) {
    workModes.addTab(mode.id, mode.name, []);
    const tab = workModes.tabs.find((item) => item.dom.id === mode.id);
    tab?.onClick(() => {
      const openTray = context.workMode !== mode.id || !layout.isRibbonOpen();
      setWorkMode(mode.id);
      if (layout.isCompact()) {
        if (openTray) layout.openRibbon();
        else layout.closeRibbon();
      }
    });
  }
  workModes.panelsDiv.dom.style.display = "none";
  bar?.appendChild(workModes.dom);
  function setWorkMode(id) {
    context.workMode = id;
    for (const item of toggles) {
      const hidden = Boolean(item.workMode) && item.workMode !== id;
      item.el.classList.toggle("is-work-mode-hidden", hidden);
    }
    if (workModes.selected !== id) workModes.select(id);
  }
  context.setWorkMode = setWorkMode;
  setWorkMode(ribbon.defaultWorkMode);
}
function bindRibbonSearch(el, spec, context) {
  const input = el instanceof HTMLInputElement ? el : document.createElement("input");
  if (input.parentElement !== el) {
    input.type = "search";
    input.className = "InputSearch";
    input.autocomplete = "off";
    input.spellcheck = false;
    el.classList.add("RibbonSearch");
    el.replaceChildren(input);
  }
  const placeholder = spec.placeholder || "GlobalId";
  input.placeholder = placeholder;
  input.setAttribute("aria-label", placeholder);
  input.title = "Select by GlobalId";
  const submit = () => {
    const value = input.value.trim();
    if (!value || !spec.operator) return;
    void Promise.resolve(ops_default.execute(spec.operator, context, value)).then((result) => {
      if (result?.status === "CANCELLED") {
        input.setCustomValidity(result.message || "No element with that GlobalId");
        input.reportValidity();
        return;
      }
      input.setCustomValidity("");
    });
  };
  input.addEventListener("keydown", (event) => {
    event.stopPropagation();
    if (event.key !== "Enter") return;
    event.preventDefault();
    submit();
  });
  input.addEventListener("input", () => input.setCustomValidity(""));
  input.addEventListener("pointerdown", (event) => event.stopPropagation());
}
function packRibbonChecks(group) {
  const items = group.querySelector(":scope > .RibbonGroup-items") ?? group;
  const checks = [...items.children].filter((el) => el.classList.contains("RibbonCheck"));
  if (checks.length === 0) return;
  const pack = document.createElement("div");
  pack.className = "RibbonChecks";
  checks[0].before(pack);
  for (const check of checks) pack.append(check);
}
function bindRibbonCheckbox(el, spec, context) {
  const input = document.createElement("input");
  input.type = "checkbox";
  input.className = "Checkbox";
  input.setAttribute("aria-label", spec.name || "");
  const text = document.createElement("span");
  text.textContent = spec.name || "";
  const label = document.createElement("label");
  label.append(input, text);
  el.classList.add("RibbonCheck");
  el.replaceChildren(label);
  input.addEventListener("change", () => {
    const want = input.checked;
    const result = ops_default.execute(spec.operator, context, want);
    if (result?.status === "CANCELLED") input.checked = !want;
  });
  label.addEventListener("pointerdown", (event) => event.stopPropagation());
  input.addEventListener("keydown", (event) => event.stopPropagation());
}
function setPanelMounted(panel, mounted, spec = {}) {
  if (!panel) return;
  if (mounted) {
    if (!panel.isVisible()) {
      const layout = panel.layout;
      const startsHidden = spec.autoShow === false;
      const needsOpen = startsHidden && typeof layout?.isWorkspaceOpen === "function" && !layout.isWorkspaceOpen(panel.position);
      panel.show({ open: needsOpen, select: needsOpen });
    }
    return;
  }
  if (panel.isVisible()) panel.hide({ closeIfEmpty: spec.autoShow === false });
}
function bindPanelDialog(button, panels) {
  const icons = { default: "dock_to_right" };
  for (const entry of panels) {
    icons[entry.spec.id] = entry.spec.icon || icons.default;
  }
  const list = new InputList2();
  const rows = [];
  for (const entry of panels) {
    const item = new LabeledBoxItem2(
      {
        id: entry.spec.id,
        label: entry.spec.label,
        checked: entry.panel.isVisible()
      },
      icons
    );
    const input = item.dom.querySelector("input.Checkbox");
    const apply = (checked) => setPanelMounted(entry.panel, checked, entry.spec);
    input?.addEventListener("change", () => apply(input.checked));
    item.dom.addEventListener("click", (event) => {
      if (!input || event.target === input) return;
      input.checked = !input.checked;
      apply(input.checked);
    });
    list.add(item);
    rows.push({ input, panel: entry.panel });
  }
  const dialog = new FloatingDialog4({
    title: "Panels",
    icon: "view_sidebar",
    panelStyles: { width: "16rem" }
  });
  dialog.content(list);
  button?.addEventListener("click", () => {
    if (!dialog.isActive) {
      for (const row6 of rows) {
        if (row6.input) row6.input.checked = row6.panel.isVisible();
      }
    }
    dialog.toggle();
  });
  return dialog;
}
function createProgress(footer) {
  const bar = new StatusBar({ initialText: "Starting Bonsai Web\u2026", zIndex: 5 });
  bar.parentContainer = footer;
  let timer = null;
  let message = "";
  function clearTimer() {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
  }
  function goIdle() {
    clearTimer();
    message = "Ready";
    bar.dom.classList.add("is-idle");
    bar.dom.classList.remove("is-indeterminate");
    bar.hide();
  }
  const progress = {
    show(nextMessage, ratio) {
      clearTimer();
      if (nextMessage !== void 0) message = nextMessage;
      if (message === "Ready") {
        goIdle();
        return;
      }
      bar.dom.classList.remove("is-idle");
      const indeterminate = ratio === void 0 || ratio === null || Number.isNaN(ratio);
      bar.dom.classList.toggle("is-indeterminate", indeterminate);
      if (indeterminate) {
        bar.update(0, message);
        if (bar.percentageElement) bar.percentageElement.textContent = "";
      } else {
        bar.update(Math.max(0, Math.min(1, ratio)), message);
      }
    },
    settle(nextMessage, delay = 700) {
      if (!nextMessage || nextMessage === "Ready") {
        goIdle();
        return;
      }
      this.show(nextMessage, 1);
      timer = setTimeout(goIdle, delay);
    },
    settleIfCurrent(nextMessage, delay = 250) {
      if (message !== nextMessage) return;
      this.settle(nextMessage, delay);
    }
  };
  return progress;
}
function installFetchProgress(progress) {
  if (globalThis.__bonsaiFetchProgress) return;
  globalThis.__bonsaiFetchProgress = true;
  let fetchToken = 0;
  const origFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input && input.url || "";
    const isTrackable = /\.(ifc|ifcview|ifczip|json|wasm)(\?|$)/i.test(url);
    const res = await origFetch(input, init);
    if (!isTrackable || !res.body || !res.ok) return res;
    const total = Number(res.headers.get("content-length")) || 0;
    const name = url.split("/").pop().split("?")[0];
    const label = `Downloading ${name}\u2026`;
    const token = ++fetchToken;
    let received = 0;
    const reader = res.body.getReader();
    const finish = () => {
      if (token === fetchToken) progress.settleIfCurrent(label);
    };
    const stream = new ReadableStream({
      async start(controller) {
        progress.show(label, total ? 0 : null);
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            received += value.byteLength;
            if (total && token === fetchToken) {
              progress.show(label, received / total);
            }
            controller.enqueue(value);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        } finally {
          finish();
        }
      },
      cancel(reason) {
        reader.cancel(reason);
        finish();
      }
    });
    return new Response(stream, {
      headers: res.headers,
      status: res.status,
      statusText: res.statusText
    });
  };
}
function bindModelProgress(signals, progress) {
  signals.modelLoadStarted.add((payload) => {
    if (payload?.phase !== void 0) {
      const label = payload.phase === "parsing" ? "Parsing IFC" : payload.phase === "parsed" ? "Parsed IFC" : payload.phase === "tessellating" ? "Tessellating geometry" : payload.phase === "serializing" ? "Writing .ifcview" : payload.phase === "complete" ? "Conversion complete" : `Converting (${payload.phase})`;
      const suffix = payload.message ? ` \u2014 ${payload.message}` : "";
      progress.show(`${label}${suffix}`, payload.ratio);
      return;
    }
    const name = payload?.name ?? payload?.url?.split("/").pop() ?? "model";
    progress.show(`Opening ${name}\u2026`, null);
  });
  signals.modelLoaded.add((payload) => {
    const name = payload?.name ?? "model";
    progress.settle(`Model loaded (${name})`, 1200);
  });
  signals.modelLoadedToGPU.add((payload) => {
    if (payload?.ok === false) progress.settle("Model load failed", 1500);
    else progress.settle("Model uploaded to GPU", 900);
  });
  signals.liveIfcReady.add((payload) => {
    const name = payload?.file?.name ?? "model";
    progress.settle(`Ready \u2014 ${name}`, 700);
  });
}
function start(container = document.body, configuration) {
  const t0 = performance.now();
  const shell = mountShell(container, configuration.ui);
  const progress = createProgress(shell.footer);
  installFetchProgress(progress);
  const bonsai = new Bonsai(container, configuration, shell.viewport);
  bindRibbon(bonsai.context, configuration.ribbon, shell.layout);
  bindModelProgress(bonsai.context.signals, progress);
  const panels = mountUi(bonsai.context, shell.layout, configuration.app.CoreModules);
  bindPanelDialog(document.getElementById("RB_Panels"), panels);
  log.log(`boot: gui ready in ${(performance.now() - t0).toFixed(0)}ms`);
  progress.show("Loading viewer\u2026", null);
  bonsai.context.signals.viewerReady.add(() => progress.show("Loading IfcOpenShell\u2026", null));
  bonsai.context.signals.appReady.add(() => progress.settle("Ready", 400));
  void bonsai.start();
  return bonsai;
}
export {
  start
};
//# sourceMappingURL=bonsai.js.map
