import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';


const LeaderBoard = () => {

    return(
        <section className="section-block">
            <div className="container">
                <div className="leader-board">
                    <h2 className="title text-center">Leader Board</h2>
                    <div className="primary center"></div>
                    <p className="decs">Lorem ipsum dolor sit amet, consectur adipiscing elit. Maecenas erat quam, facilisis eu dui vitea...Lorem ipsum dolor sit amet,...</p>
                    <div className="list-leader">
                        <div v-else className="row justify-content-center">
                            <div className="col-4 col-sm col-md">
                                <div className="leader">
                                    <h1 className="leader-numerical">No.1</h1>
                                    <hr className="line"/>
                                    <h2 className="leader-name" data-toggle="tooltip" data-placement="top" >User Name</h2>
                                    <h3 className="leader-rank">User rank</h3>
                                    <h3 className="leader-point">User score points</h3>
                                    <div className="leader-avatar">
                                        <img src = {require('../static/images/useravatar.jpg')} alt="" className="member-avatar"/>
                                    </div>
                                    <div className="leader-medal">
                                        <img src = {require('../static/images/medal.png')}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default LeaderBoard;