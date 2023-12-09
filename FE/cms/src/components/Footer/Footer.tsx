import { useAppContext } from "hook/use-app-context";
import { userService } from "services";

export default function Footer() {
    const { data: user } = useAppContext("user");
    return <div className={`dk-flex dk-min-h-14 dk-bg-[#003C71] dk-border-t-[5px] dk-border-[#ffffff] dk-p-5 ${user ? "" : "dk-hidden"}`}>
        <ul className="info dk-flex dk-flex-col dk-items-end dk-font-Inter dk-text-sm dk-font-medium dk-list-none dk-text-[#FFF]">
            <li>Website đặt tour du lịch trực tuyến</li>
            <li>Tổng phụ trách: Thắng</li>
            <li>Liên hệ quảng cáo: 0382033516</li>
            <li>Website đặt tour du lịch trực tuyến</li>
            <li>Website đặt tour du lịch trực tuyến</li>
        </ul>
    </div>
}