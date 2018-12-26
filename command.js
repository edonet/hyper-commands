/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-12-26 11:21:41
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义命令对象
 *****************************************
 */
class Command {

    /* 初始化对象 */
    constructor() {
        this.commands = {};
    }

    /* 添加命令 */
    assign(commands) {
        if (commands) {
            this.commands = Object.assign(this.commands, commands);
        }
    }

    /* 选择命令 */
    pick() {
        console.log(this.commands);
    }

    /* 执行命令 */
    run(name) {
        if (name && window.rpc) {
            let cmd = this.commands[name.trim()];

            // 存在命令
            if (cmd) {
                if (typeof cmd === 'string') {
                    window.rpc.emitter.emit('session data send', { data: cmd + '\n' });
                } else if (cmd.shell) {
                    window.rpc.emit('new', { shell: cmd.shell, shellArgs: cmd.args });
                }
            }
        }
    }
}


/**
 *****************************************
 * 抛出命令对象
 *****************************************
 */
module.exports = new Command();
