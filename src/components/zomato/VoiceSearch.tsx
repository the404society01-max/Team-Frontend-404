import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onResult: (text: string) => void;
}

const VoiceSearch = ({ onResult }: Props) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      setTranscript(text);
      if (e.results[0].isFinal) {
        onResult(text);
        setListening(false);
        toast({ title: "🎤 Voice search", description: `Searching for "${text}"` });
      }
    };

    recognition.onerror = () => {
      setListening(false);
      toast({ title: "Voice error", description: "Could not recognize speech", variant: "destructive" });
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, [onResult, toast]);

  const toggle = () => {
    if (!supported) {
      toast({ title: "Not supported", description: "Voice search isn't available in this browser", variant: "destructive" });
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setListening(true);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={toggle}
        className={`p-2 rounded-lg transition-colors ${listening ? "bg-primary text-primary-foreground animate-pulse" : "hover:bg-secondary text-muted-foreground"}`}
        aria-label={listening ? "Stop voice search" : "Start voice search"}
        title="Voice search"
      >
        {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </button>

      {listening && (
        <div className="absolute top-full right-0 mt-2 w-64 p-3 bg-card border border-border rounded-xl zomato-shadow animate-fade-in z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-primary">Listening...</span>
            <button onClick={toggle} className="p-1 hover:bg-secondary rounded"><X className="h-3 w-3" /></button>
          </div>
          {/* Waveform */}
          <div className="flex items-end gap-0.5 h-8 mb-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
          <p className="text-sm text-foreground min-h-[20px]">{transcript || "Say something..."}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;
