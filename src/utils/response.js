
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
};

exports.successResponse = ({
  message = "Success",
  data = {},
  statusCode = 200
}) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify({
      message,
      data
    })
  };
};

exports.errorResponse = ({ err, data = {}, statusCode = 500 }) => {
//   logger.error({ message: err.message, data: { error: err.stack } });
  return {
    statusCode: err?.statusCode ?? statusCode,
    headers,
    body: JSON.stringify({
      message: err?.message ?? "Something went wrong",
      data
    })
  };
};