export default function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-sm ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
