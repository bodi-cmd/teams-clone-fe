const DateBeautifier = () => {
  const beautifyPostDate = (post) => {
    let dateString = "";
    dateString += post.timeLeftDays ? post.timeLeftDays + "d " : "";
    dateString += post.timeLeftHours ? post.timeLeftHours + "h " : "";
    dateString += post.timeLeftMinutes ? post.timeLeftMinutes + "m " : "";

    return dateString;
  };

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

  const beautifyDate = (date)=>{
    const dateObj = new Date(date);
    const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour:"2-digit", minute:"2-digit" };
    return dateObj.toLocaleDateString(undefined, options);
  }

  return {beautifyDate, beautifyPostDate, timeSince };
};

export default DateBeautifier;
