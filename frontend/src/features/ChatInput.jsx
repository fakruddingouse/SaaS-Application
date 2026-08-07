import React, { useState, useRef, useEffect } from 'react';

const ChatInput = () => {
  const [prompt, setPrompt] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';

    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]); 

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={1}
          placeholder="Ask Anything..."
          className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none resize-none max-h-[200px] overflow-y-auto leading-relaxed pr-10"
        />
        <button 
          className="absolute right-3 bottom-3 p-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full hover:opacity-80 transition-opacity"
          aria-label="Send message"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M3.4 22a1 1 0 0 1-1-1.1l1-7.9a1 1 0 0 1 .8-.9L14 12 4.2 9.9a1 1 0 0 1-.8-.9l-1-7.9A1 1 0 0 1 3.8.3l18 10a1 1 0 0 1 0 1.7l-18 10a1 1 0 0 1-.4.1z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatInput