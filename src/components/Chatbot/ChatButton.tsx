import { MessageCircle } from "lucide-react";
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
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 z-50 transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};
