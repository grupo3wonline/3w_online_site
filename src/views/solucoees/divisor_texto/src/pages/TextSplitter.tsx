import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { HelpButton } from "@/components/HelpButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCopy, 
  faDownload, 
  faTrash, 
  faPlay,
  faStop,
  faVolumeUp,
  faInfoCircle,
  faSpinner,
  faMicrophone,
  faMars,
  faVenus,
  faFileAudio,
  faEdit,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from "@/lib/sweetalert";

interface TextBlock {
  id: number;
  content: string;
  wordCount: number;
  charCount: number;
  sentenceCount: number;
}

interface GeminiVoice {
  id: string;
  name: string;
  gender: "male" | "female";
  language: string;
}

type AudioFormat = "mp3" | "wav";
type GenderFilter = "all" | "male" | "female";

// Gemini TTS voices with gender info
const GEMINI_VOICES: GeminiVoice[] = [
  { id: "Puck", name: "Puck", gender: "male", language: "Multi" },
  { id: "Charon", name: "Charon", gender: "male", language: "Multi" },
  { id: "Kore", name: "Kore", gender: "female", language: "Multi" },
  { id: "Fenrir", name: "Fenrir", gender: "male", language: "Multi" },
  { id: "Aoede", name: "Aoede", gender: "female", language: "Multi" },
  { id: "Leda", name: "Leda", gender: "female", language: "Multi" },
  { id: "Orus", name: "Orus", gender: "male", language: "Multi" },
  { id: "Zephyr", name: "Zephyr", gender: "male", language: "Multi" },
];

const MAX_CHARS_PER_BLOCK = 4500;
const MAX_WORDS_PER_BLOCK = 900;

