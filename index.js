/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2018-12-26 10:43:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义预设命令
 *****************************************
 */
const command = require('./command');


/**
 *****************************************
 * 获取配置
 *****************************************
 */
function decorateConfig(config) {

    // 合并配置
    command.assign(config.commands);

    // 返回配置
    return config;
}


/**
 *****************************************
 * 定义中间件
 *****************************************
 */
function middleware(store) {
    return next => action => {

        // 处理行为
        switch (action.type) {
            case 'CONFIG_LOAD':
            case 'CONFIG_RELOAD':
                command.assign(action.config.commands);
                break;
            case 'UI_COMMAND_EXEC':
                if (action.command === 'runCommand') {
                    command.pick();
                } else if (action.command.startsWith('runCommand:')) {
                    command.run(action.command.slice(11), store);
                }
                break;
            default:
                break;
        }

        // 执行下一步
        return next(action);
    };
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = {
    decorateConfig,
    middleware
};
