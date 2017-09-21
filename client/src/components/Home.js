import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';
import axios from 'axios';
import Cards, { Card } from 'react-swipe-card';
import '../cards.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHeaders } from '../actions/headers';

class Home extends Component {
  state = { cats: [] }

  componentDidMount() {
    axios.get('/api/cats')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ cats: res.data })
      })
  }

  swipeLeft = (id) => {
    const { cats } = this.state;
    this.setState({ cats: cats.filter( c => c.id !== id ) })
  }

  swipeRight = (id) => {
    const { cats } = this.state;
    axios.put(`/api/cats/${id}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ cats: cats.filter( c => c.id !== id ) })
      })
  }

  render() {
    return (
      <div>
      <Cards className="cards-root">
        { this.state.cats.map( cat =>
          <Card
            key={cat.id}
            onSwipeLeft={ () => this.swipeLeft(cat.id) }
            onSwipeRight={ () => this.swipeRight(cat.id) }
          >
            <h2>{cat.name}</h2>
            <Image src={cat.avatar} />
            <h3>{cat.breed}</h3>
          </Card>
        )}
      </Cards>
      <Link to='/my_cats'>My Cats</Link>
      </div>
    );
  }
}

export default connect()(Home);
