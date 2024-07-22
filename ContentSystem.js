// User class
class User {
    constructor(userId, preferences) {
      this.userId = userId;
      this.preferences = preferences; // A dictionary of genre preferences
    }
  }
  
  // Content class
  class Content {
    constructor(contentId, genre) {
      this.contentId = contentId;
      this.genre = genre;
    }
  }
  
  // Example data
  const users = [
    new User(1, { Action: 5, Comedy: 3, Romance: 1 }),
    new User(2, { Action: 2, Comedy: 5, Romance: 4 }),
    new User(3, { Action: 4, Comedy: 2, Romance: 5 }),
  ];
  
  const contents = [
    new Content(1, "Action"),
    new Content(2, "Comedy"),
    new Content(3, "Romance"),
    new Content(4, "Action"),
    new Content(5, "Comedy"),
  ];
  
  // Function to analyze user preferences
  function analyzePreferences(users) {
    const genrePopularity = {};
    users.forEach((user) => {
      for (const genre in user.preferences) {
        if (genrePopularity[genre]) {
          genrePopularity[genre] += user.preferences[genre];
        } else {
          genrePopularity[genre] = user.preferences[genre];
        }
      }
    });
    return genrePopularity;
  }
  
  // Example analysis
  const genrePopularity = analyzePreferences(users);
  console.log("Genre Popularity:", genrePopularity);
  
  // Function to recommend content
  function recommendContent(user, contents, genrePopularity) {
    const recommendations = [];
    contents.forEach((content) => {
      if (user.preferences[content.genre]) {
        const score =
          user.preferences[content.genre] * genrePopularity[content.genre];
        recommendations.push({ contentId: content.contentId, score });
      }
    });
    // Sort recommendations by score in descending order
    recommendations.sort((a, b) => b.score - a.score);
    return recommendations.map((rec) => rec.contentId);
  }
  
  // Example recommendation
  users.forEach((user) => {
    const recommendedContent = recommendContent(user, contents, genrePopularity);
    console.log(
      `Recommendations for User ${user.userId}: ${recommendedContent}`
    );
  });