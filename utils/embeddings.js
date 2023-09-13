const { randomUUID } = require("crypto");
const { Pipeline, pipeline } = require("@xenova/transformers");
const { Vector } = require("@pinecone-database/pinecone");
const { Document } = require('langchain/document');
const { EmbeddingsParams, Embeddings } = require("langchain/embeddings/base");
const { sliceIntoChunks } = require("./utils/util.js");

function isString(test) {
  return typeof test === "string";
}

class Embedder {
  constructor() {
    this.pipe = null;
  }

  async init(modelName) {
    this.pipe = await pipeline(
      "embeddings",
      modelName,
      { quantized: false }
    );
  }

  async embed(text, metadata) {
    const result = await this.pipe(text);
    const id = (metadata && metadata.id) || randomUUID();

    return {
      id,
      metadata: metadata || {
        text,
      },
      values: Array.from(result.data),
    };
  }

  async embedBatch(documents, batchSize, onDoneBatch) {
    const batches = sliceIntoChunks(documents, batchSize);
    for (const batch of batches) {
      const embeddings = await Promise.all(
        batch.map((documentOrString) =>
          isString(documentOrString)
            ? this.embed(documentOrString)
            : this.embed(documentOrString.pageContent, documentOrString.metadata)
        )
      );
      await onDoneBatch(embeddings);
    }
  }
}

class TransformersJSEmbedding extends Embeddings {
  constructor(params) {
    super(params);
    this.modelName = params.modelName;
    this.pipe = null;
  }

  async embedDocuments(texts) {
    this.pipe = this.pipe || await pipeline(
      "embeddings",
      this.modelName
    );

    const embeddings = await Promise.all(texts.map(async (text) => this.embedQuery(text)));
    return embeddings;
  }

  async embedQuery(text) {
    this.pipe = this.pipe || await pipeline(
      "embeddings",
      this.modelName
    );

    const result = await this.pipe(text);
    return Array.from(result.data);
  }
}

const embedder = new Embedder();
module.exports = { embedder, TransformersJSEmbedding };
