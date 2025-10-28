export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyle = 'px-6 py-3 rounded-xl font-semibold transition';
  const variants = {
    primary: 'bg-[#FF7A00] text-white hover:bg-[#e66d00]',
    secondary: 'bg-white text-[#00273C] hover:bg-gray-100',
    outline: 'border-2 border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-white'
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
