import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import Reviews from "./Reviews";

import { Popover, Transition } from "@headlessui/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


const navigation = [
  { name: "Moviez", href: "/" },
  { name: "🧑‍💻 Developer", href: "https://github.com/kafle1" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MovieDetail({ id }) {
  //fetch movie from api
  const { data, error } = useSWR(
    `https://www.omdbapi.com/?apikey=cf52487f&i=${id}`,
    fetcher
  );
  console.log("data", data);
  if (error) return <div className="text-center mt-20" >Failed to load</div>;
  if (!data) return <div className="text-center mt-20" >Loading ...</div>;
  if (data) {
    return (
      <div className="bg-white">
         <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only text-red-600">Moviez</span>
                        <img
                          className="h-8 w-auto sm:h-10"
                          src="https://scontent.fktm7-1.fna.fbcdn.net/v/t39.30808-1/231737489_698878944315129_4407130480041611016_n.png?stp=dst-png_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=c6021c&_nc_ohc=BWBozWGAGMsAX9CtKOr&_nc_oc=AQmwUMpFPDjDyvU4OGAv7J6r2n1GOcymxlLu_polZTi1-1sdwZ7TNsIg3IuOvonKagM&_nc_ht=scontent.fktm7-1.fna&oh=00_AfBDzDEy0lH1jQrpJtkdYrlwg3t9EhKpUi194FwfdZt32g&oe=63A38FC8"
                        />
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                          <span className="sr-only">Open main menu</span>
                          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="font-medium text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
                    <a
                     href="/"
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      🔍 Search Movie
                    </a>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-red-600.svg"
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                          <span className="sr-only">Close main menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                   
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

        <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Movie */}
          <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Movie image */}
            <div className="lg:row-end-1 lg:col-span-2">
              <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                <img
                  src={data.Poster}
                  alt={data.Title}
                  className="object-center object-cover"
                />
              </div>
            </div>

            {/* Movie details */}
            <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-5">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-extrabold tracking-tight text-red-600 sm:text-3xl">
                    {data.Title}{" "}
                    <span className="text-gray-600 text-1xl">
                      {" "}
                      ({data.Year}){" "}
                    </span>
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Movie information
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 font-bold">
                    Version {data.Genre} (
                    <time dateTime={data.Released}>{data.Released}</time>
                    )
                  </p>
                </div>

                <div>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          data.imdbRating > rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{data.imdbRating} out of 5 stars</p>
                </div>
              </div>

              <p className="text-gray-500 mt-6">{data.Plot}</p>

              <div className="border-t border-gray-200 mt-10 pt-10 ">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Details
                </h3>
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-red-600">
                      Country
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.Country}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-red-600">
                      Language
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.Language}
                    </dd>
                  </div>
                  <div className=" bg-gray-50  px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-red-600">
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.Runtime}
                    </dd>
                  </div>
                  <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-red-600">
                      Director
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.Director}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-red-600">
                      Writer
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.Writer}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-red-600">IMDB</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.imdbRating}/10 ( {data.imdbVotes} Votes)
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-red-600">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {data.Type}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
              <Reviews ratings={data.Ratings} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
