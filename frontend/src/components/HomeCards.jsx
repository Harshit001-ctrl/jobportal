// import React from "react";
import Card from "./Card";

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card bg="border shadow-xl" >
            <h2 className="text-2xl font-bold">About Our Company</h2>
            <p className="mt-2 mb-4">
              We are a technology-driven company committed to innovation and excellence.
              Our mission is to empower businesses with cutting-edge solutions that drive success.
            </p>
          </Card>
          <Card bg="border shadow-xl ">
            <h2 className="text-2xl font-bold">Our Vision & Values</h2>
            <p className="mt-2 mb-4">
              We believe in integrity, creativity, and collaboration. Our goal is to create a positive
              impact through technology, fostering growth and opportunities for our clients and community.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
