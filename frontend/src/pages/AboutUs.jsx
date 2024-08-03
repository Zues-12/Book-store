import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-black lg:h-screen w-full lg:flex animate-slidein opacity-0 [--slidein-delay:700ms]">
      <div>
        <h1 className=" px-2 mt-10 py-4 text-4xl font-bold text-white">About Us</h1>
        <p className=" px-2 mb-2 text-white">
          Welcome to Books Shelf! At Books Shelf, we believe that every book
          tells a unique story and every reader deserves the chance to explore a
          world of knowledge, imagination, and inspiration. Our mission is to
          provide a diverse collection of books that cater to all tastes and
          interests, fostering a love for reading in every individual.
        </p>
        <h1 className="text-xl font-bold px-2 py-4 text-white">Our Collection</h1>
        <p className=" px-2 mb-2 text-white">
          We take pride in offering a wide variety of both Urdu and English
          books. Whether you're a fan of gripping biographies, enchanting
          poetry, thrilling fictions, or any other genre, you'll find something
          to pique your interest in our extensive library. Our carefully curated
          selection ensures that there’s something for everyone, from timeless
          classics to contemporary bestsellers.
        </p>
        <h1 className="text-xl font-bold px-2 py-4 text-white">Why Choose Us?</h1>
        <p className=" px-2 mb-2 text-white">
          1. Diverse Range: From autobiographies that inspire to poetry that moves,
          and fiction that transports you to different worlds, our collection
          spans across various genres and languages.
        </p>
        <p className=" px-2 mb-2 text-white">
          2. Quality Service: We are dedicated to providing you with an exceptional
          shopping experience. Our user-friendly website, secure payment
          options, and prompt delivery services ensure that your book shopping
          is as enjoyable as possible.
        </p>
        <p className=" px-2 mb-2 text-white">
          3. Passion for Books: Our team is passionate about books and committed to
          helping you find your next great read. We believe in the power of
          reading to transform lives and strive to make books accessible to
          everyone.
        </p>
        <p className=" px-2 mb-2 text-white">
          Join us on a literary journey and discover the endless possibilities
          that a good book can offer. At Books Shelf, we’re more than just a
          bookstore; we’re your gateway to new adventures, ideas, and
          experiences. Happy reading!
        </p>
      </div>
      <div className='mt-24 mr-6 w-[70%] h-[70%]'>
        <img className=' hidden lg:block w-full h-full object-cover rounded-lg' src="./about-us.jpg" alt="" />
      </div>
    </div>
  )
}

export default AboutUs
