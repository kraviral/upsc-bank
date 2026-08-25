(function(root,factory){
  var api=factory();
  if(typeof module==="object"&&module.exports) module.exports=api;
  else root.DraftJournal=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";

  function clone(value){
    return value==null?value:JSON.parse(JSON.stringify(value));
  }
  function ordered(value){
    if(Array.isArray(value)) return value.map(ordered);
    if(value&&typeof value==="object"){
      var out={};
      Object.keys(value).sort().forEach(function(key){out[key]=ordered(value[key]);});
      return out;
    }
    return value;
  }
  function same(a,b){
    return JSON.stringify(ordered(a))===JSON.stringify(ordered(b));
  }
  function byId(bank){
    var out={};
    ((bank&&bank.questions)||[]).forEach(function(q){if(q&&q.id) out[q.id]=q;});
    return out;
  }
  function bankMeta(bank){
    return {schemaVersion:(bank&&bank.schemaVersion)||1,taxonomy:clone((bank&&bank.taxonomy)||{})};
  }
  function make(base,current,options){
    base=base||{taxonomy:{},questions:[]};
    current=current||{taxonomy:{},questions:[]};
    options=options||{};
    var before=byId(base),after=byId(current),ids={};
    Object.keys(before).forEach(function(id){ids[id]=1;});
    Object.keys(after).forEach(function(id){ids[id]=1;});
    var changes=[];
    Object.keys(ids).sort().forEach(function(id){
      var b=before[id]||null,a=after[id]||null;
      if(!same(b,a)) changes.push({id:id,base:clone(b),local:clone(a)});
    });
    var bm=bankMeta(base),am=bankMeta(current);
    return {
      version:2,
      savedAt:options.savedAt||new Date().toISOString(),
      baseSha:options.baseSha||null,
      changes:changes,
      bank:same(bm,am)?null:{base:bm,local:am}
    };
  }
  function empty(journal){
    return !journal||(!(journal.changes||[]).length&&!journal.bank);
  }
  function applyQuestion(bank,map,change){
    var existing=map[change.id];
    if(change.local==null){
      if(existing!==undefined){bank.questions.splice(existing,1);map=byIdIndex(bank);}
      return map;
    }
    if(existing===undefined){bank.questions.push(clone(change.local));map[change.id]=bank.questions.length-1;}
    else bank.questions[existing]=clone(change.local);
    return map;
  }
  function byIdIndex(bank){
    var out={};
    (bank.questions||[]).forEach(function(q,i){if(q&&q.id) out[q.id]=i;});
    return out;
  }
  function localAlreadyRemote(remote,local){
    return same(remote||null,local||null);
  }
  function apply(repo,journal){
    var bank=clone(repo||{taxonomy:{},questions:[]}),map=byIdIndex(bank),conflicts=[],kept=[];
    (journal&&journal.changes||[]).forEach(function(original){
      var change=clone(original),remote=map[change.id]===undefined?null:bank.questions[map[change.id]];
      if(localAlreadyRemote(remote,change.local)) return;
      if(change.blocked||!same(remote,change.base)){
        change.blocked=true;
        kept.push(change);
        conflicts.push({kind:"question",id:change.id,remote:clone(remote),change:change});
        return;
      }
      map=applyQuestion(bank,map,change);
      kept.push(change);
    });
    var bankChange=journal&&journal.bank?clone(journal.bank):null;
    if(bankChange){
      var remoteMeta=bankMeta(repo);
      if(same(remoteMeta,bankChange.local)) bankChange=null;
      else if(bankChange.blocked||!same(remoteMeta,bankChange.base)){
        bankChange.blocked=true;
        conflicts.push({kind:"bank",id:"taxonomy",remote:remoteMeta,change:bankChange});
      }else{
        bank.schemaVersion=bankChange.local.schemaVersion||1;
        bank.taxonomy=clone(bankChange.local.taxonomy||{});
      }
    }
    return {
      db:bank,
      conflicts:conflicts,
      journal:{
        version:2,
        savedAt:(journal&&journal.savedAt)||new Date().toISOString(),
        baseSha:(journal&&journal.baseSha)||null,
        changes:kept,
        bank:bankChange
      }
    };
  }
  function migrateLegacy(repo,legacy){
    var remote=byId(repo),local=byId(legacy),changes=[];
    Object.keys(local).sort().forEach(function(id){
      var r=remote[id]||null,l=local[id];
      if(!same(r,l)) changes.push({id:id,base:clone(r),local:clone(l),blocked:true,legacy:true});
    });
    var rb=bankMeta(repo),lb=bankMeta(legacy),bank=null;
    if(!same(rb,lb)) bank={base:rb,local:lb,blocked:true,legacy:true};
    return {version:2,savedAt:new Date().toISOString(),baseSha:null,changes:changes,bank:bank,migratedFromLegacy:true};
  }

  return {clone:clone,same:same,make:make,empty:empty,apply:apply,migrateLegacy:migrateLegacy};
});
