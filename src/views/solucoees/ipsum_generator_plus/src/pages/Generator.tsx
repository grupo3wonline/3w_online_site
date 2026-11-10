import { useState } from 'react';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TextGeneratorForm } from '@/components/generator/TextGeneratorForm';
import { TextOutput } from '@/components/generator/TextOutput';
import { GeneratorConfig } from '@/types/generator';

const Generator = () => {
  const [config, setConfig] = useState<GeneratorConfig>({
    textType: 'lorem',
    format: 'paragraphs',
    size: 'medium',
    quantity: 3
  });
  
  const [generatedText, setGeneratedText] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <Zap className="w-8 h-8 text-primary" />
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  TextGenius
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <TextGeneratorForm 
            config={config}
            setConfig={setConfig}
            onGenerate={setGeneratedText}
          />
          
          <TextOutput 
            text={generatedText}
            config={config}
          />
        </div>
      </main>
    </div>
  );
};

export default Generator;