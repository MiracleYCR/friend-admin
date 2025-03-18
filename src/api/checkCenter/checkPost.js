import request from "@/utils/request";

// 查询帖子
export const getCheckPostList = (postData) => {
  return request({
    url: "/system/app/post/list",
    method: "post",
    data: postData,
  });
};

// 审核帖子
export const checkingPost = (postData) => {
  return request({
    url: "/system/app/post",
    method: "put",
    data: postData,
  });
};

// 显示隐藏帖子
export const changePostStatus = (postData) => {
  return request({
    url: "/system/app/post/hide",
    method: "put",
    data: postData,
  });
};

// 获取帖子详情
export const checkPostDetail = (postId) => {
  return request({
    url: `/system/app/post/${postId}`,
    method: "post",
  });
};

// 隐藏评论
export const hidePostComment = (postData) => {
  return request({
    url: `/system/app/post/hide-comments`,
    method: "post",
    data: postData,
  });
};

// 删除评论
export const deletePostComment = (commentId) => {
  return request({
    url: `/system/app/post/comments/${commentId}`,
    method: "delete",
  });
};
