import {getEditComponentByWordtype} from "../../util/IndexCardUtil";
import React from "react";

export const IndexCardSmall = ({german, swedish, wordtype, isFocused, onClick, onClickDelete}) => <div
    className={"index-card " + wordtype.toLowerCase() + " small" + (isFocused ? " focused" : "")}
    tabIndex={1} onClick={onClick}
>
    <div><p>{german}</p></div>
    <hr/>
    <div><p>{swedish[getEditComponentByWordtype(wordtype).IDENTIFIER]}</p></div>
    <span className={"delete-overlay"} onClick={onClickDelete}>
        <span className={"glyphicon glyphicon-remove"}/>
    </span>
</div>