import css from "../styles/Menu.module.css";
import Image from "next/image";
import { urlFor } from "@/lib/client";
import Link from "next/link";

export default function Menu({ cake }) {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        <span>OUR MENU</span>
        <span>Menu That Always</span>
        <span>Make you Fall in Love</span>
      </div>

      {/* pizzas */}
      <div className={css.menu}>
        {cake.map((pizza, id) => {
          const src = urlFor(pizza.image).url();

          return (
            <div className={css.pizza} key={id}>
              <Link href={`./pizza/${pizza.slug.current}`} passHref>
                <div className={css.imageWrapper}>
                  <Image
                    loader={() => src}
                    src={src}
                    alt=""
                    layout="fill"
                    object-fit="cover"
                  />
                </div>
              </Link>
              <span>{pizza.name}</span>
              <span>
                <span style={{ color: "var(--themeRed)" }}> $</span>
                {pizza.price[1]}
              </span>
        
            </div>
          );
        })}
      </div>
    </div>
  );
}
