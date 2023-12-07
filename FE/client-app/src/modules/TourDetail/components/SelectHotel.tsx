import { Hotel } from "Models";
import { Select } from "antd";
import { useAppContext } from "hook/use-app-context";
import { StarOutlined } from "@ant-design/icons";

export const SelectHotel = () => {
  const { data: hotels, setData: setHotels } = useAppContext("hotels");
  const { data: tour, setData: setTour } = useAppContext("tour");
  return hotels && tour ? (
    <Select
      className="dk-w-full dk-h-fit"
      defaultValue={{ value: 0, label: "Tự đăng ký khách sạn" }}
      options={[
        { value: 0, label: "Tự đăng ký khách sạn" },
        ...hotels?.map((ob: Hotel) => {
          return {
            value: ob.HotelId,
            label: (
              <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col dk-h-fit dk-p-2">
                <span className="dk-font-Roboto dk-font-bold">
                  Tên khách sạn:{" "}
                  <span className="dk-font-normal">{ob?.Name}</span>
                </span>
                <span className="dk-font-Roboto dk-font-bold">
                  Số sao:{" "}
                  <span className="dk-font-normal">
                    {ob.StarRating}{" "}
                    <StarOutlined
                      style={{ color: "#ffcc00" }}
                      twoToneColor="#ffcc00"
                    />
                  </span>
                </span>
                <span className="dk-font-Roboto dk-font-bold">
                  Miêu tả:{" "}
                  <span className="dk-font-normal">{ob.Description}</span>
                </span>
                <span className="dk-font-Roboto dk-font-bold">
                  Địa chỉ: <span className="dk-font-normal">{ob.Address}</span>
                </span>
                <span className="dk-font-Roboto dk-font-bold">
                  Địa chỉ email:{" "}
                  <span className="dk-font-normal">{ob.Email}</span>
                </span>
              </div>
            ),
            ob: ob,
          };
        }),
      ]}
      onChange={(value) => {
        setTour({ ...tour, HotelId: value });
      }}
    />
  ) : null;
};
