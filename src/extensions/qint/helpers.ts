declare global {
  interface String {
    c(): string
  }
}

export function augmentGlobals() {
  String.prototype.c = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
}
