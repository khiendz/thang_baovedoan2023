import Image from "next/image";
import Navigation from "components/Navigation/Navigation";
import Header from "components/Header";
import "app/global.scss";
import { RootStyleRegistry } from "modules/shared/components/Root-style-registry";
const LayoutDefault = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <Navigation />
      <RootStyleRegistry>
        <div className="dk-w-full dk-flex dk-justify-center dk-mt-5 dk-items">
          <div className="dk-w-[1158px] dk-flex dk-justify-center dk-mt-5 dk-gap-8 dk-items">
            <div className="dk-w-[300px] dk-h-[600px] dk-bg-blue-200 dk-flex dk-items-center dk-justify-center">
              <svg
                className="dk-animate-spin dk-h-5 dk-w-5 dk-text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="dk-opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="dk-opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <div className="container dk-w-[516px]">{children}</div>
            <div className="dk-w-[300px] dk-h-[600px] dk-bg-blue-200 dk-flex dk-items-center dk-justify-center dk-px-4">
              <svg
                className="dk-animate-spin dk-h-5 dk-w-5 dk-text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="dk-opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="dk-opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </RootStyleRegistry>
    </>
  );
};

export default LayoutDefault;
