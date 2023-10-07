import { LoadingOutlined } from "@ant-design/icons";
import Link from 'next/link';

export default function UserAccount() {
    return <>
      <div className="dk-pr-28 dk-flex dk-w-fit">
        <button className="dk-flex dk-flex-row dk-justify-end dk-w-[200px]">
          Authen
        </button>
        <ul hidden className="dk-absolute">
          <li><Link href={"./tai-khoan.htm"}><span>Tài khoản</span></Link></li>
          <li><Link href={"./tai-khoan.htm"}><span>Lịch sử giao dịch</span></Link></li>
        </ul>
      </div>
    </>
}