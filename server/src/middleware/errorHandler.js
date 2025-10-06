export function notFoundHandler(_req, res, _next) {
  res.status(404).json({ message: "Route not found" });
}

export function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}


