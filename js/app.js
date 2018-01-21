import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from './../node_modules/material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AutoComplete from 'material-ui/AutoComplete'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const tilesData = [
  {
    img: 'http://photos.demandstudios.com/getty/article/152/204/167222834.jpg',
    title: 'Flour',
    author: 't',
  },
  {
    img: 'https://static.pexels.com/photos/236010/pexels-photo-236010.jpeg',
    title: 'Milk',
    author: 'pashminu',
  },
{   img: 'http://images.wisegeek.com/potatoes-against-white-background.jpg',
    title: 'Potatoes',
    author: 'Danson67',
  },
  {
    img: 'http://www.simplyrecipes.com/wp-content/uploads/2014/09/sriracha-orange-green-beans-horiz-b-2000.jpg',
    title: 'Green Beans',
    author: 'fancycrave1',
  },
  {
    img: 'http://images6.fanpop.com/image/photos/35200000/Juicy-Tomatoes-tomatoes-35204497-1800-1200.jpg',
    title: 'Tomatoes',
    author: 'jill111',
  },
  {
    img: 'https://static.pexels.com/photos/8439/food-eggs.jpg',
    title: 'Eggs',
    author: 'pashminu',
  },
{   img: 'http://www.webexhibits.org/butter/i/full/iStock_000006937653Small.jpg',
    title: 'Butter',
    author: 'Danson67',
  },
  {
    img: 'https://static01.nyt.com/images/2017/02/16/dining/16COOKING-NOKNEADBREAD1/16COOKING-NOKNEADBREAD1-videoSixteenByNineJumbo1600.jpg',
    title: 'Bread',
    author: 'fancycrave1',
  }
];



class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.state["ing"] = "Enter Ingredient"
    this.state["ings"] = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTile = this.handleTile.bind(this);

  }

  handleChange(event) {
    this.setState({ing: event.target.value})

  }

  handleSubmit(event) {
      event.preventDefault();
      this.setState((prevs) => {
        prevs['ings'].push(this.state['ing'])
        return prevs;
      })

  }
handleTile(str, event) {
      event.preventDefault();
      this.setState((prevs) => {
        prevs['ings'].push(str)
        return prevs;
      })
}

  render() {
    return (
        <div>
          <section id="about" className="content-section text-center"i>
            <div className="container" >
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h1 style={{color: "#ffffff", fontSize: "3.4rem"}}>Tell us what you have</h1>
                    <form className='form-inline justify-content-center' onSubmit={this.handleSubmit}>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                        <input  type="text"  onChange= {this.handleChange} onSubmit={this.handleSubmit} className="form-control" name="ingredient" value={this.state.ing}/>

                      </div>

                        <input type="submit" className="btn btn-primary" value="Add to Fridge"/>
                    </form>
                </div>
              </div>
              <div className="row"> </div>
              <div className="row mt-md-3">
               <div style={styles.root}>
                  <GridList style={styles.gridList} cols={4}>
                    {tilesData.map((tile) => (
                      <div value = {tile.title} onClick={this.handleTile.bind(this, tile.title)}>
                      <GridTile
                        key={tile.img}
                        title={tile.title}
                        titleStyle={styles.titleStyle}
                        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                      >
                        <img src={tile.img} />
                      </GridTile>
                      </div>
                    ))}
                  </GridList>
                </div>
              </div>
            </div>
          </section>
         <Fridge ings={this.state['ings']}/>
        </div>

  )}
}

class Fridge extends  React.Component {
  constructor(props) {
    super(props);
    this.state ={}
    this.state['type'] = ""
    this.state['ings'] = this.props['ings']

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({type: event.target.value})
  }

  handleSubmit(event){

  }

  render() {
    return (

          <section id="download" className="download-section content-section text-center">
          <div className="jumbotron container" style= {{backgroundColor : "#0000bed1"}}>
            <h1 className="display-3" style={{color: "#ffffff"}}>My Fridge</h1>
              <div className="list-group">
                  <a href="" className="list-group-item list-group-item-action disabled"> Ingredients  </a>
              {this.state['ings'].map(function(ing, i) {
                  return <a href="" className="list-group-item list-group-item-action disabled" key={i}> {ing} </a>
              })}

              </div>
            <hr className="my-4"/>
            <p>Also, choose the kind of meal you desire - </p>
            <form className="justify-content-center">
              <div className="form-group">
               <select className="form-control" id="exampleSelect1" onChange={this.handleChange}>
                 <option>Breakfast</option>
                 <option>Meal</option>
                 <option>Dessert</option>
               </select>
             </div>
           </form>
            <p className="lead">
              <a className="btn btn-secondary btn-lg" href="#" role="button">Lets Cook</a>
            </p>
          </div>
          </section>

    )
  }


}



ReactDOM.render(
  <MuiThemeProvider >
  <div>
    <Search/>
    </div>

  </MuiThemeProvider>,
  document.getElementById('reactEntry')
);
