import { MessageCircle, Bot } from "lucide-react";
import { Button } from "../ui/button";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatButton = ({ onClick, isOpen }: ChatButtonProps) => {
  if (isOpen) return null;

  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-6 right-6 px-6 py-3 h-auto rounded-full shadow-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 z-50 transition-all duration-300 hover:scale-105"
    >
      <div className="flex flex-col items-center gap-1">
        <Bot className="h-6 w-6 text-white" />
        <span className="text-white font-bold text-sm tracking-tight whitespace-nowrap">Ask ADI</span>
      </div>
    </Button>
  );
};
