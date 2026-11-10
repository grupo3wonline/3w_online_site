import { useState, useCallback } from 'react';
import { FileSpreadsheet, Trash2, Download, RotateCcw, CheckCircle, AlertCircle, ArrowLeft, Info, X } from 'lucide-react';
import { DropZone } from '../components/DropZone';
import { extractPdfText } from '../lib/pdfExtractor';
import { parseRows, buildExcelWorkbook, downloadExcel } from '../lib/excelGenerator';

interface QueuedFile {
  file: File;
  id: string;
}

interface LogEntry {
  time: string;
  html: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

type Stage = 'idle' | 'processing' | 'done';

interface PdfToExcelProps {
  onBack: () => void;
}

export function PdfToExcel({ onBack }: PdfToExcelProps) {
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [stage, setStage] = useState<Stage>('idle');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [summary, setSummary] = useState({ files: 0, records: 0 });
  const [currentFile, setCurrentFile] = useState('');

  function addLog(html: string, type: LogEntry['type'] = 'info') {
    const time = new Date().toLocaleTimeString('pt-BR');
    setLogs(prev => [...prev, { time, html, type }]);
  }

  const handleFiles = useCallback((files: File[]) => {
    const newItems: QueuedFile[] = files.map(f => ({ file: f, id: crypto.randomUUID() }));
    setQueue(prev => [...prev, ...newItems]);
  }, []);

  function removeFromQueue(id: string) {
    setQueue(prev => prev.filter(q => q.id !== id));
  }

  function clearQueue() {
    setQueue([]);
    setLogs([]);
    setStage('idle');
    setSummary({ files: 0, records: 0 });
    setCurrentFile('');
  }

  async function processFiles() {
    if (!queue.length) return;
    setStage('processing');
    setLogs([]);
    setSummary({ files: 0, records: 0 });

    const sheets: { name: string; rows: ReturnType<typeof parseRows> }[] = [];
    let totalRecords = 0;
    let filesProcessed = 0;

    for (const { file } of queue) {
      setCurrentFile(file.name);
      addLog(`Iniciando: <strong>${file.name}</strong>`);

      try {
        const extracted = await extractPdfText(file);
        addLog(`Texto extraido — ${extracted.pageCount} paginas, aplicando regex...`);

        const rows = parseRows(extracted);

        if (rows.length > 0) {
          sheets.push({ name: file.name, rows });
          totalRecords += rows.length;
          filesProcessed++;
          addLog(`<strong>${rows.length} registros</strong> extraidos de ${file.name}`, 'success');
        } else {
          addLog(`Nenhum padrao VI/VF/PF/PV encontrado em ${file.name}`, 'warn');
        }
      } catch (err) {
        addLog(`Erro ao processar ${file.name}: ${err instanceof Error ? err.message : 'desconhecido'}`, 'error');
      }
    }

    if (sheets.length > 0) {
      addLog(`Gerando planilha Excel com ${totalRecords} registros...`);
      const wb = buildExcelWorkbook(sheets);
      downloadExcel(wb, 'Tabelas_Extraidas.xlsx');
      addLog(`Download iniciado — Tabelas_Extraidas.xlsx`, 'success');
    } else {
      addLog('Nenhum dado estruturado encontrado nos arquivos.', 'warn');
    }

    setSummary({ files: filesProcessed, records: totalRecords });
    setCurrentFile('');
    setStage('done');
  }

  const logColors: Record<LogEntry['type'], string> = {
    info: 'text-gray-300',
    success: 'text-green-400',
    warn: 'text-amber-400',
    error: 'text-red-400',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar ao inicio
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PDF para Excel</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Extrai tabelas estruturadas de relatorios PDF para planilhas .xlsx consolidadas.
        </p>
      </div>

      {/* Info Panel */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800 rounded-2xl p-5 mb-6 flex gap-4">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <p className="font-semibold mb-1">Motor de Extracao Regex (VI/VF/PF/PV)</p>
          <p>Selecione um ou mais PDFs de relatorio. O motor identificara automaticamente registros
          que iniciam com os codigos <strong>VI, VF, PF ou PV</strong> e exportara para Excel com 20 colunas.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">

        {/* Drop Zone */}
        <DropZone
          accentColor="green"
          multiple
          onFiles={handleFiles}
          label="Arraste PDFs ou clique para selecionar"
          sublabel="Suporte a multiplos arquivos simultaneos"
        />

        {/* Queue */}
        {queue.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-green-500" />
                Arquivos na fila ({queue.length})
              </h3>
              <button
                onClick={clearQueue}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Limpar
              </button>
            </div>
            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {queue.map(({ file, id }) => (
                <li
                  key={id}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-7 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center shrink-0">
                      <span className="text-red-600 dark:text-red-400 text-[8px] font-bold">PDF</span>
                    </div>
                    <span className="truncate font-medium text-gray-700 dark:text-gray-200">{file.name}</span>
                    <span className="text-gray-400 text-xs shrink-0">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromQueue(id)}
                    className="ml-3 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          {queue.length > 0 && stage !== 'processing' && (
            <button
              onClick={clearQueue}
              className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
            >
              Limpar fila
            </button>
          )}
          <button
            onClick={processFiles}
            disabled={queue.length === 0 || stage === 'processing'}
            className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-green-500/20"
          >
            {stage === 'processing' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {currentFile ? `Processando...` : 'Aguarde...'}
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Processar e Extrair
              </>
            )}
          </button>
        </div>
      </div>

      {/* Log Terminal */}
      {logs.length > 0 && (
        <div className="mt-6 bg-gray-950 rounded-2xl overflow-hidden border border-gray-800">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="text-xs text-gray-500 ml-2 font-mono">Log de Processamento</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-1 max-h-40 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className={logColors[log.type]}>
                <span className="text-gray-600">[{log.time}]</span>{' '}
                <span dangerouslySetInnerHTML={{ __html: log.html }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {stage === 'done' && (
        <div className={`mt-6 rounded-2xl p-6 border flex items-center gap-4 ${
          summary.records > 0
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
        }`}>
          {summary.records > 0 ? (
            <CheckCircle className="w-8 h-8 text-green-500 shrink-0" />
          ) : (
            <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />
          )}
          <div className="flex-1">
            {summary.records > 0 ? (
              <>
                <p className="font-semibold text-green-800 dark:text-green-300">Extracao concluida!</p>
                <p className="text-sm text-green-700 dark:text-green-400 mt-0.5">
                  {summary.files} arquivo(s) processado(s) — {summary.records} registros exportados para Excel.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-amber-800 dark:text-amber-300">Nenhum dado encontrado</p>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-0.5">
                  O motor nao identificou o padrao VI/VF/PF/PV nos PDFs. Verifique se os arquivos sao relatorios no formato esperado.
                </p>
              </>
            )}
          </div>
          <button
            onClick={clearQueue}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Novo
          </button>
        </div>
      )}
    </div>
  );
}
