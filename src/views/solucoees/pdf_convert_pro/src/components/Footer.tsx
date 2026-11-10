import { Code2, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span>Processamento 100% local — nenhum arquivo é enviado a servidores externos.</span>
        </div>
        <p className="text-xs text-gray-500 text-center max-w-xl">
          Em conformidade com a Lei Geral de Proteção de Dados (LGPD). Seus arquivos são processados
          inteiramente no seu navegador e nunca saem do seu dispositivo.
        </p>
        <div className="pt-4 border-t border-gray-800 w-full flex justify-center">
          <span className="bg-gray-800 px-4 py-2 rounded-full text-xs font-mono text-gray-300 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-red-500" />
            Sistema desenvolvido pelo desenvolvedor HOTWYL | WILLFROMBRASIL
          </span>
        </div>
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} PDFConvert Pro. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
