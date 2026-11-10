import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumb';
import CTA from '@/components/CTA';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-white py-20 px-4">
                <div className="container mx-auto">
                    <Breadcrumb items={[{ label: 'Home' }]} />

                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <span className="text-sm font-semibold">
                                <i className="fas fa-fire text-orange-400 mr-2"></i>
                                +3.500 usuários satisfeitos
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Extrator de Email, CPF e CNPJ
                            <span className="block text-yellow-300 mt-2">Grátis e Profissional</span>
                        </h1>

                        <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                            Extraia e valide <span className="font-bold">emails, CPF e CNPJ</span> de qualquer texto
                            em segundos. <span className="text-yellow-300 font-semibold">100% gratuito</span>,
                            seguro e sem limites!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                to="/ferramentas"
                                className="inline-flex items-center justify-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl"
                            >
                                <i className="fas fa-rocket mr-3"></i>
                                Começar Agora - É Grátis!
                            </Link>

                            <Link
                                to="/sobre"
                                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-violet-600 transition-all"
                            >
                                <i className="fas fa-info-circle mr-3"></i>
                                Saiba Mais
                            </Link>
                        </div>

                        {/* Benefícios Quick */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <i className="fas fa-bolt text-4xl text-yellow-400 mb-3"></i>
                                <h3 className="font-bold text-lg mb-2">Ultra Rápido</h3>
                                <p className="text-sm opacity-80">Extração em segundos</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <i className="fas fa-shield-check text-4xl text-green-400 mb-3"></i>
                                <h3 className="font-bold text-lg mb-2">100% Seguro</h3>
                                <p className="text-sm opacity-80">Processamento local</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <i className="fas fa-infinity text-4xl text-blue-400 mb-3"></i>
                                <h3 className="font-bold text-lg mb-2">Sem Limites</h3>
                                <p className="text-sm opacity-80">Use quantas vezes quiser</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Funcionalidades */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <i className="fas fa-star text-yellow-500 mr-3"></i>
                            Funcionalidades Poderosas
                        </h2>
                        <p className="text-xl text-gray-600">
                            Tudo que você precisa em uma única ferramenta
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: 'fa-envelope',
                                color: 'text-blue-600',
                                title: 'Extração de Emails',
                                description: 'Encontre e extraia todos os emails válidos do texto com precisão'
                            },
                            {
                                icon: 'fa-id-card',
                                color: 'text-green-600',
                                title: 'Validação de CPF',
                                description: 'Extraia e valide CPFs automaticamente com verificação de dígitos'
                            },
                            {
                                icon: 'fa-building',
                                color: 'text-purple-600',
                                title: 'Validação de CNPJ',
                                description: 'Identifique e valide CNPJs no formato correto'
                            },
                            {
                                icon: 'fa-filter',
                                color: 'text-orange-600',
                                title: 'Remove Duplicatas',
                                description: 'Elimina automaticamente registros duplicados'
                            },
                            {
                                icon: 'fa-download',
                                color: 'text-indigo-600',
                                title: 'Exportação Múltipla',
                                description: 'Exporte em TXT, CSV ou XML conforme sua necessidade'
                            },
                            {
                                icon: 'fa-shield-alt',
                                color: 'text-red-600',
                                title: 'Privacidade Total',
                                description: 'Seus dados nunca são enviados para servidores externos'
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                            >
                                <div className={`${feature.color} text-4xl mb-4`}>
                                    <i className={`fas ${feature.icon}`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Como Usar */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <i className="fas fa-lightbulb text-yellow-500 mr-3"></i>
                            Como Usar - É Muito Simples!
                        </h2>
                        <p className="text-xl text-gray-600">
                            3 passos para extrair seus dados
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                icon: 'fa-paste',
                                title: 'Cole o Texto',
                                description: 'Cole ou digite o texto contendo emails, CPF ou CNPJ'
                            },
                            {
                                step: '2',
                                icon: 'fa-magic',
                                title: 'Extraia Automaticamente',
                                description: 'Clique em extrair e veja a mágica acontecer em segundos'
                            },
                            {
                                step: '3',
                                icon: 'fa-download',
                                title: 'Exporte os Resultados',
                                description: 'Baixe em TXT, CSV ou XML conforme sua preferência'
                            }
                        ].map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                                        <i className={`fas ${step.icon}`}></i>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg shadow-lg">
                                        {step.step}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dicas */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            <i className="fas fa-graduation-cap text-violet-600 mr-3"></i>
                            Dicas Profissionais
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        {[
                            {
                                icon: 'fa-check-circle',
                                color: 'text-green-600',
                                tip: 'Cole textos de qualquer fonte: planilhas, PDFs, sites ou documentos'
                            },
                            {
                                icon: 'fa-check-circle',
                                color: 'text-blue-600',
                                tip: 'A ferramenta valida automaticamente CPF e CNPJ, dispensando conferência manual'
                            },
                            {
                                icon: 'fa-check-circle',
                                color: 'text-purple-600',
                                tip: 'Use a remoção de duplicatas para limpar suas listas rapidamente'
                            },
                            {
                                icon: 'fa-check-circle',
                                color: 'text-orange-600',
                                tip: 'Exporte em CSV para importar diretamente em Excel ou Google Sheets'
                            },
                            {
                                icon: 'fa-check-circle',
                                color: 'text-indigo-600',
                                tip: 'Todos os dados são processados localmente - 100% offline e seguro'
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <i className={`fas ${item.icon} ${item.color} text-2xl mt-1`}></i>
                                <p className="text-gray-700 text-lg">{item.tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <CTA variant="primary" />
                </div>
            </section>
        </div>
    );
};

export default Home;
