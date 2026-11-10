import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface HelpButtonProps {
  content: string;
  title?: string;
  size?: "sm" | "default" | "lg";
}

export default function HelpButton({ 
  content, 
  title,
  size = "sm" 
}: HelpButtonProps) {
  const sizeClasses = {
    sm: "w-5 h-5 text-xs",
    default: "w-6 h-6 text-sm",
    lg: "w-8 h-8 text-base",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${sizeClasses[size]} rounded-full bg-info/10 text-info hover:bg-info/20 hover:text-info`}
          aria-label="Ajuda"
        >
          <i className="fa-solid fa-question"></i>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}