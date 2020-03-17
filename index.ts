import { BayesClassifier } from "natural";
import { readdir, lstat, readFile } from "fs-extra";

export const train = async (
  classifier: Pick<BayesClassifier, "addDocument" | "train">,
  documents: string
) => {
  const files = await readdir(documents);
  const labels: string[] = [];
  for await (const file of files) {
    const fileType = await lstat(file);
    if (fileType.isDirectory()) labels.push(file);
  }
  for await (const label of labels) {
    const documents = await readdir(label);
    for await (const document of documents) {
      const contents = await readFile(document, "utf8");
      classifier.addDocument(contents, label);
    }
  }
  classifier.train();
  return { labels };
};