const GEMINI_API_KEY = "AIzaSyCMIHqtX1NMFxTNaUNwKrCC12YlAOmg89I";
const GEMINI_TTS_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`;

const TextSplitter = () => {
  const [inputText, setInputText] = useState("");
  const [blockSize, setBlockSize] = useState(900);
  const [blocks, setBlocks] = useState<TextBlock[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingBlockId, setSpeakingBlockId] = useState<number | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [generatingBlockId, setGeneratingBlockId] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<string>("Kore");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");
  const [audioFormat, setAudioFormat] = useState<AudioFormat>("mp3");
  const [previewingVoice, setPreviewingVoice] = useState<string | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  
  // SRT Configuration States
  const [showSrtConfig, setShowSrtConfig] = useState(false);
  const [srtDuration, setSrtDuration] = useState(30);
  const [srtInterval, setSrtInterval] = useState(0);
  const [srtFileName, setSrtFileName] = useState("legendas");
  
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter voices by gender
  const filteredVoices = useMemo(() => {
    if (genderFilter === "all") return GEMINI_VOICES;
    return GEMINI_VOICES.filter(v => v.gender === genderFilter);
  }, [genderFilter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Text statistics calculation
  const getTextStats = useCallback((text: string) => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    return { chars, words, sentences };
  }, []);

  const inputStats = useMemo(() => getTextStats(inputText), [inputText, getTextStats]);
  
  const totalBlockStats = useMemo(() => blocks.reduce((acc, block) => ({
    chars: acc.chars + block.charCount,
    words: acc.words + block.wordCount,
    sentences: acc.sentences + block.sentenceCount
  }), { chars: 0, words: 0, sentences: 0 }), [blocks]);

  // Preview voice with short sample
  const previewVoice = useCallback(async (voiceId: string) => {
    if (previewingVoice === voiceId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPreviewingVoice(null);
      return;
    }

    setPreviewingVoice(voiceId);
    
    try {
      const response = await fetch(`${GEMINI_TTS_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Olá, esta é uma prévia da minha voz." }] }],
          generationConfig: {
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceId } }
            },
            responseModalities: ["AUDIO"]
          }
        })
      });

      if (!response.ok) throw new Error('Erro ao gerar preview');

      const data = await response.json();
      const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (audioData) {
        const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
        audioRef.current = audio;
        audio.onended = () => setPreviewingVoice(null);
        audio.onerror = () => setPreviewingVoice(null);
        await audio.play();
      }
    } catch {
      showErrorAlert("Erro", "Não foi possível reproduzir a prévia.");
    } finally {
      setPreviewingVoice(null);
    }
  }, [previewingVoice]);

  // Web Speech API for real-time preview
  const speakText = useCallback((text: string, blockId?: number) => {
    if (!('speechSynthesis' in window)) {
      showErrorAlert("Não suportado", "Seu navegador não suporta síntese de voz.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingBlockId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.lang = 'pt-BR';

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingBlockId(blockId ?? null);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingBlockId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingBlockId(null);
      showErrorAlert("Erro", "Não foi possível reproduzir o áudio.");
    };

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, speechRate]);

  const speakAllBlocks = useCallback(() => {
    if (blocks.length === 0) {
      showErrorAlert("Ops!", "Não há blocos para reproduzir.");
      return;
    }
    const allText = blocks.map(b => b.content).join('\n\n');
    speakText(allText, -1);
  }, [blocks, speakText]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingBlockId(null);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  // Split text respecting sentence boundaries
  const splitTextIntoChunks = useCallback((text: string): string[] => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks: string[] = [];
    let currentChunk = "";
    let currentWords = 0;

    for (const sentence of sentences) {
      const sentenceWords = sentence.trim().split(/\s+/).length;
      const sentenceChars = sentence.length;

      if ((currentChunk.length + sentenceChars > MAX_CHARS_PER_BLOCK || 
           currentWords + sentenceWords > MAX_WORDS_PER_BLOCK) && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
        currentWords = sentenceWords;
      } else {
        currentChunk += sentence;
        currentWords += sentenceWords;
      }
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }, []);

  // Generate and download audio using Gemini API
  const generateAndDownloadAudio = useCallback(async (
    text: string, 
    blockId: number | null, 
    filename: string
  ) => {
    setIsGeneratingAudio(true);
    setGeneratingBlockId(blockId);

    try {
      // Split text if too large
      const chunks = splitTextIntoChunks(text);
      const audioBlobs: Blob[] = [];

      for (const chunk of chunks) {
        const response = await fetch(`${GEMINI_TTS_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: chunk }] }],
            generationConfig: {
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } }
              },
              responseModalities: ["AUDIO"]
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Erro ao gerar áudio');
        }

        const data = await response.json();
        const audioData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (!audioData) throw new Error('Nenhum áudio retornado pela API');

        const binaryString = atob(audioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        audioBlobs.push(new Blob([bytes], { type: 'audio/mp3' }));
      }

      // Merge audio blobs
      const mergedBlob = new Blob(audioBlobs, { type: audioFormat === 'wav' ? 'audio/wav' : 'audio/mp3' });
      
      // Download file
      const url = URL.createObjectURL(mergedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.${audioFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showSuccessAlert("Áudio Gerado!", "Download do áudio iniciado com sucesso.");
    } catch (error) {
      console.error('Erro ao gerar áudio:', error);
      showErrorAlert("Erro", error instanceof Error ? error.message : "Não foi possível gerar o áudio.");
    } finally {
      setIsGeneratingAudio(false);
      setGeneratingBlockId(null);
    }
  }, [selectedVoice, audioFormat, splitTextIntoChunks]);

  const downloadBlockAudio = useCallback((block: TextBlock) => {
    generateAndDownloadAudio(block.content, block.id, `bloco-${block.id}`);
  }, [generateAndDownloadAudio]);

  const downloadAllAudio = useCallback(() => {
    if (blocks.length === 0) {
      showErrorAlert("Ops!", "Não há blocos para gerar áudio.");
      return;
    }
    const allText = blocks.map(b => b.content).join('\n\n');
    generateAndDownloadAudio(allText, -1, 'texto-completo');
  }, [blocks, generateAndDownloadAudio]);

  // Split text into blocks
  const splitTextIntoBlocks = useCallback((text: string, maxWords: number): TextBlock[] => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const resultBlocks: TextBlock[] = [];
    let currentBlock = "";
    let currentWordCount = 0;
    let currentCharCount = 0;
    let blockId = 1;

    for (const sentence of sentences) {
      const sentenceWords = sentence.trim().split(/\s+/).length;
      const sentenceChars = sentence.length;

      const wouldExceedWords = currentWordCount + sentenceWords > Math.min(maxWords, MAX_WORDS_PER_BLOCK);
      const wouldExceedChars = currentCharCount + sentenceChars > MAX_CHARS_PER_BLOCK;

      if ((wouldExceedWords || wouldExceedChars) && currentBlock.trim()) {
        const stats = getTextStats(currentBlock.trim());
        resultBlocks.push({
          id: blockId++,
          content: currentBlock.trim(),
          wordCount: stats.words,
          charCount: stats.chars,
          sentenceCount: stats.sentences
        });
        currentBlock = sentence;
        currentWordCount = sentenceWords;
        currentCharCount = sentenceChars;
      } else {
        currentBlock += sentence;
        currentWordCount += sentenceWords;
        currentCharCount += sentenceChars;
      }
    }

    if (currentBlock.trim()) {
      const stats = getTextStats(currentBlock.trim());
      resultBlocks.push({
        id: blockId,
        content: currentBlock.trim(),
        wordCount: stats.words,
        charCount: stats.chars,
        sentenceCount: stats.sentences
      });
    }

    return resultBlocks;
  }, [getTextStats]);

  const handleConvert = useCallback(() => {
    if (!inputText.trim()) {
      showErrorAlert("Ops!", "Por favor, insira um texto para dividir.");
      return;
    }

    if (blockSize < 10) {
      showErrorAlert("Tamanho inválido", "O tamanho mínimo do bloco é 10 palavras.");
      return;
    }

    setIsProcessing(true);
    
    requestAnimationFrame(() => {
      const newBlocks = splitTextIntoBlocks(inputText, blockSize);
      setBlocks(newBlocks);
      setIsProcessing(false);
      
      showSuccessAlert(
        "Sucesso!", 
        `Texto dividido em ${newBlocks.length} bloco${newBlocks.length !== 1 ? 's' : ''}.`
      );
    });
  }, [inputText, blockSize, splitTextIntoBlocks]);

  const handleClear = useCallback(async () => {
    const result = await showConfirmAlert(
      "Limpar tudo?",
      "Isso removerá o texto de entrada e todos os blocos gerados."
    );
    
    if (result.isConfirmed) {
      setInputText("");
      setBlocks([]);
      toast({
        title: "Limpo!",
        description: "Texto e blocos foram removidos.",
        variant: "default"
      });
    }
  }, [toast]);

  const copyToClipboard = useCallback(async (content: string, blockId: number) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copiado!",
        description: `Bloco ${blockId} copiado para a área de transferência.`,
        variant: "default"
      });
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Inline editing functions
  const startEditing = useCallback((block: TextBlock) => {
    setEditingBlockId(block.id);
    setEditingContent(block.content);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingBlockId(null);
    setEditingContent("");
  }, []);

  const saveEditing = useCallback(() => {
    if (editingBlockId === null) return;
    
    const stats = getTextStats(editingContent);
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === editingBlockId 
          ? { 
              ...block, 
              content: editingContent,
              wordCount: stats.words,
              charCount: stats.chars,
              sentenceCount: stats.sentences
            }
          : block
      )
    );
    
    setEditingBlockId(null);
    setEditingContent("");
    
    toast({
      title: "Salvo!",
      description: "Bloco atualizado com sucesso.",
      variant: "default"
    });
  }, [editingBlockId, editingContent, getTextStats, toast]);

  // Smart text splitting for SRT (max 500 chars, preserve punctuation)
  const splitTextForSRT = useCallback((text: string, maxChars: number = 500): string[] => {
    const chunks: string[] = [];
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let currentChunk = "";

    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      
      if ((currentChunk.length + trimmedSentence.length + 1) <= maxChars) {
        currentChunk = currentChunk ? `${currentChunk} ${trimmedSentence}` : trimmedSentence;
      } else {
        if (currentChunk) chunks.push(currentChunk.trim());
        
        // If sentence is larger than maxChars, split by comma/semicolon
        if (trimmedSentence.length > maxChars) {
          const subParts = trimmedSentence.match(/[^,;:]+[,;:]?/g) || [trimmedSentence];
          let subChunk = "";
          
          for (const part of subParts) {
            const trimmedPart = part.trim();
            if ((subChunk.length + trimmedPart.length + 1) <= maxChars) {
              subChunk = subChunk ? `${subChunk} ${trimmedPart}` : trimmedPart;
            } else {
              if (subChunk) chunks.push(subChunk.trim());
              // If still too large, force split by words
              if (trimmedPart.length > maxChars) {
                const words = trimmedPart.split(/\s+/);
                let wordChunk = "";
                for (const word of words) {
                  if ((wordChunk.length + word.length + 1) <= maxChars) {
                    wordChunk = wordChunk ? `${wordChunk} ${word}` : word;
                  } else {
                    if (wordChunk) chunks.push(wordChunk.trim());
                    wordChunk = word;
                  }
                }
                if (wordChunk) subChunk = wordChunk;
              } else {
                subChunk = trimmedPart;
              }
            }
          }
          currentChunk = subChunk;
        } else {
          currentChunk = trimmedSentence;
        }
      }
    }
    
    if (currentChunk.trim()) chunks.push(currentChunk.trim());
    return chunks;
  }, []);

  // Format time for SRT (HH:MM:SS,mmm)
  const formatSRTTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.round((seconds % 1) * 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  }, []);

  // Calculate SRT preview stats
  const srtPreviewStats = useMemo(() => {
    const textToProcess = blocks.length > 0 
      ? blocks.map(b => b.content).join(" ") 
      : inputText;
    
    if (!textToProcess.trim()) return { blocks: 0, duration: "0:00" };
    
    const srtBlocks = splitTextForSRT(textToProcess, 500);
    const totalSeconds = srtBlocks.length * srtDuration + (srtBlocks.length - 1) * srtInterval;
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    
    return {
      blocks: srtBlocks.length,
      duration: `${minutes}:${String(secs).padStart(2, '0')}`
    };
  }, [blocks, inputText, srtDuration, srtInterval, splitTextForSRT]);

  const openSrtConfig = useCallback(() => {
    const textToProcess = blocks.length > 0 
      ? blocks.map(b => b.content).join(" ") 
      : inputText;
    
    if (!textToProcess.trim()) {
      showErrorAlert("Ops!", "Não há texto para gerar SRT. Cole um texto ou divida em blocos primeiro.");
      return;
    }
    setShowSrtConfig(true);
  }, [blocks, inputText]);

  const generateSRT = useCallback(() => {
    const textToProcess = blocks.length > 0 
      ? blocks.map(b => b.content).join(" ") 
      : inputText;

    if (!textToProcess.trim()) {
      showErrorAlert("Ops!", "Não há texto para gerar SRT.");
      return;
    }

    // Split into chunks of up to 500 characters preserving punctuation
    const srtBlocks = splitTextForSRT(textToProcess, 500);
    
    let srtContent = "";
    let currentTime = 0;

    srtBlocks.forEach((block, index) => {
      const startTime = currentTime;
      const endTime = currentTime + srtDuration;
      
      srtContent += `${index + 1}\n`;
      srtContent += `${formatSRTTime(startTime)} --> ${formatSRTTime(endTime)}\n`;
      srtContent += `${block}\n\n`;
      
      currentTime = endTime + srtInterval;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${srtFileName || 'legendas'}.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowSrtConfig(false);
    showSuccessAlert("SRT Gerado!", `Arquivo "${srtFileName || 'legendas'}.srt" baixado com sucesso. ${srtBlocks.length} legendas criadas.`);
  }, [blocks, inputText, srtDuration, srtInterval, srtFileName, splitTextForSRT, formatSRTTime]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-hero" aria-hidden="true"></div>
            <span className="font-bold text-xl">Divisor de Texto</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container py-8 max-w-6xl">
        {/* Input Section */}
        <Card className="mb-8 shadow-medium">
          <CardContent className="p-6">
            <div className="grid gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="input-text" className="text-lg font-semibold">
                    Cole seu texto aqui
                  </Label>
                  <div className="text-xs text-muted-foreground">
                    {inputStats.chars} caracteres · {inputStats.words} palavras · {inputStats.sentences} sentenças
                  </div>
                </div>
                <Textarea
                  id="input-text"
                  placeholder="Cole aqui o texto que deseja dividir em blocos..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] text-base"
                  aria-describedby="text-stats"
                />
              </div>
              
              {/* Voice and Audio Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                {/* Gender Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={genderFilter === "female" ? faVenus : faMars} className="text-primary text-sm" />
                    <Label className="text-sm font-medium">Filtrar por Gênero</Label>
                  </div>
                  <Select value={genderFilter} onValueChange={(v) => setGenderFilter(v as GenderFilter)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Voice Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faMicrophone} className="text-primary text-sm" />
                    <Label className="text-sm font-medium">Voz</Label>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecione uma voz" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredVoices.map((voice) => (
                          <SelectItem key={voice.id} value={voice.id}>
                            {voice.name} ({voice.gender === "male" ? "M" : "F"})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => previewVoice(selectedVoice)}
                          disabled={previewingVoice !== null}
                          aria-label="Prévia da voz"
                        >
                          {previewingVoice === selectedVoice ? (
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                          ) : (
                            <FontAwesomeIcon icon={faPlay} />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ouvir prévia da voz</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                
                {/* Speed Control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Velocidade: {speechRate.toFixed(1)}x</Label>
                  </div>
                  <Slider
                    value={[speechRate]}
                    onValueChange={(value) => setSpeechRate(value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                    aria-label="Velocidade de reprodução"
                  />
                </div>

                {/* Audio Format Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faFileAudio} className="text-primary text-sm" />
                    <Label className="text-sm font-medium">Formato</Label>
                  </div>
                  <Select value={audioFormat} onValueChange={(v) => setAudioFormat(v as AudioFormat)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="wav">WAV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Label htmlFor="block-size" className="text-base font-medium">
                      Palavras por bloco (máx. {MAX_WORDS_PER_BLOCK})
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                          <FontAwesomeIcon icon={faInfoCircle} className="text-sm" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Define quantas palavras cada bloco terá. Máximo de {MAX_CHARS_PER_BLOCK} caracteres e {MAX_WORDS_PER_BLOCK} palavras por bloco. Sentenças nunca serão quebradas no meio.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="block-size"
                    type="number"
                    min="10"
                    max={MAX_WORDS_PER_BLOCK}
                    value={blockSize}
                    onChange={(e) => setBlockSize(Math.min(MAX_WORDS_PER_BLOCK, Math.max(10, parseInt(e.target.value) || 10)))}
                    className="text-base"
                  />
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleConvert}
                        disabled={isProcessing}
                        variant="default"
                        size="lg"
                        className="min-w-[120px] gap-2"
                      >
                        <FontAwesomeIcon icon={faPlay} />
                        {isProcessing ? "Processando..." : "Dividir"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Divide o texto em blocos organizados</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={openSrtConfig}
                        variant="secondary"
                        size="lg"
                        className="gap-2"
                      >
                        <FontAwesomeIcon icon={faClosedCaptioning} />
                        Gerar SRT
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Configura e gera arquivo de legendas .srt</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={downloadAllAudio}
                        disabled={blocks.length === 0 || isGeneratingAudio}
                        variant="secondary"
                        size="lg"
                        className="gap-2"
                      >
                        {isGeneratingAudio && generatingBlockId === -1 ? (
                          <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        ) : (
                          <FontAwesomeIcon icon={faDownload} />
                        )}
                        Baixar Áudio
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Gera e baixa áudio {audioFormat.toUpperCase()} de todos os blocos</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={isSpeaking && speakingBlockId === -1 ? stopSpeaking : speakAllBlocks}
                        disabled={blocks.length === 0}
                        variant={isSpeaking && speakingBlockId === -1 ? "destructive" : "secondary"}
                        size="lg"
                        className="gap-2"
                      >
                        <FontAwesomeIcon icon={isSpeaking && speakingBlockId === -1 ? faStop : faVolumeUp} />
                        {isSpeaking && speakingBlockId === -1 ? "Parar" : "Ouvir Tudo"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isSpeaking && speakingBlockId === -1 ? "Para a reprodução de áudio" : "Reproduz todos os blocos em áudio"}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleClear}
                        variant="outline"
                        size="lg"
                        className="gap-2"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span className="hidden sm:inline">Limpar</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove todo o texto e blocos</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {blocks.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Blocos Gerados</h2>
              <div className="flex flex-col items-end gap-1">
                <div className="text-sm text-muted-foreground">
                  {blocks.length} bloco{blocks.length !== 1 ? 's' : ''} criado{blocks.length !== 1 ? 's' : ''}
                </div>
                <div className="text-xs text-muted-foreground">
                  {totalBlockStats.chars} caracteres · {totalBlockStats.words} palavras · {totalBlockStats.sentences} sentenças
                </div>
              </div>
            </div>
            
            <div className="grid gap-6">
              {blocks.map((block) => (
                <Card key={block.id} className="shadow-soft hover:shadow-medium transition-smooth">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                          Bloco {block.id}
                        </span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs bg-muted px-2 py-1 rounded cursor-help">
                              {block.charCount} chars
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Caracteres neste bloco</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs bg-muted px-2 py-1 rounded cursor-help">
                              {block.wordCount} palavras
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Palavras neste bloco</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs bg-muted px-2 py-1 rounded cursor-help">
                              {block.sentenceCount} sentenças
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sentenças neste bloco</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        {editingBlockId === block.id ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={saveEditing}
                                  className="gap-2 flex-1 sm:flex-none"
                                >
                                  <FontAwesomeIcon icon={faSave} />
                                  Salvar
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Salvar alterações</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={cancelEditing}
                                  className="gap-2 flex-1 sm:flex-none"
                                >
                                  <FontAwesomeIcon icon={faTimes} />
                                  Cancelar
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Cancelar edição</p>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => startEditing(block)}
                                  className="gap-2 flex-1 sm:flex-none"
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                  Editar
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Editar conteúdo do bloco</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={isSpeaking && speakingBlockId === block.id ? "destructive" : "outline"}
                                  size="sm"
                                  onClick={() => isSpeaking && speakingBlockId === block.id ? stopSpeaking() : speakText(block.content, block.id)}
                                  className="gap-2 flex-1 sm:flex-none"
                                >
                                  <FontAwesomeIcon icon={isSpeaking && speakingBlockId === block.id ? faStop : faVolumeUp} />
                                  {isSpeaking && speakingBlockId === block.id ? "Parar" : "Ouvir"}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{isSpeaking && speakingBlockId === block.id ? "Para a reprodução" : "Reproduz este bloco em áudio"}</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadBlockAudio(block)}
                                  disabled={isGeneratingAudio}
                                  className="gap-2 flex-1 sm:flex-none"
                                >
                                  {isGeneratingAudio && generatingBlockId === block.id ? (
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                                  ) : (
                                    <FontAwesomeIcon icon={faDownload} />
                                  )}
                                  {audioFormat.toUpperCase()}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Baixa áudio {audioFormat.toUpperCase()} deste bloco</p>
                              </TooltipContent>
                            </Tooltip>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => copyToClipboard(block.content, block.id)}
                              className="gap-2 flex-1 sm:flex-none"
                            >
                              <FontAwesomeIcon icon={faCopy} />
                              Copiar
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    {editingBlockId === block.id ? (
                      <div className="mt-4">
                        <Textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="min-h-[150px] text-sm sm:text-base leading-relaxed"
                          placeholder="Edite o conteúdo do bloco..."
                        />
                        <div className="mt-2 text-xs text-muted-foreground">
                          {getTextStats(editingContent).chars} caracteres · {getTextStats(editingContent).words} palavras · {getTextStats(editingContent).sentences} sentenças
                        </div>
                      </div>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed font-sans">
                          {block.content}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {blocks.length === 0 && !isProcessing && (
          <Card className="text-center py-12 shadow-soft">
            <CardContent>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Nenhum bloco gerado ainda</h3>
              <p className="text-muted-foreground mb-4">
                Cole um texto acima e clique em "Converter" para começar
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Help Button */}
      <HelpButton />

      {/* SRT Configuration Dialog */}
      <Dialog open={showSrtConfig} onOpenChange={setShowSrtConfig}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClosedCaptioning} className="text-primary" />
              Configurar SRT
            </DialogTitle>
            <DialogDescription>
              Configure as opções de geração do arquivo de legendas
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            {/* File Name */}
            <div className="space-y-2">
              <Label htmlFor="srt-filename" className="text-sm font-medium">
                Nome do arquivo
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="srt-filename"
                  value={srtFileName}
                  onChange={(e) => setSrtFileName(e.target.value)}
                  placeholder="legendas"
                  className="flex-1"
                />
                <span className="text-muted-foreground">.srt</span>
              </div>
            </div>

            {/* Duration per block */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Duração por legenda
                </Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {srtDuration}s
                </span>
              </div>
              <Slider
                value={[srtDuration]}
                onValueChange={([v]) => setSrtDuration(v)}
                min={1}
                max={60}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1s</span>
                <span>60s</span>
              </div>
            </div>

            {/* Interval between subtitles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  Intervalo entre legendas
                </Label>
                <span className="text-sm text-muted-foreground font-mono">
                  {srtInterval}s
                </span>
              </div>
              <Slider
                value={[srtInterval]}
                onValueChange={([v]) => setSrtInterval(v)}
                min={0}
                max={30}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0s (sem intervalo)</span>
                <span>30s</span>
              </div>
            </div>

            {/* Preview Stats */}
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <h4 className="text-sm font-medium">Prévia</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Legendas:</span>
                  <span className="ml-2 font-medium">{srtPreviewStats.blocks}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Duração total:</span>
                  <span className="ml-2 font-medium">{srtPreviewStats.duration}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Máx. 500 caracteres por legenda · Preserva pontuação
              </p>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowSrtConfig(false)}>
              Cancelar
            </Button>
            <Button onClick={generateSRT} className="gap-2">
              <FontAwesomeIcon icon={faDownload} />
              Gerar SRT
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextSplitter;
