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
            <div className="container dk-w-[516px]">{children}</div>
          </div>
        </div>
      </RootStyleRegistry>
    </>
  );
};

export default LayoutDefault;
