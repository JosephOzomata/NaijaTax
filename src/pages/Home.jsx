// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaArrowUp } from "react-icons/fa6";
import { FaHeart, FaRegHeart, FaComment, FaArrowRight, FaArrowsAlt, FaPlus } from 'react-icons/fa';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const allPosts = JSON.parse(localStorage.getItem('socialMediaPosts') || '[]');
    const users = JSON.parse(localStorage.getItem('socialMediaUsers') || '[]');
    
    // Add user data to posts
    const postsWithUsers = allPosts.map(post => {
      const postUser = users.find(u => u.id === post.userId);
      return {
        ...post,
        user: postUser ? { name: postUser.name, email: postUser.email } : { name: 'Unknown User' }
      };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setPosts(postsWithUsers);
  };

  const likePost = (postId) => {
    const allPosts = JSON.parse(localStorage.getItem('socialMediaPosts') || '[]');
    const updatedPosts = allPosts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes?.includes(user.id);
        return {
          ...post,
          likes: isLiked 
            ? post.likes.filter(id => id !== user.id)
            : [...(post.likes || []), user.id]
        };
      }
      return post;
    });
    
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));
    loadPosts();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
            Community Feed
          </h1>
          <p className="text-slate-300 text-lg">Discover what's happening in your network</p>
        </div>

        {/* Create Post CTA */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8 hover:bg-white/10 transition-all duration-300">
          <Link 
            to="/create-post"
            className="flex items-center justify-center space-x-3 group"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaPlus className="text-white text-lg" />
            </div>
            <div className="text-left">
              <h3 className="text-white font-semibold text-lg">Share your thoughts</h3>
              <p className="text-slate-400 text-sm">Create a new post with the community</p>
            </div>
          </Link>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">No posts yet</h3>
            <p className="text-slate-400 mb-6">Be the first to share something amazing!</p>
            <Link
              to="/create-post"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <FaPlus />
              <span>Create First Post</span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {post.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{post.user.name}</h3>
                      <p className="text-slate-400 text-sm">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">
                    {Math.floor((Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60)) < 24 
                      ? `${Math.floor((Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60))}h ago`
                      : `${Math.floor((Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60 * 24))}d ago`
                    }
                  </div>
                </div>
                <Link to={`/post/${post.id}`} className="block mb-6 group">
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-lg line-clamp-3">
                    {post.content}
                  </p>
                </Link>

                {post.image && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center space-x-2 transition-all duration-300 ${
                        post.likes?.includes(user.id)
                          ? 'text-red-400 transform scale-110'
                          : 'text-slate-400 hover:text-red-400 hover:scale-110'
                      }`}
                    >
                      {post.likes?.includes(user.id) ? (
                        <FaHeart className="text-lg" />
                      ) : (
                        <FaRegHeart className="text-lg" />
                      )}
                      <span className="font-medium">{post.likes?.length || 0}</span>
                    </button>

                    <Link
                      to={`/post/${post.id}`}
                      className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-105"
                    >
                      <FaComment className="text-lg" />
                      <span className="font-medium">{post.comments?.length || 0}</span>
                    </Link>
                  </div>

                  <Link
                    to={`/post/${post.id}`}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-medium py-2 px-4 rounded-full transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white"
                  >
                    <span>Read More</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div onClick={scrollToTop} className='bg-white/5 cursor-pointer hover:bg-white/20 z-50 transition duration-150 backdrop-blur-lg  rounded-full fixed bottom-2 right-2'>
          <FaArrowUp className='m-3 text-2xl' />
        </div>
      </div>
    </div>
  );
}