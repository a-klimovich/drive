export default function CenteredContent({ children }) {
  return (
    <div
      className="flex-center-all w-100 h-100"
      style={{ height: '100vh' }}
    >
      { children }
    </div>
  );
}
