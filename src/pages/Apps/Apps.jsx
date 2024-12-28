import React from "react";
import "./Apps.css";
import { Link } from "react-router-dom";
import SolutionsDataList from "./AppsData";



const AppsList = () => {
    const AppDataList = SolutionsDataList
    console.log(AppDataList)
    return (
        <div>
            <h5>Our Solution's </h5>
            <div className="row gx-3 mx-1">
                {AppDataList.map((app, index) => (
                    <div className="col-md-6 col-lg-3 col-sm-6 mb-4 " key={index}>
                        <div className="shadow apps-card rounded-4 h-100">
                            <div className="apps-thumbnail">
                                <img
                                    src={app.image}
                                    alt={app.app}
                                    className="apps-image"
                                    width="100%"
                                />
                            </div>
                            <div className="p-3">
                                <Link to={`/individual/${app.id}`} className={`text-decoration-none text-black`}>
                                    <h6 className="fw-bold">{app.app}</h6>
                                </Link>
                                {/* <p className="text-muted apps-description" dangerouslySetInnerHTML={{__html:app.description}}/> */}
                                <p className="solution-division">{app.division}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppsList;
