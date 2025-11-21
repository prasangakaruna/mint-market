export const formatPrice = (price) => {
  // Handle both cents (from market products) and dollars (from featured items)
  const priceInDollars = price >= 1000 && price < 100000 ? price / 100 : price;
  
  if (priceInDollars >= 1000000) {
    return `$${(priceInDollars / 1000000).toFixed(1)}M`;
  } else if (priceInDollars >= 1000) {
    return `$${(priceInDollars / 1000).toFixed(0)}K`;
  } else {
    return `$${priceInDollars.toLocaleString()}`;
  }
};

export const formatFullPrice = (price) => {
  // Handle both cents (from market products) and dollars (from featured items)
  const priceInDollars = price >= 1000 && price < 100000 ? price / 100 : price;
  return `$${priceInDollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInHours = diffInMs / (1000 * 60 * 60);
  const diffInDays = diffInHours / 24;

  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays)}d ago`;
  } else {
    return new Date(date).toLocaleDateString();
  }
};

