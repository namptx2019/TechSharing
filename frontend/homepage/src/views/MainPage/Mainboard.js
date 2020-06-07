import React from 'react';
import ReactDOM from 'react-dom';

const Mainboard = () => {
    return(
        <section className="section-block">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="page-auth-header">
                            <h3>Login</h3>
                            
                        </div>
                        <div className="page-auth-form">
                            <input placeholder="Email" type="email" name="email" className="form-control" />
                            <input placeholder="Password" type="password" name="password" className="form-control" />
                            <button type="button" className="btn btn-primary">LOGIN</button>
                            <a href="#" type="button" className="forget-pass">fogot your password?</a>
                        </div>
                        
                    </div>

                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="right-bg">
                            <img src={require('../static/images/thumbnail/3.png')}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    );
}

export default Mainboard;
