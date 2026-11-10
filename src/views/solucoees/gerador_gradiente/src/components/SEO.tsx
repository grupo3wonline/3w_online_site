import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title = 'Gerador de Gradiente CSS - Grátis, Rápido e Profissional | 3w Online',
    description = 'Crie gradientes CSS perfeitos gratuitamente. Ferramenta profissional para criar degradês personalizados com visualização em tempo real, exportação de código e diversos formatos.',
    keywords = 'gerador gradiente, gradient generator, css gradiente, degradê css, cores gradiente, ferramentas css, design web',
    image = 'https://app.3wonline.com/gerador_gradiente/og-image.jpg',
    url = 'https://app.3wonline.com/gerador_gradiente',
    type = 'website',
}: SEOProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
