export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800" />
      <p className="mt-3 text-sm">{label}</p>
    </div>
  )
}
