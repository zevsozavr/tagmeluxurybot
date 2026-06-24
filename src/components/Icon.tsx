interface Props {
  name: string;
  style?: React.CSSProperties;
  filled?: boolean;
}

export function Icon({ name, style, filled }: Props) {
  return (
    <span className="material-symbols-outlined" style={{
      fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 300, 'GRAD' 0, 'opsz' 24`,
      ...style,
    }}>
      {name}
    </span>
  );
}
