"use client";

import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { User, Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function Message({ role, content, isStreaming }: MessageProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isUser = role === "user";

  return (
    <div
      className={cn(
        "px-4 py-6 animate-fade-in",
        isUser ? "bg-transparent" : "bg-muted/30"
      )}
    >
      <div className="max-w-3xl mx-auto flex gap-4">
        {/* Avatar */}
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            isUser
              ? "bg-foreground text-background"
              : "bg-gradient-to-br from-violet-500 to-fuchsia-500"
          )}
        >
          {isUser ? (
            <User className="w-5 h-5" />
          ) : (
            <Sparkles className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm mb-1">
            {isUser ? "You" : "Shin"}
          </div>
          <div className="prose-chat">
            {content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    const isInline = !match && !codeString.includes("\n");

                    if (isInline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }

                    return (
                      <div className="relative group">
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copyToClipboard(codeString)}
                            className="p-1.5 rounded bg-background/80 hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {copiedCode === codeString ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {match ? (
                          <div className="text-xs text-muted-foreground bg-[#282c34] px-4 py-2 rounded-t-lg border-b border-white/10">
                            {match[1]}
                          </div>
                        ) : null}
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match ? match[1] : "text"}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: match ? "0 0 0.5rem 0.5rem" : "0.5rem",
                            fontSize: "0.875rem",
                          }}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            ) : isStreaming ? (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse-subtle" />
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse-subtle [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse-subtle [animation-delay:0.4s]" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
