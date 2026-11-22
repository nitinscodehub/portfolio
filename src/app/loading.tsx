export default function Loading() {
  return (
    <div className="shell pt-40">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="skeleton mt-6 h-14 w-2/3 rounded-xl" />
      <div className="skeleton mt-4 h-4 w-1/2 rounded" />
      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="skeleton h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
