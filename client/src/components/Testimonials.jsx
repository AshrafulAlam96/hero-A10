import React from 'react';


const testimonials = [
  {
    name: "Aisha Rahman",
    quote:
      "StudyMate helped me find the perfect study partner for my math prep. We now study together every evening!",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    name: "Akib Hasan",
    quote:
      "I love how easy it is to connect with people who share the same learning goals. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Nusrat Jahan",
    quote:
      "The platform is super intuitive. I found a programming buddy and we’ve built two projects together!",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-base-100 py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">📣 What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front bg-base-200 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold">{t.name}</h3>
              </div>

              {/* Back Side */}
              <div className="flip-card-back bg-primary text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center text-center">
                <p className="text-sm italic">“{t.quote}”</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;