import React, { useState } from "react";

interface Post {
  id: number;
  text: string;
  timestamp: Date;
  author: string;
  role: "Admin" | "User";
}

const PostWall: React.FC = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextId, setNextId] = useState(1);

  const handlePost = () => {
    if (postText.trim() === "") return;

    const newPost: Post = {
      id: nextId,
      text: postText.trim(),
      timestamp: new Date(),
      author: "Admin",
      role: "Admin",
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setNextId(nextId + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handlePost();
    }
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return timestamp.toLocaleDateString();
  };

  const characterCount = postText.length;
  const maxChars = 280;
  const isOverLimit = characterCount > maxChars;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Admin Wall</h1>

      {/* Post input card */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="relative">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write an announcement... (Ctrl/Cmd + Enter to post)"
            className={`w-full p-3 border rounded-lg resize-none focus:outline-none transition-all ${
              isOverLimit
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
            rows={3}
          />
          <div
            className={`absolute bottom-2 right-3 text-xs font-medium ${
              isOverLimit
                ? "text-red-500"
                : characterCount > maxChars * 0.8
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
          >
            {characterCount}/{maxChars}
          </div>
        </div>

        <button
          onClick={handlePost}
          disabled={postText.trim() === "" || isOverLimit}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isOverLimit ? "Character limit exceeded" : "Post as Admin"}
        </button>
      </div>

      {/* Posts section */}
      <div className="bg-white rounded-xl shadow p-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-.98L3 20l1.98-5.874A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                />
              </svg>
            </div>
            <p className="text-gray-500">No posts yet. Create your first announcement!</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Announcements ({posts.length})
            </h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group border border-gray-200 rounded-lg p-4 hover:shadow transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 flex items-center space-x-2">
                          <span>{post.author}</span>
                          {post.role === "Admin" && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                              Admin
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatTimestamp(post.timestamp)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition"
                      title="Delete post"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-700 whitespace-pre-wrap">{post.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostWall;
