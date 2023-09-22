# GPT Powered NextJS Chat App 
This is an AI Chat application built with Next.js that allows users to chat with an AI assistant powered by OpenAI's GPT-3.5 & GPT-4 APIs (I will be adding the support for open source LLMs soon!). 

## Features 
- Chat interface for conversing with the AI assistant
- Supports all openai conversational ai models (gpt-3.5-turbo - gpt-4)
- Integration with GitHub to allow the AI to answer questions about code
- User authentication and profiles
- Persistent chat history stored in a database
- Customizable themes and user settings
- The app comes with a default system theme and a configurable light and dark theme.

## Getting Started Prerequisites
- Node.js 14+
- An OpenAI API key

## Installation 
1. Clone the repository
   
   ```bash git clone https://github.com/MarcelGallois/langchainjs-chat.git ```
3. Install dependencies
   
   ```bash npm install ```
5. Configure environment variables Create a `.env.local` file and add your OpenAI API key, Github Access Token and SerpAPI key.
   
  ``` OPENAI_API_KEY="sk-..." ```
  ``` GITHUB_ACCESS_TOKEN="github_pat..." ```
  ``` SERPAPI_API_KEY="..." ```
7. Run the app. The app will be available at `http://localhost:3000`.

   ```bash npm run dev ```
   
## Architecture 
- Next.js
- Shadcn
- Tailwind CSS
- Prism
- OpenAI API
- microsoft/fetch-event-source
  
The backend uses Next.js API routes and Vercel serverless functions to call the OpenAI API. 

## Contributing Pull requests are welcome! Feel free to open an issue for any bugs or feature requests. 

## TODO: 
- Fix GitHub and personalities.
- Implement code detection and prismjs for code highlighting ##BROKEN
- Implement a good default chat agent & give ssome personality/preprompts
- Implement chat with uploaded document
- Implement loading wheel while it's thinking
- Implement the ability to switch different LLMS besides just chatgpt-3.5-turbo and gpt-4
- Give users the option to copy code with a button and toggle no wrap/wrap in the code sections
- Give users the option to save their chat history
- Store previous conversations to a database so users can switch between relevant tools/agents ##DONE ##BROKEN WITH TOOLS
- Add a user product sentiment checker
- Add a YouTube "age appropriate" content checker
- YT content checker should be able to check for age appropriate content, but also for content that is relevant to the user's interests. Enter in a youtube link, the bot will respond with an age rating and the user can then start a conversation about the video.
- Add the ability to share chats
- Add a prompt for the web one that asks if there are any good times to go fishing in the next week
- Make these bot personalities:
- Amelia, Bonny&Clyde (two bots and one user chat with eachother), CatGPT, Dalek, Eve, Francesco, George, Hal, Inigo, Jarvis, K-9, Lizard Man, Marvin, Nell, Oliver, Polly, Quaid, R2-D2, Samantha, TARS, Ulysses, Viki, Wall-E, Xander, Yoda, Zola

- Change the way APIs are set up so they're more modular (DRY)
