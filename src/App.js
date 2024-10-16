import React, { useState, useEffect } from 'react';

function App() {
  const [postData, setPostData] = useState(null); 
  const [getData, setGetData] = useState(null);
  const [isOn, setIsOn] = useState(false); 

  // GET request to fetch data 
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setGetData(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []); t

  // POST request to create a new post
  async function createPost() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'haris',
          body: 'usmani',
          userId: 1,
        }),
      });

      const data = await response.json();
      setPostData(data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  // DELETE request to remove a post
  async function deletePost(id) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      console.log('Post deleted');

      // Update the displayed data by removing the deleted post
      setGetData(getData.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  function toggleButton() {
    setIsOn((prevState) => !prevState);

    if (!isOn) {
      createPost();
    }
  }

  return (
    <div>
      <h1>api example</h1>

      {/* Toggle button for POST request */}
      <button onClick={toggleButton}>
        {isOn ? 'Post Created' : 'Create Post'}
      </button>

      {/* Display response from POST request */}
      {postData && (
        <div>
          <h2>Post Created:</h2>
          <p>ID: {postData.id}</p>
          <p>Title: {postData.title}</p>
          <p>Body: {postData.body}</p>
        </div>
      )}

      {/* Display first 5 posts from GET request */}
      {getData && (
        <div>
          <h2>Fetched Posts:</h2>
          {getData.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
              <button onClick={() => deletePost(post.id)}>Delete Post</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
