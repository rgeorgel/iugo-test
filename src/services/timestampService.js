class Timestamp {
  get () {
    const time = new Date().getTime();
    return { Timestamp: time }
  }
}

module.exports = Timestamp;