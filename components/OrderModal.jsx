import { Modal, useMantineTheme } from "@mantine/core";
import css from "../styles/OrderModal.module.css";
import React, { useState } from "react";
import { createOrder } from "@/lib/orderHander";
import { useStore } from "@/store/store";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function OrderModal({ opened, setOpened, paymentMethod }) {
  const theme = useMantineTheme();
  const router = useRouter();

  const [formData, setFormData] = useState({});
  // handle input all together
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetCart = useStore((state) => state.resetCart);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...formData, total, paymentMethod });
    // console.log("Order Placed", id);
    toast.success("order placed succefully");
    resetCart();

    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }

    router.push(`/order/${id}`);
  };

  const total = typeof window !== "undefined" && localStorage.getItem("total");

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(null)}
      title=" Place your Order "
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} className={css.formContainer} action="">
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Enter your Name"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Pnone Number"
        />
        <textarea
          onChange={handleInput}
          name="address"
          id=""
          rows={3}
          placeholder="Address"
        ></textarea>

        <span>
          You will pay <span>$ {total}</span> on delivery
        </span>

        <button type="submit" className="btn">
          Place order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
}
