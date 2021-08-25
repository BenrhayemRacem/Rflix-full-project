import {HomeMainImage} from "../../components/homeMainImage/HomeMainImage";
import {HomeDescription} from "../../components/homeDescription/HomeDescription";
import {HomeJoinUs} from "../../components/homeJoinUs/HomeJoinUs";


export const Home = () => {

    return(
        <>
            <div className="container-fluid">

            <HomeMainImage/>
            <HomeDescription/>
            <HomeJoinUs/>
            </div>
        </>
    )
}