const RequestHelper = (address) => {
  const formDataPOST = (path, headers, body, callback) => {
    const formData = new FormData();
    const values = Object.values(body);
    Object.keys(body).forEach((property, index) => {
      if (body[property] instanceof Array) {
        body[property].forEach((element) => {
          formData.append(property, element);
        });
      } else {
        formData.append(property, values[index]);
      }
    });

    const requestOptions = {
      method: "POST",
      headers: { ...headers },
      body: formData,
    };
    fetchWrapper(address + path, requestOptions, callback);
  };

  const formDataPUT = (path, headers, body, callback) => {
    const formData = new FormData();
    const values = Object.values(body);
    Object.keys(body).forEach((property, index) => {
      if (body[property] instanceof Array) {
        body[property].forEach((element) => {
          formData.append(property, element);
        });
      } else {
        formData.append(property, values[index]);
      }
    });

    const requestOptions = {
      method: "PUT",
      headers: { ...headers },
      body: formData,
    };
    fetchWrapper(address + path, requestOptions, callback);
  };

  const GET = (path, headers, callback) => {
    const requestOptions = {
      method: "GET",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };
    fetchWrapper(address + path, requestOptions, callback);
  };

  const POST = (path, headers, body, callback) => {
    const requestOptions = {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetchWrapper(address + path, requestOptions, callback);
  };

  const PUT = (path, headers, body, callback) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetchWrapper(address + path, requestOptions, callback);
  };

  const PATCH = (path, headers, body, callback) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    fetchWrapper(address + path, requestOptions, callback);
  };

  const DELETE = (path, headers, callback) => {
    const requestOptions = {
      method: "DELETE",

      headers: {
        ...headers,

        "Content-Type": "application/json",
      },
    };

    fetchWrapper(address + path, requestOptions, callback);
  };

  const fetchWrapper = (path, options, callback) => {
    fetch(path, options)
      .then(async (response) => {
        let data = null;
        try {
          data = await response.json();
        } catch (e) {
          data = null;
        }
        if (!response.ok) {
          callback(null, { ...data, code: response.status, handleable: true });
        } else {
          callback({ data: data, code: response.status }, null);
        }
      })
      .catch((error) => {
        console.log(error)
        callback(null, { ...error, handleable: false });
      });
  };

  return { formDataPOST, GET, POST, PUT, DELETE, formDataPUT, PATCH};
};

export default RequestHelper;
