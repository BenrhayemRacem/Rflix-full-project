import {useGlobalContext} from "../../globalContext/GlobalContext";

import styles from "./alert.module.css"

export const Alert = () => {
    const {alert} = useGlobalContext() ;

    return (

            <div className={`alert-${alert.variant} ${styles.alerting} alert     `}>
                <h2>{alert.message}</h2>
            </div>
        )


}