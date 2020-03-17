# 📜 Train Natural

Easily train classifiers from text files on your computer. Works with classifiers available in [Natural](https://github.com/NaturalNode/natural), a Node.js natural language facility library.

[![GitHub Actions](https://github.com/AnandChowdhary/train-natural/workflows/Node%20CI/badge.svg)](https://github.com/AnandChowdhary/train-natural/actions)
[![Travis CI](https://img.shields.io/travis/AnandChowdhary/train-natural.svg)](https://travis-ci.org/AnandChowdhary/train-natural)
[![Coverage Status](https://coveralls.io/repos/github/AnandChowdhary/train-natural/badge.svg?branch=master&v=2)](https://coveralls.io/github/AnandChowdhary/train-natural?branch=master)
[![License](https://img.shields.io/github/license/anandchowdhary/train-natural.svg)](https://github.com/AnandChowdhary/train-natural/blob/master/LICENSE)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/AnandChowdhary/train-natural.svg)
![NPM type definitions](https://img.shields.io/npm/types/train-natural.svg)
[![NPM](https://img.shields.io/npm/v/train-natural.svg)](https://www.npmjs.com/package/train-natural)

[![NPM](https://nodei.co/npm/train-natural.png)](https://www.npmjs.com/package/train-natural)

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
