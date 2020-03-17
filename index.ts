import { BayesClassifier } from "natural";
import { readdir, lstat, readFile } from "fs-extra";
import { join } from "path";

export const train = async (
  classifier: Pick<BayesClassifier, "addDocument" | "train">,
  documents: string
) => {
  const files = await readdir(documents);
  const labels: string[] = [];
  for await (const file of files) {
    const fileType = await lstat(join(documents, file));
    if (fileType.isDirectory()) labels.push(file);
  }
  for await (const label of labels) {
    const docs = await readdir(join(documents, label));
    for await (const document of docs) {
      const contents = await readFile(join(documents, label, document), "utf8");
      classifier.addDocument(contents, label);
    }
  }
  classifier.train();
  return { labels };
};
