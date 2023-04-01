import Layout from "@/components/Layout";
import { client, urlFor } from "@/lib/client";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import Image from "next/image";
import css from "../../styles/Pizza.module.css";
import React, { useState } from "react";
import { useStore } from "@/store/store";
import toast , { Toaster} from "react-hot-toast"

export default function Pizza({ pizza }) {
  const src = urlFor(pizza.image).url();

  const [size, setSize] = useState(1);

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (type) => {
    type === "increment"
      ? setQuantity((prev) => prev + 1)
      : quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };



// add to cart function

const addPizza = useStore((state) => state.addPizza)
const addToCart = () =>{
addPizza({...pizza, price: pizza.price[size] , quantity:quantity , size:size})
toast.success("added to cart")

}



  return (
    <Layout>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            loader={() => src}
            src={src}
            alt=""
            unoptimized
            object-fit="contain"
            layout="fill"
          />
        </div>

        {/* right side  */}
        <div className={css.right}>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>

          <span>
            {" "}
            <span style={{ color: "var(--themeRed)" }}>$</span>{" "}
            {pizza.price[size]}
          </span>
          <div className={css.size}>
            <span> Size</span>
            <div className={css.SizeVariant}>
              <div
                className={size === 0 ? css.selected : ""}
                onClick={() => setSize(0)}
              >
                Small{" "}
              </div>
              <div
                className={size === 1 ? css.selected : ""}
                onClick={() => setSize(1)}
              >
                Medium{" "}
              </div>
              <div
                className={size === 2 ? css.selected : ""}
                onClick={() => setSize(2)}
              >
                Large{" "}
              </div>
            </div>
          </div>

          {/* Quatitty */}
          <div className={css.quatity}>
            <span>Quatity</span>
            <div className={css.counter}>
              <Image
                src={LeftArrow}
                alt=""
                height={20}
                width={20}
                object-fit="contain"
                onClick={() => handleQuantity("decrement")}
              />

              <span style={{ position: "relative", bottom: "10px" }}>{quantity}</span>
              <Image
                src={RightArrow}
                alt=""
                height={20}
                width={20}
                object-fit="contain"
                onClick={() => handleQuantity("increment")}
              />
            </div>
          </div>

          {/* button */}
          <div className={`btn ${css.btn}`}  onClick={addToCart} > Add to cart</div>
       
       
        </div>

        <Toaster/>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="pizza"  && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current == '${slug}'][0]`
  );
  return {
    props: {
      pizza,
    },
  };
}
