export const exerciseOptions = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': '8ca8bc9bc0mshe9a460bfa97898fp1a040ejsne1d179f73711'
    }
};
      

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}