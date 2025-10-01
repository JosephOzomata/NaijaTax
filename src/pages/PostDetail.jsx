import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaHeart, FaRegHeart, FaComment, FaArrowLeft, FaPaperPlane, FaSpinner, FaClock, FaUser } from 'react-icons/fa';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = () => {
    const allPosts = JSON.parse(localStorage.getItem('socialMediaPosts') || '[]');
    const users = JSON.parse(localStorage.getItem('socialMediaUsers') || '[]');
    
    const foundPost = allPosts.find(p => p.id === id);
    if (foundPost) {
      const postUser = users.find(u => u.id === foundPost.userId);
      setPost({
        ...foundPost,
        user: postUser ? { name: postUser.name, email: postUser.email } : { name: 'Unknown User' }
      });
    }
  };

  const likePost = () => {
    const allPosts = JSON.parse(localStorage.getItem('socialMediaPosts') || '[]');
    const updatedPosts = allPosts.map(p => {
      if (p.id === id) {
        const isLiked = p.likes?.includes(user.id);
        return {
          ...p,
          likes: isLiked 
            ? p.likes.filter(userId => userId !== user.id)
            : [...(p.likes || []), user.id]
        };
      }
      return p;
    });
    
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));
    loadPost();
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const allPosts = JSON.parse(localStorage.getItem('socialMediaPosts') || '[]');
    const updatedPosts = allPosts.map(p => {
      if (p.id === id) {
        const newComment = {
          id: Date.now().toString(),
          content: comment.trim(),
          userId: user.id,
          userName: user.name,
          createdAt: new Date().toISOString()
        };
        return {
          ...p,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    });
    
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));
    setComment('');
    setIsSubmitting(false);
    loadPost();
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-12 max-w-md mx-4">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">❌</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-slate-300 mb-8 text-lg">The post you're looking for doesn't exist or may have been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-3 text-cyan-400 hover:text-cyan-300 mb-8 transition-all duration-300 group"
        >
          <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold">Back to Feed</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Post Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-xl">{post.user.name}</h3>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <FaClock className="text-sm" />
                      <span className="text-sm">{getTimeAgo(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Title & Content */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="mb-8 rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}

              {/* Post Stats */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center space-x-8">
                  <button
                    onClick={likePost}
                    className={`flex items-center space-x-3 transition-all duration-300 ${
                      post.likes?.includes(user.id) 
                        ? 'text-red-400 transform scale-110' 
                        : 'text-slate-400 hover:text-red-400 hover:scale-110'
                    }`}
                  >
                    {post.likes?.includes(user.id) ? (
                      <FaHeart className="text-xl" />
                    ) : (
                      <FaRegHeart className="text-xl" />
                    )}
                    <span className="font-semibold text-lg">{post.likes?.length || 0}</span>
                  </button>
                  
                  <div className="flex items-center space-x-3 text-slate-400">
                    <FaComment className="text-xl" />
                    <span className="font-semibold text-lg">{post.comments?.length || 0}</span>
                  </div>
                </div>
                
                <div className="text-slate-400 text-sm">
                  {post.likes?.length || 0} likes • {post.comments?.length || 0} comments
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Community Discussion</h2>
              <p className="text-slate-400 mb-8">
                Join the conversation with {post.comments?.length || 0} comments
              </p>

              {/* Add Comment Form */}
              <form onSubmit={addComment} className="mb-8">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts... What do you think about this post?"
                      rows="4"
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none leading-relaxed"
                      required
                    />
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-slate-400 text-sm">
                        {comment.length}/500 characters
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting || !comment.trim()}
                        className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center space-x-2"
                      >
                        {isSubmitting ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaPaperPlane className="text-sm" />
                        )}
                        <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {post.comments?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FaComment className="text-slate-400 text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">No comments yet</h3>
                    <p className="text-slate-400">Be the first to start the conversation!</p>
                  </div>
                ) : (
                  post.comments?.map((comment) => (
                    <div key={comment.id} className="flex space-x-4 group hover:bg-white/5 rounded-2xl p-4 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {comment.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-bold text-white text-lg">{comment.userName}</h4>
                            <span className="text-slate-400 text-sm flex items-center space-x-1">
                              <FaClock className="text-xs" />
                              <span>{getTimeAgo(comment.createdAt)}</span>
                            </span>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-20 self-start">
            {/* Engagement Stats */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Post Engagement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Likes</span>
                  <span className="text-white font-bold">{post.likes?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Comments</span>
                  <span className="text-white font-bold">{post.comments?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Posted</span>
                  <span className="text-white font-bold">{getTimeAgo(post.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">About the Author</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                  <FaUser className="text-white text-lg" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{post.user.name}</h4>
                  <p className="text-slate-400 text-sm">Community Member</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm">
                Sharing insights and experiences with the community.
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;