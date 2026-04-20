const testimonials = [
  {
    name: 'J. Adams',
    rating: 4,
    text: 'Incredible deals at great prices, everything arrived on time. I was skeptical at first, but now I shop here exclusively for all my household needs.',
    avatar: 'JA',
  },
  {
    name: 'M. King',
    rating: 5,
    text: 'The member pricing is absolutely amazing. I\'ve saved hundreds of dollars since joining ValueBox+. The quality of products exceeded my expectations.',
    avatar: 'MK',
  },
  {
    name: 'S. Chen',
    rating: 5,
    text: 'Fast shipping, great customer service, and the giveaways are a fun bonus. I won a $50 gift card last month! Highly recommend to everyone.',
    avatar: 'SC',
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-white">
      <div className="container-main">
        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Left heading */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Loved by<br />
              Thousands of Members
            </h2>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center -ml-1 first:ml-0 border-2 border-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-accent text-sm font-medium mt-3 cursor-pointer hover:underline">
              View More →
            </p>
          </div>

          {/* Testimonial cards */}
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-gray-50 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900">{testimonial.name}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= testimonial.rating ? 'text-amber-400' : 'text-gray-200'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
