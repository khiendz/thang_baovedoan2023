import Image from "next/image";
import Navigation from "components/Navigation/Navigation";
import Header from "components/Header";
import "app/global.scss";
import { RootStyleRegistry } from "modules/shared/components/Root-style-registry";
const LayoutDefault = ({children}: { children: React.ReactNode }) => {
  return (
    <>
      <Header></Header>
      <Navigation />
      <RootStyleRegistry>
        <div className="dk-w-[1280px] dk-flex dk-justify-center dk-mt-5">
          {children}
        </div>
      </RootStyleRegistry>
    </>
  );
};

export default LayoutDefault;
