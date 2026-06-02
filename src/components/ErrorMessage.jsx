export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-lg font-semibold text-red-600">Something went wrong</p>
      <p className="mt-1 max-w-md text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Retry
        </button>
      )}
    </div>
  )
}
