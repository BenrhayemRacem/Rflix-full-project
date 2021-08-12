import  styles from "./homeJoinUs.module.css"
import {data} from "./data";
import {HomeSingleQuestion} from "../homeSingleQuestion/HomeSingleQuestion";


export const HomeJoinUs = ()=> {
    return(
       <>
           <div className={`${styles.global} d-flex flex-column col-8`}>
               {data.map((item)=> <HomeSingleQuestion  item={item} key={item.id}/> )}
           </div>
       </>

    )
}