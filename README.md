# ChatGPT Web App This is a web application built with Next.js that allows users to chat with an AI assistant powered by OpenAI's GPT-3 API. 
## Features - Chat interface for conversing with the AI assistant - Supports allopenai conversational ai models (gpt-3.5-turbo || gpt-4) - Integration with GitHub to allow the AI to answer questions about code - User authentication and profiles - Persistent chat history stored in a database - Customizable themes and user settings ## Getting Started Prerequisites - Node.js 14+ - An OpenAI API key ## Installation 1. Clone the repository ```bash git clone https://github.com/MarcelGallois/langchainjs-chat.git ``` 2. Install dependencies ```bash npm install ``` 3. Configure environment variables Create a `.env.local` file and add your OpenAI API key and Github Access Token and SerpAPI key (GITHUB_ACCESS_TOKEN="github_pat...", SERPAPI_API_KEY="..."). ``` OPENAI_API_KEY="sk-..." ``` 4. Run the app ```bash npm run dev ``` The app will be available at `http://localhost:3000`. ## Architecture - Next.js - React framework for building server-rendered apps - Tailwind CSS - For styling - NextAuth.js - For authentication - Prisma - ORM for interacting with PostgreSQL database - OpenAI API - For powering the AI assistant - Vercel - For hosting and serverless functions The frontend uses Next.js React framework with Tailwind CSS for styling. Authentication is handled by NextAuth.js. The backend uses Next.js API routes and Vercel serverless functions to call the OpenAI API. ## Customizing Themes The app comes with a default light and dark theme. ## AI Models To switch the AI model, change the `openai.model` config in `lib/openai.js`. Refer to the OpenAI docs for all available models. ## Database TBD if necessary to store chat history ## Contributing Pull requests are welcome! Feel free to open an issue for any bugs or feature requests. ## License This project is licensed under the MIT License - see the LICENSE file for more details. 
TODO: 
DO NOT PUSH UNTIL THIS IS EDITED AND THESE ARE DONE
- Implement code detection and prismjs for code highlighting ##DONE 
- Implement github api key ##DONE
- Implement a good default chat agent & give ssome personality/preprompts
- Implement SERPAPI for web browsing ##DONE
- Implement chat with uploaded document
- Implement light/dark mode switcher
- Implement loading wheel while he's thinking
- implement a model switcher, change the tools dialogue to be a settings menu and go from there
- Implement the ability to switch different LLMS besides just chatgpt-3.5-turbo and gpt-4
- Give people the option to copy code with a button and toggle no wrap/wrap in the code sections
- Give people the option to save their chat history
- Make settings a tab menu
- Store previous conversations to a database so users can switch between relevant tools/agents
- Fix state of readme
- Fix scrolling when a new message comes in
- Clear github field on tool save
- Get Github RepoLoader to actually work
- Introduce a github repo vectorStore storage/indexing in a db
- Add a YouTube "age appropriate" content checker
- Add a user product sentiment checker
- Give the chatbots the timestamps of the messages/track the last message date/time to be able to give an accurate greeting based on how long it's been.
- YT content checker should be able to check for age appropriate content, but also for content that is relevant to the user's interests. Enter in a youtube link, the bot will respond with an age appropriate rating and the user can then start a conversation about the video.
- Stock sentiment tracker, use RSS feeds to get the latest news about stocks and then give a rating on the stock. 
- Build in a vector database for the chat bots.

- Look at writer.com as an example for portfolio design


- Make a browser extension so wwhen you right click on highlighted code, you can select what programming language to convert it to, it calls chatgpt and displays the code somehow. could also extend to actual language.
