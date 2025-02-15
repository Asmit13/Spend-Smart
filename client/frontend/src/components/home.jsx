import React from "react";
import Spline from "@splinetool/react-spline";
import { Star, CheckCircle, TrendingUp } from "lucide-react";
import Glowcard from "./ui/glowcard"
// import GoToDashboard from "../components/homecomponents/GotoDashboard";
// import FeaturesSection from "../components/homecomponents/FeaturesSection";
// import PricingSection from "../components/homecomponents/PricingSection";
// import Footer from "../components/homecomponents/Footer";

export default function Home() {
  const plans = [
    {
      name: "Free",
      price: "₹0/mo",
      features: ["Basic Analytics", "Expense Tracking"],
    },
    {
      name: "Pro",
      price: "₹199/mo",
      features: ["Advanced Analytics", "Revenue Forecasting", "Integrations"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Custom Features", "Dedicated Support", "Team Management"],
    },
  ];

  const features = [
    {
      title: "Real-Time Analytics",
      desc: "Monitor revenue and expenses in real-time with advanced charts and insights.",
    },
    {
      title: "Seamless Integrations",
      desc: "Integrate with your favorite payment platforms like Stripe, PayPal, and more.",
    },
    {
      title: "Expense Tracking",
      desc: "Categorize, manage, and track expenses effortlessly.",
    },
    {
      title: "Revenue Predictions",
      desc: "AI-driven predictions to plan your future growth.",
    },
  ];

  const handleClick = () => {
    window.location.assign("/dashboard");
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <Spline
          scene="https://prod.spline.design/NIo7K10aRUdTdxBl/scene.splinecode"
          className="absolute inset-0"
        />

        <div className="absolute bottom-4 right-4 bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-semibold hover:text-green-400 transition-all">
          Spend Smart
        </div>
      </div>
      <div className="w-full h-screen relative">
        {/* <GoToDashboard />
        <FeaturesSection />
        <PricingSection />
        <Footer /> */}
        <section className="bg-black text-white min-h-[80vh] flex items-center justify-center relative overflow-hidden">
          <div className="z-0 opacity-50 absolute inset-0 flex justify-center items-center">
            <div
              className="absolute top-20 left-10 w-48 h-48 bg-zinc-700 rounded-full blur-3xl opacity-50 mix-blend-multiply"
              style={{ animation: "blob-animate 8s ease-in-out infinite" }}
            ></div>
            <div
              className="absolute top-10 right-20 w-56 h-56 bg-zinc-600 rounded-full blur-3xl opacity-40 mix-blend-multiply"
              style={{ animation: "blob-animate 10s ease-in-out infinite" }}
            ></div>
            <div
              className="absolute bottom-20 left-60 w-64 h-64 bg-zinc-500 rounded-full blur-3xl opacity-30 mix-blend-multiply"
              style={{ animation: "blob-animate 12s ease-in-out infinite" }}
            ></div>
          </div>

          <div className="relative z-10 p-8 rounded-xl bg-zinc-800/40 backdrop-blur-md border border-zinc-700/50 shadow-lg w-full sm:w-[450px] text-center">
            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay rounded-xl"></div>

            <h1 className="text-4xl font-extrabold mb-4 text-white leading-snug tracking-wide">
              Ready to Manage Your Revenue?
            </h1>
            <p className="text-sm text-zinc-400 mb-6">
              Leverage analytics, insights, and tools to boost your business.
            </p>

            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <div className="flex flex-col items-center">
                <TrendingUp className="text-indigo-400 w-8 h-8 mb-2" />
                <span className="text-xs text-zinc-300">Growth Analytics</span>
              </div>
              <div className="flex flex-col items-center">
                <Star className="text-yellow-400 w-8 h-8 mb-2" />
                <span className="text-xs text-zinc-300">Top Features</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="text-green-400 w-8 h-8 mb-2" />
                <span className="text-xs text-zinc-300">Secure & Trusted</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleClick}
                className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 rounded-md transform hover:scale-105 transition-all duration-200"
              >
                Go to SaaS Dashboard
              </button>
              <button className="px-6 py-2 text-sm font-medium bg-transparent border border-zinc-400 text-zinc-300 rounded-md hover:bg-zinc-700 transition duration-200">
                Learn More
              </button>
            </div>

            <div className="border-t border-zinc-700 mt-6 mb-4"></div>

            <div className="text-xs text-zinc-400">
              Trusted by{" "}
              <span className="text-white font-semibold">2,000+</span>
              businesses worldwide.
            </div>
          </div>

          <div className="absolute top-10 left-10 animate-bounce">
            <TrendingUp className="w-12 h-12 text-indigo-600/30" />
          </div>
          <div className="absolute bottom-10 right-10 animate-pulse">
            <Star className="w-10 h-10 text-yellow-500/40" />
          </div>

          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        </section>

        <section className="bg-black text-white py-20 px-6 relative">
          {/* Background Noise Texture */}
          <div className="absolute inset-0  opacity-10 mix-blend-overlay"></div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-zinc-800 rounded-3xl shadow-xl group hover:scale-105 hover:shadow-2xl transition-all duration-500 transform"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                {/* Noisy Texture Overlay */}
                <div className="absolute inset-0  opacity-20 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-300"></div>

                {/* Feature Content */}
                <Glowcard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.25)">
                <div className="relative z-10 p-8">
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-zinc-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400">{feature.desc}</p>
                </div></Glowcard>


                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-600/80 to-black opacity-20 group-hover:opacity-40 rounded-3xl transition-all "></div>
              </div>
            ))}
          </div>

          {/* Company Icons Marquee Section */}
          <div className="mt-20">
            <div className="overflow-hidden">
              <div className="flex space-x-8 animate-marquee">
                <div className="flex-shrink-0">
                  <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-800 to-amber-600 filter grayscale hover:grayscale-0 transition-all duration-500 outline-4 outline-offset-2 outline-gray-400 hover:outline-transparent">
                    Spend Smart.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-black text-white py-20 px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-zinc-800 opacity-60 mix-blend-overlay"></div>

          <h2 className="text-4xl font-bold text-center mb-12">
            Pricing Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="relative p-8 bg-zinc-800/50 rounded-lg shadow-xl group hover:scale-105 transition-all duration-500 transform"
              >
                <div className="z-10 relative">
                  <h3 className="text-2xl font-semibold mb-4 text-center group-hover:text-zinc-400 transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="text-4xl font-bold mb-4 text-center text-gradient group-hover:text-zinc-400 transition-colors duration-300">
                    {plan.price}
                  </p>
                </div>

                <ul className="text-zinc-400 mb-6 space-y-3 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="relative">
                      <span className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-zinc-600 to-gray-800"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="px-6 py-2 rounded-md bg-gradient-to-r from-zinc-700 to-black text-white font-semibold w-full transform hover:scale-105 transition-transform duration-300">
                  Choose Plan
                </button>

                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-black/50 opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        <footer className="bg-black text-zinc-400 text-center py-12 relative">
          <div className="absolute inset-0 "></div>

          <div className="relative z-10">
            <div className="flex justify-center space-x-8 mb-6">
              <a
                href="https://github.com/Asmit13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <svg
                  viewBox="0 0 256 250"
                  width="35"
                  height="35"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  className=" hover:scale-100 hover:-translate-y-3 transition-all"
                >
                  <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/asmit13/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <svg
                  width="35"
                  height="35"
                  className=" hover:scale-100 hover:-translate-y-3 transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                    fill="#0A66C2"
                  />
                </svg>
              </a>
            </div>

            <p className="text-lg font-semibold text-zinc-300 mb-4">
              Developed by{" "}
              <span className="hover:text-green-500 text-green-400 transition-all animate-pulse">
                 Asmit Aditya Singh
              </span>
            </p>

            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} SpendSmart. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
