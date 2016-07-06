import React, { Component } from 'react';

import {Carousel, CarouselItem } from 'react-bootstrap';

const TAG = "Home | ";

export default class Home extends Component {
  render(){
    return (
      <div>
        <h2>Fitness Model Home Page</h2>
        <div id="home-wrapper">

          <div id="gallery-content">
            <Carousel>
              <CarouselItem>
                <img width={500} height={500} alt="500x500" src="../assets/fitness-model.jpg"/>
                <div className="carousel-caption">
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
              </CarouselItem>
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}
