import React from 'react'

const ContactUs = () => {
  return (
    <section className="container mx-auto py-16 bg-gray-100">
    <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left mb-8 md:mb-0">
        <p>Address: Ampayon Butuan City</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: localbloom@flowershop.com</p>
      </div>
      <form className="md:w-1/2">
        <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" />
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
        <textarea placeholder="Message" className="w-full p-2 mb-4 border rounded"></textarea>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Send Message</button>
      </form>
    </div>
  </section>
  )
}

export default ContactUs