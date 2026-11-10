import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import HomePage from './sections/HomePage';
import AboutPage from './sections/AboutPage';
import ServicesPage from './sections/ServicesPage';
import ContactPage from './sections/ContactPage';
import TermsPage from './sections/TermsPage';
import PrivacyPage from './sections/PrivacyPage';

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determina qual seção mostrar baseado na rota
  const renderSection = () => {
    switch (location.pathname) {
      case '/sobre':
        return <AboutPage />;
      case '/servicos':
        return <ServicesPage />;
      case '/contato':
        return <ContactPage />;
      case '/termos':
        return <TermsPage />;
      case '/privacidade':
        return <PrivacyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Teste de Personalidade Profissional Grátis - Descubra Seu Perfil | 3w Online</title>
        <meta name="description" content="Descubra seu verdadeiro perfil com nossos testes de personalidade profissionais e gratuitos. DISC, Eneagrama, Vocacional, QI e muito mais." />
      </Helmet>

      <Layout>
        {renderSection()}
      </Layout>
    </>
  );
};

export default Index;