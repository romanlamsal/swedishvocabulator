import React from "react";

class Swipeable extends React.Component {

    onTouchStart(ev) {
        this.touchDownX = ev.touches[0].screenX
        this.props.onTouchStart(ev)
    }

    onTouchEnd(ev) {
        let touchUp = ev.changedTouches[0].screenX
        if (this.touchDownX !== null && Math.abs(touchUp - this.touchDownX) > 50) {
            if (touchUp > this.touchDownX) //swipe right
                this.props.onSwipeRight()
            else
                this.props.onSwipeLeft()
    }
        this.props.onTouchEnd(ev)
    }

    render() {
        const {children, className, onTouchStart, onTouchEnd, onSwipeRight, onSwipeLeft, ...givenProps} = this.props
        return <div onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}
                    className={className + " swipeable"} {...givenProps}>
            {children}
        </div>
    }
}

Swipeable.defaultProps = {
    onSwipeRight: () => null,
    onSwipeLeft: () => null,
    onTouchStart: () => null,
    onTouchEnd: () => null
}
export default Swipeable