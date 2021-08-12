import {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import styles from "./HomeSingleQuestion.module.css"


export const HomeSingleQuestion = (props) => {
const {question , answer} = props.item ;
const [showMore ,setShowMore] = useState(false)
const iconToDisplay = showMore? <FaChevronUp/>:<FaChevronDown/>
    const className =  showMore? styles.singleQuestion2 :styles.singleQuestion
    const answerToDisplay = showMore? answer : ''
    return (

            <div className={className}>
            <h2>
        <span> {question}</span>
            <button onClick={() => setShowMore(!showMore)}>
                {iconToDisplay}
            </button>
            </h2>
            <p> {answerToDisplay}</p>
            </div>


    )

}