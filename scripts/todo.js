'use strict';
// Description
//  TODOを管理できるbotです
// Commands:
//  ボット名　add............TODO を作成
//  ボット名　done...........TODO を完了にする
//  ボット名　del........... TODO を消す
//  ボット名　list...........TODO の一覧表示
//  ボット名　donelist.......TODO の完了タスクを一覧表示

const todo = require('todo');

// hubot がモジュールを受け取る
module.exports = robot => {
    // 正規表現
    // add コマンドの実装
    robot.respond(/add (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.add(task);
        msg.send('追加しました: '+task);
    })
    // done コマンドの実装
    robot.respond(/done (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send('完了にしました: ' + task);
     });
    // del コマンドの実装
    robot.respond(/del (.+)/i, msg => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send('削除しました: ' + task);
    });
    // list コマンドの実装
    robot.respond(/list/i, msg => {
        msg.send(todo.list().join('\n'));
    });
    // donelist コマンドの実装
    robot.respond(/donelist/i, msg => {
        msg.send(todo.donelist().join('\n'));
    });
};
