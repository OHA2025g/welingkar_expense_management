import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
const sqlite=new DatabaseSync(':memory:');sqlite.exec('PRAGMA foreign_keys=ON');
for(const file of fs.readdirSync(path.resolve('drizzle')).filter(f=>f.endsWith('.sql')).sort())sqlite.exec(fs.readFileSync(path.resolve('drizzle',file),'utf8'));
class Statement{params:any[]=[];constructor(public sql:string){}bind(...params:any[]){const s=new Statement(this.sql);s.params=params;return s;}async first(){return sqlite.prepare(this.sql).get(...this.params)||null;}async all(){return{results:sqlite.prepare(this.sql).all(...this.params)};}async run(){const r=sqlite.prepare(this.sql).run(...this.params);return{success:true,meta:{changes:Number(r.changes),last_row_id:Number(r.lastInsertRowid)}};}}
const objects=new Map<string,{bytes:Uint8Array;metadata:any}>();
export const env:any={DB:{prepare:(sql:string)=>new Statement(sql),batch:async(statements:Statement[])=>{sqlite.exec('BEGIN IMMEDIATE');try{const results=[];for(const s of statements){const r=sqlite.prepare(s.sql).run(...s.params);results.push({success:true,meta:{changes:Number(r.changes)}});}sqlite.exec('COMMIT');return results;}catch(e){sqlite.exec('ROLLBACK');throw e;}}},BUCKET:{put:async(key:string,value:any,options:any={})=>{if(options.onlyIf&&objects.has(key))return null;const bytes=value instanceof Uint8Array?value:new Uint8Array(value);objects.set(key,{bytes,metadata:options});return{key};},get:async(key:string)=>{const o=objects.get(key);if(!o)return null;return{arrayBuffer:async()=>o.bytes.slice().buffer,text:async()=>new TextDecoder().decode(o.bytes),body:new Blob([o.bytes as any]).stream()};}}};
export const raw=sqlite;
