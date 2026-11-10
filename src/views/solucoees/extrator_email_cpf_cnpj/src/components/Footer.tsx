import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sobre */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">
                            <i className="fas fa-cloud mr-2"></i>Extrator de Email, CPF e CNPJ
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Ferramenta profissional e gratuita para extração e validação de emails, CPF e CNPJ de textos.
                            Desenvolvida pelo Grupo 3w Online.
                        </p>
                    </div>

                    {/* Links Úteis */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Links Úteis</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-violet-400 transition-colors">
                                    <i className="fas fa-home mr-2"></i>Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/sobre" className="hover:text-violet-400 transition-colors">
                                    <i className="fas fa-info-circle mr-2"></i>Sobre
                                </Link>
                            </li>
                            <li>
                                <Link to="/servicos" className="hover:text-violet-400 transition-colors">
                                    <i className="fas fa-briefcase mr-2"></i>Serviços
                                </Link>
                            </li>
                            <li>
                                <Link to="/ferramentas" className="hover:text-violet-400 transition-colors">
                                    <i className="fas fa-tools mr-2"></i>Ferramentas
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/termos" className="hover:text-violet-400 transition-colors">
                                    <i className="fas fa-file-contract mr-2"></i>Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacidade" className="hover:text-violet-400 transition-colors">
                                    <i className="fas fa-shield-alt mr-2"></i>Política de Privacidade
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://www.3wonline.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-violet-400 transition-colors"
                                >
                                    <i className="fas fa-building mr-2"></i>Grupo 3w Online
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contato</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/contato" className="hover:text-violet-400 transition-colors">
                                    <i className="fas fa-envelope mr-2"></i>Fale Conosco
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-shield-check mr-2 text-green-400"></i>
                                <span>100% Seguro</span>
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-lock mr-2 text-blue-400"></i>
                                <span>Dados Protegidos</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>
                        © {currentYear} <span className="text-violet-400 font-semibold">Extrator de Email, CPF e CNPJ</span>.
                        Todos os direitos reservados. Desenvolvido por{' '}
                        <a
                            href="https://www.3wonline.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-400 hover:text-violet-300 transition-colors font-semibold"
                        >
                            Grupo 3w Online
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
