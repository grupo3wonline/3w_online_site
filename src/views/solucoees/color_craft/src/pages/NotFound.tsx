import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout showBreadcrumb={false}>
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Animation */}
            <div className="relative mb-8">
              <div className="text-[200px] font-extrabold text-violet-600/10 leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-sad-tear text-8xl text-violet-600 animate-bounce"></i>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Página Não Encontrada
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8">
              Ops! A página que você está procurando não existe ou foi movida.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/color_craft/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <i className="fas fa-home mr-3"></i>
                Voltar para Home
              </Link>

              <Link
                to="/color_craft/ferramentas"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 font-bold rounded-xl border-2 border-violet-600 hover:bg-violet-50 hover:scale-105 transition-all duration-300"
              >
                <i className="fas fa-palette mr-3"></i>
                Usar Ferramenta
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Talvez você esteja procurando por:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/color_craft/sobre"
                  className="text-violet-600 hover:text-violet-700 hover:underline font-medium"
                >
                  Sobre Nós
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  to="/color_craft/servicos"
                  className="text-violet-600 hover:text-violet-700 hover:underline font-medium"
                >
                  Serviços
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  to="/color_craft/contato"
                  className="text-violet-600 hover:text-violet-700 hover:underline font-medium"
                >
                  Contato
                </Link>
                <span className="text-gray-400">•</span>
                <a
                  href="https://www.3wonline.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-600 hover:text-violet-700 hover:underline font-medium"
                >
                  3w Online
                </a>
              </div>
            </div>

            {/* Error Code */}
            <div className="mt-8 text-sm text-gray-400">
              Código de erro: <span className="font-mono">404 NOT_FOUND</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
