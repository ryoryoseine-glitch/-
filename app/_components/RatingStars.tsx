'use client';

type RatingStarsProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
};

export function RatingStars({ value, onChange, size = 'md' }: RatingStarsProps) {
  const stars = [1, 2, 3, 4, 5];
  const className = size === 'sm' ? 'text-base' : 'text-xl';

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const active = value >= star;
        if (onChange) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={`min-h-11 min-w-11 ${className}`}
              aria-label={`${star} star`}
            >
              <span className={active ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            </button>
          );
        }

        return (
          <span key={star} className={`${className} ${active ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        );
      })}
    </div>
  );
}
