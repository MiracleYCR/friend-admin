import request from "@/utils/request";

// 查询参数列表
export const fetchUserList = (postData) => {
  return request({
    url: "/system/app/user/list",
    method: "post",
    data: postData,
  });
};

// 更新用户信息
export const updateUserStatus = (postData) => {
  return request({
    url: "/system/app/user",
    method: "post",
    data: postData,
  });
};

// 查询用户详情
export const getUserDetail = (userId) => {
  return request({
    url: `/system/app/user/${userId}`,
    method: "get",
  });
};

// 获取Ta的帖子数据
export const getPostDetail = (postData) => {
  return request({
    url: "/system/app/user/get-post",
    method: "post",
    data: postData,
  });
};

// 获取Ta的邀请数据
export const getInviteDetail = (postData) => {
  return request({
    url: "/system/app/user/get-invite",
    method: "post",
    data: postData,
  });
};

// 获取Ta的关注
export const getFollowDetail = (postData) => {
  return request({
    url: "/system/app/user/get-follow",
    method: "post",
    data: postData,
  });
};

// 获取Ta的粉丝
export const getFansDetail = (postData) => {
  return request({
    url: "/system/app/user/get-fans",
    method: "post",
    data: postData,
  });
};
