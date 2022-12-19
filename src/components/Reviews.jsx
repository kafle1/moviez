export default function Reviews({ ratings }) {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-red-600">
        Reviews
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {ratings.map((review) => (
          <div
            key={review.Source}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {review.Source}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {review.Value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
