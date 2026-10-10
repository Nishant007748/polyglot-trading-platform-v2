#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import net from 'net';
import chalk from 'chalk';
const cwd = process.cwd();
const cfgPath = path.join(cwd, 'polyglot.json');
if(!fs.existsSync(cfgPath)){ console.error(chalk.red('polyglot.json not found.')); process.exit(1);}
const cfg = JSON.parse(fs.readFileSync(cfgPath,'utf-8'));

function strip(str){return str.replace(/\x1B\[[0-9;]*m/g,'');}
function pad(str,w){const raw=strip(str);return str+' '.repeat(Math.max(0,w-raw.length));}
function table(items){ if(!items.length){console.log(chalk.yellow('No services.'));return;} const cols=[{k:'name',h:'Name'},{k:'type',h:'Type'},{k:'port',h:'Port'},{k:'status',h:'Status'},{k:'path',h:'Path'}]; const widths=cols.map(c=>Math.max(c.h.length,...items.map(i=>strip(i[c.k]).length))+2); const top='┌'+widths.map(w=>'─'.repeat(w)).join('┬')+'┐'; const sep='├'+widths.map(w=>'─'.repeat(w)).join('┼')+'┤'; const bot='└'+widths.map(w=>'─'.repeat(w)).join('┴')+'┘'; console.log(top); console.log('│'+cols.map((c,i)=>pad(chalk.bold.white(c.h),widths[i])).join('│')+'│'); console.log(sep); for(const it of items){ console.log('│'+cols.map((c,i)=>pad(it[c.k],widths[i])).join('│')+'│'); } console.log(bot); console.log(chalk.gray('Total: '+items.length)); }

async function check(port){ return new Promise(res=>{ const sock=net.createConnection({port,host:'127.0.0.1'},()=>{sock.destroy();res(true);}); sock.setTimeout(350,()=>{sock.destroy();res(false);}); sock.on('error',()=>{res(false);});}); }
const promises = cfg.services.map(async s=>{ const up = await check(s.port); return { ...s, _up: up }; });
const results = await Promise.all(promises);
const rows = results.map(s=>({ name: chalk.cyan(s.name), type: colorType(s.type)(s.type), port: chalk.green(String(s.port)), status: s._up ? chalk.bgGreen.black(' UP ') : chalk.bgRed.white(' DOWN '), path: chalk.dim(s.path) }));
function colorType(t){ switch(t){case 'node': return chalk.green; case 'python': return chalk.yellow; case 'go': return chalk.cyan; case 'java': return chalk.red; case 'frontend': return chalk.blue; default: return chalk.white;} }
if(process.argv.includes('--json')) { console.log(JSON.stringify(results.map(r=>({name:r.name,type:r.type,port:r.port,up:r._up,path:r.path})),null,2)); } else { console.log(chalk.magentaBright('\nWorkspace Services (runtime status)')); table(rows); }
