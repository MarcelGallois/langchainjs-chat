const { PineconeClient } = require("@pinecone-database/pinecone");
const { config } = require("dotenv");
const { getEnv, validateEnvironmentVariables } = require("./util.js");

config();

let pineconeClient = null;

// Returns a PineconeClient instance
const getPineconeClient = async () => {
  validateEnvironmentVariables();

  if (pineconeClient) {
    return pineconeClient;
  }
  pineconeClient = new PineconeClient();

  await pineconeClient.init({
    apiKey: getEnv("PINECONE_API_KEY"),
    environment: getEnv("PINECONE_ENVIRONMENT"),
  });

  return pineconeClient;
};

module.exports = { getPineconeClient };
