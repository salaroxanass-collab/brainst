import assert from "node:assert/strict";
import { searchBrainstormReferences } from "../src/lib/brainstorming";
import { interpretLandscapeQuery } from "../src/lib/brainstorming/expert";

const englishGardens = searchBrainstormReferences("English garden", []);
assert.equal(englishGardens.length, 4);
assert.ok(englishGardens.every((reference) => reference.location.en.includes("England")));
assert.ok(englishGardens.every((reference) => /garden/i.test(`${reference.typology} ${reference.tags.join(" ")}`)));

const historicTradition = interpretLandscapeQuery("English Landscape Garden tradition", []);
assert.deepEqual(historicTradition.traditions, ["English Landscape Garden"]);
assert.ok(historicTradition.historicalLens[0]?.includes("Capability"));

const eighteenthCentury = interpretLandscapeQuery("English Landscape Garden around 1780", []);
assert.equal(eighteenthCentury.date?.label, "around 1780");

const datedItalianSchoolyard = searchBrainstormReferences("Italian schoolyard around 1900", []);
assert.equal(datedItalianSchoolyard.length, 0);

const afterDate = interpretLandscapeQuery("Italian gardens from 1900", []);
assert.equal(afterDate.date?.from, 1900);

const unknown = searchBrainstormReferences("completely unrelated xyz", []);
assert.equal(unknown.length, 0);

console.log("BrainStorm expert checks passed.");
