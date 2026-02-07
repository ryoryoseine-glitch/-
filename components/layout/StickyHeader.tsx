import { ReactNode } from "react";

const StickyHeader = ({ title, actions }: { title: string; actions?: ReactNode }) => {
  return (
    <div className="sticky top-0 z-10 border-b border-ink-200 bg-white/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>
        {actions ? <div>{actions}</div> : null}
      </div>
    </div>
  );
};

export default StickyHeader;
