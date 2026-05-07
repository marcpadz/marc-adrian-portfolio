interface StatBoxProps {
  number: string;
  label: string;
}

export default function StatBox({ number, label }: StatBoxProps) {
  return (
    <div className="border-l-2 border-pixel-cyan pl-3 min-w-[70px]">
      <div className="font-pixel text-2xl text-pixel-cyan">{number}</div>
      <div className="font-terminal text-sm text-pixel-muted tracking-wider">{label}</div>
    </div>
  );
}
