import * as dfd from "danfojs-node";
import { dataFrameFromURL, dropDuplicates } from "./dataLoader.js";

const url = "https://rajpurkar.github.io/SQuAD-explorer/dataset/train-v1.1.json";

const loadSquad = async () => {
  const df = await dataFrameFromURL(
    url,
    [
      "title",
      "paragraphs.context",
      "paragraphs.qas.id",
      "paragraphs.qas.question",
      "paragraphs.qas.answers.text",
    ],
    ["paragraphs", "paragraphs.qas", "paragraphs.qas.answers"]
  );

  df.rename({ "paragraphs.context": "context" }, { inplace: true });
  df.rename({ "paragraphs.qas.id": "id" }, { inplace: true });
  df.rename({ "paragraphs.qas.question": "question" }, { inplace: true });
  df.rename({ "paragraphs.qas.answers.text": "answer" }, { inplace: true });

  const cleanDf = dropDuplicates(df, "context");
  return cleanDf;
};

module.exports = { loadSquad };
