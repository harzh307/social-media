"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      {error.message}
      <button className="p-4 bg-blue-600 gap-3 m-4 rounded-2xl" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
