# 📜 Train Natural

Easily train classifiers from text files on your computer. Works with classifiers available in [Natural](https://github.com/NaturalNode/natural), a Node.js natural language facility library.

## 💡 Usage

```bash
npm install train-natural
```

```ts
import { train } from "train-natural";
import { BayesClassifier } from "natural";
import { join } from "path";

const documents = join(__dirname, "training-data");
const classifier = new BayesClassifier();
await train(classifier, documents);

console.log(classifier.classify("example string"));
```

In the above example, a directory named `training-data` contains several folders, one for each label, in which each text file is used to train the classifier.

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
