import React, { useEffect, useState } from 'react';
import { getNews, getSearchNews } from './api.js';
import { useDebounce } from './useDebounce.js';
import './index.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const debouncedSearch = useDebounce(search, 500); // 500ms delay

  useEffect(() => {
    const fetchArticles = async () => {
      setMessage('Loading...');
      setArticles([]);
      try {
        const data = debouncedSearch
          ? await getSearchNews(debouncedSearch)
          : await getNews();

        const fetchedArticles = data?.articles || [];
        setArticles(fetchedArticles);

        if (fetchedArticles.length === 0) {
          setMessage(debouncedSearch ? 'No articles found for your search.' : 'No top headlines found.');
        } else {
          setMessage('');
        }
      } catch (error) {
        // The error is already logged in api.js
        setMessage('Failed to fetch news. Please check your connection or API key.');
      }
    };

    fetchArticles();
  }, [debouncedSearch]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">

      <header className="header">
        <div className="header-wrapper">
          <svg>
            <text x="50%" y="50%" dy=".35em" text-anchor="middle">
              News infoblitz
            </text>
          </svg>
          <input
            className="news-search-input"
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={handleSearch}
          />
        </div>
      </header>

      <div className="curved"> <p>Search news from First News</p></div>
      <span className="massage-text" style={{ display: message ? 'flex' : 'none' }}>
        {message}
      </span>
      <div className="content">
        <div className="content-wraper">
          {articles.map((news, idx) => {
            const defaultImage = 'https://images.unsplash.com/photo-1678811116814-26372fcfef1b?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            const urlImage = news.urlToImage ?? defaultImage;
            const date = news.publishedAt;
            const description = news.description ?? '';
            const url = news.url;
            const titleNews = news.title;
            return (
              <div className="card" key={idx}>
                <div className="card-image-wraper">
                  <img src={urlImage} alt={titleNews} />
                </div>
                <div className="card-content">
                  <span className="card-date">{date}</span>
                  <h2 className="card-title">
                    <a href={url} target="_blank" rel="noopener noreferrer">{titleNews}</a>
                  </h2>
                  <p className="card-description">{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;