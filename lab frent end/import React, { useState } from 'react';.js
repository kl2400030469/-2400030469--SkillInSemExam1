import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      setErrorMessage('Both title and body are required.');
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
      });

      if (response.status === 201) {
        setSuccessMessage('Post successfully created!');
        setTitle('');
        setBody('');
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the post.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      
      {/* Success/Error Message */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the post title"
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter the post content"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;