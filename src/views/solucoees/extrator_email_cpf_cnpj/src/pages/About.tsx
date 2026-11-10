import Breadcrumb from '@/components/Breadcrumb';
import CTA from '@/components/CTA';

const About = () => {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <Breadcrumb items={[{ label: 'Sobre' }]} />

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        <i className="fas fa-info-circle text-violet-600 mr-3"></i>
                        Sobre o Extrator de Email, CPF e CNPJ
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Ferramenta profissional e gratuita desenvolvida com excelência
                        pelo <span className="font-bold text-violet-600">Grupo 3w Online</span>
                    </p>
                </div>

                {/* Missão */}
                <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-2xl p-12 mb-12 shadow-2xl">
                    <div className="max-w-4xl mx-auto text-center">
                        <i className="fas fa-bullseye text-6xl mb-6 text-yellow-300"></i>
                        <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
                        <p className="text-lg leading-relaxed opacity-90">
                            Democratizar o acesso a ferramentas profissionais de extração e validação de dados,
                            oferecendo soluções <span className="font-bold text-yellow-300">100% gratuitas, seguras e eficientes</span> para
                            profissionais, empresas e desenvolvedores que precisam otimizar seu trabalho diário.
                        </p>
                    </div>
                </div>

                {/* Valores */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        <i className="fas fa-heart text-red-500 mr-3"></i>
                        Nossos Valores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: 'fa-shield-alt',
                                color: 'text-blue-600',
                                title: 'Segurança',
                                description: 'Processamento 100% local. Seus dados nunca deixam seu computador.'
                            },
                            {
                                icon: 'fa-gift',
                                color: 'text-green-600',
                                title: 'Gratuidade',
                                description: 'Ferramentas profissionais sem custos, sem limites e sem cadastros.'
                            },
                            {
                                icon: 'fa-rocket',
                                color: 'text-purple-600',
                                title: 'Performance',
                                description: 'Tecnologia de ponta para extração rápida e precisa de dados.'
                            }
                        ].map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                                <i className={`fas ${value.icon} ${value.color} text-5xl mb-6 block`}></i>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Por que escolher */}
                <div className="bg-gray-50 rounded-2xl p-12 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        <i className="fas fa-star text-yellow-500 mr-3"></i>
                        Por Que Escolher o Extrator de Email, CPF e CNPJ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: 'fa-check-double',
                                title: 'Validação Automática',
                                description: 'CPF e CNPJ são validados automaticamente conforme regras oficiais'
                            },
                            {
                                icon: 'fa-filter',
                                title: 'Remoção de Duplicatas',
                                description: 'Limpe suas listas eliminando emails e documentos repetidos'
                            },
                            {
                                icon: 'fa-file-export',
                                title: 'Múltiplos Formatos',
                                description: 'Exporte em TXT, CSV ou XML - escolha o melhor para você'
                            },
                            {
                                icon: 'fa-bolt',
                                title: 'Velocidade Máxima',
                                description: 'Processa milhares de registros em poucos segundos'
                            },
                            {
                                icon: 'fa-mobile-alt',
                                title: 'Totalmente Responsivo',
                                description: 'Use em qualquer dispositivo: desktop, tablet ou smartphone'
                            },
                            {
                                icon: 'fa-user-lock',
                                title: 'Privacidade Garantida',
                                description: 'Nenhum dado é armazenado ou enviado para servidores externos'
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow">
                                <i className={`fas ${item.icon} text-violet-600 text-2xl mt-1`}></i>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grupo 3w Online */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-12 mb-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <i className="fas fa-building text-6xl mb-6 text-violet-400"></i>
                        <h2 className="text-3xl font-bold mb-4">Grupo 3w Online</h2>
                        <p className="text-lg leading-relaxed mb-8 opacity-90">
                            Somos uma empresa especializada em <span className="font-bold text-yellow-300">desenvolvimento
                                de sites e sistemas personalizados sob demanda</span>. Com anos de experiência no mercado,
                            criamos soluções tecnológicas sob medida para impulsionar o seu negócio.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <div className="text-4xl font-bold text-yellow-300 mb-2">+500</div>
                                <div className="text-sm opacity-80">Projetos Concluídos</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <div className="text-4xl font-bold text-green-300 mb-2">98%</div>
                                <div className="text-sm opacity-80">Clientes Satisfeitos</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                                <div className="text-4xl font-bold text-blue-300 mb-2">+10</div>
                                <div className="text-sm opacity-80">Anos de Experiência</div>
                            </div>
                        </div>
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                        >
                            <i className="fas fa-external-link-alt mr-3"></i>
                            Visite o Site Oficial
                        </a>
                    </div>
                </div>

                {/* CTA */}
                <CTA variant="secondary" />
            </div>
        </div>
    );
};

export default About;
