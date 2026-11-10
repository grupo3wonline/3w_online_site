import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { HelpModal } from './HelpModal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HelpButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-strong hover:shadow-glow transition-all z-40"
            aria-label="Ajuda"
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Precisa de ajuda? Clique aqui!</p>
        </TooltipContent>
      </Tooltip>

      <HelpModal open={open} onOpenChange={setOpen} />
    </>
  );
};
