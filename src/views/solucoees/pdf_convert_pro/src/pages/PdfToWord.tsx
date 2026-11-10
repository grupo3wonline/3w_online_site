import { useState, useCallback } from 'react';
import { FileText, Download, RotateCcw, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { extractFullText } from '../lib/pdfExtractor';
import { generateWordFromText, downloadBlob } from '../lib/wordGenerator';

type Stage = 'idle' | 'processing' | 'success' | 'error';

interface StatusStep {
  label: string;
  threshold: number;
}

const STEPS: StatusStep[] = [
  { label: 'Lendo o arquivo PDF...', threshold: 0 },
  { label: 'Extraindo texto e estrutura...', threshold: 25 },
  { label: 'Gerando documento Word...', threshold: 60 },
  { label: 'Aplicando formatação...', threshold: 85 },
  { label: 'Finalizando...', threshold: 96 },
];

interface PdfToWordProps {
  onBack: () => void;
}

export function PdfToWord({ onBack }: PdfToWordProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [wordBlob, setWordBlob] = useState<Blob | null>(null);
  const [outputName, setOutputName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const statusLabel = STEPS.filter(s => s.threshold <= progress).at(-1)?.label ?? '';

  const handleFiles = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;

    if (f.size > 50 * 1024 * 1024) {
      setErrorMsg('O arquivo excede o limite de 50 MB.');
      setStage('error');
      return;
    }

    setFile(f);
    setStage('processing');
    setProgress(0);
    setErrorMsg('');

    const tick = (val: number) => setProgress(val);

    try {
      tick(5);
      const text = await extractFullText(f);
      tick(55);

      const blob = await generateWordFromText(text, f.name);
      tick(95);

      await new Promise(r => setTimeout(r, 300));
      tick(100);

      setWordBlob(blob);
      setOutputName(f.name.replace(/\.pdf$/i, '.docx'));
      setStage('success');
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Erro desconhecido durante a conversão.');
      setStage('error');
    }
  }, []);

  function handleDownload() {
    if (wordBlob && outputName) downloadBlob(wordBlob, outputName);
  }

  function reset() {
    setStage('idle');
    setProgress(0);
    setFile(null);
    setWordBlob(null);
    setOutputName('');
    setErrorMsg('');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 w-full">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao início
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PDF para Word</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Selecione um PDF para convertê-lo em um arquivo Word (.docx) editável.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-10 shadow-sm">

        {/* IDLE */}
        {stage === 'idle' && (
          <DropZone
            accentColor="blue"
            onFiles={handleFiles}
            label="Arraste e solte o PDF aqui"
            sublabel="Tamanho máximo: 50 MB"
          />
        )}

        {/* PROCESSING */}
        {stage === 'processing' && (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-200 dark:text-gray-700" />
                <circle
                  cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  className="text-blue-500 transition-all duration-300"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-200">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="text-center">
              <p className="font-semibold text-gray-800 dark:text-gray-100">{statusLabel}</p>
              {file && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate max-w-xs">
                  {file.name}
                </p>
              )}
            </div>

            <div className="w-full max-w-sm bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {stage === 'success' && (
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Conversao Concluida!</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">{outputName}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Download className="w-4 h-4" /> Baixar Word
              </button>
              <button
                onClick={reset}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Outro PDF
              </button>
            </div>
          </div>
        )}

        {/* ERROR */}
        {stage === 'error' && (
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Erro na Conversao</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm max-w-sm">{errorMsg}</p>
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Tentar Novamente
            </button>
          </div>
        )}
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { label: 'Formato de saida', value: '.docx (Word 2007+)' },
          { label: 'Tamanho maximo', value: '50 MB por arquivo' },
          { label: 'Privacidade', value: '100% local, sem upload' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
