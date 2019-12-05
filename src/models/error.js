class Error {
  constructor(message, type) {
    this.message = message;
    this.type = type;
  }

  get() {
    return {
      "Error": true,
      "ErrorMessage": this.message
    }
  }
}

module.exports = Error;