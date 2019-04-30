import React from 'react'
import {connect} from "react-redux";
import {IndexCard, IndexCardSmall} from "./IndexCard";
import {save} from "../repository/lectureRepository";

export const WORDTYPES = {
    FREE_TEXT: "FREE_TEXT",
    VERB: "VERB",
    ADJECTIVE: "ADJ",
    NOUN: "NOUN"
}


class Lecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentIndexCard: 0}
    }

    componentDidUpdate(prevProps) {
        let currentNumIndexCards = this.props.indexCards.length;
        let previousNumIndexCards = prevProps.indexCards.length;
        if (previousNumIndexCards < currentNumIndexCards)
            this.setState({currentIndexCard: currentNumIndexCards - 1})
        else if (previousNumIndexCards > currentNumIndexCards)
            this.setState({currentIndexCard: Math.min(currentNumIndexCards - 1, this.state.currentIndexCard)})
    }

    onAddCard() {
        window.scrollTo({top: 0})
        this.props.addIndexCard()
    }

    saveLecture() {
        save(this.nameInput.value, this.descriptionInput.value, this.props.indexCards)
    }

    render() {
        const {indexCards, updateIndexCard, deleteIndexCard} = this.props;
        const {currentIndexCard} = this.state

        return <div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 10fr", marginBottom: "24px"}}>
                <label>Name der Lektion </label><input ref={ref => this.nameInput = ref}/>
                <label>Beschreibung (optional)</label><textarea ref={ref => this.descriptionInput = ref}/>
            </div>
            <div className={"lecture control-bar"}>
                <button onClick={this.saveLecture.bind(this)}>Lektion speichern</button>
            </div>
            <div className={"lecture current-index-card"}>
                <IndexCard {...indexCards[currentIndexCard]} key={currentIndexCard + indexCards.length}
                           update={updateIndexCard(currentIndexCard)}
                           onSave={this.onAddCard.bind(this)}
                />
            </div>
            <div className={"lecture index-cards"}>
                {
                    indexCards.map((indexCard, index) =>
                        <IndexCardSmall onClick={() => this.setState({currentIndexCard: index},
                            () => window.scrollTo({top: 0, behavior: "smooth"}))}
                                        onClickDelete={deleteIndexCard(index)}
                                        isFocused={index === currentIndexCard}
                                        {...indexCards[index]}
                                        key={index}
                        />
                    )
                }
                <div className={"add-index-card"} onClick={this.onAddCard.bind(this)}>
                    <span className="glyphicon glyphicon-plus"/>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    indexCards: state.indexCards
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    addIndexCard: () => dispatch({type: "ADD_INDEX_CARD"}),
    deleteIndexCard: (index) => () => dispatch({type: "DELETE_INDEX_CARD", index}),
    updateIndexCard: (index) => (data) => dispatch({type: "UPDATE_INDEX_CARD", index, data})
})
export default connect(mapStateToProps, mapDispatchToProps)(Lecture)