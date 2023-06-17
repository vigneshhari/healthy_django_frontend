import { useState, useEffect } from "react";
import { GlobeIcon } from "@heroicons/react/outline";
import axios from "axios";

const statusPageAPI = "";

const initialState = {
  pages: [],
  isLoading: false,
};

const getCleanStatus = (status) => {
  if (status === 200) {
    return "ONLINE";
  }
  return "OFFLINE";
};

function StatusPage() {
  const [state, setstate] = useState({ pages: [], isLoading: true });

  const fetchData = () => {
    axios
      .post(statusPageAPI)
      .then((resp) => {
        setstate({ pages: resp.data.health, isLoading: false });
      })
      .catch((ex) => {});
  };

  useEffect(() => {
    fetchData();
    setInterval(fetchData, 5 * 60 * 1000);
  }, [0]);

  const cleanMetaData = (meta) => {
    if (!Object.keys(meta).length) {
      return "";
    }
    return Object.keys(meta).map((key, index) => (
      <p key={index}>
        {key} - {meta[key]}
      </p>
    ));
  };

  return (
    <div className="relative bg-gray-50 overflow-hidden background flex-1 h-full min100">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className=" inline">Status</span>
              <span className=" text-green-400 inline">Page</span>
            </h1>
            {state.isLoading && (
              <div>
                <GlobeIcon className="block m-auto mt-24 w-15 h-15 l-20 text-center animate-spin text-gray-900 "></GlobeIcon>
              </div>
            )}
            {!state.isLoading && (
              <div className="relative mt-12">
                <div className="absolute inset-0 h-1/2 bg-gray-50" />
                {state.pages.map(({ name, latency, code, meta, title }) => {
                  return (
                    <div
                      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"
                      key={name}
                    >
                      <div className="max-w-6xl mx-auto">
                        <dl className="rounded-lg bg-white shadow-md sm:grid sm:grid-cols-5">
                          <div className="flex flex-col col-span-3  border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt className="order-2 mt-2 text-l leading-6 font-medium text-gray-500">
                              {title} <br />
                              {cleanMetaData(meta)}
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-gray-800">
                              {name}
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-b border-gray-200 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                            <dt className="order-2 mt-2 text-l leading-6 font-medium text-gray-500">
                              Latency
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-gray-800">
                              <span>
                                <span className="h-4 w-4">
                                  <span className=" bottom-49 md:top-10 animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75" />
                                  <span className="  bottom-49 md:top-10 absolute inline-flex rounded-full h-4 w-4 bg-green-500" />
                                </span>
                                <span className="ml-6 text-green-500">
                                  {latency} s
                                </span>
                              </span>
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                            <dt className="order-2 mt-2 text-l leading-6 font-medium text-gray-500">
                              Status - {code}
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-green-500">
                              {getCleanStatus(code)}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
export default StatusPage;
