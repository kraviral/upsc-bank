"use strict";
var assert=require("assert");
var journal=require("../draft-journal.js");

function q(id,text){return {id:id,paper:"GS2",question:text,tags:[["Polity","Federalism"]]};}
function bank(questions,taxonomy){return {schemaVersion:1,taxonomy:taxonomy||{GS2:{Polity:["Federalism"]}},questions:questions};}

(function unchangedQuestionsAreNotStored(){
  var base=bank([q("a","A"),q("b","B")]);
  var current=journal.clone(base);current.questions[1].question="B local";
  var saved=journal.make(base,current,{savedAt:"now"});
  assert.deepStrictEqual(saved.changes.map(function(c){return c.id;}),["b"]);
})();

(function independentRemoteAndLocalChangesMerge(){
  var base=bank([q("a","A"),q("b","B")]);
  var local=journal.clone(base);local.questions[0].question="A local";
  var remote=journal.clone(base);remote.questions[1].question="B remote";
  var result=journal.apply(remote,journal.make(base,local));
  assert.strictEqual(result.conflicts.length,0);
  assert.strictEqual(result.db.questions[0].question,"A local");
  assert.strictEqual(result.db.questions[1].question,"B remote");
})();

(function sameQuestionConflictKeepsRepositoryVisible(){
  var base=bank([q("a","A")]);
  var local=journal.clone(base);local.questions[0].question="A local";
  var remote=journal.clone(base);remote.questions[0].question="A remote";
  var result=journal.apply(remote,journal.make(base,local));
  assert.strictEqual(result.conflicts.length,1);
  assert.strictEqual(result.db.questions[0].question,"A remote");
  assert.strictEqual(result.conflicts[0].change.local.question,"A local");
})();

(function remoteDeletionAndLocalEditConflict(){
  var base=bank([q("a","A")]);
  var local=journal.clone(base);local.questions[0].question="A local";
  var result=journal.apply(bank([]),journal.make(base,local));
  assert.strictEqual(result.conflicts.length,1);
  assert.strictEqual(result.db.questions.length,0);
  assert.strictEqual(result.conflicts[0].change.local.question,"A local");
})();

(function additionsAndDeletionsAreJournalled(){
  var base=bank([q("a","A")]),local=bank([q("b","B")]);
  var saved=journal.make(base,local);
  assert.strictEqual(saved.changes.find(function(c){return c.id==="a";}).local,null);
  assert.strictEqual(saved.changes.find(function(c){return c.id==="b";}).base,null);
  var result=journal.apply(base,saved);
  assert.deepStrictEqual(result.db.questions.map(function(item){return item.id;}),["b"]);
})();

(function legacyDifferencesAreQuarantined(){
  var remote=bank([q("a","A remote"),q("new-remote","N")]);
  var legacy=bank([q("a","A old local"),q("local-only","L")]);
  var migrated=journal.migrateLegacy(remote,legacy);
  var result=journal.apply(remote,migrated);
  assert.strictEqual(result.conflicts.length,2);
  assert.deepStrictEqual(result.db.questions.map(function(item){return item.id;}),["a","new-remote"]);
  assert.ok(!migrated.changes.some(function(c){return c.id==="new-remote";}),"remote-only items must not become guessed deletions");
})();

(function taxonomyConflictDoesNotOverwriteRepository(){
  var base=bank([q("a","A")],{GS2:{Polity:["Federalism"]}});
  var local=journal.clone(base);local.taxonomy.GS2.Polity.push("Parliament");
  var remote=journal.clone(base);remote.taxonomy.GS2.Polity.push("Judiciary");
  var result=journal.apply(remote,journal.make(base,local));
  assert.strictEqual(result.conflicts.length,1);
  assert.deepStrictEqual(result.db.taxonomy,remote.taxonomy);
})();

console.log("draft journal tests passed");
