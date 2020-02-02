//cookie取得＆加工用関数
export const getcookie = () => {
  const cookiesArray = document.cookie.split('; '); //全てのcookieを取り出して「;」で分割し配列に
  const newCookieArray = cookiesArray.map((obj) => {//さらに「=」で分割し配列に
    return (obj.split('='));
  });
  const cookieObj = newCookieArray.filter((obj) => {//その後、配列から必要な物だけにフィルター
    return obj[0] === 'UserName' || obj[0] === 'UserId' || obj[0] === 'Token';
  });
  let newCookieObj = {}//最後に配列をオブジェクトに
  cookieObj.forEach((data) => {
    newCookieObj = { ...newCookieObj, [data[0]]: data[1] };
  });
  return newCookieObj;
};
