import React, { useState } from "react";

interface Post {
  id: number;
  text: string;
  timestamp: Date;
}

const PostWall: React.FC = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextId, setNextId] = useState(1);

  const handlePost = () => {
    if (postText.trim() === "") return; // prevent empty posts
    
    const newPost: Post = {
      id: nextId,
      text: postText.trim(),
      timestamp: new Date()
    };
    
    setPosts([newPost, ...posts]); // new post on top
    setPostText(""); // clear text area
    setNextId(nextId + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handlePost();
    }
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return timestamp.toLocaleDateString();
  };

  const characterCount = postText.length;
  const maxChars = 280;
  const isOverLimit = characterCount > maxChars;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Post on Wall
        </h1>
        
        {/* Post input box */}
        <div className="mb-6">
          <div className="relative">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind? (Ctrl/Cmd + Enter to post)"
              className={`w-full p-4 border-2 rounded-xl focus:outline-none transition-all duration-200 resize-none ${
                isOverLimit 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2'
              }`}
              rows={4}
            />
            <div className={`absolute bottom-2 right-2 text-xs font-medium ${
              isOverLimit ? 'text-red-500' : characterCount > maxChars * 0.8 ? 'text-yellow-500' : 'text-gray-400'
            }`}>
              {characterCount}/{maxChars}
            </div>
          </div>
          
          <button
            onClick={handlePost}
            disabled={postText.trim() === "" || isOverLimit}
            className="mt-3 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isOverLimit ? "Character limit exceeded" : "Share Your Thoughts"}
          </button>
        </div>

        {/* Wall posts */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Recent Posts ({posts.length})
                </h2>
              </div>
              
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {post.text.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Anonymous</p>
                        <p className="text-sm text-gray-500">
                          {formatTimestamp(post.timestamp)}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deletePost(post.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-200 p-1 rounded-full hover:bg-red-50"
                      title="Delete post"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {post.text}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostWall;