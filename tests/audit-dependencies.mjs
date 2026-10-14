import fs from 'node:fs';
const read = (path) => {
  try { return JSON.parse(fs.readFileSync(path, 'utf8')); }
  catch (error) { console.error('Unable to parse npm audit report:',path,error.message); process.exit(2); }
};
const runtime = read('/tmp/portfolio-runtime-audit.json');
const all = read('/tmp/portfolio-all-audit.json');
const summarize = (report) => ({
  metadata: report.metadata?.vulnerabilities || {},
  packages: Object.entries(report.vulnerabilities || {})
    .filter(([,value]) => value.severity === 'high' || value.severity === 'critical')
    .map(([name,value]) => ({name,severity:value.severity,direct:value.isDirect,range:value.range,fixAvailable:value.fixAvailable,via:(value.via || []).map(item => typeof item === 'string' ? item : item.name)}))
});
console.log('Production-dependency audit:',JSON.stringify(summarize(runtime),null,2));
console.log('Full build-tool/dependency audit:',JSON.stringify(summarize(all),null,2));
const runtimeSerious = Object.entries(runtime.vulnerabilities||{}).filter(([,x]) => x.severity === 'high' || x.severity === 'critical');
if (runtime.error || all.error) { console.error('npm audit registry error; audit result cannot be accepted'); process.exit(2); }
if(runtimeSerious.length) { console.error('High/critical vulnerabilities in production dependency graph:',runtimeSerious.map(([name])=>name).join(', ')); process.exit(1); }
