import React from 'react'

  const formatDate = (dateString) => {
    if (!dateString) return " never";

    const date = new Date(dateString);
    const now = new Date();
    const diffenceMiliseconds = now - date;
    const differnceDays = Math.floor(
      diffenceMiliseconds / (1000 * 60 * 60 * 24)
    );
    if (differnceDays === 0) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    if (differnceDays < 7) {
      return `${differnceDays} day${differnceDays > 1 ? "s" : ""} ago`;
    }
    return `${differnceDays} day${differnceDays > 1 ? "s" : ""} ago`;
  };

export default formatDate;