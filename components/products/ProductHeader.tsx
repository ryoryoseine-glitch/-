import { ReactNode } from "react";

const ProductHeader = ({
  name,
  description,
  actions
}: {
  name: string;
  description?: string | null;
  actions?: ReactNode;
}) => {
  return (
    <div className="border-b border-ink-200 px-4 py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="mt-2 text-sm text-ink-600">{description ?? "概要は準備中です"}</p>
        </div>
        {actions}
      </div>
    </div>
  );
};

export default ProductHeader;
