export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }

  static badRequest(message: string, data?: any) {
    return new ApiError(message, 400, data)
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(message, 401)
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(message, 403)
  }

  static notFound(message = 'Not found') {
    return new ApiError(message, 404)
  }

  static internal(message = 'Internal server error') {
    return new ApiError(message, 500)
  }
}