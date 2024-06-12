// src/components/QuoteCard.js
'use client'
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

const QuoteCard = ({ quote }: {quote: any}) => {
  return (
    <Card className="max-w-[340px] m-4 shadow-lg">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{quote.author}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{quote.userid}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-2 text-small text-default-400">
        <p>{quote.content}</p>
        <span className="pt-2 text-default-500">#{quote.category}</span>
      </CardBody>
      <CardFooter className="flex justify-between gap-3">
        <Button color="primary" size="sm">
          Like
        </Button>
        <span className="text-default-400 text-small">{quote.likes.length} Likes</span>
      </CardFooter>
    </Card>
  );
}

export default QuoteCard;
