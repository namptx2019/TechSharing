import React, {useEffect, useState} from 'react';
import UserService, { UserServiceError } from "../../services/user.service"
import DEFAULT_AVATAR from "../../static/images/default-avatar.png"
import DEFAULT_MEDAL from "../../static/images/medal.png"

const LeaderBoard = () => {
    const [Leaderboard, setLeaderboard] = useState([]);
    const fetchLeaderboard = async () => {
        try {
            const response = await UserService.leaderboard();
            setLeaderboard(response);
            return response;
        } catch(e) {
            if(e instanceof UserServiceError){

            }
        }
    }

    const limitStr = (input, limit) => {
        if(input.length > limit){
            return input = input.substr(0, limit)+" ...";
        }
        return input;
    }

    useEffect(() => {
        fetchLeaderboard();
    },[]);

    return(
        <section className="section-block">
            <div className="container">
                <div className="leader-board">
                    <h2 className="title text-center">Leaderboard</h2>
                    <div className="primary center"></div>
                    <p className="decs">These are top 5 of users that had the most contribution to this website</p>
                    <div className="list-leader">
                        <div className="row justify-content-center">
                            {Leaderboard && Leaderboard.map((item,index) =>
                                <div className="col-4 col-sm col-md">
                                    <div className="leader">
                                        <h1 className="leader-numerical">No.{index + 1}</h1>
                                        <hr className="line"/>
                                        <h2 className="leader-name" data-toggle="tooltip" data-placement="top" >{limitStr(item.username,8)}</h2>
                                        <h3 className="leader-rank">{item.rank.name}</h3>
                                        <h3 className="leader-point">{item.score} points</h3>
                                        <div className="leader-avatar">
                                            <img src = {item.avatars.length !== 0 ? item.avatars[0].full_path : DEFAULT_AVATAR} alt="" className="member-avatar"/>
                                        </div>
                                        <div className="leader-medal">
                                            <img src = {item.rank.thumbnail !== '' ? item.rank.thumbnail : DEFAULT_MEDAL}/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default LeaderBoard;
