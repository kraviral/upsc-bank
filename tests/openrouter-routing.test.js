"use strict";
const assert=require("assert");
const fs=require("fs");
const path=require("path");

const html=fs.readFileSync(path.resolve(__dirname,"../index.html"),"utf8");
const start=html.indexOf("async function callModel(");
const end=html.indexOf("\n/* Why the model stopped",start);
assert(start>=0&&end>start,"callModel source not found");

const calls=[];
let replies=[];
global.genModel="test/model";
global.genKey="test-key";
global.fetch=async function(url,options){
  calls.push(JSON.parse(options.body));
  return replies.shift();
};

function response(status,message){
  return {
    status,
    ok:status>=200&&status<300,
    clone(){return response(status,message);},
    async text(){return message||"";},
    body:{getReader(){return {async read(){return {done:true};}};}}
  };
}

const callModel=eval("("+html.slice(start,end)+")");

async function main(){
  const route404=JSON.stringify({error:{message:"No endpoints found that can handle the requested parameters"}});
  replies=[response(404,route404),response(404,route404),response(404,route404),response(200,"")];
  const out=await callModel("prompt",null,{
    model:"test/model",key:"test-key",jsonMode:true,reasoningControl:true,maxCompletion:12000
  });
  assert.deepStrictEqual(out.routeFallbacks,["without reasoning","with max_tokens","without usage metadata"]);
  assert.strictEqual(calls.length,4);
  assert(calls.every(x=>x.response_format&&x.response_format.type==="json_object"),"a retry dropped strict JSON mode");
  assert(calls.every(x=>x.provider&&x.provider.require_parameters===true),"a retry weakened provider matching");
  assert(calls[0].reasoning,"initial request omitted reasoning control");
  assert(!calls[1].reasoning,"first retry retained reasoning control");
  assert.strictEqual(calls[2].max_tokens,12000,"second retry did not use max_tokens");
  assert(!("max_completion_tokens" in calls[2]),"second retry retained max_completion_tokens");
  assert(!("stream_options" in calls[3]),"last retry retained optional usage metadata");

  calls.length=0;
  replies=[response(404,route404),response(404,route404),response(404,route404),response(404,route404)];
  await assert.rejects(
    callModel("prompt",null,{model:"test/model",key:"test-key",jsonMode:true,reasoningControl:true,maxCompletion:12000}),
    e=>/compatibility retries/.test(e.message)&&/No endpoints found/.test(e.message)&&!/supporting the required JSON mode/.test(e.message)
  );
  console.log("OpenRouter routing fallback tests passed");
}

main().catch(function(e){console.error(e);process.exitCode=1;});
