export default function Card({ children, className = '', hover = false }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all' : ''} ${className}`}>
      {children}
    </div>
  );
}
