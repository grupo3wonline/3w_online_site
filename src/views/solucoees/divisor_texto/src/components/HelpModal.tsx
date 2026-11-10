import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLightbulb, 
  faListOl, 
  faFileAlt,
  faDownload,
  faCopy
} from '@fortawesome/free-solid-svg-icons';
import { Separator } from "@/components/ui/separator";

interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpModal = ({ open, onOpenChange }: HelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FontAwesomeIcon icon={faLightbulb} className="text-accent" />
            Como usar o Divisor de Texto
          </DialogTitle>
          <DialogDescription>
            Guia completo para aproveitar ao máximo a ferramenta
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Passo a passo */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faListOl} className="text-primary" />
              Passo a Passo
            </h3>
            <ol className="space-y-3 list-decimal list-inside text-sm text-muted-foreground">
              <li><strong className="text-foreground">Cole seu texto</strong> - Insira o texto que deseja dividir no campo de entrada</li>
              <li><strong className="text-foreground">Configure o tamanho</strong> - Defina quantas palavras cada bloco deve ter (padrão: 900)</li>
              <li><strong className="text-foreground">Clique em Converter</strong> - O texto será dividido respeitando os parágrafos</li>
              <li><strong className="text-foreground">Copie ou exporte</strong> - Use os botões para copiar blocos individuais ou gerar arquivo SRT</li>
            </ol>
          </section>

          <Separator />

          {/* Funcionalidades */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faFileAlt} className="text-primary" />
              Funcionalidades
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faCopy} className="text-accent mt-1" />
                <div>
                  <strong className="text-foreground">Cópia Rápida:</strong> Cada bloco possui um botão de copiar com feedback instantâneo
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faDownload} className="text-accent mt-1" />
                <div>
                  <strong className="text-foreground">Gerar SRT:</strong> Crie automaticamente um arquivo de legendas com todos os blocos
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FontAwesomeIcon icon={faListOl} className="text-accent mt-1" />
                <div>
                  <strong className="text-foreground">Estatísticas:</strong> Visualize caracteres, palavras e sentenças de cada bloco
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Dicas */}
          <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faLightbulb} className="text-accent" />
              Dicas de Uso
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                <strong className="text-foreground">💡 Para estudos:</strong> Use 300-500 palavras por bloco para criar flashcards e resumos
              </div>
              <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                <strong className="text-foreground">🎬 Para legendas:</strong> Configure 50-100 palavras para criar arquivos SRT sincronizados
              </div>
              <div className="bg-success/10 p-3 rounded-lg border border-success/20">
                <strong className="text-foreground">📝 Para edição:</strong> Use 800-1000 palavras para revisão de artigos longos
              </div>
              <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                <strong className="text-foreground">📱 Para redes sociais:</strong> Configure 20-30 palavras para criar threads de posts
              </div>
            </div>
          </section>

          <Separator />

          {/* FAQ */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Perguntas Frequentes</h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-foreground">Os textos são enviados para um servidor?</strong>
                <p className="text-muted-foreground mt-1">
                  Não! Todo processamento acontece localmente no seu navegador. Seus textos são 100% privados.
                </p>
              </div>
              <div>
                <strong className="text-foreground">Há limite de tamanho de texto?</strong>
                <p className="text-muted-foreground mt-1">
                  Não há limite definido, mas textos muito grandes podem demorar mais para processar.
                </p>
              </div>
              <div>
                <strong className="text-foreground">Os blocos quebram no meio dos parágrafos?</strong>
                <p className="text-muted-foreground mt-1">
                  Nunca! A ferramenta respeita a estrutura dos parágrafos, mantendo-os sempre íntegros.
                </p>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
