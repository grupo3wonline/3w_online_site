import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CTASection from '@/components/CTASection';
import Swal from 'sweetalert2';

const Home = () => {
    useEffect(() => {
        // Animação de entrada suave
        window.scrollTo(0, 0);
    }, []);

    const showHelpModal = () => {
        Swal.fire({
            title: '<strong>Como Usar o ColorCraft</strong>',
            icon: 'info',
            html: `
        <div class="text-left space-y-3">
          <p><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>Passo 1:</strong> Acesse a ferramenta de cores</p>
          <p><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>Passo 2:</strong> Escolha uma cor base</p>
          <p><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>Passo 3:</strong> Selecione um esquema harmônico</p>
          <p><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>Passo 4:</strong> Copie os códigos de cores</p>
          <p><i class="fas fa-check-circle text-green-500 mr-2"></i><strong>Passo 5:</strong> Use em seus projetos!</p>
        </div>
      `,
            showCloseButton: true,
            confirmButtonText: 'Entendi!',
            confirmButtonColor: '#8B5CF6',
        });
    };

    return (
        <Layout showBreadcrumb={false}>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 text-white pt-20 pb-32 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        animation: 'moveBackground 20s linear infinite',
                    }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-bounce">
                            <i className="fas fa-sparkles text-yellow-300 mr-2"></i>
                            <span className="text-sm font-semibold">Ferramenta #1 em Paletas de Cores</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                            Crie Paletas de Cores{' '}
                            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                                Profissionais
                            </span>{' '}
                            em Segundos
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Transforme suas ideias em realidade com nossa ferramenta <strong>100% gratuita</strong> de criação de paletas harmônicas.
                            Perfeita para designers, desenvolvedores e criadores de conteúdo.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                to="/color_craft/ferramentas"
                                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <i className="fas fa-palette mr-3 group-hover:rotate-12 transition-transform"></i>
                                Começar Agora - É Grátis!
                                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
                            </Link>

                            <button
                                onClick={showHelpModal}
                                className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                            >
                                <i className="fas fa-question-circle mr-3"></i>
                                Como Funciona?
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold mb-1">100%</div>
                                <div className="text-sm text-white/80">Gratuito</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold mb-1">10k+</div>
                                <div className="text-sm text-white/80">Usuários</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold mb-1">50k+</div>
                                <div className="text-sm text-white/80">Paletas Criadas</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold mb-1">4.9★</div>
                                <div className="text-sm text-white/80">Avaliação</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            Por Que Escolher o <span className="text-violet-600">ColorCraft</span>?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            A ferramenta mais completa e intuitiva para criação de paletas de cores harmônicas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-bolt text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Ultra Rápido</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Crie paletas perfeitas em segundos. Nossa tecnologia avançada garante resultados instantâneos.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-paint-brush text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Teoria das Cores</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Baseado em princípios comprovados de teoria das cores: complementares, análogas, tríades e muito mais.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-shield-alt text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">100% Seguro</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Processamento local no seu navegador. Seus dados nunca saem do seu dispositivo.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-mobile-alt text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Mobile First</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Interface responsiva e otimizada para todos os dispositivos. Use onde e quando quiser.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-download text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Exportação Fácil</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Exporte suas paletas em múltiplos formatos: HEX, RGB, HSL, CMYK, CSS e mais.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-infinity text-3xl text-white"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Sem Limites</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Crie quantas paletas quiser, quando quiser. Sem restrições, sem assinaturas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            Como <span className="text-violet-600">Funciona</span>?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Três passos simples para criar paletas profissionais
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                                        <i className="fas fa-eyedropper text-4xl text-white"></i>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900">
                                        1
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">Escolha a Cor Base</h3>
                                <p className="text-gray-600">
                                    Selecione uma cor inicial ou insira um código HEX/RGB
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl">
                                        <i className="fas fa-sliders-h text-4xl text-white"></i>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900">
                                        2
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">Selecione o Esquema</h3>
                                <p className="text-gray-600">
                                    Escolha entre complementar, análoga, tríade, tetrádica...
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                                        <i className="fas fa-check-circle text-4xl text-white"></i>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-gray-900">
                                        3
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">Copie e Use!</h3>
                                <p className="text-gray-600">
                                    Copie os códigos e use em seus projetos imediatamente
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <Link
                                to="/color_craft/ferramentas"
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <i className="fas fa-play-circle mr-3"></i>
                                Experimentar Agora
                                <i className="fas fa-arrow-right ml-3"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            O Que Dizem Nossos <span className="text-violet-600">Usuários</span>
                        </h2>
                        <div className="flex items-center justify-center space-x-1 mt-4">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className="fas fa-star text-yellow-400 text-2xl"></i>
                            ))}
                            <span className="ml-3 text-xl text-gray-600">4.9/5 (1.850 avaliações)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Testimonial 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="fas fa-star text-yellow-400"></i>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic leading-relaxed">
                                "Ferramenta incrível! Economizo horas na criação de paletas para meus projetos. Recomendo muito!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    MC
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Maria Clara</div>
                                    <div className="text-sm text-gray-500">Designer UX/UI</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="fas fa-star text-yellow-400"></i>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic leading-relaxed">
                                "A melhor ferramenta de cores que já usei. Interface intuitiva e resultados profissionais!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    RS
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Ricardo Santos</div>
                                    <div className="text-sm text-gray-500">Desenvolvedor Front-end</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className="fas fa-star text-yellow-400"></i>
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic leading-relaxed">
                                "Essencial para qualquer designer! Uso diariamente e sempre me surpreendo com os resultados."
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    JF
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Juliana Ferreira</div>
                                    <div className="text-sm text-gray-500">Designer Gráfica</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
                            Perguntas <span className="text-violet-600">Frequentes</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            Tire suas dúvidas sobre o ColorCraft
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {/* FAQ Item 1 */}
                        <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                            <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-lg">
                                <span className="flex items-center">
                                    <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                                    O ColorCraft é realmente gratuito?
                                </span>
                                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-violet-600"></i>
                            </summary>
                            <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                                Sim! O ColorCraft é 100% gratuito, sem limites de uso, sem assinaturas e sem taxas ocultas.
                                Nossa missão é democratizar o acesso a ferramentas profissionais de design.
                            </p>
                        </details>

                        {/* FAQ Item 2 */}
                        <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                            <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-lg">
                                <span className="flex items-center">
                                    <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                                    Preciso criar uma conta para usar?
                                </span>
                                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-violet-600"></i>
                            </summary>
                            <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                                Não! Você pode usar todas as funcionalidades do ColorCraft sem precisar criar uma conta.
                                Tudo funciona diretamente no seu navegador.
                            </p>
                        </details>

                        {/* FAQ Item 3 */}
                        <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                            <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-lg">
                                <span className="flex items-center">
                                    <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                                    Meus dados estão seguros?
                                </span>
                                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-violet-600"></i>
                            </summary>
                            <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                                Absolutamente! Todo o processamento é feito localmente no seu navegador.
                                Nada é enviado para nossos servidores, garantindo total privacidade e segurança.
                            </p>
                        </details>

                        {/* FAQ Item 4 */}
                        <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                            <summary className="flex items-center justify-between cursor-pointer font-bold text-gray-900 text-lg">
                                <span className="flex items-center">
                                    <i className="fas fa-question-circle text-violet-600 mr-3"></i>
                                    Posso usar as paletas comercialmente?
                                </span>
                                <i className="fas fa-chevron-down group-open:rotate-180 transition-transform text-violet-600"></i>
                            </summary>
                            <p className="mt-4 text-gray-600 leading-relaxed pl-9">
                                Sim! Você pode usar todas as paletas criadas no ColorCraft em projetos pessoais e comerciais,
                                sem necessidade de atribuição.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASection />

            {/* Add custom styles */}
            <style>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(60px) translateY(60px); }
        }
      `}</style>
        </Layout>
    );
};

export default Home;
