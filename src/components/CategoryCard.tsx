import type { Category } from '../types';

interface Props {
  category: Category;
  onClick: () => void;
}

export function CategoryCard({ category, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        width: '140px',
        height: '180px',
        borderRadius: 'var(--rounded-lg)',
        overflow: 'hidden',
        flexShrink: 0,
        border: '1px solid var(--color-outline-variant)',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loading="lazy"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          font: 'var(--typography-headline-sm)',
          fontSize: '16px',
          color: '#fff',
          textAlign: 'left',
        }}
      >
        {category.name}
      </span>
    </button>
  );
}
