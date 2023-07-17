module.exports = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://localhost:5000/api/v1/auth', {
        headers: { Authorization: `${token}` },
      });
      const parseRes = await response.json();

      if (parseRes === 'Not Authorize') {
        return false;
      } else if (parseRes === true) {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
  }
};
