import request from "@/utils/request";

// 查询参数列表
export const fetchBannerList = (postData = {}) => {
  return request({
    url: "/system/banner/list",
    method: "post",
    data: postData,
  });
};

// 查询轮播图的间隔时间
export const getBannerInterval = () => {
  return request({
    url: "/system/banner/time",
    method: "get",
  });
};

// 设置轮播图间隔时间
export const setBannerInterval = (postData) => {
  return request({
    url: "/system/banner/time",
    method: "post",
    data: postData,
  });
};

// 新增
export const addBanner = (postData) => {
  return request({
    url: "/system/banner",
    method: "post",
    data: postData,
  });
};

// 修改
export const updateBanner = (postData) => {
  return request({
    url: "/system/banner",
    method: "put",
    data: postData,
  });
};

// 删除
export const deleteBanner = (id) => {
  return request({
    url: `/system/banner/${id}`,
    method: "delete",
  });
};

// 查询
export const checkBanner = (id) => {
  return request({
    url: `/system/banner/${id}`,
    method: "get",
  });
};
