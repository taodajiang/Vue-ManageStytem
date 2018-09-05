import request from '@/utils/request'

//专题管理部分
export function getTopicList(params) { //获取列表数据
    return request({
        url: 'GET/API/Platform/ThematicManage',
        method: 'get',
        params
    })
}

export function getTopicInfo(params) { //获取专题详情
    return request({
        url: 'GET/API/Platform/SpecialInfo',
        method: 'get',
        params
    })
}