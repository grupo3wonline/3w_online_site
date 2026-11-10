import Breadcrumb from '@/components/Breadcrumb';
import EmailExtractor from '@/components/EmailExtractor';
import CTA from '@/components/CTA';

const Tools = () => {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <Breadcrumb items={[{ label: 'Ferramentas' }]} />

                {/* Ferramenta Principal */}
                <EmailExtractor />

                {/* CTA */}
                <div className="mt-16">
                    <CTA variant="primary" />
                </div>
            </div>
        </div>
    );
};

export default Tools;
