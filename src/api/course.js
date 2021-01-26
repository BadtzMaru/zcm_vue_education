import request from '@/utils/request';

export function fetchList(query) {
	return request({
		url: '/vue-element-admin/course/list',
		method: 'get',
		params: query,
	});
}
