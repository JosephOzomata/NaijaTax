import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaPaperPlane, FaImage, FaSpinner } from 'react-icons/fa';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPost = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      image: image.trim(),
      userId: user.id,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };

    const existingPosts = JSON.parse(localStorage.getItem('socialMediaPosts') || '[]');
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem('socialMediaPosts', JSON.stringify(updatedPosts));

    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
            Create Post
          </h1>
          <p className="text-slate-300 text-lg">Share your thoughts with the community</p>
        </div>

        {/* Create Post Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
          <div className="space-y-8">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-200 mb-3">
                Post Title
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Craft a compelling title that captures attention..."
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 text-lg"
                required
              />
              <p className="text-slate-400 text-sm mt-2">
                {title.length}/120 characters • {120 - title.length} remaining
              </p>
            </div>

            {/* Content Input */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-slate-200 mb-3">
                Post Content
                <span className="text-red-400 ml-1">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your story, ideas, or experiences with the community. What's on your mind?"
                rows="8"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none leading-relaxed"
                required
              />
              <p className="text-slate-400 text-sm mt-2">
                {content.length}/1000 characters • {1000 - content.length} remaining
              </p>
            </div>

            {/* Image URL Input */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-slate-200 mb-3">
                <FaImage className="inline mr-2 text-cyan-400" />
                Image URL
                <span className="text-slate-400 text-sm font-normal ml-2">(Optional)</span>
              </label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/beautiful-image.jpg"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
              <p className="text-slate-400 text-sm mt-2">
                Add a stunning image to make your post more engaging
              </p>
            </div>

            {/* Image Preview */}
            {image && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Image Preview
                </label>
                <div className="relative group">
                  <img 
                    src={image} 
                    alt="Preview" 
                    className="rounded-xl w-full max-h-80 object-cover border border-white/10 group-hover:border-cyan-400 transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-red-400 font-semibold">Failed to load image</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-slate-300">
                    Preview
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-lg" />
                      <span className="text-lg">Publishing Your Post...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="text-lg">Publish Post</span>
                    </>
                  )}
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-hover:duration-1000 duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform" />
              </button>
              <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm">
                  {!title.trim() || !content.trim() ? (
                    <span className="text-amber-400">Please fill in both title and content to publish</span>
                  ) : (
                    <span className="text-cyan-400">Ready to share with the community!</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </form>

        
      </div>
    </div>
  );
}