import React, { useState } from "react";

const Blog = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setCurrentTabIndex(index);
  };

  return (
    <div>
      <button tabIndex={1} onClick={() => handleTabChange(0)} autoFocus>
        Home
      </button>
      <button tabIndex={2} onClick={() => handleTabChange(1)}>
        About
      </button>
      <button tabIndex={3} onClick={() => handleTabChange(2)}>
        Contact
      </button>
      <button tabIndex={4} onClick={() => handleTabChange(3)}>
        Blog
      </button>
    </div>
  );
};

export default Blog;
