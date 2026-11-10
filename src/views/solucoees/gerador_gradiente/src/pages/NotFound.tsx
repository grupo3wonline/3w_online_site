import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <Layout>
      <SEO
        title="Página Não Encontrada - 404 | Gerador de Gradiente"
        description="A página que você está procurando não foi encontrada."
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-2xl opacity-30"></div>
              <div className="relative text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                404
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Opa! Página Não Encontrada
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-home"></i>
              <span>Voltar ao Início</span>
            </Link>

            <Link
              to="/ferramenta"
              className="inline-flex items-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300"
            >
              <i className="fas fa-palette"></i>
              <span>Ir para Ferramenta</span>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Links Úteis</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/"
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-lg transition-all"
              >
                <i className="fas fa-home text-3xl text-indigo-600 mb-2"></i>
                <span className="text-sm font-medium">Início</span>
              </Link>
              <Link
                to="/sobre"
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-lg transition-all"
              >
                <i className="fas fa-info-circle text-3xl text-purple-600 mb-2"></i>
                <span className="text-sm font-medium">Sobre</span>
              </Link>
              <Link
                to="/servicos"
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-lg transition-all"
              >
                <i className="fas fa-cogs text-3xl text-pink-600 mb-2"></i>
                <span className="text-sm font-medium">Serviços</span>
              </Link>
              <Link
                to="/contato"
                className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-lg transition-all"
              >
                <i className="fas fa-envelope text-3xl text-blue-600 mb-2"></i>
                <span className="text-sm font-medium">Contato</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
