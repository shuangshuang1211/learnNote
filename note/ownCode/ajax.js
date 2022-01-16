const getUrl = (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (this.readystate !== 4) {
          return ;
        } else {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.statusText);
          }
        }
      }
      xhr.responseType = "json";
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();
    });
  };