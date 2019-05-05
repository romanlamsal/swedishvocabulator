import React, {Component} from 'react'
import * as PropTypes from "prop-types";

const adjectiveFieldsToLabel = {
    singular_utrum_indefinite: "Sg. u. obest.",
    singular_neutrum_indefinite: "Sg. n. obest.",
    singular_definite: "Sg. best.",
    plural: "Pl.",
    comparative: "Comp.",
    superlative: "Sup."
}

const nounFieldsToLabel = {
    singular_indefinite: "Sg. obest.",
    noun_type: "en/ett",
    singular_definite: "Sg. best.",
    plural_indefinite: "Pl. obest.",
    plural_definite: "Pl. best."
}

const verbFieldsToLabel = {
    infinitive: "Inf.",
    present_tense: "Presens",
    preterite: "Pret.",
    imperative: "Imp.",
    supinum: "Supinum"
}

const SwedishCard = (fieldToLabel, editable=false) => class extends Component {
    static IDENTIFIER = Object.keys(fieldToLabel)[0]

    render() {
        let {data, onChange, ...props} = this.props;
        let className = "index-card swedish"
        if (editable)
            className += " edit"

        return <div {...props} className={className}>
            {
                Object.entries(fieldToLabel).map(([dataField, label], index) => [
                    <label key={label}>{label}</label>,

                    editable ? <input key={"input_" + label} value={data[dataField] || ""} onChange={onChange(dataField)}
                           autoFocus={index === 0}
                    /> : <div key={"display_" + label}>{data[dataField] || ""}</div>
                ])
            }
        </div>;
    }
}

SwedishCard.propTypes = {
    data: PropTypes.any,
    onChange: PropTypes.any
}
SwedishCard.defaultProps = {
    onChange: () => () => null
}


export const AdjectiveCard = SwedishCard(adjectiveFieldsToLabel)
export const NounCard = SwedishCard(nounFieldsToLabel)
export const VerbCard = SwedishCard(verbFieldsToLabel)
export const FreeTextCard = SwedishCard({value: "Freitext"})

export const AdjectiveCardEdit = SwedishCard(adjectiveFieldsToLabel, true)
export const NounCardEdit = SwedishCard(nounFieldsToLabel, true)
export const VerbCardEdit = SwedishCard(verbFieldsToLabel, true)
export const FreeTextCardEdit = SwedishCard({value: "Freitext"}, true)