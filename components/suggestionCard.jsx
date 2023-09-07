"use client"
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from 'axios';  // or use any other method to make API calls


// DynamicSuggestionCards component
const DynamicSuggestionCards = ({ handleQuestion }) => {
  const cardInfo = [
    {
      title: "How was this built?",
      description: 'Learn more about how this application was built.',
      hideOnSmall: true  // This will hide the first card on small screens
    },
    {
      title: 'Who is M?',
      description: 'Learn more about the creator of this application.',
      hideOnSmall: false  // This will show the second card on small screens
    }
  ];

  const cardClickHandler = (card) => {
    handleQuestion(card.title);
  };

  return (
    <div className="flex h-[100%] items-end overflow-hidden">
      <div className="flex w-[100%] h-[150px] justify-evenly">
        {cardInfo.map((card, index) => (
          <Card key={index} className={`${card.hideOnSmall ? 'hidden md:flex' : ''} w-[300px] hover:shadow-lg transition duration-200 h-15 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer`} onClick={() => cardClickHandler(card)}>
            <CardHeader>
              <CardTitle className="text-left">{card.title}</CardTitle>
              <CardDescription className="text-left">{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DynamicSuggestionCards

