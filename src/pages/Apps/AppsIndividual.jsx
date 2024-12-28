import { useParams } from "react-router-dom";
import SolutionsDataList from "./AppsData";
import Comments from "../../components/Comments/Comments";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import { useState } from "react";
import TeamsLogo from '../../assets/TeamsLogo.png';
import OutlookLogo from '../../assets/OutlookLogo.png';


const IndividualApps = () => {
    const { appId } = useParams();
    const appDataList = SolutionsDataList;
    const selectedApp = appDataList.find(app => app.id === appId);


    const [isLiked, setIsLiked] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);



    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleShareClick = () => {
        setShowShareModal(true);
    };

    const closeModal = () => {
        setShowShareModal(false);
    };

    const handleShareInTeams = () => {
        const teamsLink = `https://teams.microsoft.com/l/chat/0/0?users=&message=${encodeURIComponent(
            `Check out this App: ${selectedApp?.app} - ${window.location.href}`
        )}`;
        window.open(teamsLink, '_blank');
    };

    const handleShareInOutlook = () => {
        const subject = encodeURIComponent(`Check out this app: ${selectedApp?.app}`);
        const body = encodeURIComponent(
            `Hi,\n\nI found this App interesting and thought you might like it:\n\n${window.location.href}\n\nBest regards!`
        );
        const outlookLink = `mailto:?subject=${subject}&body=${body}`;
        window.open(outlookLink, '_blank');
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-7 col-lg-8 col-sm-12">
                <div className=''>
                <div className='d-flex justify-content-between align-items-center'>
                    <h3 className="mb-3">{selectedApp.app}</h3>
                    <div className='d-flex gap-3'>
                                <LuShare2 size={24} onClick={handleShareClick} />
                                {/* <div onClick={handleLikeClick}>
                                    {isLiked ? <FaHeart size={24} className='like-icon' /> : <FaRegHeart size={24} />}
                                </div> */}
                            </div>
                        </div>
                   
                            <b>Description:</b>
                            {/* <b className=''>A Solution for <span className='author-name'>{selectedApp.author}</span></b> */}
                            

                        <p className='text-secondary' dangerouslySetInnerHTML={{ __html: selectedApp.description }
                        } />
                    </div>
                </div>

                <div className="col-md-5 col-lg-4 col-sm-12">
                    <Comments />
                </div>
            </div>
            {showShareModal && (
                <div className="modal-share">
                    <div className="modal-share-content">
                        <h4>Share this Course</h4>
                        <button className='' onClick={handleShareInTeams}><img src={TeamsLogo} className='bg-white p-1 rounded' alt='TeamsLogo' width="30px" height="30px" /> Share in Teams</button> OR
                        <button onClick={handleShareInOutlook}><img src={OutlookLogo} className='bg-white p-1 rounded' alt='TeamsLogo' width="30px" height="30px" />Share in Outlook</button>
                        <button onClick={closeModal} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default IndividualApps;