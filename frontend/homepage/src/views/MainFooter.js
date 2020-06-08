import React from 'react';

const MainFooter = () => {
    return(
        <footer style={{position: 'absolute', bottom: '0', width:'100%', height: '60px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <div className="d-none d-sm-block">
                            <div className="d-flex align-items-center justify-content-center">
                                <img className="logo" src={require('../static/images/logo/black.png')}  alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default MainFooter;
