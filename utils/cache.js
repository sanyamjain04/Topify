class LRU {
  constructor(max = 5) {
    this.max = max;
    this.cache = new Map();
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size == this.max) {
      this.cache.delete(this.first());
    }
    this.cache.set(key, value);
  }

  first() {
    return this.cache.keys().next().value;
  }
}
const recentlyPlayedLRU = new LRU(20)

 const recentPlayedCache = (key, track) => {
    recentlyPlayedLRU.set(key, track)

    return Array.from(recentlyPlayedLRU.cache.values())

}
export default recentPlayedCache