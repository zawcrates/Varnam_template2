import React from 'react';

interface InvitationMessageProps {
  message: string;
  fontSize: string;
  lineHeight: string;
}

export function InvitationMessage({ message, fontSize, lineHeight }: InvitationMessageProps) {
  // Let's format the message into beautiful lines for the ultimate cinematic layout
  // if it matches the standard template.
  const lowercaseMsg = message.toLowerCase();
  
  let formattedLines: string[] = [];
  if (lowercaseMsg.includes("cordially invite you") && lowercaseMsg.includes("to join the occasion") && lowercaseMsg.includes("of") && lowercaseMsg.includes("wedding festivities")) {
    formattedLines = [
      "cordially invite you and your family to join the occasion",
      "of",
      "their joyous wedding festivities"
    ];
  } else {
    // Fallback split for custom messages to retain visual balance
    formattedLines = message.split('\n');
  }

  return (
    <div className="flex flex-col items-center justify-center text-center select-none max-w-[85vw] md:max-w-2xl mx-auto">
      <p
        className="font-serif text-[#E9C97D]/90 italic font-light tracking-wide"
        style={{
          fontSize,
          lineHeight,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 12px rgba(233, 201, 125, 0.35), 0 0 25px rgba(233, 201, 125, 0.18)',
        }}
      >
        {formattedLines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
