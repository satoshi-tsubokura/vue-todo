/**
 * TodoListの1件分のデータを示すエンティティ
 */
export class TodoEntity {
  #createdAt;
  /**
   *
   * @param {number} id 一意の値
   * @param {string} title
   * @param {Date} limitedAt
   * @param {string} memo
   * @param {boolean} isDone
   * @param {Date} createdAt 
   * @param {Date} updatedAt
   */
  constructor(id, title, limitedAt, memo, isDone, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.limitedAt = limitedAt;
    this.memo = memo;
    this.isDone = isDone;
    this.#createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get createdAt() {
    return this.#createdAt;
  }
}
