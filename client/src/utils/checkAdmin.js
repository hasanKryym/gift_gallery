module.exports = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(
        `http://localhost:5000/api/v1/auth/adminStatus`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const parseRes = await response.json();
      return parseRes;
    }
  } catch (err) {
    console.log(err);
  }
};
