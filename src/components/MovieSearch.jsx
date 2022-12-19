import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { UsersIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { searchQueryState, searchState } from "../state/appState";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MovieSearch() {
  const [query, setQuery] = useState("");

  const [open, setOpen] = useRecoilState(searchState);
  const [queries, setQueries] = useRecoilState(searchQueryState);

  //fetch query from api
  const { data, error } = useSWR(
    `https://www.omdbapi.com/?apikey=cf52487f&s=${query}`,
    fetcher
  );

  data && setQueries(data.Search);

  const navigate = useNavigate();
  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery("")}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(movie) => (window.location = movie.Poster)}
          >
            {({ activeOption }) => (
              <>
                <div className="relative ">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="  h-12 w-full border-none outline-none bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                    autoComplete="off"
                  />
                </div>

                {query === "" ||
                  (queries && (
                    <Combobox.Options
                      as="div"
                      static
                      hold
                      className="flex divide-x divide-gray-100"
                    >
                      <div
                        className={classNames(
                          "max-h-150 min-w-0 flex-auto scroll-py-4  px-6 py-4",
                          activeOption && "sm:h-96"
                        )}
                      >
                        <div className="-mx-2 text-sm text-gray-700">
                          {(query === "" ? recent : queries).map((movie) => (
                            <Combobox.Option
                              as="div"
                              key={movie.imdbID}
                              value={movie}
                              onClick={() => {
                                navigate(`/${movie.imdbID}`);
                                navigate.goBack();
                              }}
                              className={({ active }) =>
                                classNames(
                                  "flex cursor-default select-none items-center rounded-md p-2",
                                  active && "bg-gray-100 text-gray-900"
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <img
                                    src={movie.Poster}
                                    className="h-6 w-6 flex-none rounded-sm"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {movie.Title} - {movie.Year}
                                  </span>
                                  {active && (
                                    <ChevronRightIcon
                                      className="ml-3 h-5 w-5 flex-none text-gray-400"
                                      aria-hidden="true"
                                    />
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </div>
                      </div>

                      {activeOption && (
                        <div className="hidden  w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                          <div className="flex-none p-6 text-center">
                            <img
                              src={activeOption.Poster}
                              alt=""
                              className="mx-auto h-25 rounded-sm"
                            />
                            <h2 className="mt-3 font-semibold text-gray-900">
                              {activeOption.Title}
                            </h2>
                            <p className="text-sm leading-6 text-gray-500">
                              {activeOption.Year}
                            </p>
                          </div>
                          <div className="flex flex-auto flex-col justify-between p-6">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                              <dt className="col-end-1 font-semibold text-gray-900">
                                IMDB ID
                              </dt>
                              <dd>{activeOption.imdbID}</dd>

                              <dt className="col-end-1 font-semibold text-gray-900">
                                Type
                              </dt>
                              <dd className="truncate">
                                <a className="">{activeOption.Type}</a>
                              </dd>
                            </dl>
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/${activeOption.imdbID}`)
                              }
                              className="mt-6 w-full rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Show Details
                            </button>
                          </div>
                        </div>
                      )}
                    </Combobox.Options>
                  ))}

                {query !== "" && queries == undefined && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <UsersIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="mt-4 font-semibold text-gray-900">
                      No movie found
                    </p>
                    <p className="mt-2 text-gray-500">
                      We couldn’t find anything with that term. Please try
                      again.
                    </p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
