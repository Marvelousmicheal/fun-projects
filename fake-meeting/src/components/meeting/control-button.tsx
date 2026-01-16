import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ControlButtonProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isDanger?: boolean;
  onClick?: () => void;
  badge?: number;
}

export default function ControlButton({
  icon: Icon,
  label,
  isActive,
  isDanger,
  onClick,
  badge,
}: ControlButtonProps) {
  return <>
    <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            className={cn(
              "control-btn relative",
              isDanger
                ? "bg-destructive hover:bg-destructive/80 text-destructive-foreground"
                : isActive
                ? "bg-primary text-primary-foreground glow-primary"
                : "bg-secondary hover:bg-control-hover text-foreground"
            )}
          >
            <Icon className="w-5 h-5"/>
            {
              badge !== undefined && badge > 0 && (
                <span
                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {badge}
                </span>
              )
            }
          </Button>

        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
  </>;
}
