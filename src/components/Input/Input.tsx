import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

export default function Input({
    label,
    error,
    ...props
}:InputProps){

    return(

        <div className={styles.container}>

            {label && <label>{label}</label>}

            <input
                {...props}
                className={styles.input}
            />

            {error && <span>{error}</span>}

        </div>

    );

}