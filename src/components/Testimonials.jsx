import React from 'react'

function Testimonials() {

    const testimonials = [
        { id: 1, name: 'Jane Doe', message: 'Amazing flowers and fast service!' },
        { id: 2, name: 'John Smith', message: 'I love the arrangement. Will buy again.' },
        { id: 3, name: 'Emily White', message: 'Beautiful flowers for my wedding. Highly recommend!' }
      ];

  return (
    <section className="container mx-auto py-16">
    <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-700 italic">"{testimonial.message}"</p>
          <h3 className="text-xl font-bold mt-4">{testimonial.name}</h3>
        </div>
      ))}
    </div>
  </section>
  )
}

export default Testimonials