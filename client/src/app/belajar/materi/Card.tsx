
import { Card as ShadcnCard, CardContent as ShadcnCardContent } from "@/app/Component/card";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = ({ className, ...props }: CardProps) => {
  return <ShadcnCard className={cn(className)} {...props} />;
};

export const CardContent = ({ className, ...props }: CardProps) => {
  return <ShadcnCardContent className={cn(className)} {...props} />;
};