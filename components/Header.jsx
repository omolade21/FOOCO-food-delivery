import Image from "next/image";
import css from "../styles/Header.module.css";

import { UilShoppingBag, UilReceipt } from "@iconscout/react-unicons";
import Logo from "../assets/Logo.png";
import { useStore } from "@/store/store";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [orderItem, setOrderItem] = useState("");

  useEffect(() => {
    setOrderItem(localStorage.getItem("order"));
  }, []);
  // state in terminal

  const items = useStore((state) => state.cart.pizzas.length);

  return (
    <div className={css.header}>
      {/* Left side  */}
      <div className={css.logo}>
        <Image src={Logo} alt="logo" width={50} height={50} />
        <span>Food</span>
      </div>

      {/* menu side */}
      <ul className={css.menu}>
        <li>
          <Link href="../">Home</Link>
        </li>
        <li>Menu</li>
        <li>Contact</li>
      </ul>

      {/* right side */}
      <div className={css.rightside}>
        <Link href="/cart">
          <div className={css.cart}>
            <UilShoppingBag size={35} color="#2E2E2E" />
            <div className={css.badge}>{items}</div>
          </div>
        </Link>
        {orderItem && (
          <Link href={`/order/${orderItem}`}>
            <div className={css.cart}>
              <UilReceipt size={35} color="#2E2E2E" />

              {orderItem != "" && <div className={css.badge}>1 </div>}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
