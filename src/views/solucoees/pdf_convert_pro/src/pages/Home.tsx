import { FileText, FileSpreadsheet, Shield, Zap, Lock, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: 'word' | 'excel') => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Lock className="w-3 h-3" /> Processamento 100% no seu navegador
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Converta PDFs para<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Word & Excel</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Ferramentas profissionais de conversão sem necessidade de upload para servidores.
            Alta fidelidade, total conformidade com a LGPD.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('word')}
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/30"
            >
              <FileText className="w-5 h-5" />
              PDF para Word
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('excel')}
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-105 hover:shadow-green-500/30"
            >
              <FileSpreadsheet className="w-5 h-5" />
              PDF para Excel
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="max-w-5xl w-full px-4 py-16 grid md:grid-cols-2 gap-6">
        <button
          onClick={() => onNavigate('word')}
          className="group text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">PDF para Word</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Converta seu PDF em um documento Word editável (.docx) mantendo a estrutura do texto.
            Ideal para documentos de texto, contratos e relatórios.
          </p>
          <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold">
            Converter agora <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('excel')}
          className="group text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <FileSpreadsheet className="w-7 h-7 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">PDF para Excel</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Extrai tabelas estruturadas de relatórios PDF para planilhas Excel (.xlsx) com suporte
            a múltiplos arquivos e padrões de dados VI/VF/PF/PV.
          </p>
          <div className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold">
            Converter agora <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </section>

      {/* Features */}
      <section className="max-w-5xl w-full px-4 pb-16">
        <h3 className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-8">
          Por que usar o PDFConvert Pro?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              color: 'text-green-500',
              bg: 'bg-green-50 dark:bg-green-900/20',
              title: 'Privacidade Total',
              desc: 'Nenhum arquivo sai do seu dispositivo. Todo o processamento acontece localmente no navegador.',
            },
            {
              icon: Zap,
              color: 'text-amber-500',
              bg: 'bg-amber-50 dark:bg-amber-900/20',
              title: 'Alta Velocidade',
              desc: 'Motor de processamento otimizado para conversões rápidas, mesmo com PDFs grandes e complexos.',
            },
            {
              icon: Lock,
              color: 'text-blue-500',
              bg: 'bg-blue-50 dark:bg-blue-900/20',
              title: 'Conformidade LGPD',
              desc: 'Arquitetura serverless client-side: zero transmissão de dados. 100% em conformidade com a LGPD.',
            },
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
