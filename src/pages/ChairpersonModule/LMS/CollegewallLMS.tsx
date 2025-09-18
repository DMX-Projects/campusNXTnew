import React, { useState } from 'react';
import { HeartIcon, MessageCircleIcon, ShareIcon, ImageIcon, VideoIcon, PlusIcon, SearchIcon,  TrendingUpIcon } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'student' | 'faculty' | 'admin' | 'alumni';
  department: string;
  avatar: string;
  isVerified: boolean;
}

interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  mediaType: 'image' | 'video' | 'document' | null;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
  tags: string[];
  isPromoted: boolean;
  category: 'announcement' | 'achievement' | 'event' | 'general' | 'academic';
  visibility: 'public' | 'students' | 'faculty' | 'department';
}

interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  timestamp: string;
  likes: number;
}

const CollegeWall: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      role: 'faculty',
      department: 'CSE',
      avatar: '👩‍🏫',
      isVerified: true
    },
    {
      id: '2',
      name: 'Rahul Sharma',
      role: 'student',
      department: 'CSE',
      avatar: '👨‍🎓',
      isVerified: false
    },
    {
      id: '3',
      name: 'College Admin',
      role: 'admin',
      department: 'Administration',
      avatar: '👨‍💼',
      isVerified: true
    },
    {
      id: '4',
      name: 'Priya Singh',
      role: 'alumni',
      department: 'CSE',
      avatar: '👩‍💻',
      isVerified: true
    }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      userId: '3',
      content: '🎉 Congratulations to all our students who secured placements in top MNCs! Special mention to Rahul Sharma (Google), Priya Singh (Microsoft), and Amit Kumar (Amazon). Your hard work has paid off! #Placements2025 #Success',
      mediaUrls: ['placement_stats.jpg'],
      mediaType: 'image',
      timestamp: '2025-09-02T09:00:00Z',
      likes: 145,
      comments: [],
      shares: 23,
      tags: ['placements', 'success', 'achievement'],
      isPromoted: true,
      category: 'achievement',
      visibility: 'public'
    },
    {
      id: '2',
      userId: '1',
      content: 'Excited to announce that our CSE department research paper on "AI in Healthcare" has been accepted at the International Conference on Machine Learning! Proud of our students and faculty collaboration. 🔬✨ #Research #AI #Healthcare',
      mediaUrls: ['research_paper.pdf'],
      mediaType: 'document',
      timestamp: '2025-09-01T14:30:00Z',
      likes: 89,
      comments: [],
      shares: 15,
      tags: ['research', 'AI', 'healthcare', 'publication'],
      isPromoted: false,
      category: 'academic',
      visibility: 'public'
    },
    {
      id: '3',
      userId: '2',
      content: 'Had an amazing time at the Annual Technical Symposium! The robotics competition was mind-blowing. Thanks to all the organizers for such a wonderful event. Already excited for next year! 🤖⚡ #TechSymposium #Robotics',
      mediaUrls: ['symposium_pic1.jpg', 'symposium_pic2.jpg'],
      mediaType: 'image',
      timestamp: '2025-08-31T18:15:00Z',
      likes: 67,
      comments: [],
      shares: 8,
      tags: ['symposium', 'robotics', 'event'],
      isPromoted: false,
      category: 'event',
      visibility: 'students'
    },
    {
      id: '4',
      userId: '4',
      content: 'Thrilled to be back at my alma mater as a guest speaker! Shared my journey from student to Senior Software Engineer at Google. Keep dreaming big, current students! The sky is the limit 🚀 #AlumniTalk #Inspiration #Career',
      mediaUrls: ['alumni_talk.mp4'],
      mediaType: 'video',
      timestamp: '2025-08-30T16:45:00Z',
      likes: 203,
      comments: [],
      shares: 45,
      tags: ['alumni', 'career', 'inspiration', 'google'],
      isPromoted: true,
      category: 'achievement',
      visibility: 'public'
    }
  ]);

  const [newPost, setNewPost] = useState<{
    content: string;
    category: Post['category'];
    visibility: Post['visibility'];
    tags: string[];
    isPromoted: boolean;
  }>({
    content: '',
    category: 'general',
    visibility: 'public',
    tags: [],
    isPromoted: false
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const categories = ['announcement', 'achievement', 'event', 'general', 'academic'];
  const roles = ['student', 'faculty', 'admin', 'alumni'];
  const visibilityOptions = ['public', 'students', 'faculty', 'department'];

  const getUser = (userId: string) => users.find(user => user.id === userId);

  const getRoleColor = (role: string) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      faculty: 'bg-green-100 text-green-800',
      admin: 'bg-purple-100 text-purple-800',
      alumni: 'bg-orange-100 text-orange-800'
    };
    return colors[role as keyof typeof colors];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      announcement: 'bg-red-100 text-red-800',
      achievement: 'bg-green-100 text-green-800',
      event: 'bg-blue-100 text-blue-800',
      general: 'bg-gray-100 text-gray-800',
      academic: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors];
  };

  const filteredPosts = posts.filter(post => {
    const user = getUser(post.userId);
    return (
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || post.category === selectedCategory) &&
      (selectedRole === 'all' || user?.role === selectedRole)
    );
  });

  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        userId: '3', // Admin/Chairperson
        content: newPost.content,
        mediaUrls: [],
        mediaType: null,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        shares: 0,
        tags: newPost.tags,
        isPromoted: newPost.isPromoted,
        category: newPost.category,
        visibility: newPost.visibility
      };
      
      setPosts([post, ...posts]);
      setNewPost({
        content: '',
        category: 'general',
        visibility: 'public',
        tags: [],
        isPromoted: false
      });
      setIsCreatePostModalOpen(false);
      alert('Post published successfully!');
    }
  };

  const handleLike = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleShare = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    );
    setPosts(updatedPosts);
    alert('Post shared successfully!');
  };

  const promotePost = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, isPromoted: !post.isPromoted }
        : post
    );
    setPosts(updatedPosts);
  };

  const deletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
      alert('Post deleted successfully!');
    }
  };

  const stats = {
    totalPosts: posts.length,
    totalLikes: posts.reduce((sum, post) => sum + post.likes, 0),
    totalShares: posts.reduce((sum, post) => sum + post.shares, 0),
    promotedPosts: posts.filter(post => post.isPromoted).length,
    activeUsers: users.length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">College Wall</h1>
              <p className="text-gray-600 mt-1">Campus social feed and announcements</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreatePostModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <PlusIcon size={20} />
                Create Post
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              {roles.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Total Posts</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalPosts}</p>
              </div>
              <div className="text-xl">📝</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Total Likes</p>
                <p className="text-xl font-bold text-red-600">{stats.totalLikes}</p>
              </div>
              <HeartIcon className="text-red-500" size={20} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Total Shares</p>
                <p className="text-xl font-bold text-blue-600">{stats.totalShares}</p>
              </div>
              <ShareIcon className="text-blue-500" size={20} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Promoted</p>
                <p className="text-xl font-bold text-purple-600">{stats.promotedPosts}</p>
              </div>
              <TrendingUpIcon className="text-purple-500" size={20} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs">Active Users</p>
                <p className="text-xl font-bold text-green-600">{stats.activeUsers}</p>
              </div>
              <div className="text-xl">👥</div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {filteredPosts
            .sort((a, b) => {
              if (a.isPromoted !== b.isPromoted) return b.isPromoted ? 1 : -1;
              return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
            })
            .map(post => {
              const user = getUser(post.userId);
              if (!user) return null;

              return (
                <div key={post.id} className={`bg-white rounded-xl border border-gray-200 p-6 ${post.isPromoted ? 'ring-2 ring-blue-200 bg-blue-50' : ''}`}>
                  {post.isPromoted && (
                    <div className="flex items-center gap-2 mb-4 text-blue-600">
                      <TrendingUpIcon size={16} />
                      <span className="text-sm font-medium">Promoted Post</span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{user.avatar}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        {user.isVerified && <span className="text-blue-500">✓</span>}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{user.department}</span>
                        <span>•</span>
                        <span>{new Date(post.timestamp).toLocaleString()}</span>
                        <span>•</span>
                        <span className="capitalize">{post.visibility}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                  </div>
                  
                  {post.mediaUrls.length > 0 && (
                    <div className="mb-4">
                      {post.mediaType === 'image' && (
                        <div className="grid grid-cols-2 gap-2">
                          {post.mediaUrls.map((url, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                              <ImageIcon className="mx-auto text-gray-400 mb-2" size={24} />
                              <p className="text-sm text-gray-600">{url}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {post.mediaType === 'video' && (
                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                          <VideoIcon className="mx-auto text-gray-400 mb-2" size={24} />
                          <p className="text-sm text-gray-600">{post.mediaUrls[0]}</p>
                        </div>
                      )}
                      
                      {post.mediaType === 'document' && (
                        <div className="bg-gray-100 rounded-lg p-4 text-center">
                          <div className="text-2xl mb-2">📄</div>
                          <p className="text-sm text-gray-600">{post.mediaUrls[0]}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <HeartIcon size={20} className={post.likes > 0 ? 'fill-red-500 text-red-500' : ''} />
                        <span>{post.likes}</span>
                      </button>
                      
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <MessageCircleIcon size={20} />
                        <span>{post.comments.length}</span>
                      </button>
                      
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <ShareIcon size={20} />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => promotePost(post.id)}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          post.isPromoted
                            ? 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {post.isPromoted ? 'Promoted' : 'Promote'}
                      </button>
                      
                      <button
                        onClick={() => deletePost(post.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-xs transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Create Post Modal */}
        {isCreatePostModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Post</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:ring-2 focus:ring-blue-500"
                    placeholder="What's happening on campus?"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value as Post['category']})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                    <select
                      value={newPost.visibility}
                      onChange={(e) => setNewPost({...newPost, visibility: e.target.value as Post['visibility']})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      {visibilityOptions.map(option => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newPost.tags.join(', ')}
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="announcement, achievement, event"
                  />
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newPost.isPromoted}
                      onChange={(e) => setNewPost({...newPost, isPromoted: e.target.checked})}
                      className="mr-2 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Promote this post</span>
                  </label>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsCreatePostModalOpen(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Publish Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeWall;