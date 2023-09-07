// pages/api/askQuestion.js

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { repo } = req.body;

  if (!repo) {
    return res.status(400).json({ error: "Missing GitHub repository" });
  }

  // Initialize logic
  const loader = new GithubRepoLoader(
    repo,
    {
      branch: "main",
      recursive: false,
      unknown: "warn",
      maxConcurrency: 5, // Defaults to 2
    }
  );
  const data = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const splitDocs = await textSplitter.splitDocuments(data);

  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

  const memory = new BufferMemory({
    memoryKey: "chat_history",
    returnMessages: true,
  });

  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    memory
  });

  // Call the chain
  const result = await chain.call({ question: req.body.question });

  // Respond with result
  res.status(200).json({ result });
};
