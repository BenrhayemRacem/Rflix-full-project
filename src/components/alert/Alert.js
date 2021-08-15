import {useGlobalContext} from "../../globalContext/GlobalContext";



export const Alert = () => {
    const {alert} = useGlobalContext() ;

    return (

            <div className={`alert-${alert.variant} alert   `}>
                <h2>{alert.message}</h2>
            </div>
        )


}