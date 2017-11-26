const auth = {
  username: 'test',
  password: 'test'
};

const reviewConfig = [
  {
    id: 1,
    problemCategory: '目标市场定位',
    problems: ['用大的行业市场分析替代细分行业市场分析', '市场细分方法选择不当', '细分推导过程有误', '市场细分不清晰', '过多的表述个人想法，忽略客观数据']
  },
  {
    id: 2,
    problemCategory: '用户洞察',
    problems: ['用大的行业市场分析替代细分行业市场分析', '市场细分方法选择不当', '细分推导过程有误', '市场细分不清晰', '过多的表述个人想法，忽略客观数据']
  },
  {
    id: 3,
    problemCategory: '需求分析',
    problems: ['用大的行业市场分析替代细分行业市场分析', '市场细分方法选择不当', '细分推导过程有误', '市场细分不清晰', '过多的表述个人想法，忽略客观数据']
  },
  {
    id: 4,
    problemCategory: '价值主张设计与验证',
    problems: ['用大的行业市场分析替代细分行业市场分析', '市场细分方法选择不当', '细分推导过程有误', '市场细分不清晰', '过多的表述个人想法，忽略客观数据']
  },
  {
    id: 5,
    problemCategory: '绘场景',
    problems: ['用大的行业市场分析替代细分行业市场分析', '市场细分方法选择不当', '细分推导过程有误', '市场细分不清晰', '过多的表述个人想法，忽略客观数据']
  },
  {
    id: 6,
    problemCategory: '爆产品',
    problems: ['用大的行业市场分析替代细分行业市场分析', '市场细分方法选择不当', '细分推导过程有误', '市场细分不清晰', '过多的表述个人想法，忽略客观数据']
  }
];

const projectList = [
  {
    id: 1,
    name: '水污染控制',
    reviewed: true
  },
  {
    id: 2,
    name: 'Air pollution control',
    reviewed: false
  },
  {
    id: 3,
    name: 'US one week trip',
    reviewed: false
  },
  {
    id: 4,
    name: 'Black friday shopping',
    reviewed: false
  },
  {
    id: 5,
    name: '大气污染控制',
    reviewed: true
  },
  {
    id: 6,
    name: 'Let us go to Hangzhou',
    reviewed: false
  },
  {
    id: 7,
    name: 'I want to go shopping',
    reviewed: false
  },
  {
    id: 8,
    name: 'Reading a famous book',
    reviewed: false
  },
  {
    id: 9,
    name: 'Climbing the mountain~',
    reviewed: false
  },
  {
    id: 10,
    name: 'Swimming in the sea',
    reviewed: false
  },
  {
    id: 11,
    name: 'Buy an iPhoneX',
    reviewed: false
  },
  {
    id: 12,
    name: 'Big bang theory',
    reviewed: false
  }
];

module.exports = { auth, reviewConfig, projectList };
