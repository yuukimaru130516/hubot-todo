'use strict';
// { name: タスクの文字列, state: 完了しているかどうかの真偽値 }
let tasks = [];
const fs = require('fs');
const fileName = './tasks.json';

/* --------------------------------
タスクをファイルから同期的に読み込む
---------------------------------*/
// ファイルがないとき、エラー処理を追加する
try {
  const data = fs.readFileSync(fileName, 'utf8');
  tasks = JSON.parse(data);

// catch の処理を実行して bot が落ちないようにする = 例外処理
// err はエラー情報が入る引数（ e でも可 ）
} catch (err) {
  console.log(fileName + 'から復元できませんでした');
}

/*---------------------------
タスクをファイルに保存する
---------------------------*/
function saveTasks() {
  // 配列から文字列に変換してファイルとして保存する
  // JSON オブジェクトは組み込み
  fs.writeFileSync(fileName, JSON.stringify(tasks), 'utf8');
}


/**
 * TODOを追加する
 * @param {string} task
 */
function add(task) {
    tasks.push({ name: task, state: false });
    saveTasks();
  }

  /**
* タスクと完了したかどうかが含まれるオブジェクトを受け取り、完了したかを返す
* @param {object} taskAndIsDonePair
* @return {boolean} 完了したかどうか
*/
function isDone(taskAndIsDonePair) {
    return taskAndIsDonePair.state;
   }

/**
* タスクと完了したかどうかが含まれるオブジェクトを受け取り、完了したかを返す
* @param {object} taskAndIsDonePair
* @return {boolean} 完了してないかどうか
*/
function isNotDone(taskAndIsDonePair) {
    return !isDone(taskAndIsDonePair);
  }
  
/**
* TODOの一覧の配列を取得する
* @return {array}
*/
function list() {
    return tasks
      //false でないtask だけを抽出
      .filter(task => isNotDone(task))
      // task の文字列だけをreturn
      .map(t => t.name);
  }

/**
 * TODOを完了状態にする
 * @param {string} task
 */
function done(task) {
    // task が存在するかをチェックして添え字を indexFound に返す
    const indexFound = tasks.findIndex(t => t.name === task);
    if (indexFound !== -1) {
      tasks[indexFound].state = true;
      saveTasks();
    }
  }

  /**
 * 完了済みのタスクの一覧の配列を取得する
 * @return {array}
 */
function donelist() {
    // 完了状態のものだけ取得して、map関数でタスク名だけを返す
    return tasks.filter(isDone).map(t => t.name);
  }
  
  
/**
 * 項目を削除する
 * @param {string} task
 */
function del(task) {
    const indexFound = tasks.findIndex(t => t.name === task);
    if (indexFound !== -1) {
      tasks.splice(indexFound, 1);
      saveTasks();
    }
  }

  

  module.exports = { add, list, done, donelist ,del };