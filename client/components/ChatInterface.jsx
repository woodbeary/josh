import { useState } from "react";
import Button from "./Button";
import { MessageSquare, PauseCircle } from "react-feather";

export default function ChatInterface({ messages, isSessionActive, onSendMessage, onEndSession }) {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const renderMessage = (msg) => {
    // Handle different types of messages
    if (msg.type === "conversation.item.create") {
      return msg.item.content[0]?.text;
    } else if (msg.type === "response.create") {
      return msg.response?.instructions;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-4 h-4 rounded-full ${isSessionActive ? 'bg-green-500' : 'bg-gray-300'}`}>
              {isSessionActive && (
                <>
                  <span className="absolute w-full h-full rounded-full bg-green-500 animate-ping opacity-75" />
                  <span className="absolute w-full h-full rounded-full bg-green-500 animate-pulse" />
                </>
              )}
            </div>
          </div>
          <span className="font-medium text-gray-700 flex items-center gap-2">
            {isTyping ? (
              <>
                AI is typing
                <span className="inline-flex gap-1">
                  <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </>
            ) : (
              <span className={isSessionActive ? 'text-green-600' : 'text-gray-500'}>
                {isSessionActive ? 'Session Active' : 'Session Inactive'}
              </span>
            )}
          </span>
        </div>
        <Button
          onClick={onEndSession}
          className="bg-gray-600"
          icon={<PauseCircle height={16} />}
        >
          Pause
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, i) => {
          const content = renderMessage(msg);
          if (!content) return null;
          
          const isUser = msg.type === "conversation.item.create";
          return (
            <div
              key={i}
              className={`mb-4 p-3 rounded-lg ${
                isUser
                  ? "ml-auto bg-blue-100 text-blue-900 max-w-[70%]"
                  : "bg-gray-100 text-gray-900 max-w-[85%]"
              }`}
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Share your thoughts..."
            className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSend}
            className="bg-blue-600"
            icon={<MessageSquare height={16} />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
} 