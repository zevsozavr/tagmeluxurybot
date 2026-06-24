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
        borderRadius: 'var(--rounded)',
        overflow: 'hidden',
        flexShrink: 0,
        border: 'none',
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
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          font: 'var(--typography-headline-md)',
          fontSize: '18px',
          color: '#fff',
          textAlign: 'left',
        }}
      >
        {category.name}
      </span>
    </button>
  );
}
