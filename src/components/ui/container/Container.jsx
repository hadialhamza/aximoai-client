import { cn } from "@/utils/cn";

const Container = ({ children, className }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-5", className)}>{children}</div>
  );
};

export default Container;
