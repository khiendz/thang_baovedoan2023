import { RoomType } from "Models";
import { Select } from "antd";
import { useAppContext } from "hook/use-app-context";

export const SelectRoom = () => {
  const { data: roomTypes } = useAppContext("room-types");
  const { data: tour, setData: setTour } = useAppContext("tour");
  return roomTypes && tour ? (
    <Select
    placeholder="Chọn phòng của khách sạn"
    className="dk-w-full dk-h-fit"
    defaultValue={{ value: 0, label: "Tự động chọn phòng" }}
    options={[
      {
        value: 0,
        label: (
          <div className="dk-font-Roboto dk-text-yellow-600">
            Tự động chọn phòng
          </div>
        ),
      },
      ...roomTypes?.map((ob: RoomType) => {
        return {
          value: ob.RoomTypeId,
          label: (
            <div className="dk-font-Inter dk-text-sm dk-font-semibold dk-flex dk-flex-col dk-h-fit dk-p-2">
              <span className="dk-font-Roboto dk-font-bold">
                Tên phòng:{" "}
                <span className="dk-font-normal">{ob?.Name}</span>
              </span>
              <span className="dk-font-Roboto dk-font-bold">
                Tối đa số người:{" "}
                <span className="dk-font-normal">
                  {ob.MaxOccupancy}
                </span>
              </span>
              <span className="dk-font-Roboto dk-font-bold">
                Giá phòng:{" "}
                <span className="dk-font-normal">{ob.Price}</span>
              </span>
              <span className="dk-font-Roboto dk-font-bold">
                Phí trễ phòng:{" "}
                <span className="dk-font-normal">{ob.KateFee}</span>
              </span>
            </div>
          ),
          ob: ob,
        };
      }),
    ]}
    onChange={(value) => {
      setTour({ ...tour, RoomTypeId: value });
    }}
    />
  ) : null;
};
