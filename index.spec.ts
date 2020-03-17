import { train } from "./index";
import { BayesClassifier } from "natural";
import { join } from "path";
import { writeFile, mkdirp } from "fs-extra";

it("trains classifier", async () => {
  const classifier = new BayesClassifier();
  const result = await train(classifier, join(".cache"));
  expect(result).toBeTruthy();
});

beforeAll(async () => {
  await mkdirp(join(".cache", "india"));
  await mkdirp(join(".cache", "the-netherlands"));

  await writeFile(
    join(".cache", "india", "1.txt"),
    "India is a country in south Asia"
  );
});
