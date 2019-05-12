import {getDisplayComponentByWordtype} from "../../util/IndexCardUtil";
import React from "react";

export const IndexCardQuiz = ({quiztype, german, wordtype, swedish, onClick, onClickDelete}) => {
    const SwedishComponent = getDisplayComponentByWordtype(wordtype)
    return <div
        className={"index-card " + wordtype.toLowerCase() + " quiz " + quiztype}
        tabIndex={1} onClick={onClick}
    >
        <div><p>{german}</p></div>
        <hr/>
        <SwedishComponent data={swedish} key={"swedish"}/>
    </div>
}