// LoadingDots.js
const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-x-2 animate-bounce">
        <span className="block bg-black h-4 w-4 rounded-full"></span>
        <span className="block bg-black h-4 w-4 rounded-full"></span>
        <span className="block bg-black h-4 w-4 rounded-full"></span>
      </div>
    </div>
  );
};

export default LoadingDots;
