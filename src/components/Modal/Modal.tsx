import styles from "./Modal.module.css";
import type { ModalProps } from "./Modal.types";

export default function Modal({
    open,
    title,
    children,
    onClose
}:ModalProps){

    if(!open) return null;

    return(

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>

                    <h3>{title}</h3>

                    <button onClick={onClose}>X</button>

                </div>

                {children}

            </div>

        </div>

    );

}