function success(data, total) {
  const response = { success: true, data };
  if (total !== undefined) response.total = total;
  return response;
}

function error(message, statusCode = 500) {
  return { success: false, error: message, statusCode };
}

module.exports = { success, error };
