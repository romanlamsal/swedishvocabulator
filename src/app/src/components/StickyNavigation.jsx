import React from 'react'

class StickyNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {collapsed: false}
    }

    render() {
        const {collapsed} = this.state
        const {children} = this.props

        return <div className={"sticky-navigation " + (collapsed ? "collapsed" : "expanded")}>

            <div className={"collapse-container"}>
                {children}
            </div>

            <span onClick={() => this.setState({collapsed: !collapsed})}/>
        </div>
    }
}

export default StickyNavigation