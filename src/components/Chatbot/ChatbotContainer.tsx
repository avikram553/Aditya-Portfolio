import React, { useState } from 'react';
import { ChatButton } from './ChatButton';
import ChatWindowLlama from './ChatWindowLlama';

export const ChatbotContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <ChatWindowLlama isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
