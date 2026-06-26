import styles from "./Card.module.css";
import type { CardProps } from "./Card.types";

export default function Card({children}:CardProps){

    return(

        <div className={styles.card}>
            {children}
        </div>

    );

}