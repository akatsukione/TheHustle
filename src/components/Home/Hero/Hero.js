import React from "react";
import icon1 from "assets/images/gitbook.png";
import banner from "assets/images/home/banner.png";

const Hero = () => {
  // const [width, setWidth] = useState(0);

  // useEffect(() => {
  //   function handleResize() {
  //     setWidth(window.innerWidth);
  //   }

  //   window.addEventListener("resize", handleResize);

  //   handleResize();

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [setWidth]);

  return (
    <div
      className="hero-section  font-Montserrat flex h-[770px] min-h-screen items-center justify-center bg-black bg-cover bg-center bg-no-repeat md:min-h-max"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-3 pt-10 text-center text-white md:mx-auto md:w-7/12">
        <h2 className="text-4xl font-bold capitalize text-primary font-Montserrat">
          2023
        </h2>
        <h2 className="text-5xl font-bold capitalize text-primary font-Montserrat mt-3">
          The Hustle
        </h2>
        <div className="flex flex-wrap justify-center">
          <p className="mt-4 text-2xl mx-1">"The NFT game where no </p>
          <p className="mt-4 mx-1 text-2xl">dream is too big"</p>
        </div>
        <div className="mt-6">
          <p className="text-xl font-bold">Check out our whitepaper</p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://thehustlegame.gitbook.io/whitepaper/"
              target={"_blank"}
              className="block h-10 w-10"
              rel="noreferrer"
            >
              <img
                src={icon1}
                alt="Whitepaper Icon"
                className="h-full w-full object-contain"
              />
            </a>
          </div>
        </div>
          <p className="mt-5 text-lg max-w-[700px] mx-auto">
            Login and experience the closest thing to being a real gang leader by
            building a crew and taking charge of one or more locations
          </p>
      </div>
    </div>
  );
};

export default Hero;
