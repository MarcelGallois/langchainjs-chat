"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DynamicSuggestionCards from "@/components/suggestionCard"
import SettingsDialogue from "@/components/settingsDialogue"
import { useToolSwitcher } from "@/app/context/toolSwitcherContext";
import parseTextForCode from "@/utils/parseTextForCode"
import Prism from 'prismjs';
import { ModeToggle } from "@/components/modeToggle";
import { ToolBadge } from "@/components/Badge";
import axios from 'axios';

// Consider using Shadcn ScrollArea for the chatbox
// Consider using Shadcn Slider for the temperature of the model
// Consider using Shadcn Toast to show that settings have been changed
// Use shadcn Tabs for the settings menu
// Use shadcn Badge to display what the current model is, what its personality is, and what tool(s) it has.

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isSending, setIsSending] = useState(false)
  const [sessionId, setSessionId] = useState(null);
  // const [model, setModel] = useState(null); // Probably need to incorporate this into the context provider to make it accessable after changing in the settings menu
  // const [personality, setPersonality] = useState(null) // Probably need to incorporate this into the context provider to make it accessable after changing in the settings menu

  const chatBoxRef = useRef(null);
  const { selectedTool, selectedToolName, selectedModel, selectedModelName, selectedTemperature, selectedPersonality, githubRepo, updateToolState } = useToolSwitcher();
  const textAreaRef = useRef(null);




  useEffect(() => {
    const highlight = () => {
      Prism.highlightAll();
    };
    highlight();
  }, [chatHistory]);

  useEffect(() => {
    const toolNames = {
      "option-one": "Default - No Tools",
      "option-two": "GitHub Tool",
      "option-three": "Web Tool",
    };
    const modelNames = {
      "option-one": "GPT-3.5-turbo",
      "option-two": "GPT-3.5-turbo-16k",
      "option-three": "GPT-4"
    };
    const initialModel = selectedModel || "option-one";
    const initialModelName = modelNames[initialModel] || "GPT-3.5-turbo";
    updateToolState("selectedModel", initialModel);
    updateToolState("selectedModelName", initialModelName);
    const initialTemperature = selectedTemperature || [50];
    updateToolState("selectedTemperature", initialTemperature);
    const initialTool = selectedTool || "option-one";
    const initialToolName = toolNames[initialTool] || "Default";
    updateToolState("selectedTool", initialTool);
    updateToolState("selectedToolName", initialToolName);
    const initialPersonality = selectedPersonality || "amelia";
    updateToolState("selectedPersonality", initialPersonality);
  }, []);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  // Press enter to submit question
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.key === 'Enter' && event.shiftKey) {
        return;
      }
      event.preventDefault();
      handleQuestion();
    }
  };


  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chatHistory]);


  useEffect(() => {
    // The following code is not necessary for styling but it removes all unnecessary indentations so we'll keep it here for now
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach((block) => {
      // Manipulate styles or classes here, e.g.
      block.classList.add('bg-black');
    });
    const langLabels = document.querySelectorAll('.lang-label');
    langLabels.forEach((label) => {
      // Manipulate styles or classes here, e.g.
      label.classList.add('bg-black');
    }
    );
  }, [selectedTool, githubRepo]);




  const handleQuestion = async (input = userInput) => {
    if (isSending) return;
    const question = userInput.trim();

    if (question === "") return;

    setIsSending(true);
    setUserInput("");
    const newEntry = { user: input, bot: "...", messageID: Date.now().toString() };
    setChatHistory((prevChatHistory) => [...prevChatHistory, newEntry]);

    let apiEndpoint;
    if (selectedTool === "option-two") {
      apiEndpoint = "/api/askGithub";
    } else if (selectedTool === "option-three") {
      apiEndpoint = "/api/askTheWeb";
    } else {
      apiEndpoint = "/api/askQuestion";
    }

    const payload = { question: input, sessionId: sessionId };

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
      if (!sessionId) {
        setSessionId(data.sessionId)
      }
    } catch (error) {
      setChatHistory((prevChatHistory) => {
        const updatedChatHistory = [...prevChatHistory];
        updatedChatHistory[updatedChatHistory.length - 1].bot = "Something went wrong, please try again later.";
        return updatedChatHistory;
      });
    } finally {

      setIsSending(false);
    }
  };


  return (
    // Color user's and bot's bubble  background based on the theme
    <>
      <main className="flex h-screen overflow-y-hidden flex-col items-center justify-between p-8">
        {/* Tool switcher needs to switch cards too */}
        <div className="w-[75dvw] justify-end pb-3 hidden sm:flex">
          <div className="flex space-x-2">
            <ToolBadge />
            <ModeToggle />
            <SettingsDialogue />
          </div>
        </div>
        <div className="text-center">
          <div className="flex flex-col h-screen">
            <div ref={chatBoxRef} className="h-[75dvh] md:w-[75dvw] lg:w-[50dvw] overflow-y-auto p-4 border rounded">
              {chatHistory.map((entry, index) => (
                <div key={entry.messageId} className="mb-2 p-2 space-y-4">
                  <div className="flex items-center space-x-4 w-max max-w-[100%] flex-col gap-2 rounded-lg px-3 py-2 ml-auto">
                    <span className='flex w-[100%] justify-end'>
                      <span className='relative flex h-10 w-10 bg-muted-foreground shrink-0 overflow-hidden rounded-full justify-center items-center'>U</span> </span>
                    <span className="font-bold text-left flex w-[100%] flex-col gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-xl"><span className="font-normal">{entry.user}</span></span>
                  </div>
                  <div className="items-center space-x-4 space-y-3 w-max max-w-[100%] gap-2 px-3 py-2">
                    <span className='flex w-[100%] justify-start'>
                      <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full justify-center items-center bg-primary-foreground'>B</span>
                    </span>
                    <div className="font-bold text-left flex w-max max-w-[100%] flex-col gap-2 px-3 py-2 text-sm bg-muted rounded-xl">
                      <span className="font-normal">
                        {parseTextForCode(entry.bot)}
                      </span>
                    </div>
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
                ref={textAreaRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isSending ? "Thinking..." : "Ask me anything..."}
                className="flex-grow p-2 py-3 pt-6 border-0 rounded resize-none text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                rows="1"
              />
              <Button onClick={() => handleQuestion()} disabled={isSending}>
                Send
              </Button>
            </div>
          </div>

        </div>
      </main >
    </>
  );
}
