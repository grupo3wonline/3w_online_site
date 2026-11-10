
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
    setDragActive(false);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    multiple: false,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearFile = () => {
    onFileSelect(null as any);
  };

  if (selectedFile) {
    return (
      <div className="bg-green-50 border-2 border-green-200 border-dashed rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-900">{selectedFile.name}</p>
              <p className="text-sm text-green-600">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFile}
            className="text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
        ${isDragActive || dragActive 
          ? 'border-blue-400 bg-blue-50 scale-105' 
          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDragActive || dragActive ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <Upload className={`w-8 h-8 transition-colors duration-300 ${
            isDragActive || dragActive ? 'text-blue-600' : 'text-gray-500'
          }`} />
        </div>
        
        <div>
          {isDragActive ? (
            <p className="text-lg font-medium text-blue-600">
              Solte o arquivo aqui...
            </p>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Arraste e solte seu arquivo aqui
              </p>
              <p className="text-gray-500">
                ou <span className="text-blue-600 font-medium">clique para selecionar</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Formatos suportados: PDF, DOC, XLS, PPT, JPG, PNG, MP4, MP3 e mais</p>
          <p className="mt-1">Tamanho máximo: 100MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
