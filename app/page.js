"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DynamicSuggestionCards from "@/components/suggestionCard"
import ToolSwitcherDialogue from "@/components/toolSwitcherDialogue"
import { useToolSwitcher } from "@/app/context/toolSwitcherContext";


import axios from 'axios';

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatBoxRef = useRef(null);
  const { selectedTool, setSelectedTool } = useToolSwitcher();
  const { githubRepo, setGithubRepo } = useToolSwitcher();

  // Press enter to submit question
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleQuestion();
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    setChatHistory([]);
  }, [selectedTool]);


  const handleQuestion = async (input = userInput) => {
    setUserInput("");
    setChatHistory((prevChatHistory) => [...prevChatHistory, { user: input, bot: "..." }]);

    const apiEndpoint = selectedTool === "option-two" ? "/api/askGithub" : "/api/askQuestion";
    const payload = { question: input };

    if (selectedTool === "option-two" && githubRepo) {
      payload.repo = githubRepo;
    }

    try {
      const { data } = await axios.post(apiEndpoint, payload);
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory[updatedChatHistory.length - 1].bot = data.result.text;
        return updatedChatHistory;
      });
    } catch (error) {
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory[updatedChatHistory.length - 1].bot = "Something went wrong, please try again later.";
        return updatedChatHistory;
      });
    }
  };


  return (
    // Color user's and bot's bubble  background based on the theme
    <main className="flex h-screen overflow-y-hidden flex-col items-center justify-between p-8">
      {/* Tool switcher needs to switch cards too */}
      <div className="w-[75dvw] justify-end pb-3 hidden sm:flex">
        <ToolSwitcherDialogue />
      </div>
      <div className="text-center">
        <div className="flex flex-col h-screen">
          <div ref={chatBoxRef} className="h-[75dvh] md:w-[75dvw] lg:w-[50dvw] overflow-y-auto p-4 border rounded">

            {/* Make the user on the right and bot on the left */}
            {/* Look for code blocks by the triple backticks, create a 'pre'/'code' tag with a copy code button and highlight syntax based on what the first word after the triple backticks is. code blocks should also take the first word and put it in a code block header where the copy code button should also be */}


            {chatHistory.map((entry, index) => (
              <div key={index} className="mb-2 p-2 space-y-4">
                <div className="flex items-center space-x-4 w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 ml-auto">
                  <span className='flex w-[100%] justify-end'>
                    <span className='relative flex h-10 w-10 bg-muted-foreground shrink-0 overflow-hidden rounded-full justify-center items-center'>U</span> </span>
                  <p className="font-bold text-left flex w-max max-w-[75%] flex-col gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-xl"><span className="font-normal">{entry.user}</span></p>
                </div>
                <div className="items-center space-x-4 space-y-3 w-max max-w-[75%] gap-2 px-3 py-2">
                  <span className='flex w-[100%] justify-start'>
                    <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full justify-center items-center bg-primary-foreground'>B</span>
                  </span>
                  <p className="font-bold text-left flex w-max max-w-[75%] flex-col gap-2 px-3 py-2 text-sm bg-muted rounded-xl"><span className="font-normal">{entry.bot}</span></p>
                </div>

              </div>
            ))}

            {/* Animate the cards coming in */}
            {chatHistory.length === 0 && (
              <DynamicSuggestionCards
                handleQuestion={handleQuestion}
              />
            )}

          </div>
          <div className="flex items-center space-x-4 px-4 py-1 bg-transparent border rounded mt-4">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-grow p-2 py-3 pt-6 border-0 rounded resize-none text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
              rows="1"
            />
            <Button onClick={() => handleQuestion()}>
              Send
            </Button>
          </div>
        </div>

      </div>
    </main >
  );
}
