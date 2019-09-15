export default {
  googleKey: 'AIzaSyDKfYKyZhTA3jkN3Htv23OPmuh93PgY8mM',

  root: '/api/',

  current: 'user',
  vkAuth: 'app/vk',

  journeyCreate: 'journey/create',
  journeyList: 'journey/list',
  geoPositionCreate: 'geo/position_create',
  attachmentUpload: 'attachment/upload',
  journeyUpdateMilestones: 'journey/update_milestones',
  journeyJoin: 'journey/join',
  journeyGetParticipants: 'journey/get_participants',
  getUserProfile(userId) { return `user/profile/${userId}/`},
  getNotificationList: 'notification/list',

  // clusterList: 'cluster.list',

  // routeItemCreate: 'route_item.create',

  // commentList: 'comment.list',
  // commentCreate: 'comment.create',

  fatalError: 'Что-то пошло не так ((('
};
