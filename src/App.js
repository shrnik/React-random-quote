import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './animate.css'
import {getQOD} from "./QuoteAPI.js";

class TweetButton extends Component{
  constructor(props){
    super(props);
    //this.onClick = this.onClick.bind(this);
  }


  render(){
   return( <a className="button" id="tweet-quote" title="Tweet this quote!" target="_blank"
              href ={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + 
            encodeURIComponent('"' + this.props.quote + '" ' + this.props.author)} >
    <i className="fa fa-twitter"></i>
  </a>
   )}

}

class QuoteBox extends Component{
  constructor(props){
    super(props);
    this.state = {
      textClassName: "fadeIn animated"
    }
    this.textUpdate = this.textUpdate.bind(this);
    this.caller = this.caller.bind(this);
  }

  componentDidUpdate(){
    setTimeout(()=>
    {if(this.state.textClassName==="fadeIn animated")
      {
        this.setState({
          textClassName: ""
        })
      }}
    ,1000)
  }

  textUpdate(){
    this.setState({
      textClassName: "fadeIn animated"
    })
  }

  caller(){
    this.textUpdate();
    this.props.click();
    let color = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[color];
    document.body.style.color = colors[color];
    var x = document.getElementsByClassName("button");
    x[2].style.backgroundColor = colors[color] 
    x[0].style.backgroundColor = colors[color]
    x[1].style.backgroundColor = colors[color]
  }
  render(){
    return(

      <div id="quote-box">
        <div className = {this.state.textClassName}>
          <div className={"quote-text "+this.state.textClassName}>
            <i className="fa fa-quote-left ">{this.props.quote}</i><span id="text" />
          </div>
          <div className="quote-author">
            - {this.props.author}<span id="author" />
          </div>
        </div>
      <div className="buttons">
        <div className = {this.state.textClassName}>
        <TweetButton quote = {this.props.quote} author = {this.props.author}/>
        <a className="button" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank">
          <i className="fa fa-tumblr"></i>
        </a>
        <button className="button" id="new-quote" onClick = {this.caller}>New quote</button>
        </div>
      </div>
    </div>
    
  )}

}

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
              quotes:[],
              quote:"",
              author:""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  
  componentDidMount(){
    getQOD().then(quotes=>{
      this.setState({
                  quotes:quotes,
                  quote:quotes[0].quote,
                  author:quotes[0].author

                })
      //console.log(quotes);    
    })
  }
  handleClick() {
    const t = Math.floor(Math.random()*100);
    //console.log(t)
    this.setState({
      quote:this.state.quotes[t].quote,
      author:this.state.quotes[t].author
    });

    
  }
  render() {
    return (
      <div id="wrapper">
      <QuoteBox quote = {this.state.quote} author = {this.state.author} click = {this.handleClick}/>
      <div className="footer"> by <a href="shrenik">shrenik</a></div>
    </div>
      
    );

  }
}

export default App;
