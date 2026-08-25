"use strict";
const assert=require("assert");
const fs=require("fs");
const path=require("path");

const root=path.resolve(__dirname,"..");
const data=path.join(root,"data");
const manifest=JSON.parse(fs.readFileSync(path.join(data,"manifest.json"),"utf8"));
const taxonomy=JSON.parse(fs.readFileSync(path.join(data,manifest.taxonomy||"taxonomy.json"),"utf8"));
const papers=["Essay","GS1","GS2","GS3","GS4"];
const types=["Theory/Concept","Quote-based","Case study","Essay"];
const files=[...new Set(Object.values(manifest.papers).flat())];
const ids=new Set();
let questions=0,answers=0,legacyUnfiled=0;

function skeleton(a,label){
  assert(a&&typeof a==="object"&&!Array.isArray(a),label+" must be an object");
  assert(a.decode&&Array.isArray(a.decode.demands)&&Array.isArray(a.decode.concepts),label+" has an invalid decode");
  assert.strictEqual(a.intros.length,3,label+" must have 3 intros");
  assert.strictEqual(a.conclusions.length,3,label+" must have 3 conclusions");
  assert(Array.isArray(a.sections)&&a.sections.length,label+" must have sections");
  for(const section of a.sections){
    assert.strictEqual(section.frameworks.length,3,label+" section must have 3 frameworks");
    assert(Array.isArray(section.off)&&Array.isArray(section.valueAdd),label+" section needs off/valueAdd arrays");
    for(const fw of section.frameworks){
      assert.strictEqual(typeof fw.name,"string",label+" framework needs a name");
      assert.strictEqual(typeof fw.why,"string",label+" framework needs a why");
      assert(Array.isArray(fw.points),label+" framework needs points");
      for(const point of fw.points) assert(typeof point==="string"||(point&&typeof point.stem==="string"),label+" has an invalid point");
    }
  }
  for(const key of ["quotes","keywords","examples","thinkers"]) assert(Array.isArray(a.vaBank[key]),label+" vaBank."+key+" must be an array");
  assert(Array.isArray(a.pitfalls),label+" pitfalls must be an array");
}

for(const filename of files){
  const full=path.join(data,filename);
  const list=JSON.parse(fs.readFileSync(full,"utf8"));
  assert(Array.isArray(list),filename+" must contain an array");
  const sorted=[...list].sort((a,b)=>a.id.localeCompare(b.id)).map(q=>q.id);
  assert.deepStrictEqual(list.map(q=>q.id),sorted,filename+" is not sorted by id");
  for(const q of list){
    questions++;
    assert(q.id&&!ids.has(q.id),"duplicate or empty id: "+q.id);ids.add(q.id);
    assert(papers.includes(q.paper),q.id+" has an invalid paper");
    assert(types.includes(q.type),q.id+" has an invalid type");
    assert.strictEqual(typeof q.question,"string",q.id+" needs question text");
    assert(Array.isArray(q.tags)&&q.tags.length===1&&Array.isArray(q.tags[0])&&q.tags[0].length===2,q.id+" needs one [Topic, Sub-topic] tag");
    const [topic,sub]=q.tags[0];
    if(!topic&&!sub) legacyUnfiled++;
    else {
      assert(taxonomy[q.paper]&&taxonomy[q.paper][topic],q.id+" uses unknown topic "+topic);
      assert(taxonomy[q.paper][topic].includes(sub),q.id+" uses unknown sub-topic "+sub);
    }
    const isCase=q.type==="Case study";
    assert.strictEqual(topic==="Case Studies",isCase,q.id+" has inconsistent case-study type/tag");
    if(isCase) assert(q.paper==="GS4"&&q.summary,q.id+" case study needs GS4 and a summary");
    assert(Array.isArray(q.answers||[]),q.id+" answers must be an array");
    const study=q.mine&&q.mine.study;
    if(study!==undefined){
      assert(study&&typeof study==="object"&&!Array.isArray(study),q.id+" study metadata must be an object");
      if(study.status) assert(["not-started","draft","revision","revised"].includes(study.status),q.id+" has an invalid study status");
      if(study.nextRevisionAt) assert(/^\d{4}-\d{2}-\d{2}$/.test(study.nextRevisionAt),q.id+" has an invalid next revision date");
    }
    for(const a of q.answers||[]){answers++;skeleton(a,q.id+" answer");}
  }
}

console.log(`validated ${questions} questions and ${answers} answers (${legacyUnfiled} legacy unfiled)`);
