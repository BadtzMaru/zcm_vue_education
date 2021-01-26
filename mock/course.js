const Mock = require('mockjs');

const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
	List.push(
		Mock.mock({
			id: '@increment',
			title: '@csentence(5, 10)',
			cover: '@image("200x100")',
			try: '@cparagraph',
			content: '@cparagraph',
			'price|1': [10, 5, 6, 99, 88, 100],
			'status|1': [0, 1],
			created_time: '@now',
			updated_time: '@now',
		})
	);
}

module.exports = [
	{
		url: '/vue-element-admin/course/list',
		type: 'get',
		response: (config) => {
			const { status, title, page = 1, limit = 20, sort } = config.query;

			let mockList = List.filter((item) => {
				// if (type && item.type !== type) return false;
				if (title && item.title.indexOf(title) < 0) return false;
				return true;
			});

			if (sort === '-id') {
				mockList = mockList.reverse();
			}

			const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));

			return {
				code: 20000,
				data: {
					total: mockList.length,
					items: pageList,
				},
			};
		},
	},

	// {
	// 	url: '/vue-element-admin/article/detail',
	// 	type: 'get',
	// 	response: (config) => {
	// 		const { id } = config.query;
	// 		for (const article of List) {
	// 			if (article.id === +id) {
	// 				return {
	// 					code: 20000,
	// 					data: article,
	// 				};
	// 			}
	// 		}
	// 	},
	// },

	// {
	// 	url: '/vue-element-admin/article/pv',
	// 	type: 'get',
	// 	response: (_) => {
	// 		return {
	// 			code: 20000,
	// 			data: {
	// 				pvData: [
	// 					{ key: 'PC', pv: 1024 },
	// 					{ key: 'mobile', pv: 1024 },
	// 					{ key: 'ios', pv: 1024 },
	// 					{ key: 'android', pv: 1024 },
	// 				],
	// 			},
	// 		};
	// 	},
	// },

	// {
	// 	url: '/vue-element-admin/article/create',
	// 	type: 'post',
	// 	response: (_) => {
	// 		return {
	// 			code: 20000,
	// 			data: 'success',
	// 		};
	// 	},
	// },

	// {
	// 	url: '/vue-element-admin/article/update',
	// 	type: 'post',
	// 	response: (_) => {
	// 		return {
	// 			code: 20000,
	// 			data: 'success',
	// 		};
	// 	},
	// },
];
