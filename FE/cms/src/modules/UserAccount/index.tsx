"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import LoginComponent from "components/LoginPopup";
import { useAppContext } from "hook/use-app-context";
import { userService } from "services";

export default function UserAccount() {
  const { data: user, setData: setUser } = useAppContext("user");

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  return (
    <>
      <div className="dk-pr-28 dk-flex dk-w-fit dk-h-full dk-items-center">
        {user ? (
          <div>
            Xin chào {user.user.FirstName}
            <a onClick={logout} className="nav-item nav-link">
              Logout
            </a>
          </div>
        ) : (
          <LoginComponent />
        )}
      </div>
    </>
  );
}
