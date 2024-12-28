import React, { useState } from 'react'

import EmojiPicker from 'emoji-picker-react';
import DummyProfile1 from '../../assets/dummyProfile.jpeg';
import DummyProfile2 from '../../assets/dummyProfile (1).jpeg';
import DummyProfile3 from '../../assets/dummyProfile (2).jpeg';
import DummyProfile4 from '../../assets/dummyProfile (3).jpeg';
import EmojiIcon from '../../assets/happy-face.png';
import SendIcon from '../../assets/send-message.png';
import { IoMdMore } from 'react-icons/io';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { MdOutlineThumbUp, MdThumbUp } from 'react-icons/md';

const Comments = () => {
    const [comments, setComments] = useState([
      
        {
            id: 1,
            profileImage: DummyProfile4,
            userName: 'Manikandan',
            comment: 'This has been a game-changer for my understanding of new concepts.',
            likes: 319,
            isLiked: false,
            replies: [],
        },
        {
            id: 2,
            profileImage: DummyProfile2,
            userName: 'Naresh',
            comment: 'The visual aids made it so much easier to grasp the subject.',
            likes: 24,
            isLiked: false,
            replies: [],
        },
        {
            id: 3,
            profileImage: DummyProfile3,
            userName: 'Acshaya',
            comment: 'I appreciate how well-structured the content is. It keeps me motivated to learn!',
            likes: 12,
            isLiked: false,
            replies: [],
        },
    
        // {
        //     id: 4,
        //     profileImage: DummyProfile1,
        //     userName: 'Sophia Brown',
        //     comment: 'The teacher explained the topic so clearly; I finally understand the basics of physics.',
        //     likes: 10,
        //     isLiked: false,
        //     replies: [],
        // },
    ]);


    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState({});
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showReplies, setShowReplies] = useState({});
    const [activeReplyBox, setActiveReplyBox] = useState(null);

    const handleSendComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
          setComments([...comments, { id: comments.length + 1, profileImage: DummyProfile4, userName: 'Manikandan', comment: newComment, likes: 0, isLiked: false, replies: [] }]);
          setNewComment('');
        }
      };

      
       
      
        const handleReply = (commentId) => {
          if (replyText[commentId]?.trim()) {
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment.id === commentId
                  ? {
                    ...comment,
                    replies: [
                      ...comment.replies,
                      {
                        id: comment.replies.length + 1,
                        profileImage: DummyProfile4,
                        userName: 'Manikandan',
                        comment: replyText[commentId],
                        likes: 0,
                        isLiked: false,
                      },
                    ],
                  }
                  : comment
              )
            );
            setReplyText((prev) => ({ ...prev, [commentId]: '' }));
            setActiveReplyBox(false);
          }
        };
      
        const toggleReplies = (commentId) => {
          setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
          }));
        };
      
        const handleLike = (commentId, replyId = null) => {
          setComments((prevComments) =>
            prevComments.map((comment) => {
              if (comment.id === commentId) {
                if (replyId) {
                  // Toggling like for a reply
                  return {
                    ...comment,
                    replies: comment.replies.map((reply) =>
                      reply.id === replyId
                        ? {
                          ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                          isLiked: !reply.isLiked,
                        }
                        : reply
                    ),
                  };
                } else {
                  // Toggling like for a comment
                  return {
                    ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                    isLiked: !comment.isLiked,
                  };
                }
              }
              return comment;
            })
          );
        };

        
          const handleEmojiClick = (emojiObject) => {
            setNewComment((prevComment) => prevComment + emojiObject.emoji);
            setShowEmojiPicker(false); // Close picker after selection
          };
        
          const handleReplyEmojiClick = (emojiObject, commentId) => {
            setReplyText((prevReplyText) => ({
              ...prevReplyText,
              [commentId]: (prevReplyText[commentId] || '') + emojiObject.emoji,
            }));
            setShowEmojiPicker(false); // Close picker after selection
          };
        
          const formatLikes = (number) => {
            if (number >= 1_000_000_000_000) {
              return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 't'; // Trillions
            }
            if (number >= 1_000_000_000) {
              return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b'; // Billions
            }
            if (number >= 1_000_000) {
              return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm'; // Millions
            }
            if (number >= 1_000) {
              return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'k'; // Thousands
            }
            return number.toString(); // Less than 1,000
          };
          
          
    
    return (
        <div className="comment-box">
            <div className="comment-box-header ">
                Comments <IoMdMore size={24} />
            </div>
            <div className="comment-box-body">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-container">
                        <div className="comment-user-info">
                            <img src={comment.profileImage} alt="" className="comment-user-image" />
                        </div>
                        <div className='bg-light p-2 rounded'>
                            <strong className="comment-user-name">{comment.userName}</strong>
                            <p>{comment.comment}</p>
                            <div className="comment-actions d-flex gap-1">
                                <button
                                    onClick={() => handleLike(comment.id)}
                                    className="border border-0 rounded px-1"
                                >
                                    {comment.isLiked ? <MdThumbUp className='like-icon' size={18} /> : <MdOutlineThumbUp size={18} />} {formatLikes(comment.likes)}
                                </button>
                                {comment.replies.length > 0 &&
                                    <button
                                        onClick={() => toggleReplies(comment.id)}
                                        className="border border-0 rounded px-1"
                                    >
                                        {showReplies[comment.id] ? 'Hide' : 'Show'}
                                    </button>
                                }
                                <button
                                    onClick={() =>
                                        setActiveReplyBox((prev) => (prev === comment.id ? null : comment.id))
                                    }
                                    className="border border-0 rounded px-1"
                                >
                                    Reply
                                </button>
                            </div>
                            {activeReplyBox === comment.id && (
                                <div className="reply-input-container ">
                                    <input
                                        type="text"
                                        placeholder="Write a reply..."
                                        className="comment-input"
                                        value={replyText[comment.id] || ''}
                                        onChange={(e) =>
                                            setReplyText((prev) => ({
                                                ...prev,
                                                [comment.id]: e.target.value,
                                            }))
                                        }
                                    />
                                    <button
                                        type='button'
                                        className="emoji-button"
                                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                                    >
                                        {/* <MdOutlineEmojiEmotions size={24} /> */}
                                        <img src={EmojiIcon} alt='emoji icon' width="20px" height="20px" />
                                    </button>
                                    {showEmojiPicker && activeReplyBox === comment.id && (
                                        <div className="emoji-picker">
                                            <EmojiPicker
                                                onEmojiClick={(emojiObject) => handleReplyEmojiClick(emojiObject, comment.id)}
                                            />
                                        </div>
                                    )}

                                    <button
                                        className="send-button"
                                        onClick={() => handleReply(comment.id)}
                                    >
                                        {/* <LuSend size={20} /> */}
                                        <img src={SendIcon} alt='emoji icon' width="20px" height="20px" />

                                    </button>
                                </div>
                            )}
                            {showReplies[comment.id] &&
                                comment.replies.map((reply) => (
                                    <div key={reply.id} className="reply-container ">
                                        <div className='d-flex gap-2 mt-3'>
                                            <div className="comment-user-info ">
                                                <img
                                                    src={reply.profileImage}
                                                    alt=""
                                                    className="comment-user-image"
                                                />
                                            </div>
                                            <div >
                                                <strong className="comment-user-name">{reply.userName}</strong>
                                                <p>{reply.comment}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleLike(comment.id, reply.id)}
                                            className="border border-0 rounded px-1"
                                        >
                                            {reply.isLiked ? <MdThumbUp className='like-icon' size={18} /> : <MdOutlineThumbUp  size={18} />}{' '}
                                            {formatLikes(reply.likes)}
                                        </button>
                                    </div>
                                ))}

                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendComment} className="comment-box-footer">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="comment-input"
                />
                <div className="d-flex justify-content-between w-100 px-2">
                    <button
                        type='button'
                        className="emoji-button"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                    >
                        {/* <MdOutlineEmojiEmotions size={24} /> */}
                        <img src={EmojiIcon} alt='emoji icon' width="20px" height="20px" />

                    </button>
                    {showEmojiPicker && (
                        <div className="emoji-picker" >
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                    <button type='submit' className="send-button">
                        {/* <LuSend size={24} /> */}
                        <img src={SendIcon} alt='emoji icon' width="20px" height="20px" />

                    </button>
                </div>
            </form>
        </div>
    )
}

export default Comments