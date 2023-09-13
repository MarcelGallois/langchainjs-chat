// pages/api/askQuestion.js

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { GithubRepoLoader } from "langchain/document_loaders/web/github";
import { SerpAPILoader } from "langchain/document_loaders/web/serpapi";
import { MongoClient, ObjectId } from "mongodb";
import { ConversationChain } from "langchain/chains";
import { MongoDBChatMessageHistory } from "langchain/stores/message/mongodb";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  let sessionId;


  const query = req.body.question;
  const apiKey = process.env.SERPAPI_API_KEY;
  // Initialize logic
  const loader = new SerpAPILoader({ q: query, apiKey });
  const data = await loader.load();

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const splitDocs = await textSplitter.splitDocuments(data);

  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

  const client = new MongoClient(process.env.MONGODB_URI || "");
  await client.connect();
  const collection = client.db("langchain").collection("memory");

  // generate a new sessionId string
  if (!req.body.sessionId) {
    sessionId = new ObjectId().toString();
  } else {
    sessionId = req.body.sessionId;
  }
  const memory = new BufferMemory({
    chatHistory: new MongoDBChatMessageHistory({
      collection,
      sessionId,
    }),
  });

  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo-16k" });
  const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    memory
  });

  // Call the chain
  const resultRaw = await chain.call({ question: req.body.question });

  if ('response' in resultRaw) {
    resultRaw.text = resultRaw.response;
    delete resultRaw.response;
  } else if ('result' in resultRaw) {
    resultRaw.text = resultRaw.result;
    delete resultRaw.result;
  }

  res.status(200).json({ result: { text: resultRaw.text }, sessionId: sessionId });
};
