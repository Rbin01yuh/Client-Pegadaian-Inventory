export function success(data = null, message = 'OK', statusCode = 200) {
  return {
    statusCode,
    source: 'api',
    result: {
      status: 'success',
      message,
      data,
    },
  };
}

export function fail(message = 'Error', statusCode = 500, details = null) {
  return {
    statusCode,
    source: 'api',
    result: {
      status: 'error',
      message,
      data: null,
      details,
    },
  };
}