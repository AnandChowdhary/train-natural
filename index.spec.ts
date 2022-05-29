import { train } from "./index";
import { BayesClassifier, LogisticRegressionClassifier } from "natural";
import { join } from "path";
import { writeFile, mkdirp, readdir } from "fs-extra";

describe("train-natural", () => {
  it("finds labels to train", async () => {
    const classifier = new BayesClassifier();
    const { labels } = await train(classifier, join(".cache"));
    expect(labels).toEqual(["india", "the-netherlands"]);
  });

  it("trains BayesClassifier and detects IN", async () => {
    const classifier = new BayesClassifier();
    await train(classifier, join(".cache"));
    const result = classifier.classify(
      "Southern Asian country with a rich culture"
    );
    expect(result).toBe("india");
  });

  it("trains BayesClassifier and detects NL", async () => {
    const classifier = new BayesClassifier();
    await train(classifier, join(".cache"));
    const result = classifier.classify(
      "Liberal European country with tall people"
    );
    expect(result).toBe("the-netherlands");
  });

  it("does not report files as labels", async () => {
    const classifier = new BayesClassifier();
    const files = await readdir(join(".cache"));
    const { labels } = await train(classifier, join(".cache"));
    expect(files.length === labels.length).toBeFalsy();
  });

  it("works with LogisticRegressionClassifier", async () => {
    const classifier = new LogisticRegressionClassifier();
    await train(classifier, join(".cache"));
    const result = classifier.classify(
      "Southern Asian country with a rich culture"
    );
    expect(result).toBe("india");
  });

  beforeAll(async () => {
    await /* TODO: JSFIX could not patch the breaking change:
    Creating a directory with fs-extra no longer returns the path
    Suggested fix: The returned promise no longer includes the path of the new directory */
    mkdirp(join(".cache", "india"));
    await /* TODO: JSFIX could not patch the breaking change:
    Creating a directory with fs-extra no longer returns the path
    Suggested fix: The returned promise no longer includes the path of the new directory */
    mkdirp(join(".cache", "the-netherlands"));
    await writeFile(join(".cache", "1.txt"), "Example file");

    await writeFile(
      join(".cache", "india", "1.txt"),
      "India is a country in south Asia"
    );
    await writeFile(
      join(".cache", "india", "2.txt"),
      "India known for its rich culture, diversity, and cuisine"
    );
    await writeFile(
      join(".cache", "the-netherlands", "1.txt"),
      "The Netherlands is a country in Northwestern Europe"
    );
    await writeFile(
      join(".cache", "the-netherlands", "2.txt"),
      "The Netherlands is known for social tolerance, freedom, tall people"
    );
  });
});
