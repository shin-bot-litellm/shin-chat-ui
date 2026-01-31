"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Send, Square } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ChatInput({
  onSubmit,
  onStop,
  isLoading,
  disabled,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSubmit(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end rounded-2xl border border-border bg-muted/50 focus-within:border-muted-foreground/50 transition-colors">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Shin..."
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent px-4 py-3 pr-12",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none",
            "max-h-[200px]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
        <div className="absolute right-2 bottom-2">
          {isLoading ? (
            <button
              type="button"
              onClick={onStop}
              className="p-2 rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity"
            >
              <Square className="w-4 h-4" fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim() || disabled}
              className={cn(
                "p-2 rounded-lg transition-all",
                input.trim()
                  ? "bg-foreground text-background hover:opacity-80"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
