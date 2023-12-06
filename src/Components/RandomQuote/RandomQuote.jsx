// RandomQuote.js
import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import LoginSignup from './LoginSignup';
import twitter_icon from '../Assests/twitter-x.svg';
import reload_icon from '../Assests/reload.svg';
import copy_icon from '../Assests/clipboard.svg';
import bookmark_icon from '../Assests/bookmark.svg';
import saved_icon from '../Assests/saved.svg';

const RandomQuote = () => {
  // Array to store quotes retrieved from the API
  const [quotes, setQuotes] = useState([]);
  // State variables to manage quote, bookmark status, and UI messages
  const [quote, setQuote] = useState({
    text: "The best way to predict the future is to create it.",
    author: "George Orwell"
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Function to fetch quotes from the API
  const loadQuotes = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  // Function to toggle the Login/Signup modal
  const toggleLoginModal = () => {
    setIsLoginModalOpen(prevState => !prevState);
  };

  // Function to handle bookmarking/unbookmarking a quote
  const bookmark = () => {
    if (!quote) return; // Check if quote is undefined

    const newBookmarkStatus = !isBookmarked;
    setIsBookmarked(newBookmarkStatus);

    // Check if the bookmark status has changed
    if (newBookmarkStatus !== isBookmarked) {
      setShowSavedMessage(true);

      // Hide the saved message after 2 seconds
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 400);

      // Retrieve existing bookmarked quotes from localStorage
      const existingBookmarks = JSON.parse(localStorage.getItem('bookmarkedQuotes')) || [];

      if (newBookmarkStatus) {
        // Add the quote to the bookmarks
        const updatedBookmarks = [...existingBookmarks, quote];
        localStorage.setItem('bookmarkedQuotes', JSON.stringify(updatedBookmarks));
      } else {
        // Remove the quote from the bookmarks
        const updatedBookmarks = existingBookmarks.filter(bookmarkedQuote => bookmarkedQuote.text !== quote.text);
        localStorage.setItem('bookmarkedQuotes', JSON.stringify(updatedBookmarks));
      }
    }
  };

  // Function to select a random quote
  const random = () => {
    if (quotes.length === 0) return; // Check if quotes array is empty
    const select = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(select);
    setIsBookmarked(false);
  };

  // Function to copy the quote to the clipboard
  const copyToClipboard = async () => {
    if (!quote) return; // Check if quote is undefined

    try {
      await navigator.clipboard.writeText(`${quote.text} - ${quote.author.split(',')[0]}`);
      setShowCopyMessage(true);
      // Hide the copy message after 2 seconds
      setTimeout(() => {
        setShowCopyMessage(false);
      }, 700);
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
  };

  // Function to share the quote on Twitter
  const twitter = () => {
    if (!quote) return; // Check if quote is undefined
    window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`);
  };

  // Fetch quotes when the component mounts
  useEffect(() => {
    loadQuotes();
  }, []);

  // JSX for rendering the component
  return (
    <div className='container'>
      <div className="header">
        {/* Button to open the Login/Signup modal */}
        <button className="login-button" onClick={toggleLoginModal}>
          Login/Sign Up
        </button>
      </div>
      <div className="bookmark" onClick={bookmark}>
        {/* Bookmark icon with conditional saved message */}
        <img src={isBookmarked ? saved_icon : bookmark_icon} style={{ width: 30 }} alt="" />
        {showSavedMessage && <span className="saved-message">{isBookmarked ? 'Saved!' : 'Removed!'}</span>}
      </div>
      {/* Display the current quote */}
      <div className="quote">{quote.text}</div>
      {/* Display the author of the current quote */}
      <div className="author">- {quote.author.split(',')[0]}</div>
      <div>
        <div className="line"></div>
        <div className="bottom">
          {/* Reload icon for fetching a new random quote */}
          <div className="reload"><img src={reload_icon} style={{ width: 30 }} onClick={random} alt="" /></div>
          {/* Icons for sharing on Twitter and copying to clipboard */}
          <div className="icons">
            <img src={twitter_icon} style={{ width: 30 }} onClick={twitter} alt="" />
            <img src={copy_icon} style={{ width: 30 }} onClick={copyToClipboard} alt="" />
            {showCopyMessage && <span className="copy-message">Quote copied!</span>}
          </div>
        </div>
      </div>
      {/* Modal for Login/Signup */}
      {isLoginModalOpen && <LoginSignup onClose={toggleLoginModal} />}
    </div>
  );
};

export default RandomQuote;
