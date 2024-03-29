export class Utils {
  /**
   * Return random number with Math from 0 to max (excluded)
   *
   * @param {number} max max random possible
   * @returns {number} random number
   */
  public static random(max: number): number {
    return Math.floor(Math.random() * max);
  }

  /**
   * Generate a random color
   *
   * @returns {string} generated color
   */
  public static generateColor(): string {
    return `#${Utils.repeat(() => Utils.random(16).toString(16), 6).join('')}`;
  }

  /**
   * Return a random string id
   *
   * @returns {string} generated id
   */
  public static generateId(): string {
    let id;
    do {
      id = [
        id,
        parseInt(
          Math.random()
            .toFixed(10)
            .slice(2, 12),
          10
        ).toString(36)
      ].join('');
    } while (id.length < 28);
    return id.slice(0, 28);
  }

  /**
   * Create an array of {size} from {factory} item
   *
   * @param {number} size size of the array
   * @param {((() => T) | null} [factory=null] arry item factory
   * @returns {Array<T>} built array
   */
  public static array<T>(size: number, factory: (() => T) | null = null): Array<T | null> {
    const arr = new Array<T | null>();
    for (; size > 0; size--) {
      arr.push(factory ? factory() : null);
    }
    return arr;
  }

  /**
   * Return first element of array
   *
   * @param {Array<T>} arr array
   * @returns {T | null} first element or null
   */
  public static first<T>(arr: Array<T | null>): T | null {
    return arr && arr.length > 0 ? arr[0] : null;
  }

  /**
   * Return last element of array
   *
   * @param {Array<T>} arr array
   * @returns {T | null} last element or null
   */
  public static last<T>(arr: Array<T>): T | null {
    return arr && arr.length > 0 ? arr[arr.length - 1] : null;
  }

  /**
   * Remove element from array
   *
   * @param {Array<T>} from array
   * @param {T} elem element to remove
   * @returns {T | null} removed element
   */
  public static remove<T>(arr: Array<T>, elem: T): T | null {
    return arr && arr.includes(elem) ? arr.splice(arr.indexOf(elem), 1)[0] : null;
  }

  /**
   * Format float number to a fixed decimal, rounded
   *
   * @param {number} num number to format
   * @param {number} decimal [=0] number of digit after decimal
   * @returns {number} rounded number
   */
  public static fixed(num: number, decimal: number = 0): number {
    return parseFloat(num.toFixed(Utils.reduce(decimal, 100, 0)));
  }

  /**
   * Return the number between limit [min=0] - [max]
   *
   * @param {number} num given number
   * @param {number} [max]
   * @param {number} [min=0]
   * @returns {number}
   */
  public static reduce(num: number, max: number, min: number = 0): number {
    return min > max ? num : num > min ? (max > 0 ? (num < max ? num : max) : num) : min;
  }

  /**
   * Return sign of given number
   *
   * @param {number} num given number
   * @returns {1 | -1 | 0} 1 positive, -1 negative, or 0
   */
  public static sign(num: number): 1 | -1 | 0 {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
  }

  /**
   * Return hypotenuse for two given points
   */
  public static hypotenuse(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  /**
   * Return 3d hypotenuse for two given points
   */
  public static hypotenuse3d(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    const dx = Math.pow(x1 - x2, 2);
    const dy = Math.pow(y1 - y2, 2);
    const dz = Math.pow(z1 - z2, 2);
    return Math.sqrt(dx + dy + dz);
  }

  /**
   * Return if the given point is in circle
   *
   * @param {number} xp x coordinate of point
   * @param {number} yp y coordinate of point
   * @param {number} xc x coordinate of circle
   * @param {number} yc y coordinate of circle
   * @param {number} r circle radius
   * @returns {boolean} in circle
   */
  public static isInCircle(xp: number, yp: number, xc: number, yc: number, r: number): boolean {
    return Utils.hypotenuse(xp, yp, xc, yc) < r;
  }

  /**
   * Calculate the average of given numbers
   *
   * @param {Array<number>} numbers number array
   * @returns {number} average
   */
  public static average(numbers: Array<number>): number {
    let total = 0;
    numbers.map(n => total += n);
    return numbers.length ? total / numbers.length : 0;
  }

  /**
   * Return locale date string of a timestamp
   *
   * @param {number} timestamp date timestamp
   * @returns {string} locale string
   */
  public static timestampToLocaleDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  /**
   * Repeat a given function x times
   * Return all results in an Array
   *
   * @param {() => T} func given function
   * @param {number} [times=1] number of repetition
   * @returns {Array<T>}
   */
  public static repeat<T>(func: () => T, times: number = 1): Array<T> {
    const results = new Array<T>();
    for (; times > 0; times--) {
      results.push(func());
    }
    return results;
  }
}
