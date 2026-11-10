import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

interface DropZoneProps {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  sublabel?: string;
  accentColor?: 'red' | 'blue' | 'green';
}

const colors = {
  red: 'hover:border-red-500 group-hover:text-red-500',
  blue: 'hover:border-blue-500 group-hover:text-blue-500',
  green: 'hover:border-green-500 group-hover:text-green-500',
};

const btnColors = {
  red: 'bg-red-500 hover:bg-red-600',
  blue: 'bg-blue-600 hover:bg-blue-700',
  green: 'bg-green-600 hover:bg-green-700',
};

export function DropZone({
  accept = 'application/pdf',
  multiple = false,
  onFiles,
  label = 'Arraste e solte o PDF aqui',
  sublabel = 'ou clique para selecionar o arquivo',
  accentColor = 'blue',
}: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(
      f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );
    if (files.length) onFiles(files);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length) onFiles(files);
    e.target.value = '';
  }

  return (
    <div
      onDragEnter={e => { e.preventDefault(); setDragging(true); }}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={e => { e.preventDefault(); setDragging(false); }}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`group relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200
        ${dragging
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 scale-[1.01]'
          : `border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 ${colors[accentColor]}`
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={handleChange}
      />

      <div className={`p-4 rounded-full bg-white dark:bg-gray-800 shadow-md transition-transform duration-200 ${dragging ? 'scale-110' : 'group-hover:scale-105'}`}>
        <UploadCloud className={`w-10 h-10 text-gray-400 transition-colors duration-200 ${colors[accentColor]}`} />
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sublabel}</p>
      </div>

      <span className={`${btnColors[accentColor]} text-white text-sm font-semibold px-6 py-2.5 rounded-lg shadow pointer-events-none transition-colors`}>
        Escolher {multiple ? 'Arquivos' : 'Arquivo'}
      </span>
    </div>
  );
}
