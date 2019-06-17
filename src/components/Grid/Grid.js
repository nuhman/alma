import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DragScrollProvider from 'drag-scroll-provider';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './Grid.css';

class Grid extends Component {

    // constructor(props) {
    //     super(props);
    //     // this.myRef = React.createRef();

    //     // this.state = {
    //     //     isDown: false,
    //     //     startX: null,
    //     //     scrollLeft: null
    //     // }

    //     this.state = {isScrolling: false};

    //     this.handleMouseDown = this.handleMouseDown.bind(this);   
    //     this.handleMouseLeave = this.handleMouseLeave.bind(this);
    //     this.handleMouseUp = this.handleMouseUp.bind(this);
    //     this.handleMouseMove = this.handleMouseMove.bind(this);  
    // }


    // componentWillUpdate = (nextProps, nextState) =>{
    //     if(this.state.isScrolling !== nextState.isScrolling ) {
    //       this.toggleScrolling(nextState.isScrolling);
    //      }
    // };

    // toggleScrolling = (isEnable) => {
    //     if (isEnable) {
    //       window.addEventListener('mousemove', this.handleMouseMove);
    //       window.addEventListener('mouseup', this.handleMouseUp);
    //     } else {
    //       window.removeEventListener('mousemove', this.handleMouseMove);
    //     }
    // };

    // onScroll = (event) => {
    // };

    renderElements(){
        const elements = this.props.children.map( (ele, i) => {
            return(
                <div 
                    //onMouseDown={this.handleMouseDown} 
                    key={i} 
                    className="grid-element"
                    //onDragStart={this.handleMouseMove}
                    //onScroll={this.handleMouseMove}
                    //onMouseDown={this.onScroll}
                    // onMouseLeave={this.handleMouseLeave}
                    //onMouseMove={this.handleMouseMove}
                    //onDragEnd={this.handleMouseUp}
                    >
                    {ele}
                </div>
            );
        });
        return elements;
    }

    // handleMouseDown(event){
    //     console.log("TRIGGERED: handleMouseDown");
    //     const {scrollLeft, scrollTop} = this._scroller;
    //     console.log(scrollLeft, scrollTop, event.clientX, event.clientY);
    //     this.setState({
    //         isScrolling:true, scrollLeft, scrollTop, clientX:event.clientX, clientY:event.clientY
    //     }, () => console.log("DONE: handleMouseDown"));

    //     // this.setState({
    //     //     isDown: true,
    //     //     startX: e.pageX - this.myRef.offsetLeft,
    //     //     scrollLeft: this.myRef.scrollLeft
    //     // }, () => console.log("DONE: handleMouseDown"));

    // }

    // handleMouseLeave(event){
    //     console.log("TRIGGERED: handleMouseLeave");

    //     this.setState({
    //         isDown: false
    //     }, () => console.log("DONE: handleMouseLeave"));
    // }

    // handleMouseUp(e){
    //     console.log("TRIGGERED: handleMouseUp");

    //     this.setState({isScrolling: false, 
    //         scrollLeft: 0, scrollTop: 0,
    //         clientX: 0, clientY:0}, () => console.log("DONE: handleMouseUp"));

    //     // this.setState({
    //     //     isDown: false
    //     // }, () => console.log("DONE: handleMouseUp"));
    // }

    // handleMouseMove(event){
    //     event.persist();
    //     console.log("TRIGGERED: handleMouseDown");
    //     let {scrollLeft, scrollTop} = this._scroller;
    //     console.log(scrollLeft, scrollTop, event.clientX, event.clientY);
    //     this.setState({
    //         isScrolling:true, scrollLeft, scrollTop, clientX:event.clientX, clientY:event.clientY
    //     }, () => {
    //         console.log("DONE: handleMouseDown")
    //         console.log("TRIGGERED: handleMouseMove");
    //         let {isScrolling, clientX, clientY} = this.state;
    //         scrollLeft = this.state.scrollLeft;
    //         scrollTop = this.state.scrollTop;
    //         console.log("ONMOUSEMOVE: isscrolling", isScrolling);
    //         if(!isScrolling) return;
    //         let x = scrollLeft - clientX;
    //         console.log("move", x);
    //         console.log("X Scroll", this._scroller.scrollLeft);
    //         this._scroller.scrollLeft = x;// + event.clientX;
    //         this._scroller.scrollTop = scrollTop - clientY;// + event.clientY;
    //         console.log("X Scroll", this._scroller.scrollLeft);
    //         console.log("scrollLeft", scrollLeft, "clientX", clientX, "event.clientX", event.clientX);
    //         console.log("DONE: handleMouseMove");
    //     });


        
    //     // if(!this.state.isDown) return;
    //     // e.preventDefault();
    //     // const x = e.pageX - this.myRef.offsetLeft;
    //     // const walk = (x - this.state.startX) * 3; //scroll-fast
    //     // this.myRef.scrollLeft = this.state.scrollLeft - walk;
        
    // }


    // componentDidMount(){
    //     // this.myRef.addEventListener('mousedown', (e) => {
    //     //     this.isDown = true;
    //     //     //slider.classList.add('active');
    //     //     this.startX = e.pageX - this.myRef.offsetLeft;
    //     //     this.scrollLeft = this.myRef.scrollLeft;
    //     //   });
    // }


    // attachScroller = (scroller) => {
    //     this._scroller = ReactDOM.findDOMNode(scroller);
    // };
    

    render(){
        return(
            <div className="grid-container">
                <div className="grid-header">
                    {this.props.header && !this.props.loading ? <h1>{this.props.header}</h1> : null}
                </div>
                    <div className="grid-content">
                        {this.renderElements()}
                    </div>
            </div>
        );
    }
    
}

export default Grid;