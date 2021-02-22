class easyHTTP {
  constructor() {
    this.http = new XMLHttpRequest();
  }
  // HTTP GET request
  async get(url) {
    const res = await fetch(url);

    const resData = await res.json();
    return resData;
  }
  // HTTP POST request
  async post(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
  }
  // HTTP PUT request
  async put(url, data) {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    return resData;
  }
  // HTTP DELETE request
  async delete(url) {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const resData = await res.json();
    return "Resource Deleted";
  }
}
