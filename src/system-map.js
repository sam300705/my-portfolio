/* Editorial, source-backed conceptual schematics. Never a claim of live telemetry. */
export const systemMaps = {
  "agentshield": [
    "AGENT SECURITY",
    [
      "Agent change",
      "Source / manifests / session logs"
    ],
    [
      "Deterministic checks",
      "Secrets · Docker · K8s · inventory"
    ],
    [
      "Policy decision",
      "ALLOW · WARN · APPROVAL · BLOCK"
    ],
    [
      "Review record",
      "Evidence · audit · remediation"
    ]
  ],
  "neuroinsight": [
    "MRI RESEARCH",
    [
      "Consent & upload",
      "Validation before processing"
    ],
    [
      "Experimental model",
      "ResNet50-based research pipeline"
    ],
    [
      "Attribution",
      "Grad-CAM attention region"
    ],
    [
      "Research output",
      "Derived data · stated limitations"
    ]
  ],
  "secondyouth": [
    "OFFLINE-FIRST DEMO",
    [
      "Daily routines",
      "Schedules and trusted contacts"
    ],
    [
      "Browser APIs",
      "Audio · camera · geolocation"
    ],
    [
      "Local data",
      "localStorage / IndexedDB"
    ],
    [
      "Experience",
      "Offline-aware support UI"
    ]
  ],
  "imgflow": [
    "TERMINAL IMAGE TOOLS",
    [
      "CLI input",
      "Image file or stdin"
    ],
    [
      "Image workflow",
      "Conversion · filters · previews"
    ],
    [
      "Composed pipeline",
      "Unix pipes / redirection"
    ],
    [
      "Output",
      "stdout or a local file"
    ]
  ],
  "scopeledger": [
    "CHANGE CONTROL",
    [
      "Workspace request",
      "Original scope and request"
    ],
    [
      "Impact review",
      "Pricing adjustments"
    ],
    [
      "Decision",
      "Client approval transitions"
    ],
    [
      "Persistent record",
      "Cloudflare Workers / D1"
    ]
  ]
};
const esc = (v) => String(v).replace(/[&<>"']/g, (x) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[x]);
export function systemMapMarkup(id, expanded = false) {
  const spec = systemMaps[id];
  if (!spec) return '';
  const steps = spec.slice(1).map(([name, detail], index) =>
    '<li class="system-map-node"><span class="system-map-index">' + String(index + 1).padStart(2,'0') + '</span><strong>' +
    esc(name) + '</strong><span>' + esc(detail) + '</span></li>'
  ).join('');
  return '<figure class="system-map' + (expanded ? ' system-map-expanded' : '') + '" aria-label="Conceptual workflow: ' + esc(id) + '">' +
    '<figcaption><span class="system-map-eyebrow">FIG. / ' + esc(spec[0]) + '</span>' +
    '<span class="system-map-caption">Conceptual workflow · not a live system view</span></figcaption>' +
    '<ol class="system-map-steps">' + steps + '</ol></figure>';
}
